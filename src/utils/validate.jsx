export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? "" : "Please enter a valid email address";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters long";
  return "";
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber)
    ? ""
    : "Please enter a valid mobile number (10 digits)";
};

export const validateUserName = (userName) => {
  const userNameRegex = /^[a-zA-Z0-9]+$/;
  return userNameRegex.test(userName)
    ? ""
    : "Username can only contain letters or digits";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword ? "" : "Passwords do not match";
};

export const validateRequired = (value, fieldName) => {
  return value ? "" : `${fieldName} is required`;
};

export const validateForm = (formData, fields) => {
  const errors = {};
  fields.forEach((field) => {
    if (field.name === "email") {
      errors.email = validateEmail(formData.email);
    }
    if (field.name === "phoneNumber") {
      errors.phoneNumber = validatePhoneNumber(formData.phoneNumber);
    }
    if (field.name === "userName") {
      const userName = `${formData.firstName}${formData.lastName}`
        .trim()
        .replace(/\s+/g, "");
      errors.userName = validateUserName(userName);
    }
    if (field.name === "password") {
      errors.password = validatePassword(formData.password);
    }
    if (field.name === "confirmPassword") {
      errors.confirmPassword = validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      );
    }
    if (field.name === "firstName") {
      errors.firstName = validateRequired(formData.firstName, "First Name");
    }
    if (field.name === "lastName") {
      errors.lastName = validateRequired(formData.lastName, "Last Name");
    }
    if (field.name === "gender") {
      errors.gender = validateRequired(formData.gender, "Gender");
    }
    if (field.name === "address") {
      errors.address = validateRequired(formData.address, "Address");
    }
    if (field.name === "agree") {
      errors.agree = formData.agree
        ? ""
        : "You must agree to the terms and conditions";
    }
  });
  return errors;
};
