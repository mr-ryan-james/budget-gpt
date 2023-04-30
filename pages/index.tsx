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
              <h1>Thrįve</h1>
              <Image alt="logo" src="/img/logo.jpg" width={500} height={500} />
              <h4>
                To achieve financial wellness 💰, let go of perfection and focus
                on progress 📈. Organize your finances 📊 but also reflect on
                your emotional 😊 relationship with money 💵. Make conscious 🧠
                choices about spending 💳 and saving 💵. It’s like martial arts
                🥋 - learn the moves with patience 🧘‍♀️ and calmness, become the
                master 💪 of your money, and enjoy peace of mind 😌
              </h4>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem>
              <Link href="/basics">
                <Button color="rose">Start</Button>
              </Link>
              <h6>
                Disclaimer: Thrive strives for the highest degree of excellence
                in its mission to make personal finances a joy. Rarely,
                responses may contain non-factual information, especially on
                topics beyond our capabilities. For critical information,
                AI-generated responses should be verified through reputable
                sources.
              </h6>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
