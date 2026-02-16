import { NAME_REGEX, PHONE_REGEX,PASS_REGEX,EMAIL_REGEX } from './regex';
export const validateField = (name, val, formData) => {
  let message = "";
  let isValid = false;

  switch (name) {
    case "nameInp":
      if (val.startsWith(" ")) message = "Spaces not allowed.";
      else if (val && !/^[a-zA-Z\s]*$/.test(val)) message = "Numbers/Symbols not allowed!";
      else if (val.trim().length > 0 && val.trim().length < 3) message = "Min 3 letters required.";
      else if (val.trim().length >= 3 && NAME_REGEX.test(val)) isValid = true;
      break;

    case "phoneInp":
      if (val && (val[0] < '6' || val[0] > '9')) message = "Starts with 6-9.";
      else if (val.length > 0 && !PHONE_REGEX.test(val)) message = "Need 10 digits.";
      else if (val.length === 10) isValid = true;
      break;

    case "emailInp":
      if (val.length > 0 && !EMAIL_REGEX.test(val)) message = "Invalid email.";
      else if (val.length > 0) isValid = true;
      break;

    case "passInp":
      if (val.length > 0 && !PASS_REGEX.test(val)) message = "8+ chars, 1 Upper, 1 Special.";
      else if (val.length > 0) isValid = true;
      break;

    case "confirmInp":
      if (val.length > 0 && val !== formData.passInp) message = "Passwords do not match.";
      else if (val === formData.passInp && val !== "") isValid = true;
      break;

    default:
      isValid = true;
  }
  return { isValid, message };
};