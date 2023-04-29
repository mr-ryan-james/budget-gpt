import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/CustomButtons/Button";

// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
// sections for this page

import styles from "../styles/jss/nextjs-material-kit/pages/components";
import typographyStyles from "../styles/jss/nextjs-material-kit/pages/componentsSections/typographyStyle";

const useStyles = makeStyles(styles);
const useTypographyStyles = makeStyles(typographyStyles);

export default function Home({ allPostsData }) {
  const classes = useStyles();
  const typographyClasses = useTypographyStyles();

  return (
    <div>
      <div className={typographyClasses.section}>
        <div className={typographyClasses.container}>
          <GridContainer>
            <GridItem>
              <h1>Budget GPT</h1>
              <h2>
                We help you understand your spending habits so you can focus on
                what's important
              </h2>
              <Image alt="logo" src="/img/logo.jpg" width={500} height={500} />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem>
              <Link href="/basics">
                <Button color="rose">Start</Button>
              </Link>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
