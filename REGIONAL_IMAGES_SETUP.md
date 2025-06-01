# Regional Images Setup Guide

## 📁 Folder Structure Created

```
public/images/
├── brazil/          # Brazilian architecture (Portuguese)
├── usa/             # American architecture (English)  
└── hispanic/        # Hispanic architecture (Spanish)
```

## 🎯 How It Works

The website now automatically adapts images based on the user's language:

- **Portuguese (pt)**: Shows Brazilian architecture
- **English (en)**: Will show American architecture 
- **Spanish (es)**: Will show Hispanic architecture

## 🔧 Current Status

### ✅ Ready & Working:
- **Brazilian images** are fully integrated
- **Fallback system** ensures site always works
- **Dynamic header** adapts to locale
- **All components** use region-specific images

### 📝 To-Do (Add Images):
- Add American architecture images to `/public/images/usa/`
- Add Hispanic architecture images to `/public/images/hispanic/`

## 📋 Image Requirements

### For USA (/public/images/usa/):
- `fallingwater-frank-lloyd-wright.jpg`
- `guggenheim-museum-nyc.jpg` 
- `central-park-nyc.jpg`
- `walt-disney-concert-hall.jpg`
- `american-architect-working.jpg`

### For Hispanic (/public/images/hispanic/):
- `sagrada-familia-gaudi-barcelona.jpg`
- `guggenheim-bilbao.jpg`
- `parque-guell-barcelona.jpg`
- `museo-soumaya-mexico.jpg`
- `arquitecto-hispanico-trabajando.jpg`

## 🚀 What Happens Now

1. **Portuguese users**: See Brazilian buildings (works perfectly)
2. **English users**: See Brazilian buildings as fallback (until you add USA images)
3. **Spanish users**: See Brazilian buildings as fallback (until you add Hispanic images)

## 🔄 After Adding Images

Once you add the regional images:
1. Place files in respective folders with exact names from config
2. Images will automatically appear for that language
3. No code changes needed!

## 🛠️ Technical Details

### Files Modified:
- `lib/imageConfig.ts` - Configuration for all regions
- `components/HeroWithImages.tsx` - Dynamic image loading
- `components/BuildGreatThingsSection.tsx` - Regional building showcase

### Fallback Logic:
- If regional images don't exist → Use Brazilian images
- If file path is wrong → Graceful degradation
- Site never breaks due to missing images

## 🌍 Benefits

- **Localized Experience**: Each market sees relevant architecture
- **Professional Appeal**: American clients see American buildings
- **Cultural Relevance**: Spanish clients see Hispanic architecture  
- **SEO Friendly**: Localized content improves search rankings
- **Future Ready**: Easy to add more regions (German, French, etc.)

## 📈 Next Steps

1. Source high-quality images for USA market
2. Source high-quality images for Hispanic market  
3. Follow naming conventions in README files
4. Test with different browser languages
5. Consider adding more regions as business grows

The infrastructure is 100% ready - just add the images! 🎉