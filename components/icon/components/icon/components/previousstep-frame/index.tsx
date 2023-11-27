import React from "react";
import { IconProps } from "../../index";
import icon from "../../index.module.less";

const PreviousStep = (props: IconProps) => {
  const { className = "", style = {}, onClick = () => {} } = props;
  const styleClassName: string = `${icon.default} ${className}`;
  return (
    <svg
      viewBox="0 0 1024 1024"
      className={styleClassName}
      style={{
        fill: style.color,
        ...style,
      }}
      onClick={onClick}
      focusable="false"
      data-icon="ayong"
    >
      <path d="M347.6 528.95l383.2 301.02c14.25 11.2 35.2 1.1 35.2-16.95V210.97c0-18.05-20.95-28.14-35.2-16.94L347.6 495.05a21.53 21.53 0 000 33.9M330 864h-64a8 8 0 01-8-8V168a8 8 0 018-8h64a8 8 0 018 8v688a8 8 0 01-8 8" />
    </svg>
  );
};

export default PreviousStep;
