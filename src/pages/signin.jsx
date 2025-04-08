import Pageheader from "../components/pageheader";
import Input from "../components/input";
import { useFormik } from "formik";
import Joi from "joi";
import userService from "../services/userService";
import { useState } from "react";
import { useNavigate } from "react-router";
function Signin() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { getFieldProps, handleSubmit, touched, errors, isValid } = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const userSchema = Joi.object({
        email: Joi.string().min(6).max(255).required().email({ tlds: false }),
        password: Joi.string()
          .min(9)
          .max(30)
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])/)
          .required(),
      });
      const { error } = userSchema.validate(values, { abortEarly: false });
      if (!error) {
        return null;
      }
      const errors = {};
      for (const detail of error.details) {
        errors[detail.path[0]] = detail.message;
      }
      return errors;
    },
    onSubmit: async (values) => {
      console.log(errors);

      try {
        await userService.login(values);
        navigate("/");
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });
  return (
    <div className="container bs-success-bg-subtle">
      <Pageheader title="Sign-in" description="Sign in with your account" />
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="d-flex flex-column"
      >
        {serverError && <div className="alert-alert-danger">{serverError}</div>}
        <div className="row g-3">
          <Input
            {...getFieldProps("email")}
            type="email"
            label="Email"
            error={touched.email ? errors.email : ""}
            placeholder="mail@example.com"
            required
          />

          <Input
            {...getFieldProps("password")}
            type="password"
            label="password"
            error={touched.password ? errors.password : ""}
            required
          />
        </div>
        <button
          disabled={!isValid}
          type="submit"
          className=" col-4 btn btn-outline-primary mt-5"
        >
          send
        </button>
      </form>
    </div>
  );
}
export default Signin;
