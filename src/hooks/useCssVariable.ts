import { useEffect, useState } from "react";

export const useCssVariable = (
  variableName: string,
  element: HTMLElement = document.documentElement
) => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const computedStyle = getComputedStyle(element);
    const variableValue = computedStyle.getPropertyValue(variableName).trim();
    setValue(variableValue);
  }, [variableName, element]);

  return value ?? "";
};

export const getCssVariable = (
  variableName: string,
  element: HTMLElement = document.documentElement
): string => {
  const computedStyle = getComputedStyle(element);
  const variableValue = computedStyle.getPropertyValue(variableName).trim();

  if (!variableValue) {
    console.warn(
      `CSS variable "${variableName}" not found on the specified element.`
    );
  }

  return variableValue || "";
};
