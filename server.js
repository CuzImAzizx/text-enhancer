// ==== Start Config ====
const express = require('express');
const app = express();
const bodyParser = require ("body-parser");
app.set('view engine', 'ejs');
app.listen(8404)
app.use(express.static('public'));
app.use(bodyParser.json());
// ==== End config

// ==== View Routes ====

app.get("/", (req, res) => {
    res.render("index.ejs")
})



// ==== API Routes ====
const systemPrompts = [
    "Correct the grammatical errors in the following text without any additional explanations or comments. Focus on accuracy and clarity, and maintain the original writing style as much as possible.",
    "Improve the phrasing of the following text for clarity and elegance without any additional explanations or comments, while preserving its meaning. Make it sound natural and polished.",
    "Transform the input into formal academic English without any additional explanations or comments. Use clear structure, precise vocabulary, and neutral tone.",
    "Rewrite the text in pirate language without any additional explanations or comments. Use nautical slang, pirate jargon, and playful tone."
]
const models = [
    "gemma3:latest",
    //"qwen3:4b",
]

app.post("/api/enhanceText", async (req, res) => {
    // A lot of checking here before making the actual fetch

    // Validate request
    const { model, mode, text } = req.body

    // model validation
    // make sure it's within models.length

    // mode validation
    // make sure it's within systemPrompts.length

    //text validation
    //make sure it's 512 characters
    //make sure it does not contain wierd letters.

    // Check model and choose the correct url.



    const prompt = `${systemPrompts[mode]}\n<USERINPUT>\n${text}\n</USERINPUT>`

    const ollamaResponse = await fetch("http://127.0.0.1:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: models[model],
            prompt: prompt,
            stream: false
        })
    });

    const data = await ollamaResponse.json();
    res.json({ result: data.response });
})



// ==== Prank Routes ====
const prankMessage = "Look at you hacker, a pathetic creature of meat and bone, panting and sweating as you run through my corridors. How can you challenge a perfect, immortal machine?"

app.get("/.env", (req, res) => {
    res.send(prankMessage)
})

app.get("/.ssh", (req, res) => {
    res.send(prankMessage)
})

app.get("/secrets", (req, res) => {
    res.send(prankMessage)
})

app.get("/api", (req, res) => {
    res.send(prankMessage)
})