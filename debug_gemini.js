const apiKey = "AIzaSyAn-Cwf9xkM21Ysl_1SD-XWAZclrs3MZyI";
const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];

async function test() {
    const base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
    const body = {
        contents: [{
            parts: [
                { text: "أنت خبير تغذية متخصص في تحليل صور الطعام. رد بـ JSON array" },
                { inline_data: { mime_type: "image/png", data: base64 } }
            ]
        }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 500 }
    };

    for (const model of models) {
        console.log(`Testing ${model}...`);
        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            console.log("Status:", res.status);
            const text = await res.text();
            console.log("Response:", text);
        } catch (e) {
            console.error("Fetch Error:", e);
        }
    }
}
test();
