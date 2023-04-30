import retry from "async-retry";

const getRecommendations = async (name: String) => {
  const response = await retry(
    async () => {
      const preJson = await fetch(
        `https://5cf1-66-81-178-197.ngrok-free.app/recommendations?name=${name}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      console.log({ preJson });
      return preJson.json();
    },
    {
      retries: 5,
      minTimeout: 1000,
      maxTimeout: 5000,
    }
  );

  return response;
};

export { getRecommendations };

export default async function handler(req, res) {
  const { name } = req.cookies;
  const recommendations = await getRecommendations(name);
  res.status(200).json(recommendations);
}
