import React from "react";
import { Line } from "react-chartjs-2";
import ProgressIndicator from "../components/ProgressIndicator/ProgressIndicator";

import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
// sections for this page

import { useQuery } from "@tanstack/react-query";

import typographyStyles from "../styles/jss/nextjs-material-kit/pages/componentsSections/typographyStyle";

const useTypographyStyles = makeStyles(typographyStyles);

export default function Recommendations() {
  const typographyClasses = useTypographyStyles();

  const { data: aboutMe, error: aboutMeError } = useQuery({
    queryKey: ["aboutMe"],
    queryFn: () => {
      return fetch(`/api/aboutMe`).then((res) => res.json());
    },
  });

  const { data: wellnessHistory, error: wellnessHistoryerror } = useQuery({
    queryKey: ["wellness"],
    queryFn: () => {
      return fetch(`/api/wellness`).then((res) => res.json());
    },
  });

  const { data: recommendations, error: recommendationsError } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => {
      return fetch(`/api/recommendations`).then((res) => res.json());
    },
  });

  console.log({ aboutMe, recommendations, wellnessHistory });
  console.log({ aboutMeError, recommendationsError, wellnessHistoryerror });

  const reversedWellnessHistory = [...(wellnessHistory || [])]?.reverse();

  console.log({ reversedWellnessHistory });

  const lineGraphData = {
    labels: reversedWellnessHistory?.map((wellness) => wellness.date),
    datasets: [
      {
        label: "Wellness",
        data: reversedWellnessHistory?.map(
          (wellness) => wellness.wellness_score
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
          {(!aboutMe || !wellnessHistory) && (
            <GridContainer>
              <GridItem>
                <h2>Summary</h2>
                <h4>Loading</h4>
              </GridItem>
            </GridContainer>
          )}
          {aboutMe && wellnessHistory && (
            <GridContainer>
              <GridItem>
                <h2>Summary</h2>
                {aboutMe && <h4>{aboutMe?.description}</h4>}
                {wellnessHistory && (
                  <Line data={lineGraphData} options={options} />
                )}
              </GridItem>
            </GridContainer>
          )}
          {!recommendations && (
            <GridContainer>
              <GridItem>
                <h3>Recommendations</h3>
                <h4>Loading</h4>
              </GridItem>
            </GridContainer>
          )}
          {recommendations && (
            <>
              <GridContainer>
                <GridItem>
                  <h3>Money Feelings</h3>
                  {<h4>{recommendations?.money_feelings}</h4>}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem>
                  <h3>Spending and Saving</h3>
                  <h4>{recommendations?.spending_and_saving}</h4>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem>
                  <h3>Opportunities</h3>
                  <h4>{recommendations?.opportunities}</h4>
                </GridItem>
              </GridContainer>
            </>
          )}
        </div>

        <div className={typographyClasses.section}>
          <div className={typographyClasses.container}></div>
        </div>
      </div>
    </div>
  );
}
