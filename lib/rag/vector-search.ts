/**
 * Sistema de busca vetorial simplificado para RAG
 * Usa similaridade de cosseno com vetores TF-IDF
 */

interface Document {
  id: string;
  content: string;
  title: string;
  category: string;
  tags: string[];
  relevance: number;
}

interface SearchResult {
  document: Document;
  score: number;
}

/**
 * Calcula a similaridade de cosseno entre dois vetores
 */
function cosineSimilarity(vec1: number[], vec2: number[]): number {
  if (vec1.length !== vec2.length) return 0;

  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    norm1 += vec1[i] * vec1[i];
    norm2 += vec2[i] * vec2[i];
  }

  if (norm1 === 0 || norm2 === 0) return 0;

  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
}

/**
 * Tokeniza e normaliza texto
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2); // Remove palavras muito curtas
}

/**
 * Calcula TF (Term Frequency) para um documento
 */
function calculateTF(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  const totalTokens = tokens.length;

  tokens.forEach(token => {
    tf.set(token, (tf.get(token) || 0) + 1);
  });

  // Normaliza pelo total de tokens
  tf.forEach((count, token) => {
    tf.set(token, count / totalTokens);
  });

  return tf;
}

/**
 * Calcula IDF (Inverse Document Frequency) para o corpus
 */
function calculateIDF(documents: string[][]): Map<string, number> {
  const idf = new Map<string, number>();
  const totalDocs = documents.length;

  // Conta em quantos documentos cada termo aparece
  const docFrequency = new Map<string, number>();

  documents.forEach(tokens => {
    const uniqueTokens = new Set(tokens);
    uniqueTokens.forEach(token => {
      docFrequency.set(token, (docFrequency.get(token) || 0) + 1);
    });
  });

  // Calcula IDF
  docFrequency.forEach((freq, token) => {
    idf.set(token, Math.log(totalDocs / freq));
  });

  return idf;
}

/**
 * Cria um vetor TF-IDF para um documento
 */
function createTFIDFVector(
  tokens: string[],
  idf: Map<string, number>,
  vocabulary: string[]
): number[] {
  const tf = calculateTF(tokens);
  const vector: number[] = [];

  vocabulary.forEach(term => {
    const tfValue = tf.get(term) || 0;
    const idfValue = idf.get(term) || 0;
    vector.push(tfValue * idfValue);
  });

  return vector;
}

/**
 * Classe principal para busca vetorial
 */
export class VectorSearch {
  private documents: Document[] = [];
  private vocabulary: string[] = [];
  private idf: Map<string, number> = new Map();
  private documentVectors: number[][] = [];

  /**
   * Indexa documentos para busca
   */
  indexDocuments(documents: Document[]): void {
    this.documents = documents;

    // Tokeniza todos os documentos
    const allTokens = documents.map(doc =>
      tokenize(doc.title + ' ' + doc.content + ' ' + doc.tags.join(' '))
    );

    // Cria vocabulário único
    const vocabularySet = new Set<string>();
    allTokens.forEach(tokens => {
      tokens.forEach(token => vocabularySet.add(token));
    });
    this.vocabulary = Array.from(vocabularySet).sort();

    // Calcula IDF
    this.idf = calculateIDF(allTokens);

    // Cria vetores TF-IDF para cada documento
    this.documentVectors = allTokens.map(tokens =>
      createTFIDFVector(tokens, this.idf, this.vocabulary)
    );
  }

  /**
   * Busca documentos relevantes para uma query
   */
  search(query: string, topK: number = 3): SearchResult[] {
    if (this.documents.length === 0) {
      return [];
    }

    // Tokeniza e vetoriza a query
    const queryTokens = tokenize(query);
    const queryVector = createTFIDFVector(queryTokens, this.idf, this.vocabulary);

    // Calcula similaridade com todos os documentos
    const results: SearchResult[] = this.documents.map((doc, index) => ({
      document: doc,
      score: cosineSimilarity(queryVector, this.documentVectors[index])
    }));

    // Ordena por score e retorna top K
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  /**
   * Busca com boost por categoria e tags
   */
  searchWithBoost(
    query: string,
    topK: number = 3,
    categoryBoost: number = 1.2,
    tagBoost: number = 1.1
  ): SearchResult[] {
    const results = this.search(query, this.documents.length);
    const queryTokens = tokenize(query);

    // Aplica boost baseado em categorias e tags
    const boostedResults = results.map(result => {
      let boostedScore = result.score;

      // Boost se a categoria aparecer na query
      if (queryTokens.includes(result.document.category.toLowerCase())) {
        boostedScore *= categoryBoost;
      }

      // Boost se alguma tag aparecer na query
      const matchingTags = result.document.tags.filter(tag =>
        queryTokens.includes(tag.toLowerCase())
      );
      if (matchingTags.length > 0) {
        boostedScore *= (tagBoost * matchingTags.length);
      }

      // Boost pelo relevance original do documento
      boostedScore *= result.document.relevance;

      return {
        ...result,
        score: boostedScore
      };
    });

    // Reordena e retorna top K
    return boostedResults
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  /**
   * Retorna estatísticas do índice
   */
  getStats() {
    return {
      totalDocuments: this.documents.length,
      vocabularySize: this.vocabulary.length,
      indexed: this.documentVectors.length > 0
    };
  }
}

// Instância singleton para uso global
let vectorSearchInstance: VectorSearch | null = null;

export function getVectorSearch(): VectorSearch {
  if (!vectorSearchInstance) {
    vectorSearchInstance = new VectorSearch();
  }
  return vectorSearchInstance;
}

export function resetVectorSearch(): void {
  vectorSearchInstance = null;
}
