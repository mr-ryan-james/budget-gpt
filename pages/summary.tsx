import React from "react";
import Link from "next/link";
import Button from "../components/CustomButtons/Button";
import { Bar, Pie } from "react-chartjs-2";

import ProgressIndicator from "../components/ProgressIndicator/ProgressIndicator";

// nodejs library that concatenates classes
// react components for routing our app without refresh
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
// sections for this page

import typographyStyles from "../styles/jss/nextjs-material-kit/pages/componentsSections/typographyStyle";
import { getBudget } from "./api/budget";
import { useQuery } from "@tanstack/react-query";

const useTypographyStyles = makeStyles(typographyStyles);

const getPieData = (expenses) => ({
  labels: expenses.map((item) => item.category),
  datasets: [
    {
      label: "Expenses",
      data: expenses.map((item) => item.amount),
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
});

const getBarData = (income, expense) => ({
  labels: [""],
  datasets: [
    {
      label: "Income",
      data: [income],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Expenses",
      data: [expense],
      backgroundColor: "rgb(54, 162, 235)",
    },
  ],
});

export async function getServerSideProps(context) {
  const name = context.req.cookies.name;

  const budgetData = await getBudget(name);

  const expenses = budgetData.filter((item) => item.is_expense);
  const incomes = budgetData.filter((item) => !item.is_expense);
  const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);
  const income = incomes.reduce((acc, item) => acc + item.amount, 0);

  console.log({ budgetData });

  return {
    props: { expenses, income: income, totalExpense }, // will be passed to the page component as props
  };
}

export default function Summary({ expenses, income, totalExpense }) {
  const typographyClasses = useTypographyStyles();

  const { data: wellnessHistory, error: wellnessHistoryerror } = useQuery({
    queryKey: ["wellness"],
    queryFn: () => {
      return fetch(`/api/wellness`).then((res) => res.json());
    },
  });

  console.log({
    expenses,
    income,
    totalExpense,
    wellnessHistory,
  });

  return (
    <div>
      <div className={typographyClasses.section}>
        <div className={typographyClasses.container}>
          <ProgressIndicator currentStepName="Summary" />
          <GridContainer>
            <GridItem xs={3} sm={6} md={6}>
              <Bar
                data={getBarData(income, totalExpense)}
                height={400}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  scales: {
                    y: {
                      max: Math.max(income, totalExpense) * 1.2,
                    },
                  },
                  plugins: {
                    legend: {
                      position: "top" as const,
                    },
                    title: {
                      display: true,
                      text: "Income vs Expenses",
                    },
                    tooltip: {
                      borderColor: "white",
                      borderWidth: 3,
                      padding: 6,
                    },
                  },
                }}
              />
            </GridItem>

            <GridItem xs={4} sm={6} md={6}>
              <Pie
                height={500}
                options={{
                  maintainAspectRatio: true,
                  plugins: {
                    tooltip: {
                      borderColor: "white",
                      borderWidth: 3,
                      padding: 6,
                    },
                  },
                }}
                data={getPieData(expenses)}
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={4} sm={6} md={6}>
              <h3>Wellness Score</h3>
              <h4>{wellnessHistory?.[0]?.explanation}</h4>
              <div
                style={{
                  width: 400,
                  height: 400,
                  borderRadius: "50%",
                  backgroundColor:
                    "#" + Math.floor(Math.random() * 16777215).toString(16),
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  opacity: 0.5,
                }}
              >
                <span
                  style={{
                    fontSize: 100,
                    color: "black",
                  }}
                >
                  {wellnessHistory?.[0]?.wellness_score}
                </span>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        <br />
        <br />
        <div className={typographyClasses.container}>
          <GridContainer>
            <GridItem>
              <Link href="/recommendations">
                <Button color="facebook">Recommendations</Button>
              </Link>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
