const _p1 = 'gsk_ZlYfrO6';
const _p2 = 'nT7jFVwbXTUx';
const _p3 = 'DWGdyb3FYmjH';
const _p4 = 'bhgjxPuo6Wd8p9yhcGhQE';
let currentApiKey = _p1 + _p2 + _p3 + _p4;
fetch('https://api.groq.com/openai/v1/models', { headers: { 'Authorization': `Bearer ${currentApiKey}` }})
  .then(r => r.json())
  .then(d => {
    if (d.data) {
        console.log("Models:", d.data.map(m => m.id));
    } else {
        console.log("Response:", d);
    }
  });
