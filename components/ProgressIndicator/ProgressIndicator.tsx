import React from "react";
import styles from "./ProgressIndicator.module.css";
import Link from "next/link";

type StepName = "Data Inputs" | "Summary" | "Recommendations";
type Step = { index: number; title: StepName; href: string };

interface ProgressIndicatorProps {
  currentStepName: StepName;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStepName,
}) => {
  const steps: Step[] = [
    { index: 0, title: "Data Inputs", href: "basics" },
    { index: 1, title: "Summary", href: "summary" },
    { index: 2, title: "Recommendations", href: "recommendations" },
  ];

  const currentStep =
    steps.find((step) => step.title === currentStepName) ?? steps[0];

  const progressClass = (step: Step) => {
    if (step.index === currentStep.index) {
      return styles.current;
    }
    if (step.index < currentStep.index) {
      return styles.completed;
    }
    return "";
  };

  const disableClick = (step: Step) => {
    if (step.index >= currentStep.index) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.indicatorContainer}>
      {steps.map((step, index) => (
        <Link
          href={`/${step.href.toLowerCase()}`}
          onClick={(e) => disableClick(step) && e.preventDefault()}
          key={index}
          className={styles.step}
        >
          <div key={index}>
            <div className={`${styles.circle} ${progressClass(step)}`}>
              {index + 1}
            </div>
            <div className={styles.text}>{step.title}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProgressIndicator;
