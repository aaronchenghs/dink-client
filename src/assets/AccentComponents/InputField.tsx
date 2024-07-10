import React from "react";
import "./inputField.styles.scss";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type,
}) => {
  return (
    <div className="forms_field">
      <input
        type={type}
        className="forms_field-input"
        value={value}
        onChange={onChange}
        required
      />
      <label className="forms_field-label">{label}</label>
    </div>
  );
};

export default InputField;
