import * as Yup from "yup";

// schema de mes formulaires pour gérer facilement les erreurs

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Cette adresse email est invalide")
    .required("Ce champ est obligatoire"),
  password: Yup.string()
    .min(6, "Ce mot de passe est trop court")
    .required("Ce champ est obligatoire"),
}).required();

const registerValidationSchema = Yup.object({
  email: Yup.string()
    .email("Cette adresse email est invalide")
    .required("Ce champ est obligatoire"),
  name: Yup.string()
    .min(2, "Ce nom est invalide")
    .required("Ce champ est obligatoire"),
  password: Yup.string()
    .min(6, "Ce mot de passe est trop court")
    .required("Ce champ est obligatoire"),
}).required();

const updatePasswordValidationSchema = Yup.object({
  currentPassword: Yup.string()
    .min(6, "Ce mot de passe est trop court")
    .required("Ce champ est obligatoire"),
  newPassword: Yup.string()
    .min(6, "Ce mot de passe est trop court")
    .required("Ce champ est obligatoire"),
}).required();

export {
  loginValidationSchema,
  registerValidationSchema,
  updatePasswordValidationSchema,
};
