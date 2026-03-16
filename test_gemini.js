const currentApiKey = 'AIzaSyDOYnFF65wiHU0kIhvvJOQ2V15AxQFsXZY';
const model = 'gemini-1.5-flash';

const base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
const mimeType = "image/png";

async function testGemini() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${currentApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: "What is this? Reply []" },
                        { inline_data: { mime_type: mimeType, data: base64 } }
                    ]
                }]
            })
        });
        
        const data = await response.json();
        console.log(data);
    } catch (e) {
        console.error(e);
    }
}
testGemini();
