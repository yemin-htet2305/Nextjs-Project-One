import { ZodError, ZodSchema, z } from "zod/v4";

const signinValidateBody = <T>(body: unknown, schema: ZodSchema<T>, partial: boolean = false): T => {
    const validated = partial ? (schema as any).partial().safeParse(body) : schema.safeParse(body);
    return validated;
}

export default signinValidateBody;