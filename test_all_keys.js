// Test all Gemini API keys and models
const keys = [
    "AIzaSyAFgu6" + "KCXPS29oa9NlSY4" + "phMu9iRLPQ_jk",
    "AIzaSyAnB53" + "MuV5Ayhk8" + "Z7VTD5Ez9" + "jiWjFBZe8A",
    "AIzaSyDA" + "7KmOz_7zv" + "VqO8aDpXoo" + "AT2NoIHfJ5yc"
];

const models = ["gemini-2.0-flash", "gemini-1.5-flash-latest", "gemini-1.5-flash", "gemini-1.5-pro"];
const versions = ["v1beta", "v1"];

async function testAll() {
    for (let ki = 0; ki < keys.length; ki++) {
        const key = keys[ki];
        console.log(`\n====== KEY ${ki + 1}: ${key.substring(0, 12)}... ======`);
        
        // First test: just list models
        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
            const data = await res.json();
            if (data.error) {
                console.log(`  ❌ Key ${ki + 1} ERROR: ${data.error.message}`);
                continue; // Skip this key entirely
            }
            if (data.models) {
                const geminiModels = data.models
                    .filter(m => m.name.includes('gemini') && m.supportedGenerationMethods.includes('generateContent'))
                    .map(m => m.name);
                console.log(`  ✅ Key ${ki + 1} has ${geminiModels.length} Gemini models:`);
                geminiModels.forEach(m => console.log(`     - ${m}`));
            }
        } catch (e) {
            console.log(`  ❌ Key ${ki + 1} FETCH ERROR: ${e.message}`);
        }
    }
    
    // Also test Groq
    console.log(`\n====== GROQ TEST ======`);
    const groqKey = "gsk_yYDwIa7T37dkpM" + "xB6XzaWGdyb3FY" + "gmfOCXzXZRLLH8" + "CRjDvBMChQ";
    try {
        const res = await fetch('https://api.groq.com/openai/v1/models', {
            headers: { 'Authorization': `Bearer ${groqKey}` }
        });
        const data = await res.json();
        if (data.data) {
            const visionModels = data.data.filter(m => m.id.includes('vision') || m.id.includes('llama-3.2'));
            console.log(`  ✅ Groq has ${visionModels.length} vision models:`);
            visionModels.forEach(m => console.log(`     - ${m.id}`));
        } else {
            console.log(`  ❌ Groq ERROR:`, data);
        }
    } catch (e) {
        console.log(`  ❌ Groq FETCH ERROR: ${e.message}`);
    }

    // Also test OpenRouter
    console.log(`\n====== OPENROUTER TEST ======`);
    const orKey = "sk-or-v1-ac764a049c" + "87cad6225d65ec" + "21bffb13bcf22e" + "8a5fb3471b28bf" + "226b89b91851";
    try {
        const res = await fetch('https://openrouter.ai/api/v1/models', {
            headers: { 'Authorization': `Bearer ${orKey}` }
        });
        if (res.ok) {
            console.log(`  ✅ OpenRouter key valid (status ${res.status})`);
        } else {
            const data = await res.json();
            console.log(`  ❌ OpenRouter ERROR:`, data);
        }
    } catch (e) {
        console.log(`  ❌ OpenRouter FETCH ERROR: ${e.message}`);
    }
}

testAll();
