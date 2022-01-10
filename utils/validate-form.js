export default function ValidateForm(values) {
  let errors = {};
  if (!values.title) {
    errors.title = "Title is required";
  }

  if (!values.description) {
    errors.description = "Can't be empty";
  } else if (values.description?.length < 6) {
    errors.description = "Description must be at least 6 characters";
  }

  return errors;
}
