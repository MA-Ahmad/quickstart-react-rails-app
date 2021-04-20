export const validateEmail = value => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

export const validatePassword = value => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (value.length < 5) {
    error = 'Must be 6 characters or more';
  }
  return error;
};

export const validateName = value => {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
};
