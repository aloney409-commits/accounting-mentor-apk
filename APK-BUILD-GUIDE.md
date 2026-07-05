# 📱 دليل بناء APK على ويندوز 10 — خطوة بخطوة

هذا الدليل يشرح كيفية تحويل مشروع **مساعد المحاسبة** (Next.js) إلى ملف APK قابل للتثبيت على أجهزة Android.

---

## 📋 المتطلبات الأساسية

| الأداة | الإصدار المطلوب | رابط التنزيل |
| --- | --- | --- |
| **Node.js** | 18 LTS أو 20 LTS | https://nodejs.org/en/download/ |
| **JDK (Java)** | 17 (Adoptium Temurin) | https://adoptium.net/temurin/releases/?version=17 |
| **Android Studio** | أحدث نسخة | https://developer.android.com/studio |
| **Git** (اختياري) | أي إصدار حديث | https://git-scm.com/download/win |

---

## 1️⃣ تثبيت Node.js

1. حمّل مثبّت Node.js 20 LTS من [nodejs.org](https://nodejs.org/en/download/).
2. شغّل المثبّت (تأكد من تفعيل خيار "Add to PATH").
3. تحقق من التثبيت في PowerShell أو CMD:
   ```powershell
   node --version    # يجب أن يظهر v20.x أو v18.x
   npm --version
   ```

---

## 2️⃣ تثبيت JDK 17

Capacitor 6 يحتاج **JDK 17** بالتحديد (ليس 8 أو 11 أو 21).

1. حمّل **Eclipse Temurin JDK 17** من [adoptium.net](https://adoptium.net/temurin/releases/?version=17) — اختر Windows x64 MSI.
2. أثناء التثبيت **فعّل جميع خيارات** "Set JAVA_HOME" و "Add to PATH".
3. تحقق:
   ```powershell
   java -version
   # يجب أن يظهر: openjdk version "17.0.x"
   echo $env:JAVA_HOME
   ```

> إذا لم يظهر `JAVA_HOME`، أضفه يدوياً:
> ابدأ ⟵ Environment Variables ⟵ New System Variable
> - Name: `JAVA_HOME`
> - Value: `C:\Program Files\Eclipse Adoptium\jdk-17.0.x-hotspot`

---

## 3️⃣ تثبيت Android Studio

1. حمّل Android Studio من [developer.android.com](https://developer.android.com/studio).
2. شغّل المثبّت واختر **Standard installation** — سيُثبّت Android SDK تلقائياً.
3. بعد التثبيت افتح Android Studio ⟵ More Actions ⟵ **SDK Manager**.
4. تأكد من تثبيت:
   - ✅ **Android SDK Platform 34** (API Level 34)
   - ✅ **Android SDK Build-Tools 34.0.0**
   - ✅ **Android SDK Platform-Tools**
   - ✅ **Android SDK Command-line Tools (latest)**

5. أضف متغيرات البيئة التالية (Environment Variables ⟵ System variables ⟵ New):

   | Name | Value (مثال) |
   | --- | --- |
   | `ANDROID_HOME` | `C:\Users\<اسم المستخدم>\AppData\Local\Android\Sdk` |
   | `ANDROID_SDK_ROOT` | نفس القيمة السابقة |

6. أضف إلى `Path`:
   ```
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\cmdline-tools\latest\bin
   %ANDROID_HOME%\emulator
   ```

7. تحقق (افتح **PowerShell جديدة** بعد تعديل المتغيرات):
   ```powershell
   adb --version
   ```

---

## 4️⃣ تجهيز المشروع

فكّ ضغط مجلد `accounting-mentor` في المكان الذي تريده (مثلاً `C:\projects\accounting-mentor`).

افتح PowerShell وانتقل إلى المجلد:

```powershell
cd C:\projects\accounting-mentor
```

ثبّت الاعتماديات:

```powershell
npm install
```

> ⏳ قد تستغرق هذه الخطوة **3-5 دقائق** في المرة الأولى.

**اختبار سريع في المتصفح** (اختياري):
```powershell
npm run dev
```
ثم افتح http://localhost:3000 وتأكد أن التطبيق يعمل. أوقف السيرفر بـ Ctrl+C.

---

## 5️⃣ بناء المشروع كملفات ثابتة

```powershell
npm run build
```

سيتم إنشاء مجلد `out/` يحتوي على HTML/CSS/JS جاهزة.

---

## 6️⃣ إضافة منصة أندرويد

**لأول مرة فقط**:

```powershell
npx cap add android
```

سيتم إنشاء مجلد `android/` يحتوي على مشروع Android Studio كامل.

---

## 7️⃣ مزامنة الملفات

في كل مرة تعدّل الكود، شغّل:

```powershell
npm run build
npx cap sync android
```

أو الأمر المختصر (موجود في `package.json`):

```powershell
npm run cap:sync
```

---

## 8️⃣ بناء APK للاختبار (Debug)

### الطريقة (أ) — عبر سطر الأوامر (الأسرع)

```powershell
cd android
.\gradlew.bat assembleDebug
```

> ⏳ أول مرة تستغرق **5-15 دقيقة** لأن Gradle يُنزّل الاعتماديات. المرات التالية أسرع بكثير.

بعد نجاح البناء ستجد APK في:

```
android\app\build\outputs\apk\debug\app-debug.apk
```

### الطريقة (ب) — عبر Android Studio (الأسهل بصرياً)

```powershell
npx cap open android
```

سيفتح Android Studio مع المشروع. انتظر حتى ينتهي **Gradle Sync**، ثم:

- **Build ⟵ Build Bundle(s) / APK(s) ⟵ Build APK(s)**
- ستجد رابط "locate" في تنبيه أسفل يمين النافذة يقودك إلى ملف APK.

---

## 9️⃣ تثبيت APK على جهازك

### أ) عبر USB

1. فعّل **خيارات المطور** على هاتفك: الإعدادات ⟵ حول الجهاز ⟵ اضغط "رقم الإصدار" 7 مرات.
2. الإعدادات ⟵ خيارات المطور ⟵ فعّل **USB Debugging**.
3. وصّل الهاتف بالكمبيوتر، ووافق على طلب الترخيص.
4. تحقق أن adb يرى الجهاز:
   ```powershell
   adb devices
   ```
5. ثبّت APK:
   ```powershell
   adb install android\app\build\outputs\apk\debug\app-debug.apk
   ```

### ب) بدون USB

1. انسخ ملف `app-debug.apk` إلى هاتفك (Google Drive / بلوتوث / USB).
2. من ملفات الهاتف افتح الملف واسمح بـ "التثبيت من مصادر غير معروفة".

---

## 🔟 بناء نسخة الإصدار الموقّعة (Release APK)

نسخة الديباغ لا تصلح للنشر (كبيرة الحجم وغير موقّعة بمفتاح إنتاجي). للحصول على نسخة إصدار:

### أ) توليد keystore

```powershell
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias accounting-mentor
```

سيسألك عن كلمة مرور وبعض المعلومات — احفظ الكلمة جيداً.

### ب) إعداد signing config

أنشئ ملف `android\keystore.properties`:

```properties
storeFile=C:/path/to/my-release-key.jks
storePassword=YOUR_PASSWORD
keyAlias=accounting-mentor
keyPassword=YOUR_PASSWORD
```

عدّل `android\app\build.gradle`:

```gradle
// أعلى الملف
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    ...
    signingConfigs {
        release {
            if (keystorePropertiesFile.exists()) {
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
                storeFile file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### ج) بناء نسخة الإصدار

```powershell
cd android
.\gradlew.bat assembleRelease
```

النتيجة:
```
android\app\build\outputs\apk\release\app-release.apk
```

---

## 🐛 استكشاف الأخطاء

| المشكلة | الحل |
| --- | --- |
| `SDK location not found` | تأكد من ضبط `ANDROID_HOME` أو أنشئ ملف `android\local.properties` بمحتوى: `sdk.dir=C:\\Users\\<اسم>\\AppData\\Local\\Android\\Sdk` |
| `JAVA_HOME is not set` | راجع الخطوة 2 — يجب أن يشير إلى JDK 17 |
| Gradle يتوقف عند التنزيل | جرّب VPN أو انتظر — Gradle ينزّل ~400 MB أول مرة |
| `error: cannot find symbol` في Gradle | امسح `android\build` و `android\.gradle` ثم أعد المحاولة |
| التطبيق يفتح على شاشة بيضاء | تأكد أنك شغّلت `npm run build` قبل `npx cap sync` |
| خطأ CORS أو موارد لا تحمّل | تأكد أن `output: 'export'` مفعّل في `next.config.js` |

---

## 📦 السكربتات الجاهزة في `package.json`

| السكربت | الوصف |
| --- | --- |
| `npm run dev` | تشغيل خادم التطوير |
| `npm run build` | بناء المشروع للإنتاج (يولّد `out/`) |
| `npm run cap:add:android` | إضافة منصة أندرويد (لأول مرة) |
| `npm run cap:sync` | بناء + مزامنة مع أندرويد |
| `npm run cap:open:android` | فتح Android Studio |
| `npm run android:build` | بناء + مزامنة + APK ديباغ |
| `npm run android:build:release` | بناء + مزامنة + APK إصدار |

---

## ✅ الخلاصة

للحصول على APK للاختبار سريعاً على ويندوز 10:

```powershell
# مرة واحدة فقط
npm install
npx cap add android

# كل مرة تريد بناء APK
npm run android:build
```

APK الناتج:
```
android\app\build\outputs\apk\debug\app-debug.apk
```

🎉 مبروك! صار عندك تطبيقك المحاسبي جاهزاً على أندرويد.
