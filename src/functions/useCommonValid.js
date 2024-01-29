import { useState } from 'react';

// useCommonValid フック
const useCommonValid = (validationFunction, errorMessage) => {
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');

  const validate = (value) => {
    if (validationFunction(value)) {
      setIsValid(true);
      setError('');
    } else {
      setIsValid(false);
      setError(errorMessage);
    }

    return isValid;
  };

  return { validate, isValid, error };
};

export default useCommonValid;
