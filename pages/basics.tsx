import React from "react";
import Link from "next/link";
import Button from "../components/CustomButtons/Button";

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

export default function Basics() {
  const typographyClasses = useTypographyStyles();

  return (
    <div>
      <div className={typographyClasses.section}>
        <div className={typographyClasses.container}>
          <ProgressIndicator currentStep="Data Inputs" />
          <GridContainer>
            <GridItem>
              <h4>
                Upload a recent bank, credit card statement or any other
                transaction history files
              </h4>
              <Button color="rose">Upload</Button>
            </GridItem>
          </GridContainer>
        </div>

        <div className={typographyClasses.section}>
          <div className={typographyClasses.container}>
            <GridContainer>
              <GridItem xs={2} sm={2} md={2}>
                <Button fullWidth color="success">
                  Acceptance
                </Button>
                <Button fullWidth color="success">
                  Disappointment
                </Button>
              </GridItem>
              <GridItem xs={2} sm={2} md={2}>
                <Button fullWidth color="info">
                  Nervousness
                </Button>
                <Button fullWidth color="success">
                  Shame
                </Button>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={2} sm={2} md={2}>
                <Button fullWidth color="warning">
                  Bitterness
                </Button>
                <Button fullWidth color="danger">
                  gratitude
                </Button>
              </GridItem>
              <GridItem xs={2} sm={2} md={2}>
                <Button fullWidth color="rose">
                  Terror
                </Button>
                <Button fullWidth color="rose">
                  Excitement
                </Button>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={2} sm={2} md={2}>
                <Button fullWidth color="warning">
                  Confusion
                </Button>
                <Button fullWidth color="danger">
                  Serenity
                </Button>
              </GridItem>
              <GridItem xs={2} sm={2} md={2}>
                <Button fullWidth color="rose">
                  Optimism
                </Button>
                <Button fullWidth color="rose">
                  Frustration
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <div className={typographyClasses.container}>
          <GridContainer>
            <GridItem>
              <Link href="/summary">
                <Button color="rose">Summary</Button>
              </Link>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
