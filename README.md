# Nanny.Services - Bakıcı Bulma ve Randevu Platformu

Bu proje, ailelerin ihtiyaçlarına en uygun bakıcıları (nanny) online olarak bulmalarını, detaylı profillerini incelemelerini, favorilerine eklemelerini ve doğrudan randevu oluşturabilmelerini sağlayan 3 sayfalık modern bir web uygulamasıdır.

## Proje Konusu
Nanny.Services, ebeveynlerin bakıcı arayış süreçlerini kolaylaştırmak üzere tasarlanmış; filtreleme, sıralama, favoriler yönetimi ve randevu talebi formları içeren interaktif bir platformdur.

## Ana Teknolojiler
- **Frontend Framework**: React (Vite)
- **Global State Management**: Redux Toolkit & Redux Persist
- **Routing**: React Router (DOM)
- **Database & Authentication**: Firebase Realtime Database & Firebase Authentication
- **Form Management**: React Hook Form
- **Validation**: Yup Schema Validation
- **Styling**: Vanilla CSS (CSS Modules), responsive layout (320px - 1440px)
- **Icons**: React Icons (Fi icons) & Custom SVG Sprites

## Uygulama Özellikleri & Sayfalar
1. **Home (Ana Sayfa)**: Şirket sloganı, animasyonlu arayüz, "Get started" yönlendirme butonu, deneyimli bakıcı sayısını gösteren istatistik kartı ve dinamik kullanıcı kimlik doğrulama badge'i.
2. **Nannies (Bakıcı Listesi)**: 
   - Firebase Realtime Database'den dinamik veri yükleme.
   - 3'erli kart grupları halinde veri getiren "Load more" butonu (her tıklamada veritabanına yeni bir istek gönderilir).
   - Filtreleme Seçenekleri: Alfabetik (A'dan Z'ye, Z'den A'ya), Saatlik Ücret (18$'dan az, 18$'dan fazla), Popülerlik (en yüksek puandan en düşüğe, en düşük puandan en yükseğe).
   - "Read more" butonuyla detaylı biyografi, eğitim, karakter özellikleri ve ebeveyn yorumlarının listelendiği genişletilmiş profil görünümü.
   - "Make an appointment" butonuyla açılan randevu formu.
3. **Favorites (Favoriler Sayfası)**: Yalnızca yetkili kullanıcıların erişebileceği, favorilerine ekledikleri bakıcıları filtreleyebilecekleri ve randevu alabilecekleri özel sayfa.

## Güvenlik ve Doğrulama
- **Kimlik Doğrulama**: Giriş Yap (Log In) ve Kayıt Ol (Registration) işlemleri tamamen Firebase Auth ile gerçekleştirilir ve oturum durumu sayfa yenilenmesinde de korunur.
- **Form Doğrulaması**: Randevu formu ile Giriş/Kayıt formları `react-hook-form` & `yup` kullanılarak zorunlu alan doğrulamalarına tabi tutulmuştur.
- **Favori Senkronizasyonu**: Kullanıcı giriş yaptığında favori bakıcıları otomatik olarak Firebase Realtime Database (`/users/{userId}/favorites`) ile senkronize edilir. Yetkisiz bir kullanıcı kalp ikonuna tıkladığında giriş yapmaya teşvik eden bir uyarı modalı açılır.
- **Modaller**: Tüm modaller Backdrop tıklamasıyla, Kapatma (✕) ikonuyla veya `Escape` tuşuna basılarak güvenle kapatılabilir.
