import Pageheader from "../components/pageheader";
import Input from "../components/input";
import { useFormik } from "formik";
import Joi from "joi";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";

function Signup() {
  const navigate = useNavigate();

  const [isRegistered, setIsRegistered] = useState(false);
  const { createUser, user, login } = useAuth();
  const [success, setSuccess] = useState(false);
  const { getFieldProps, handleSubmit, handleReset, touched, errors, isValid } =
    useFormik({
      validateOnMount: true,
      initialValues: {
        name: {
          first: "",
          middle: "",
          last: "",
        },
        phone: "",
        email: "",
        password: "",
        image: {
          url: "",
          alt: "",
        },
        address: {
          state: "",
          country: "",
          city: "",
          street: "",
          houseNumber: "",
          zip: "",
        },
        isBusiness: false,
      },
      validate: (values) => {
        const userSchema = Joi.object({
          name: Joi.object({
            first: Joi.string().min(2).max(256).required(),
            middle: Joi.string().min(2).max(256).allow(""),
            last: Joi.string().min(2).max(256).required(),
          }).required(),
          email: Joi.string().min(6).max(255).required().email({ tlds: false }),
          password: Joi.string()
            .min(9)
            .max(30)
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])/)
            .required(),
          phone: Joi.string().required(),
          image: Joi.object({
            url: Joi.string().allow(""),
            alt: Joi.string().min(2).max(256).allow(""),
          }).optional(),
          address: Joi.object({
            state: Joi.string().allow(""),
            country: Joi.string().min(2).max(256).required(),
            city: Joi.string().min(2).max(256).required(),
            street: Joi.string().min(2).max(256).required(),
            houseNumber: Joi.number().required(),
            zip: Joi.number().required(),
          }).required(),
          isBusiness: Joi.boolean(),
        });
        const { error } = userSchema.validate(values, { abortEarly: false });
        if (!error) {
          return null;
        }
        const errors = {};
        for (const detail of error.details) {
          let current = errors;
          for (let i = 0; i < detail.path.length; i++) {
            const key = detail.path[i];
            if (!current[key]) current[key] = {};
            if (i + 1 === detail.path.length) current[key] = detail.message;
            else current = current[key];
          }
        }
        return errors;
      },

      onSubmit: async (values) => {
        try {
          await createUser({
            ...values,
          });
          console.log(response.name.first);
          await login({ email: values.email, password: values.password });
          setSuccess(true);
          setTimeout(() => {
            navigate("/");
          }, 2500);
        } catch (err) {
          if (err.response?.status === 400) {
            setIsRegistered(true);
          }
        }
      },
    });

  return (
    <div className="bg-success-subtle d-flex justify-content-center flex-column align-items-center">
      <div className="container mt-2">
        <div className="text-center mb-4">
          <Pageheader
            title="register"
            description="Fill in your details to register on the site"
          />
        </div>
      </div>
      {success && (
        <div className="alert alert-info" role="alert">
          User successfully created
        </div>
      )}
      <div className="mt-5">
        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          className="d-flex flex-column"
        >
          <div className="row g-3">
            <Input
              {...getFieldProps("name.first")}
              error={errors.name?.first}
              type="text"
              label="First name"
              placeholder="first name"
              required
            />
            <Input
              {...getFieldProps("name.last")}
              error={touched?.name?.last ? errors?.name?.last : ""}
              type="text"
              label="Last name"
              placeholder="last name"
              required
            />
            <Input
              {...getFieldProps("name.middle")}
              error={touched?.name?.middle ? errors?.name?.middle : ""}
              type="text"
              label="Middle name"
              placeholder="middle name"
            />
          </div>
          <div className="row g-3">
            <Input
              {...getFieldProps("phone")}
              error={touched.phone ? errors.phone : ""}
              type="text"
              label="phone"
              placeholder="000-000000"
              required
            />
            <Input
              {...getFieldProps("email")}
              error={
                isRegistered
                  ? "email already exist"
                  : touched.email
                  ? errors.email
                  : ""
              }
              type="email"
              label="Email"
              placeholder="mail@example.com"
              required
            />
            <Input
              {...getFieldProps("password")}
              error={touched.password ? errors.password : ""}
              type="password"
              label="password"
              required
            />
          </div>
          <div className="row g-3 mt-5">
            <Input
              error={touched?.image?.url ? errors?.image?.url : ""}
              {...getFieldProps("image.url")}
              type="text"
              placeholder="url image"
            />
            <Input
              {...getFieldProps("image.alt")}
              error={touched?.image?.alt ? errors?.image?.alt : ""}
              type="text"
              placeholder="alt image"
            />
            <Input
              {...getFieldProps("address.state")}
              error={touched?.address?.state ? errors?.address?.state : ""}
              type="text"
              placeholder="state"
            />
          </div>
          <div className="row g-3 mt-2">
            <Input
              {...getFieldProps("address.country")}
              error={touched?.address?.country ? errors?.address?.country : ""}
              type="text"
              placeholder="country"
              required
            />
            <Input
              {...getFieldProps("address.city")}
              error={touched?.address?.city ? errors?.address?.city : ""}
              type="text"
              placeholder="city"
              required
            />
            <Input
              {...getFieldProps("address.street")}
              error={touched?.address?.street ? errors?.address?.street : ""}
              type="text"
              placeholder="street"
              required
            />
          </div>
          <div className="row g-3 mt-2">
            <Input
              {...getFieldProps("address.houseNumber")}
              error={
                touched?.address?.houseNumber
                  ? errors?.address?.houseNumber
                  : ""
              }
              type="number"
              placeholder="House Number"
              required
            />
            <Input
              {...getFieldProps("address.zip")}
              error={touched?.address?.zip ? errors?.address?.zip : ""}
              type="number"
              placeholder="zip"
              required
            />
            <div className="row mt-3 justify-content-center align-items-center">
              <div className="col d-flex justify-content-center align-items-center ">
                <div className="form-check">
                  <Input
                    {...getFieldProps("isBusiness")}
                    type="checkbox"
                    name="isBusiness"
                    label="Signup as business"
                  ></Input>
                </div>
              </div>
              <div className="row mt-3 mb-3">
                <button
                  type="button"
                  className=" col-4 btn btn-outline-danger"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  cancel
                </button>
                <button
                  type="reset"
                  onClick={() => {
                    setIsRegistered(false);
                    handleReset();
                  }}
                  className=" col-4 btn btn-outline-secondary"
                >
                  <i className="bi bi-arrow-repeat"></i>
                </button>
                <button
                  disabled={!isValid}
                  type="submit"
                  className=" col-4 btn btn-outline-primary"
                >
                  send
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
