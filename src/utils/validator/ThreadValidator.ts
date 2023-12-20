import * as joi from "joi"

export const createThreadSchema = joi.object({
    content:joi
        .string()
        .required(),

    image:joi
        .string()
})