import React from "react";
import "./inputField.styles.scss";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type,
  error,
}) => {
  return (
    <div className="forms_field">
      <input
        type={type}
        className={`forms_field-input ${error ? "input-error" : ""}`}
        value={value}
        onChange={onChange}
        required
        placeholder=" "
      />
      <label className="forms_field-label">{label}</label>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default InputField;
