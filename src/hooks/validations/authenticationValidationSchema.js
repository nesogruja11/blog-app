import * as yup from "yup";

export const authenticationValidationSchema = () => {
  return yup.object().shape({
    username: yup.string().required("Korisničko ime je obavezno"),
    password: yup.string().required("Lozinka je obavezna"),
  });
};
