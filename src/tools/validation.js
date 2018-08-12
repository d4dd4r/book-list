export const VALIDATORS = {
  REQUIRED: Symbol('required'),
  MIN_LENGTH: Symbol('min length'),
  MAX_LENGTH: Symbol('max length'),
};

export const checkValidity = (value, rules = []) => {
  let isValid = true;

  rules.forEach(rule => {
    if (isValid && rule.type === VALIDATORS.REQUIRED) {
      isValid = String(value).trim() !== '';
    }

    if (isValid && rule.type === VALIDATORS.MIN_LENGTH) {
      isValid = String(value).length >= rule.val;
    }

    if (isValid && rule.type === VALIDATORS.MAX_LENGTH) {
      isValid = String(value).length <= rule.val;
    }
  });

  return isValid;
};
