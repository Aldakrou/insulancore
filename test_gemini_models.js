const key = 'AIzaSyDPQT58XRBGbL5BfA5Ggq60Uwpgua1d0gM';
fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`)
  .then(r => r.json())
  .then(d => {
    if (d.models) {
        console.log('Available Models:');
        d.models.forEach(m => {
            if (m.supportedGenerationMethods.includes('generateContent') && m.name.includes('gemini')) {
                console.log(m.name);
            }
        });
    } else {
        console.log('Error:', d);
    }
  });
