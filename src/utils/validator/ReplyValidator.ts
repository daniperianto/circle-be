import * as joi from "joi"

export const createReplySchema = joi.object({
    content:joi
        .string()
        .required(),

    image:joi
        .string()
})