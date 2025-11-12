import * as Yup from 'yup'
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const upperCaseRegex = /[A-Z]/
export const lowerCaseRegex = /[a-z]/
export const numberRegex = /\d/
export const specialCharacterRegex = /[@$!%*?&#]/

export const loginSchema = Yup.object({
  username: Yup.string().required('Email / Phone is required'),
  password: Yup.string().required('Password is required'),
})
