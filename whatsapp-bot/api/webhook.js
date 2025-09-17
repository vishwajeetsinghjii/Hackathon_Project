const axios = require('axios');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const VERIFY_TOKEN = 'YOUR_VERIFY_TOKEN';
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else if (req.method === 'POST') {
    const body = req.body;

    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0].value.messages
    ) {
      const from = body.entry[0].changes[0].value.messages[0].from;
      const text = "Hello! This is a reply from your bot.";

      await axios.post(
        `https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages`,
        {
          messaging_product: "whatsapp",
          to: from,
          text: { body: text }
        },
        { headers: { Authorization: `Bearer YOUR_ACCESS_TOKEN` } }
      );
    }

    res.status(200).send("EVENT_RECEIVED");
  }
}
