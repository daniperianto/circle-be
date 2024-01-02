import * as joi from "joi"

export const createUpdateUserSchema = joi.object({
    username:joi
        .string()
        .pattern(new RegExp(`@*`))
        .min(3)
        .max(20),
    
    fullname:joi
        .string()
        .min(2)
        .max(30),

    email:joi
        .string()
        .min(4),

    password:joi
        .string()
        .min(8),

    bio:joi
        .string(),

    photo_profile:joi
        .string(),

    background_image:joi
        .string()

})