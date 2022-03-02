import Joi from 'joi';

export default {
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).max(32).required(),
  paggination: {
    page: Joi.number().min(1).default(1),
    per_page: Joi.number().min(1).default(10),
  },
};
