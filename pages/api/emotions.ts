export function getEmotions(name) {
  return fetch(
    `https://5cf1-66-81-178-197.ngrok-free.app/emotions_history?name=${name}`,
    {
      // Specify the headers to accept JSON
      headers: {
        Accept: "application/json",
      },
    }
  ).then((res) => res.json());
}

export default async function handler(req, res) {
  const { name } = req.query;

  if (req.method === "POST") {
    const { selectedEmotions } = req.body;

    console.log({ selectedEmotions });

    const newEmotions = Object.keys(selectedEmotions).filter(
      (emotion) => selectedEmotions[emotion]
    );
    console.log({ newEmotions });
    const resEmotion = await fetch(
      `https://5cf1-66-81-178-197.ngrok-free.app/emotions?name=${name}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmotions),
      }
    );

    res.status(200).json(resEmotion);
  } else {
    const emotionData = getEmotions(name);

    res.status(200).json(emotionData);
  }
}
