const key = 'AIzaSyDOYnFF65wiHU0kIhvvJOQ2V15AxQFsXZY';
fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`)
  .then(r => r.json())
  .then(d => {
    if (d.models) {
        console.log('Gemini Models:', d.models.map(m => m.name));
    } else {
        console.log('Error:', d);
    }
  });
