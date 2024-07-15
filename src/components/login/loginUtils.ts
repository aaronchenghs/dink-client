export const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required.";
  if (!emailRegex.test(email)) return "Invalid email format.";
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) return "Password is required.";
  if (password.length < 6)
    return "Password must be at least 6 characters long.";
  return "";
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  if (!confirmPassword) return "Confirm password is required.";
  if (password !== confirmPassword) return "Passwords do not match.";
  return "";
};
