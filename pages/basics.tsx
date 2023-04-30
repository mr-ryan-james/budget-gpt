import React, { useContext } from "react";
import Button from "../components/CustomButtons/Button";
import { useRouter } from "next/router";
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
import { NameContext } from "./_app";
import PageChange from "../components/PageChange/PageChange";
import { getEmotions } from "./api/emotions";

const useTypographyStyles = makeStyles(typographyStyles);

type SelectedEmotions = {
  [key in
    | "acceptance"
    | "disappointment"
    | "nervousness"
    | "shame"
    | "bitterness"
    | "gratitude"
    | "terror"
    | "excitement"
    | "confusion"
    | "serenity"
    | "optimism"
    | "frustration"]: boolean;
};

const selectedColor = "success";
const unselectedColor = "transparent";

const getButtonColor = (selected: boolean) =>
  selected ? selectedColor : unselectedColor;

export async function getServerSideProps(context) {
  const name = context.req.cookies.name;

  const emotionData = await getEmotions(name);
  return {
    props: { emotionData }, // will be passed to the page component as props
  };
}

export default function Basics({ emotionData }) {
  const typographyClasses = useTypographyStyles();
  const name = useContext(NameContext);
  const router = useRouter();

  const [posting, setPosting] = React.useState(false);

  console.log(emotionData);

  const [selectedEmotions, setSelectedEmotions] =
    React.useState<SelectedEmotions>(() => {
      const latestEmotionDataArr = emotionData?.[0]?.emotions;

      const latestEmotionData = latestEmotionDataArr.reduce((acc, cur) => {
        // Set the property of the accumulator object with the current element as the key and true as the value
        acc[cur] = true;
        // Return the accumulator object for the next iteration
        return acc;
      }, {}); // The initial value is an empty object

      return {
        acceptance: latestEmotionData?.acceptance || false,
        disappointment: latestEmotionData?.disappointment || false,
        nervousness: latestEmotionData?.nervousness || false,
        shame: latestEmotionData?.shame || false,
        bitterness: latestEmotionData?.bitterness || false,
        gratitude: latestEmotionData?.gratitude || false,
        terror: latestEmotionData?.terror || false,
        excitement: latestEmotionData?.excitement || false,
        confusion: latestEmotionData?.confusion || false,
        serenity: latestEmotionData?.serenity || false,
        optimism: latestEmotionData?.optimism || false,
        frustration: latestEmotionData?.frustration || false,
      };
    });

  const toggleEmotion = (emotion: keyof SelectedEmotions) => {
    setSelectedEmotions((prev) => ({
      ...prev,
      [emotion]: !prev[emotion],
    }));
  };

  const makeEmotionsPostCall = async () => {
    // Use the fetch API to make a post request
    try {
      setPosting(true);

      const res = await fetch(`/api/emotions?name=${name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedEmotions }),
      });
      // Handle the response
      const data = await res.json();
      console.log(data);
    } catch (err) {
      // Handle the error
      console.error(err);
    } finally {
      setPosting(false);
    }
    // Navigate to another page after the fetch call is completed
    router.push("/summary");
  };

  if (posting) {
    return <PageChange />;
  }

  return (
    <div>
      <div className={typographyClasses.section}>
        <div className={typographyClasses.container}>
          <ProgressIndicator currentStepName="Data Inputs" />
          <GridContainer>
            <GridItem>
              <h4>
                Upload a recent bank, credit card statement or any other
                transaction history files
              </h4>
              <Button color="facebook">Upload</Button>
            </GridItem>
          </GridContainer>
        </div>

        <div className={typographyClasses.section}>
          <div className={typographyClasses.container}>
            <GridContainer>
              <GridItem xs={4} sm={2} md={2}>
                <Button
                  fullWidth
                  color={getButtonColor(selectedEmotions.acceptance)}
                  onClick={() => toggleEmotion("acceptance")}
                >
                  acceptance
                </Button>
                <Button
                  fullWidth
                  color={getButtonColor(selectedEmotions.disappointment)}
                  onClick={() => toggleEmotion("disappointment")}
                >
                  disappointment
                </Button>
              </GridItem>
              <GridItem xs={4} sm={2} md={2}>
                <Button
                  fullWidth
                  color={getButtonColor(selectedEmotions.nervousness)}
                  onClick={() => toggleEmotion("nervousness")}
                >
                  nervousness
                </Button>
                <Button
                  fullWidth
                  color={getButtonColor(selectedEmotions.shame)}
                  onClick={() => toggleEmotion("shame")}
                >
                  shame
                </Button>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={4} sm={2} md={2}>
                <Button
                  fullWidth
                  color={getButtonColor(selectedEmotions.bitterness)}
                  onClick={() => toggleEmotion("bitterness")}
                >
                  bitterness
                </Button>
                <Button
                  fullWidth
                  color={getButtonColor(selectedEmotions.gratitude)}
                  onClick={() => toggleEmotion("gratitude")}
                >
                  gratitude
                </Button>
              </GridItem>
              <GridItem xs={4} sm={2} md={2}>
                <Button
                  fullWidth
                  color={getButtonColor(selectedEmotions.terror)}
                  onClick={() => toggleEmotion("terror")}
                >
                  terror
                </Button>
                <Button
                  fullWidth
                  color={getButtonColor(selectedEmotions.excitement)}
                  onClick={() => toggleEmotion("excitement")}
                >
                  excitement
                </Button>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={4} sm={2} md={2}>
                <Button
                  fullWidth
                  color={getButtonColor(selectedEmotions.confusion)}
                  onClick={() => toggleEmotion("confusion")}
                >
                  confusion
                </Button>
                <Button
                  fullWidth
                  color={getButtonColor(selectedEmotions.serenity)}
                  onClick={() => toggleEmotion("serenity")}
                >
                  serenity
                </Button>
              </GridItem>
              <GridItem xs={4} sm={2} md={2}>
                <Button
                  fullWidth
                  color={getButtonColor(selectedEmotions.optimism)}
                  onClick={() => toggleEmotion("optimism")}
                >
                  optimism
                </Button>
                <Button
                  fullWidth
                  color={getButtonColor(selectedEmotions.frustration)}
                  onClick={() => toggleEmotion("frustration")}
                >
                  frustration
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <div className={typographyClasses.container}>
          <GridContainer>
            <GridItem>
              <Button onClick={makeEmotionsPostCall} color="facebook">
                Summary
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
