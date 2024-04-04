import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

class UserValidator {

  private static registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    fullname: Joi.string().required(), 
    password: Joi.string().min(6).required(),
  });

  private static loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  private static idSchema = Joi.object({
    userId: Joi.string().required()
  });

  private static updateSchema = Joi.object({
    username: Joi.string().min(3).max(30),
    fullname: Joi.string(), 
  });

  // Validation
  static validateRegister(req: Request, res: Response, next: NextFunction) {
    const validationResult = UserValidator.registerSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ success: false, error: validationResult.error.details[0].message });
    }
  
    next();
  }

  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const validationResult = UserValidator.loginSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ success: false, error: validationResult.error.details[0].message });
    }

    next();
  }

  static validateID(req: Request, res: Response, next: NextFunction) {
    const { error } = UserValidator.idSchema.validate(req.params, { allowUnknown: true });
    if (error) {
      return res.status(400).json({ success: false, error: 'Invalid user ID' });
    }
    next();
  }

  static validateUpdate(req: Request, res: Response, next: NextFunction) {
    const validationResult = UserValidator.updateSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ success: false, error: validationResult.error.details[0].message });
    }
  
    next();
  }
}

export default UserValidator;
