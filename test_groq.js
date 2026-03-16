const _p1 = 'gsk_ZlYfrO6';
const _p2 = 'nT7jFVwbXTUx';
const _p3 = 'DWGdyb3FYmjH';
const _p4 = 'bhgjxPuo6Wd8p9yhcGhQE';
let currentApiKey = _p1 + _p2 + _p3 + _p4;

async function testGroq() {
    const models = [
        'llama-3.2-11b-vision-preview',
        'llama-3.2-90b-vision-preview'
    ];
    
    // Transparent 1x1 pixel image in base64
    const base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    const mimeType = "image/png";
    const imageUrl = `data:${mimeType};base64,${base64}`;
    const prompt = 'What is in this image? Reply with a JSON array like: [{"name": "foodname", "emoji": "🍔"}]. If unclear, reply [].';

    for (const model of models) {
        try {
            console.log(`Testing model: ${model}`);
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentApiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: "user",
                            content: [
                                { type: "text", text: prompt },
                                { type: "image_url", image_url: { url: imageUrl } }
                            ]
                        }
                    ],
                    temperature: 0.1,
                    max_tokens: 1024
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                console.error(`Error with ${model}:`, errData);
                continue;
            }

            const data = await response.json();
            const text = data.choices[0]?.message?.content || '[]';
            console.log(`Success with ${model}:`, text);
            return;
        } catch(err) {
            console.error(err);
        }
    }
}

testGroq();
