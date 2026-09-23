import zod from "zod";
import { CreateCandidateSchema } from "@/presentation/validators/CreateCandidateSchema";

export const UpdateCandidateSchema = CreateCandidateSchema.extend({
    id: zod.uuid('El id del candidato no es válido'),
});
