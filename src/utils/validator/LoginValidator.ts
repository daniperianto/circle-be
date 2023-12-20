import * as joi from "joi"

export const createLoginUserSchema = joi.object({
    username:joi
        .string()
        .pattern(new RegExp('@*'))
        .min(3)
        .max(20),

    email:joi
        .string()
        .min(4),

    password:joi
        .string()
        .min(8)
        .required(),
})