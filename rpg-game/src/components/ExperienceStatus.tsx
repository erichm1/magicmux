// src/components/ExperienceStatus.tsx
import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Character } from '../game/systems/SkillTraining';

interface Props {
  activeCharacter: Character;
}

const ExperienceStatus: React.FC<Props> = ({ activeCharacter }) => {
  const xpTotal = activeCharacter.getTotalExperience();
  const progress = activeCharacter.getExpProgressPercentage();
  const requiredXP = activeCharacter.getExpToLevelUp();

  return (
    <div>
      <p>XP Total: {xpTotal}</p>
      <p>
        Progresso no Nível: {activeCharacter.experience} / {requiredXP} 
        ({progress.toFixed(2)}%)
      </p>
      <ProgressBar
        now={progress}
        label={`${progress.toFixed(2)}%`}
      />
    </div>
  );
};

export default ExperienceStatus;
