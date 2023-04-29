import React from "react";
import styles from "./ProgressIndicator.module.css";

type Step = "Data Inputs" | "Summary" | "Recommendations";

interface ProgressIndicatorProps {
  currentStep: Step;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
}) => {
  const steps: Step[] = ["Data Inputs", "Summary", "Recommendations"];

  const progressClass = (step: Step) => {
    if (step === currentStep) {
      return styles.current;
    }
    if (steps.indexOf(step) < steps.indexOf(currentStep)) {
      return styles.completed;
    }
    return "";
  };

  return (
    <div className={styles.indicatorContainer}>
      {steps.map((step, index) => (
        <div className={styles.step} key={index}>
          <div className={`${styles.circle} ${progressClass(step)}`}>
            {index + 1}
          </div>
          <div className={styles.text}>{step}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
