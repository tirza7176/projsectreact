import Pageheader from "../components/pageheader";
import Input from "../components/input";
import { useFormik } from "formik";
import Joi from "joi";
import cardService from "../services/cardServics";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
function CreateCard() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(undefined);
  const [success, setSuccess] = useState(false);
  const { getFieldProps, handleSubmit, touched, errors, isValid, handleReset } =
    useFormik({
      validateOnMount: true,
      initialValues: {
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        web: "",
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
      },
      validate: (values) => {
        const cardSchema = Joi.object({
          title: Joi.string().min(2).max(256).required(),
          subtitle: Joi.string().min(2).max(256).required(),
          description: Joi.string().min(2).max(1024).required(),
          email: Joi.string().min(6).max(255).required().email({ tlds: false }),
          phone: Joi.string().required(),
          web: Joi.string().min(14).max(256).allow(""),
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
        });
        const { error } = cardSchema.validate(values, { abortEarly: false });
        if (!error) {
          return null;
        }
        const errors = {};
        for (const detail of error.details) {
          errors[detail.path[0]] = detail.message;
        }
        console.log(errors);
        return errors;
      },

      onSubmit: async (values) => {
        console.log("run");
        try {
          await cardService.createCard({
            ...values,
          });
          setSuccess(true);
          setTimeout(() => {
            navigate("/mycards");
          }, 3000);
        } catch (err) {
          if (err.response?.status === 400) {
            setServerError(err.response.data);
          }
        }
      },
    });

  return (
    <div className="mt-5 bg-success-subtle d-flex justify-content-center flex-column align-items-center">
      <Pageheader title="Create new card" />
      {success && (
        <div className="alert alert-info" role="alert">
          Card created successfully!
        </div>
      )}
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
              {...getFieldProps("title")}
              error={touched.title ? errors.title : ""}
              type="text"
              label="title"
              placeholder="title"
              required
            />

            <Input
              {...getFieldProps("subtitle")}
              error={touched.subtitle ? errors.subtitle : ""}
              type="text"
              label="subtitle"
              placeholder="subtitle"
              required
            />

            <Input
              {...getFieldProps("description")}
              error={touched.description ? errors.description : ""}
              type="text"
              label="description"
              placeholder="description"
              required
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
              {...getFieldProps("web")}
              error={touched.web ? errors.web : ""}
              type="text"
              label="web"
              placeholder="web"
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
              error={touched?.address?.street && errors?.address.street}
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
              <div className="col d-flex justify-content-center align-items-center "></div>
              <div className="row mt-3 mb-3">
                <button type="button" className=" col-4 btn btn-outline-danger">
                  cancel
                </button>
                <button
                  type="reset"
                  className=" col-4 btn btn-outline-secondary"
                  onClick={handleReset}
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
export default CreateCard;
