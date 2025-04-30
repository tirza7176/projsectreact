import Pageheader from "../components/pageheader";
import Input from "../components/input";
import { useFormik } from "formik";
import Joi from "joi";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
function Signin() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { login, user } = useAuth();
  const { getFieldProps, handleSubmit, handleReset, touched, errors, isValid } =
    useFormik({
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
        try {
          await login(values);
          navigate("/");
        } catch (err) {
          if (err.response?.status === 400) {
            setServerError(err.response.data);
          }
        }
      },
    });

  return (
    <div className="container bs-success-subtle d-flex justify-content-center flex-column align-items-center mt-5">
      {user && <Navigate to="/" />}
      <Pageheader title="Sign-in" description="Sign in with your account" />
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="d-flex flex-column mt-5 border border-primary-subtle border rounded-3 w-75"
      >
        {serverError && (
          <div className="w-50 alert alert-danger">
            {"Please enter a valid email or password"}
          </div>
        )}
        <div className="row w-100 mx-auto mb-3 px-3 justify-content-center">
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
        <div className="mb-3 row w-75  mx-auto justify-content-center">
          <button
            type="button"
            onClick={() => {
              navigate("/");
            }}
            className=" col-4 btn btn-outline-danger"
          >
            cancel
          </button>

          <button
            type="reset"
            onClick={handleReset}
            className=" col-4  btn btn-outline-secondary"
          >
            <i className="bi bi-arrow-repeat"></i>
          </button>
        </div>
        <button
          disabled={!isValid}
          type="submit"
          className=" col-6 btn btn-outline-primary mt-2 mb-2 mx-auto"
        >
          send
        </button>
      </form>
    </div>
  );
}
export default Signin;
