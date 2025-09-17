import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = "my_sih_token"; // choose anything you like
const WHATSAPP_TOKEN = "EAAKo0P7ZBTwQBPQGkPXjrXb7IiNrXYZA7WNpak9HAlQmcHEJZAeue0ee1dsXYyxPWdhWqZA1vdZCTw7Ubr6Wb6sTa9gVOeyvta2OZBN4fqBeytIVMqU4lZChg907VMd6SjjZCs2F9hLyM6SKzJ3LQkhpv4hDStO0sTlbi5d5qtqoGgx49Bi2dB3AwaGUR3VHwM7Ugtv6O5x53DheFBb1X6EHHXprGBICTgqyJXdOZBVZCrAECmZAUTI0cc6Tml4yzedgAZDZD"; // from Meta Developer Portal
const PHONE_NUMBER_ID = "772278932639758"; // from Meta Developer Portal

// ✅ Webhook Verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("Webhook Verified!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ✅ Incoming Messages
app.post("/webhook", async (req, res) => {
  console.log("Incoming:", JSON.stringify(req.body, null, 2));
  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

  if (message?.text) {
    const from = message.from;
    const text = message.text.body;

    // Auto Reply
    await fetch(`https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: from,
        text: { body: `You said: ${text}` },
      }),
    });
  }

  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
