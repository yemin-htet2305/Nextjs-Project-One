import { ZodSchema, z } from "zod/v4";

const signinValidateBody = <T>(body: unknown, schema: ZodSchema<T>, partial: boolean = false): z.core.util.SafeParseResult<T> => {
    return partial ? (schema as any).partial().safeParse(body) : schema.safeParse(body);
}

export default signinValidateBody;