import React, { Component } from "react";
import Router from "next/router";

// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/HeaderLinks";
import Footer from "../components/Footer/Footer";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import Parallax from "../components/Parallax/Parallax";
// sections for this page
import SectionBasics from "../pages-sections/Components-Sections/SectionBasics";

import styles from "../styles/jss/nextjs-material-kit/pages/components";

const useStyles = makeStyles(styles);

export default function Home({ allPostsData }) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.container}>
        <GridContainer>
          <GridItem>
            <div className={classes.brand}>
              <h1 className={classes.title}>Budget GPT</h1>
              <h3 className={classes.subtitle}>
                Feel good about your financial health
              </h3>
            </div>
          </GridItem>
        </GridContainer>
      </div>

      <div className={classNames(classes.mainRaised)}>
        <div className={classes.sections}>
          <div className={classes.container}></div>
        </div>
      </div>
    </div>
  );
}
