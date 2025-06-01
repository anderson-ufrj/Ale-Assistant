import { initializeApp, getApps } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import type { Analytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Lazy load Firebase services
let auth: Auth | null = null
let db: Firestore | null = null
let analytics: Analytics | null = null

export const getFirebaseAuth = async () => {
  if (!auth) {
    const { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } = await import('firebase/auth')
    auth = getAuth(app)
    return {
      auth,
      googleProvider: new GoogleAuthProvider(),
      facebookProvider: new FacebookAuthProvider(),
      appleProvider: new OAuthProvider('apple.com')
    }
  }
  const { GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } = await import('firebase/auth')
  return {
    auth,
    googleProvider: new GoogleAuthProvider(),
    facebookProvider: new FacebookAuthProvider(),
    appleProvider: new OAuthProvider('apple.com')
  }
}

export const getFirebaseDb = async () => {
  if (!db) {
    const { getFirestore } = await import('firebase/firestore')
    db = getFirestore(app)
  }
  return db
}

export const getFirebaseAnalytics = async () => {
  if (!analytics && typeof window !== 'undefined') {
    const { getAnalytics, isSupported } = await import('firebase/analytics')
    const supported = await isSupported()
    if (supported) {
      analytics = getAnalytics(app)
    }
  }
  return analytics
}

// Export for backwards compatibility during migration
export { auth, db, analytics }
export const googleProvider = {} as any
export const facebookProvider = {} as any
export const appleProvider = {} as any

export default app