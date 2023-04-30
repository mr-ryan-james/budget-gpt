import retry from "async-retry";

export function getEmotions(name) {
  return retry(
    async () => {
      const fetchResponse = await fetch(
        `https://5cf1-66-81-178-197.ngrok-free.app/emotions_history?name=${name}`,
        {
          // Specify the headers to accept JSON
          headers: {
            Accept: "application/json",
          },
        }
      );

      return fetchResponse.json();
    },
    {
      retries: 5,
      minTimeout: 250,
      maxTimeout: 5000,
    }
  );
}

export default async function handler(req, res) {
  const { name } = req.cookies;

  if (req.method === "POST") {
    const { selectedEmotions } = req.body;

    console.log({ selectedEmotions });

    const newEmotions = Object.keys(selectedEmotions).filter(
      (emotion) => selectedEmotions[emotion]
    );
    console.log({ newEmotions });
    const resEmotion = await retry(
      async () => {
        const resEmotionRes = await fetch(
          `https://5cf1-66-81-178-197.ngrok-free.app/emotions?name=${name}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmotions),
          }
        );
        return resEmotionRes.json();
      },
      {
        retries: 5,
        minTimeout: 1000,
        maxTimeout: 5000,
      }
    );

    res.status(200).json(resEmotion);
  } else {
    const emotionData = getEmotions(name);

    res.status(200).json(emotionData);
  }
}
