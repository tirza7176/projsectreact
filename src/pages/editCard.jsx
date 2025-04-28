import Pageheader from "../components/pageheader";
import Input from "../components/input";
import { useFormik } from "formik";
import Joi from "joi";
import cardService from "../services/cardServics";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import useCard from "../hooks/useCard";
function EditCard() {
  const { id } = useParams();
  const card = useCard(id);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const form = useFormik({
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
    validate(values) {
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

    async onSubmit(values) {
      try {
        await cardService.updateCard(id, values);
        navigate("/mycards");
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });
  useEffect(() => {
    if (!card) {
      return;
    }
    form.setValues({
      title: card.title,
      subtitle: card.subtitle,
      description: card.description,
      email: card.email,
      phone: card.phone,
      web: card.web,
      image: { url: card.image?.url, alt: card.image?.alt },
      address: {
        state: card.address?.state,
        country: card.address?.country,
        city: card.address?.city,
        street: card.address?.street,
        houseNumber: card.address?.houseNumber,

        zip: card.address?.zip,
      },
    });
  }, [card]);
  return (
    <div className=" mt-5 bg-success-subtle d-flex justify-content-center flex-column align-items-center">
      <Pageheader title="Edit my card" />
      <div className="mt-5">
        <form
          onSubmit={form.handleSubmit}
          noValidate
          autoComplete="off"
          className="d-flex flex-column"
        >
          {serverError && (
            <div className="alert-alert-danger">{serverError}</div>
          )}
          <div className="row g-3">
            <Input
              {...form.getFieldProps("title")}
              error={form.touched.title && form.errors.title}
              type="text"
              label="title"
              placeholder="title"
              required
            />

            <Input
              {...form.getFieldProps("subtitle")}
              error={form.touched.subtitle && form.errors.subtitle}
              type="text"
              label="subtitle"
              placeholder="subtitle"
              required
            />

            <Input
              {...form.getFieldProps("description")}
              error={form.touched.description && form.errors.description}
              type="text"
              label="description"
              placeholder="description"
              required
            />
          </div>
          <div className="row g-3">
            <Input
              {...form.getFieldProps("phone")}
              error={form.touched.phone && form.errors.phone}
              type="text"
              label="phone"
              placeholder="000-000000"
              required
            />
            <Input
              {...form.getFieldProps("email")}
              error={form.touched.email && form.errors.email}
              type="email"
              label="Email"
              placeholder="mail@example.com"
              required
            />

            <Input
              {...form.getFieldProps("web")}
              error={form.touched.web && form.errors.web}
              type="text"
              label="web"
              placeholder="web"
            />
          </div>
          <div className="row g-3 mt-5">
            <Input
              error={form.touched.image?.url && form.errors.image?.url}
              {...form.getFieldProps("image.url")}
              type="text"
              placeholder="url image"
            />
            <Input
              {...form.getFieldProps("image.alt")}
              error={form.touched.image?.alt && form.errors.image?.alt}
              type="text"
              placeholder="alt image"
            />
            <Input
              {...form.getFieldProps("address.state")}
              error={form.touched.address?.state && form.errors.address?.state}
              type="text"
              placeholder="state"
            />
          </div>
          <div className="row g-3 mt-2">
            <Input
              {...form.getFieldProps("address.country")}
              error={
                form.touched.address?.country && form.errors.address?.country
              }
              type="text"
              placeholder="country"
              required
            />
            <Input
              {...form.getFieldProps("address.city")}
              error={form.touched.address?.city && form.errors.address?.city}
              type="text"
              placeholder="city"
              required
            />
            <Input
              {...form.getFieldProps("address.street")}
              error={
                form.touched.address?.street && form.errors.address?.street
              }
              type="text"
              placeholder="street"
              required
            />
          </div>
          <div className="row g-3 mt-2">
            <Input
              {...form.getFieldProps("address.houseNumber")}
              error={
                form.touched.address?.houseNumber &&
                form.errors.address?.houseNumber
              }
              type="number"
              placeholder="House Number"
              required
            />
            <Input
              {...form.getFieldProps("address.zip")}
              error={form.touched.address?.zip && form.errors.address?.zip}
              type="number"
              placeholder="zip"
              required
            />
            <div className="row mt-3 justify-content-center align-items-center">
              <div className="col d-flex justify-content-center align-items-center "></div>
              <div className="row mt-3 mb-3">
                <button
                  type="button"
                  className=" col-4 btn btn-outline-danger"
                  onClick={() => navigate("/my-cards")}
                >
                  cancel
                </button>
                <button
                  type="reset"
                  className=" col-4 btn btn-outline-secondary"
                >
                  <i className="bi bi-arrow-repeat"></i>
                </button>
                <button
                  disabled={!form.isValid}
                  type="submit"
                  className=" col-4 btn btn-outline-primary"
                >
                  update card
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditCard;
