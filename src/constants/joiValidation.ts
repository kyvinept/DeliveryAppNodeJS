import Joi from 'joi';

export default {
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).max(32).required(),
  optionalImages: Joi.array().items(Joi.string().uri()).min(1),
  paggination: {
    page: Joi.number().min(1).default(1),
    per_page: Joi.number().min(1).default(10),
  },
  optionalLocation: Joi.object({
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),
  }),
};
