# 🚀 InsulanCore: Project Transfer Context
**Author: Antigravity AI**
**Status: Final Stabilization & Professional Report Completed**

هذا المستند يوفر ملخصاً شاملاً لمشروع **InsulanCore** من البداية وحتى اللحظة، لنقل العمل إلى موديل آخر أو مطور آخر. يغطي المعمارية والمنطق البرمجي وفلسفة التصميم.

---

## 1. نظرة عامة على المشروع (Project Overview)
**InsulanCore** هي منصة صحية ذكية مخصصة لمرضى السكري (النوع 1 و 2)، مقاومة الأنسولين، أو الراغبين في إدارة أوزانهم بحرفية.

### القيمة المضافة الرئيسية (Key Features):
*   **تصوير الوجبات (Meal Scanner)**: يستخدم نظام "أوركسترا" للذكاء الاصطناعي (Gemini, Groq, OpenRouter, HuggingFace) للتعرف على الطعام وحساب السعرات، الكربوهيدرات، الألياف، والبروتين.
*   **التحليلات الذكية (Health Analytics)**: تحويل قياسات السكر والوزن إلى رسوم بيانية (Chart.js) مع استخراج "Insights" آلية باستخدام الذكاء الاصطناعي.
*   **نظام التشغيل المرن (Multi-Provider Failover)**: نظام ذكي للربط مع مزودين متعددين لضمان استمرارية الخدمة في حال تعطل أحد المفاتيح.
*   **تقرير طبي احترافي**: إمكانية تحويل لوحة البيانات إلى تقرير PDF طبي بلمسة واحدة.

---

## 2. التقنيات المستخدمة (Technology Stack)
تم بناء التطبيق باستخدام تقنيات الويب الأساسية (Vanilla Web) لضمان السرعة القصوى وسهولة الصيانة:
- **HTML5**: لتقسيم التبويبات والمكونات.
- **CSS3 (Custom)**: نظام تصميم "Pitch Black & Gold" الفاخر، مع استخدام Glassmorphism و Micro-animations.
- **Javascript (ES6+)**: للتحكم في المنطق، الربط مع الـ APIs، وإدارة البيانات محلياً.
- **Chart.js**: لتمثيل البيانات الصحية بصرياً.
- **PWA**: دعم العمل في وضع عدم الاتصال (Offline) وتثبيت التطبيق على الموبايل.

---

## 3. الوحدات البرمجية الرئيسية (Core Modules)

### أ. نظام التشغيل المتعدد (AI Orchestration)
في ملف `script.js` يوجد نظام `callAIUniversal`:
- **التشغيل الآلي (Failover)**: يجرب الترتيب Gemini → Groq → OpenRouter → HuggingFace. إذا فشل أحدهم، ينتقل للآخر تلقائياً.
- **إدارة المفاتيح**: يحفظ المفاتيح في `localStorage` مشفرة/مخفية (Obfuscated) وتظهر في تبويب الإعدادات لإدارتها.

### ب. نظام الترجمة (I18n System)
استخدمنا نظاماً يعتمد على صفات `data-ar` و `data-en`:
- يعمل عبر دالة `applyLanguage()` التي تقوم بتبديل النصوص وتغيير اتجاه الصفحة (RTL/LTR) وحفظ اللغة المختارة للمرة القادمة.

### ج. التحليلات الموحدة (Unified Analytics)
- تم دمج كافة مكونات التحليلات في لوحة واحدة شاملة للمؤشرات الصحية، مع دمج نظام استخراج الانطباعات الذكية (Trends Inside).

### د. التصميم الطبي للطباعة (Print Styles)
- إضافة `@media print` في `style.css` لتحويل الشاشة إلى مستند طبي أبيض وأسود نظيف عند الطباعة، مع إخفاء الأزرار والقوائم للحفاظ على الرسمية.

---

## 4. خريطة الملفات (File Map)
1.  [`index.html`](file:///d:/insulancore/index.html): الهيكل، التبويبات (Profile, Scanner, Plan, Analytics, Settings).
2.  [`style.css`](file:///d:/insulancore/style.css): التصميم الفاخر، الألوان (`#0a0a0a` و `#d4af37`) وقواعد الطباعة.
3.  [`script.js`](file:///d:/insulancore/script.js): العصب المحرك؛ نظام الـ AI، حساب السعرات (Edamam)، الرسوم البيانية، والترجمة.
4.  [`sw.js`](file:///d:/insulancore/sw.js): لضمان عمل التطبيق بدون نت (PWA).

---

## 5. أكواد حيوية (Key Logic Snippets)

### دالة الترجمة الذكية
```javascript
function applyLanguage() {
    const lang = currentLang;
    document.documentElement.dir = (lang === 'ar' ? 'rtl' : 'ltr');
    document.querySelectorAll('[data-ar][data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
}
```

### نظام الـ Failover (الجوهر)
```javascript
// يحاول ترتيبياً بين المزودين المتاحين في AI_CONFIG
async function callAIUniversal(base64, mimeType) {
    const providers = ['gemini', 'groq', 'openrouter', 'huggingface'];
    // ... logic to try each until success
}
```

---

## 6. الحالة الحالية للمشروع (Final State)
- [x] تم توحيد واجهة التحليلات.
- [x] تم تفعيل نظام حفظ المفاتيح من الإعدادات.
- [x] تم إضافة ميزة التقرير الطبي للطباعة.
- [x] تم تحسين استجابة الواجهة على الموبايل.

---
*تم إنشاء هذا المستند بواسطة Antigravity AI لتسهيل نقل السياق. المشروع جاهز للمرحلة القادمة من التطوير.*
