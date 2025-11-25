export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, source = "ru", target = "tt" } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const API_KEY = process.env.YANDEX_API_KEY;
  const FOLDER_ID = "aje0l57u7kmfd7n7jcsl"; // !!! обязательно подставить

  const yandexUrl = "https://translate.api.cloud.yandex.net/translate/v2/translate";

  const requestBody = {
    sourceLanguageCode: source,
    targetLanguageCode: target,
    texts: [text],
    folderId: FOLDER_ID,
  };

  const yandexResponse = await fetch(yandexUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  });

  const result = await yandexResponse.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(result);
}
