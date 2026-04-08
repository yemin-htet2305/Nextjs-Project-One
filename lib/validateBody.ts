import { ZodError, ZodSchema, z } from "zod/v4";

const validateBody = <T>(body: unknown, schema: ZodSchema<T>, partial: boolean = false): T => {
    const validated = partial ? (schema as any).partial().safeParse(body) : schema.safeParse(body);
    if (!validated.success) { throw new ZodError(validated.error.issues) }
    return validated.data;
}

export default validateBody;