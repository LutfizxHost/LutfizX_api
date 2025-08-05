const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const { tipe = 'serbaguna', text } = req.query;
  if (!text) return res.json({ status: false, message: 'Teks kosong!' });

  const system = {
    cowok: 'Kamu cowok ganteng dan humoris.',
    cewek: 'Kamu cewek manja dan imut.',
    serbaguna: 'Kamu asisten AI pintar dan sopan.'
  };

  try {
    const hasil = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "mistral/mistral-7b-instruct",
      messages: [
        { role: "system", content: system[tipe] },
        { role: "user", content: text }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ status: true, response: hasil.data.choices[0].message.content });
  } catch (e) {
    res.json({ status: false, message: e.message });
  }
});

module.exports = router;