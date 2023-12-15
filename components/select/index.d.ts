import React from 'react';

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  className?: string;
  defaultValue?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
  options: Option[];
}

declare const Select: React.FC<SelectProps>;

export default Select;
