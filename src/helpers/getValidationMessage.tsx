import React from 'react';
import { Error } from '../components/Auth/styles';
import { FieldErrors } from 'react-hook-form';

const getErrorMessage = (errors: FieldErrors, fieldName: string) => {
  if (!errors[fieldName]) return;
  const errorMessages: any = {
    required: 'This field is required',
    pattern: 'This field should be a valid email',
    maxLength: 'This field is too long',
    minLength: 'This field is too short',
    min: 'Too little',
    max: 'Too much',
    validate: errors[fieldName].message,
  };
  const message: string = errorMessages[errors[fieldName].type] || 'Something went wrong.';
  return <Error>{message}</Error>;
};

export default getErrorMessage;
