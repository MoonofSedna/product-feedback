export default function ValidateForm(values) {
  let errors = {};
  if (!values.title) {
    errors.title = "Title is required";
  }

  if (!values.description) {
    errors.description = "Description is required";
  } else if (values.description?.length < 6) {
    errors.description = "Description must be at least 6 characters";
  }

  return errors;
}
