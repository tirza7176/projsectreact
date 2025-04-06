function Input({ label, error, ...rest }) {
  const { type, name, required } = rest;
  return (
    <div className="col-4">
      {type !== "checkbox" && (
        <>
          <label htmlFor={name} className="">
            {label}
            {required && <span className="text-danger ms-1">*</span>}
          </label>
          <input
            className={["form-control", error ? "is-invalid" : ""].join(" ")}
            id={name}
            {...rest}
          ></input>

          <div className="invalid-feedback text-danger ms-1">{error}</div>
        </>
      )}
      {type === "checkbox" && (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={name}
            {...rest}
          />
          <label className="form-check-label" htmlFor={name}>
            {label}
          </label>
        </div>
      )}
    </div>
  );
}
export default Input;
