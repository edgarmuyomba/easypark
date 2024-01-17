import React, { useState } from 'react';
import './ToggleSwitch.css'; // Make sure to create this CSS file

const ToggleSwitch = ({ onChange, checked }) => {
  const [isChecked, setChecked] = useState(checked || false);

  const handleToggle = () => {
    setChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <div className={`toggle-switch ${isChecked ? 'checked' : ''}`} onClick={handleToggle}>
      <div className="switch-handle"></div>
    </div>
  );
};

export default ToggleSwitch;
