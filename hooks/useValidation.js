/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const useValidation = (initialState, validate, func) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [characters, setCharacters] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        func();
      }
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  const handleChange = (event) => {
    setCharacters(event.target.value.length);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
    event.target.reset();
  };

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  return {
    values,
    errors,
    characters,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm: () => setValues(initialState),
  };
};

export default useValidation;
