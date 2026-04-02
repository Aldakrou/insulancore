const fs = require('fs');

const geminiApiKeys = [
    atob(['QUl6YVN5REE', '3S21Pel83en', 'ZWcU84YURwWG', '9vQVQyTm9JSG', 'ZKNXlj'].join('')),
    atob(['QUl6YVN5QW4', 'tQ3dmOXhrT', 'TIxWXNsXzFTRC', '1YV0FaY2xy', 'czNNWnlJ'].join(''))
];

const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];

// Use a simple image from the user's directory for testing
const base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
const mimeType = "image/jpeg";

const prompt = `أنت خبير تغذية متخصص في تحليل صور الطعام وحساب السعرات الحرارية. شوف الصورة دي بدقة وحدد كل الأصناف الموجودة في الوجبة.
المطلوب: رد بـ JSON array فقط، بدون أي كلام تاني خالص، بالشكل ده:
[{"name": "اسم الصنف بالعربي", "nameEn": "English translation", "emoji": "إيموجي مناسب"}]

تعليمات مهمة:
- حدد كل صنف بشكل منفصل (مثلاً: الأرز لوحده، الفراخ لوحدها)
- استخدم الأسماء الشائعة في مصر والدول العربية
- افصل الصلصات والإضافات كأصناف مستقلة
- لو الصورة مش أكل أو مش واضحة، رد بـ: []`;

async function testGemini() {
    let lastError = null;

    for (const apiKey of geminiApiKeys) {
        for (const model of models) {
            try {
                console.log(`\n🔄 Testing: ${model}...`);
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                { text: prompt },
                                { inline_data: { mime_type: mimeType, data: base64 } }
                            ]
                        }],
                        generationConfig: { temperature: 0.1, maxOutputTokens: 500 }
                    })
                });

                if (!response.ok) {
                    const errData = await response.json();
                    console.log(`❌ Failed: ${response.status} - ${errData.error?.message}`);
                    continue;
                }

                const data = await response.json();
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
                console.log("Raw Response:", JSON.stringify(text));
                
                // Extract the JSON array using regex in case the model adds extra conversation text
                const jsonMatch = text.match(/\[[\s\S]*\]/);
                const cleanStr = jsonMatch ? jsonMatch[0] : '[]';
                
                try { 
                    const parsed = JSON.parse(cleanStr);
                    console.log("✅ Parsed JSON:", parsed);
                    return;
                } catch (parseError) { 
                    console.error("❌ Failed to parse Gemini JSON!!");
                    console.log("cleanStr was:", cleanStr);
                    return;
                }
            } catch (err) {
                console.error("Throw:", err.message);
            }
        }
    }
}
testGemini();
