import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
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
import { getAboutMe } from "./api/aboutMe";
import { getRecommendations } from "./api/recommendations";
import { getWellness } from "./api/wellness";

const useTypographyStyles = makeStyles(typographyStyles);

export async function getServerSideProps(context) {
  const name = context.req.cookies.name;

  const aboutMe = await getAboutMe(name);
  const recommendations = await getRecommendations(name);
  const wellnessHistory = await getWellness(name);

  return {
    props: { aboutMe, recommendations, wellnessHistory }, // will be passed to the page component as props
  };
}

export default function Basics({ aboutMe, recommendations, wellnessHistory }) {
  const typographyClasses = useTypographyStyles();

  console.log({ aboutMe, recommendations, wellnessHistory });

  const data = {
    labels: wellnessHistory.reverse().map((wellness) => wellness.date),
    datasets: [
      {
        label: "Wellness",
        data: wellnessHistory.map((wellness) =>
          wellness.wellness_score <= 1
            ? wellness.wellness_score * 10
            : wellness.wellness_score
        ),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  // define some options for the chart
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div className={typographyClasses.section}>
        <div className={typographyClasses.container}>
          <ProgressIndicator currentStepName="Recommendations" />
          <GridContainer>
            <GridItem>
              <h2>Summary</h2>
              <h4>{aboutMe?.description}</h4>
              <Line data={data} options={options} />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <h3>Money Feelings</h3>
            <h4>{recommendations?.money_feelings}</h4>
          </GridContainer>
          <GridContainer>
            <h3>Spending and Saving</h3>
            <h4>{recommendations?.spending_and_saving}</h4>
          </GridContainer>
          <GridContainer>
            <h3>Opportunities</h3>
            <h4>{recommendations?.opportunities}</h4>
          </GridContainer>
        </div>

        <div className={typographyClasses.section}>
          <div className={typographyClasses.container}></div>
        </div>
      </div>
    </div>
  );
}
