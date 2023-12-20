import * as joi from "joi"

export const createUserSchema = joi.object({
    username:joi
        .string()
        .pattern(new RegExp(`[@]*`))
        .min(3)
        .max(20)
        .required(),
    
    fullname:joi
        .string()
        .min(2)
        .max(30)
        .required(),

    email:joi
        .string()
        .min(4)
        .required(),

    password:joi
        .string()
        .min(8)
        .required(),

    bio:joi
        .string(),

    photo_profile:joi
        .string()

})