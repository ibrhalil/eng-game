# Eng-Game 🎯

İngilizce öğrenme platformu - Flashcard, Quiz, Listening ve Speaking alıştırmaları ile dil öğrenimini keyifli hale getirin.

## 🚀 Teknoloji Stack

- **React 18** - UI Framework
- **TypeScript** - Tip güvenliği
- **Vite** - Build Tool
- **React Router v6** - Routing

## 📦 Kurulum

```bash
npm install
npm run dev
```

## 🎮 Özellikler

### Flashcards
Kelime kartları ile yeni kelimeler öğrenin. Kartın ön yüzünde kelime, arka yüzünde anlam ve örnek cümle.

- Kartin sag altindaki play butonu ile kelimeyi Web Speech API kullanarak sesli dinleyebilirsiniz.

Word entity (basit ve servis dostu):
- `id`: benzersiz kimlik
- `text`: İngilizce kelime
- `pronunciation`: Türkçe okunuş
- `meaning`: tek ana Türkçe anlam
- `meaningNote` (opsiyonel): kısa ayırt notu (ör. `sayı`)
- `partOfSpeech`: `noun | verb | adjective | adverb | numeral | phrase`
- `example`: bağlam cümlesi
- `difficulty`: `easy | medium | hard`
- `isActive` (opsiyonel): aktif/pasif kayıt

### Quiz
Çoktan seçmeli sorular ile bilginizi test edin.

- Quiz sonucunda deneme sayisi, son skor ve en iyi skor localStorage'da tutulur.

### Listening
Dinleme alıştırmaları ile İngilizce dinleme becerilerinizi geliştirin.

### Speaking Phrases
Günlük hayatta kullanılan İngilizce kalıplar ve telaffuz ipuçları.

### Misafir Oturumu (Local)
- Uygulama ilk acilista otomatik bir misafir kullanici olusturur (`Misafir-XXXX`).
- Misafir bilgileri `guest.info` key'i ile localStorage'da saklanir.
- Flashcard ilerleme verileri `progress.flashcard` key'i ile misafir kullaniciya bagli tutulur.
- Bu yapi backend entegrasyonunda kayitli hesaba gecis ve veri tasima icin temel hazirlar.

## 📂 Proje Yapısı

```
src/
├── components/     # Yeniden kullanılabilir UI bileşenleri
├── pages/          # Sayfa bileşenleri
├── data/           # Dummy JSON verileri
├── context/       # State yönetimi
├── hooks/         # Custom hooks
├── types/         # TypeScript tipleri
└── styles/        # Global stiller
```

## 🛠️ Geliştirme

```bash
# Development
npm run dev

# Production build
npm run build

# Production preview
npm run preview
```

## 📝 Lisans

MIT
