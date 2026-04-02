const geminiApiKeys = [
    "AIzaSyAn-Cwf9xkM21Ysl_1SD-XWAZclrs3MZyI", // Leaked
    "AIzaSyDA7KmOz_7zvVqO8aDpXooAT2NoIHfJ5yc", // Quota exhausted
    "AIzaSyDOYnFF65wiHU0kIhvvJOQ2V15AxQFsXZY", // Found 1
    "AIzaSyDPQT58XRBGbL5BfA5Ggq60Uwpgua1d0gM"  // Found 2
];

const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-2.5-flash'];
const base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="; // Dummy small image block
const mimeType = "image/png";

const prompt = `أنت خبير تغذية متخصص في تحليل صور الوجبات المصرية والعربية.
حتى لو الصورة جودتها ضعيفة أو الأكل شكله غريب، ابذل أقصى جهدك للتعرف عليه (مثل: سمك مقلي، أرز، سلطة خضراء).
المطلوب: رد بـ JSON array فقط، بدون أي كلام إضافي، بالشكل ده:
[{"name": "سمك مقلي", "nameEn": "Fried Fish", "emoji": "🐟"}]

تعليمات هامة:
- لا ترد أبداً بقائمة فارغة [] إلا إذا كانت الصورة لا تحتوي على أي شيء يؤكل تماماً (مثلاً صورة سيارة أو كرسي).
- إذا كنت غير متأكد تماماً، خمن أقرب أكلة بناءً على اللون والشكل.
- افصل الأصناف (أرز، سمك، سلطة) في عناصر منفصلة.`;

async function testPrompt() {
    let lastError = null;

    for (const apiKey of geminiApiKeys) {
        for (const model of models) {
            try {
                console.log(`\n🔄 Testing Prompt on Model: ${model}`);
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                { text: prompt },
                                { inline_data: { mime_type: mimeType, data: base64 } }
                            ]
                        }]
                    })
                });

                if (!response.ok) {
                    const errStr = await response.text();
                    console.log(`❌ Failed ${model}: HTTP ${response.status}`, errStr);
                    continue; 
                }

                const data = await response.json();
                console.log("✅ Response:", data.candidates[0].content.parts[0].text);
                return;
            } catch (err) {
                console.error("Caught error:", err.message);
            }
        }
    }
}
testPrompt();
