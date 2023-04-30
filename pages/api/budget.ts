import retry from "async-retry";

const getBudget = async (name: String) => {
  const resBudget = await retry(
    async () => {
      const resBudgetRes = await fetch(
        `https://5cf1-66-81-178-197.ngrok-free.app/flow_units?name=${name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return resBudgetRes.json();
    },
    {
      retries: 5,
      minTimeout: 1000,
      maxTimeout: 5000,
    }
  );

  return resBudget;
};

export { getBudget };
