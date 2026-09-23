import { CreateResumeBaseSchema } from "@/presentation/validators/CreateResumeBaseSchema";

/**
 * La edición sustituye la hoja de vida completa (mismo payload que la
 * creación), así que reutilizamos el esquema de creación.
 */
export const UpdateResumeBaseSchema = CreateResumeBaseSchema;
