const express = require("express");
const axios = require("axios");
const aiRouter = express.Router();

aiRouter.get('/search', async (req, res) => {
    try {
        const { category } = req.query;

        const search = [
            { name: 'Healthy Recipe Blog', category: 'food' },
            { name: 'Smoothie Recipes', category: 'food' },
            { name: 'Home Workout App', category: 'fitness' },
            { name: '30-Day Fitness Challenge', category: 'fitness' },
            { name: 'DIY Craft Channel', category: 'diy' },
            { name: 'DIY Home Decor', category: 'diy' },
            { name: 'Study With Me Pomodoro Videos', category: 'study' },
            { name: 'Focus Music Playlist', category: 'study' },
        ].filter(rec => rec.category === category);

        if (search.length === 0) {
            return res.status(404).send({ message: "No search found" });
        }

        res.status(200).send(search);

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Something went wrong" });
    }
});

// --- AI Chat Route ---
aiRouter.post('/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'deepseek/deepseek-r1-0528:free',
                messages,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                },
            }
        );
        // Extract the actual message content
        const reply = response.data.choices && response.data.choices[0]?.message?.content
            ? response.data.choices[0].message.content
            : "Sorry, I couldn't generate a response.";
        console.log('OpenRouter reply:', reply); // Log the actual reply
        res.json({ reply });
    } catch (error) {
        console.error('OpenRouter API error:', error?.response?.data || error.message);
        res.status(500).json({ error: 'AI service error' });
    }
});
module.exports = aiRouter;