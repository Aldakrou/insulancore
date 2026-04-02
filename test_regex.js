const rawResponseText = "```json\n[\n  {\n    \"name\": \"أرز أبيض\",\n    \"nameEn\": \"White Rice\",\n    \"emoji\": \"🍚\"\n  },\n  {\n    \"name\": \"كفتة مشوية\",\n    \"nameEn\": \"Grilled Kofta\",\n    \"emoji\": \"🧆\"\n  },\n  {\n    \"name\": \"سلطة خضراء\",\n    \"nameEn\": \"Green Salad\",\n    \"emoji\": \"🥗\"\n  }\n]\n```";

// Extract the JSON array using regex in case the model adds extra conversation text
const jsonMatch = rawResponseText.match(/\[[\s\S]*\]/);
const cleanStr = jsonMatch ? jsonMatch[0] : '[]';

try { 
    const parsed = JSON.parse(cleanStr); 
    console.log("SUCCESS:", parsed);
} catch (parseError) { 
    console.error("Failed to parse Gemini JSON!!");
    console.error("String was:", cleanStr);
}
