import { Schema } from "express-validator";

const DefaultSchema: Schema = {
    test: {
        in: "body",
        notEmpty: {
            errorMessage: "Text is required.",
        },
    },
};

export default {
    DefaultSchema,
};