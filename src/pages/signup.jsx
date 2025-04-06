import Pageheader from "../components/pageheader";
import Input from "../components/input";
import { useFormik } from "formik";
import Joi from "joi";
import userService from "../services/userService";
import { useState } from "react";
import { useNavigate } from "react-router";
function Signup(params) {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { getFieldProps, handleSubmit, touched, errors, isValid } = useFormik({
    validateOnMount: true,
    initialValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      password: "",
      phone: "",
      image: "",
      altImage: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
      isBusiness: false,
    },
    validate(values) {
      const userSchema = Joi.object({
        firstName: Joi.string().min(2).max(256).required(),
        middleName: Joi.string().min(2).max(256).required(),
        lastName: Joi.string().min(2).max(256).required(),
        email: Joi.string().min(6).max(255).required().email({ tlds: false }),
        password: Joi.string()
          .min(9)
          .max(30)
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])/)
          .required(),
        phone: Joi.string()
          .pattern(/^[0-9]{9}$/)
          .required(),
        image: Joi.string().allow(""),
        altImage: Joi.string().allow(""),
        state: Joi.string().allow(""),
        country: Joi.string().min(2).max(256).required(),
        city: Joi.string().min(2).max(256).required(),
        street: Joi.string().min(2).max(256).required(),
        houseNumber: Joi.number().required(),
        zip: Joi.string().allow(""),
        isBusiness: Joi.boolean(),
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
        await userService.createUser({
          ...values,
        });
        navigate("/");
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });
  console.log("Touched fields:", touched);
  console.log("Errors:", errors);
  return (
    <div className="bg-success-subtle d-flex justify-content-center flex-column align-items-center">
      <Pageheader title="register" />
      <div className="mt-5">
        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          className="d-flex flex-column"
        >
          {serverError && (
            <div className="alert-alert-danger">{serverError}</div>
          )}
          <div className="row g-3">
            <Input
              {...getFieldProps("firstName")}
              error={touched.firstName ? errors.firstName : ""}
              type="text"
              label="First name"
              placeholder="first name"
              required
            />

            <Input
              {...getFieldProps("lastName")}
              error={touched.lastName ? errors.lastName : ""}
              type="text"
              label="Last name"
              placeholder="last name"
              required
            />
            <Input
              {...getFieldProps("middleName")}
              error={touched.middleName ? errors.middleName : ""}
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
              error={touched.email ? errors.email : ""}
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
              error={touched.image ? errors.image : ""}
              {...getFieldProps("image")}
              type="text"
              placeholder="url image"
            />
            <Input
              {...getFieldProps("altImage")}
              error={touched.altImage ? errors.altImage : ""}
              type="text"
              placeholder="alt image"
            />
            <Input
              {...getFieldProps("state")}
              error={touched.state ? errors.state : ""}
              type="text"
              placeholder="state"
            />
          </div>
          <div className="row g-3 mt-2">
            <Input
              {...getFieldProps("country")}
              error={touched.country ? errors.country : ""}
              type="text"
              placeholder="country"
              required
            />
            <Input
              {...getFieldProps("city")}
              error={touched.city ? errors.city : ""}
              type="text"
              placeholder="city"
              required
            />

            <Input
              {...getFieldProps("street")}
              error={touched.street ? errors.street : ""}
              type="text"
              placeholder="street"
              required
            />
          </div>
          <div className="row g-3 mt-2">
            <Input
              {...getFieldProps("houseNumber")}
              error={touched.houseNumber ? errors.houseNumber : ""}
              type="number"
              placeholder="House Number"
              required
            />
            <Input
              {...getFieldProps("zip")}
              error={touched.zip ? errors.zip : ""}
              type="number"
              placeholder="zip"
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
                <button type="button" className=" col-4 btn btn-outline-danger">
                  cancel
                </button>

                <button
                  type="button"
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
