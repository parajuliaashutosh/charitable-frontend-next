import * as Yup from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phoneRegex = /^\+?[1-9]\d{1,14}$/;
export const upperCaseRegex = /[A-Z]/;
export const lowerCaseRegex = /[a-z]/;
export const numberRegex = /\d/;
export const specialCharacterRegex = /[@$!%*?&#]/;

export const loginSchema = Yup.object({
  username: Yup.string().required("Email / Phone is required"),
  password: Yup.string().required("Password is required"),
});

export const userRegistrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  middleName: Yup.string().optional(),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegex, "Invalid phone number"),
  password: Yup.string()
    .required("New password is required")
    .matches(
      passwordRegex,
      "New password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  latitude: Yup.number().required("Location is required"),
  longitude: Yup.number().required("Location is required"),
});

export const organizationRegistrationSchema = Yup.object().shape({
  organizationName: Yup.string()
    .required("Organization name is required")
    .min(3, "Organization name must be at least 3 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("New password is required")
    .matches(
      passwordRegex,
      "New password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  contactNumber: Yup.string()
    .optional()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
  govtId: Yup.string().required("Government ID is required"),
  organizationHeadFirstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  organizationHeadMiddleName: Yup.string().optional(),
  organizationHeadLastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  organizationHeadPhoneNumber: Yup.string()
    .optional()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  latitude: Yup.number().required("Location is required"),
  longitude: Yup.number().required("Location is required"),
});
