import React from 'react';
import emailValidator from 'email-validator';

const alphabetRegex = /^[a-zA-Z]+$/;
const passwordRegex =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

const Validate = {
  name: (name) => {
    if (name.length < 2) return 'Must be atleast 2 charecters';
    if (!alphabetRegex.test(name))
      return 'Name must consist of only alphabetical charecters';
    return null;
  },

  email: (email) => {
    if (!emailValidator.validate(email)) return 'Not a valid email';
    return null;
  },

  password: (password) => {
    if (!passwordRegex.test(password)) return 'Password too week';
    return null;
  },

  confirmPassword: (password, confirmPassword) => {
    if (!(password === confirmPassword)) return 'Passwords are not the same';
    return null;
  },

  signUp: (firstName, lastName, email, password, confirmPassword) => {
    return (
      Validate.name(firstName) ||
      Validate.name(lastName) ||
      Validate.email(email) ||
      Validate.password(password) ||
      Validate.confirmPassword(password, confirmPassword)
    );
  },
};

export default Validate;
