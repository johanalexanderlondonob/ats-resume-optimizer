'use server'

import { UpdateCandidateDTO } from "@/application/dto/UpdateCandidateDTO";
import { UpdateCandidateUseCase } from "@/application/use-cases/candidates/UpdateCandidateUseCase";
import { CandidateAlreadyExistsError } from "@/domain/errors/CandidateAlreadyExistsError";
import { CandidateNotFoundError } from "@/domain/errors/CandidateNotFoundError";
import { PrismaCandidateRepository } from "@/infrastructure/database/prisma/repositories/PrismaCandidateRepository";
import { FieldErrors, mapperFieldErrors } from "@/presentation/mappers/MapperFieldErrors";
import { UpdateCandidateSchema } from "@/presentation/validators/UpdateCandidateSchema";
import { revalidatePath } from "next/cache";

export interface FormUpdateCandidateState {
    success?: boolean,
    errors?: FieldErrors,
    message?: string,
    form?: Partial<UpdateCandidateDTO>
    data?: object
}

export async function ActionUpdateCandidate(prevState: FormUpdateCandidateState, formData: FormData): Promise<FormUpdateCandidateState> {
    const updateCandidate = Object.fromEntries(formData.entries()) as unknown as UpdateCandidateDTO;

    const validated = UpdateCandidateSchema.safeParse(updateCandidate);

    if (!validated.success) {
        const errorsFound = mapperFieldErrors(validated.error.issues);
        return {
            success: false,
            errors: errorsFound,
            message: 'No se ha podido actualizar el candidato',
            form: updateCandidate,
        }
    }

    const candidate = validated.data;

    try {
        const candidateRepository = new PrismaCandidateRepository();
        const useUpdateCandidate = new UpdateCandidateUseCase(candidateRepository);

        const updatedCandidate = await useUpdateCandidate.execute(candidate);

        revalidatePath('/candidates');
        revalidatePath(`/candidates/${ candidate.id }/edit`);

        return {
            success: true,
            message: 'Candidato actualizado satisfactoriamente',
            data: { ...updatedCandidate },
            form: candidate,
        }
    } catch (error) {
        if (error instanceof CandidateAlreadyExistsError) {
            return {
                success: false,
                message: 'Ya existe otro candidato con este correo electrónico',
                errors: { email: ['Ya existe otro candidato con este correo electrónico'] },
                form: candidate,
            }
        }

        if (error instanceof CandidateNotFoundError) {
            return {
                success: false,
                message: 'El candidato que intentas actualizar no existe',
                form: candidate,
            }
        }

        return {
            success: false,
            message: 'No se ha podido actualizar el candidato',
            form: candidate,
        }
    }
}
