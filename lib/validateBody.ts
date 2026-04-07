import { ZodError, ZodSchema, } from "zod/v4";

const validateBody = (body: unknown, schema: ZodSchema) => {
    const validated = schema.safeParse(body);

    if(!validated.success){throw new ZodError(validated.error.issues)}

    return validated;
}

export default validateBody;