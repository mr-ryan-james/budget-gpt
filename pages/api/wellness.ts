import retry from "async-retry";

const getWellness = async (name: String) => {
  const resWelness = await retry(
    async () => {
      const resWelnessRes = await fetch(
        `https://5cf1-66-81-178-197.ngrok-free.app/wellness_history?name=${name}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      console.log({ resWelnessRes });
      return resWelnessRes.json();
    },
    {
      retries: 5,
      minTimeout: 1000,
      maxTimeout: 5000,
    }
  );

  return resWelness;
};

export { getWellness };

export default async function handler(req, res) {
  const { name } = req.cookies;
  const wellness = await getWellness(name);
  res.status(200).json(wellness);
}
