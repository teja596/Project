import React from "react";
import { ErrorMessage, useField } from "formik";

const FormGroup = ({ icon, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group my-3">
      <label htmlFor="email" className="pb-2">
        {label}
      </label>
      <input
        className={`form-control shadow-none ${
          meta.touched && meta.error && "is-invalid"
        } ${!meta.error && meta.value && "is-valid"}`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="text-danger "
      />
    </div>
  );
};

export default FormGroup;
