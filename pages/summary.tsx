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

const useTypographyStyles = makeStyles(typographyStyles);

const pieData = {
  labels: ["Rent", "Food", "Dates", "Flowers", "Movies", "Medicine"],
  datasets: [
    {
      label: "Expenses",
      data: [12, 19, 3, 5, 2, 3],
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
};

const barData = {
  labels: [""],
  datasets: [
    {
      label: "Income",
      data: [6500],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Expenses",
      data: [2800],
      backgroundColor: "rgb(54, 162, 235)",
    },
  ],
};

export default function Summary() {
  const typographyClasses = useTypographyStyles();

  return (
    <div>
      <div className={typographyClasses.section}>
        <div className={typographyClasses.container}>
          <ProgressIndicator currentStep="Summary" />
          <GridContainer>
            <GridItem xs={3} sm={3} md={3}>
              <Bar
                data={barData}
                height={300}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      position: "top" as const,
                    },
                    title: {
                      display: true,
                      text: "Income vs Expenses",
                    },
                  },
                }}
              />
            </GridItem>

            <GridItem xs={3} sm={3} md={3}>
              <Pie options={{ maintainAspectRatio: true }} data={pieData} />
            </GridItem>
          </GridContainer>
        </div>
        <br />
        <br />
        <div className={typographyClasses.container}>
          <GridContainer>
            <GridItem>
              <Link href="/basics">
                <Button color="rose">Recommendations</Button>
              </Link>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
