const geminiApiKeys = [
    atob(['QUl6YVN5REE', '3S21Pel83en', 'ZWcU84YURwWG', '9vQVQyTm9JSG', 'ZKNXlj'].join('')),
    atob(['QUl6YVN5QW4', 'tQ3dmOXhrT', 'TIxWXNsXzFTRC', '1YV0FaY2xy', 'czNNWnlJ'].join(''))
];

const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
const base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
const mimeType = "image/png";

async function testApi() {
    let lastError = null;

    for (const apiKey of geminiApiKeys) {
        console.log(`\n🔑 Testing new Key Loop: ${apiKey.substring(0, 10)}...`);
        for (const model of models) {
            try {
                console.log(`🔄 Testing Model: ${model}`);
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                { text: "Hello" },
                                { inline_data: { mime_type: mimeType, data: base64 } }
                            ]
                        }]
                    })
                });

                if (!response.ok) {
                    const errData = await response.json();
                    const errMsg = errData.error?.message || '';
                    console.error(`❌ HTTP ${response.status}: ${errMsg}`);
                    
                    if (response.status === 429 || errMsg.includes('Quota') || errMsg.includes('rate-limit')) {
                        lastError = `الحصة انتهت للموديل: ${model}`;
                        console.warn(lastError);
                        continue;
                    }
                    if (response.status === 404) {
                        lastError = `الموديل غير متاح: ${model}`;
                        console.warn(lastError);
                        continue;
                    }
                    if (response.status === 403 || errMsg.includes('leaked')) {
                        lastError = `المفتاح موقوف أو مسرب`;
                        console.warn(lastError);
                        break; 
                    }
                    lastError = errMsg || 'خطأ غير معروف في الموديل: ' + model;
                    console.warn(lastError);
                    continue; 
                }

                const data = await response.json();
                console.log("✅ Success! Responses:", data.candidates[0].content.parts[0].text);
                return;
            } catch (err) {
                console.error("Caught error:", err.message);
                lastError = err.message;
            }
        }
    }
    console.log("❌ All Keys/Models Exhausted. Last Error:", lastError);
}
testApi();
