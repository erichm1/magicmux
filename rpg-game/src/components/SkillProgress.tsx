import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

interface SkillProgressProps {
  name: string;
  value: number;
}

const SkillProgress: React.FC<SkillProgressProps> = ({ name, value }) => {
  const max = 100; // valor de referência, pode ajustar
  const percent = (value / max) * 100;

  return (
    <div className="mb-2">
      <strong>{name}</strong>
      <ProgressBar
        now={percent}
        label={`${value} (${percent.toFixed(1)}%)`}
        variant="info"
      />
    </div>
  );
};

export default SkillProgress;
