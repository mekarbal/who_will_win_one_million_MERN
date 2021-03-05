const Joi = require("joi");

const adminValidations = (data) => {
  const AdminValidation = Joi.object({
    full_name: Joi.string().min(4).required(),
    phone: Joi.string().min(10).required(),
    password: Joi.string().min(6).required(),
  });
  return AdminValidation.validate(data);
};

const LoginValidations = (data) => {
  const adminLoginValidation = Joi.object({
    phone: Joi.string().min(10).required(),
    password: Joi.string().min(6).required(),
  });
  return adminLoginValidation.validate(data);
};

const participantValidations = (data) => {
  const participantValidation = Joi.object({
    full_name: Joi.string().min(6).required(),
    age: Joi.required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(14).required(),
    password: Joi.string().min(6).required(),
  });
  return participantValidation.validate(data);
};

const participantLoginValidations = (data) => {
  const participantLoginValidation = Joi.object({
    phone: Joi.string().min(10).required(),
    password: Joi.string().min(6).required(),
  });
  return participantLoginValidation.validate(data);
};

exports.adminValidations = adminValidations;
exports.LoginValidations = LoginValidations;
exports.participantValidations = participantValidations;
exports.participantLoginValidations = participantLoginValidations;
