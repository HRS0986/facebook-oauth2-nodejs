const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.post('/get-fb-access',async (req, res) => {
    const { accessToken, userID } = req.body;

    const response = await fetch(
        `https://graph.facebook.com/v9.0/me?access_token=${accessToken}&method=post&pretty=0&sdk=joey&suppress_http_code=1`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: 'name, id, email' })
        }

        );
    const json = await response.json();

    if (userID == json.id) {
        return res.status(500).json({ status: true, data: json });
    } else {
        return res.status(500).json({ status: false });
    }
})

module.exports = router;