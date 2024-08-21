import * as yup from "yup";

export const addUserValidationSchema = yup.object().shape({
  firstName: yup.string().required("Ime je obavezno"),
  lastName: yup.string().required("Prezime je obavezno"),
  email: yup
    .string()
    .email("Neispravna email adresa")
    .required("Email je obavezan"),
  username: yup
    .string()
    .required("Korisničko ime je obavezno")
    .min(6, "Korisničko ime mora imati najmanje 6 karaktera"),
  password: yup
    .string()
    .required("Lozinka je obavezna")
    .min(6, "Lozinka mora imati najmanje 6 karaktera")
    .matches(/[A-Z]/, "Lozinka mora sadržati bar jedno veliko slovo")
    .matches(/[a-z]/, "Lozinka mora sadržati bar jedno malo slovo")
    .matches(/[0-9]/, "Lozinka mora sadržati bar jedan broj"),
  role: yup.string().required("Uloga je obavezna"),
  active: yup.string().required("Status je obavezan"),
});
