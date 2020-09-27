import {ValidationError} from 'yup';

interface Errors {
  [error: string]: string;
}

export default function getValidationErrors(
  validationError: ValidationError,
): Errors {
  const errors: Errors = {};

  validationError.inner.forEach((error) => {
    errors[error.path] = error.message;
  });
  return errors;
}
