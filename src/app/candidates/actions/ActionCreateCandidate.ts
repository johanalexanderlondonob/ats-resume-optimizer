'use server'

import { CreateCandidateDTO } from "@/application/dto/CreateCandidateDTO";
import { CreateCandidateUseCase } from "@/application/use-cases/candidates/CreateCandidateUseCase";
import { PrismaCandidateRepository } from "@/infrastructure/database/prisma/repositories/PrismaCandidateRepository";
import { FieldErrors, mapperFieldErrors } from "@/presentation/mappers/MapperFieldErrors";
import { CreateCandidateSchema } from "@/presentation/validators/CreateCandidateSchema";

export interface FormCreateCandidateState {
    success?: boolean,
    errors?: FieldErrors,
    message?: string,
    form?: Partial<CreateCandidateDTO>
    data?: object
}

export async function ActionCreateCandidate(prevState: FormCreateCandidateState, formDate: FormData): Promise<FormCreateCandidateState> {
    const createCandidate = Object.fromEntries(formDate.entries()) as unknown as CreateCandidateDTO;

    const validated = CreateCandidateSchema.safeParse(createCandidate);

    if (!validated.success) {
        const errorsFound = mapperFieldErrors(validated.error.issues);
        return {
            success: false,
            errors: errorsFound,
            message: 'No se ha podido crear el candidato',
            form: createCandidate,
        }
    }

    const candidate = validated.data;
    console.log(candidate);

    try {
        const candidateRepository = new PrismaCandidateRepository();
        const useCreateCandidate = new CreateCandidateUseCase(candidateRepository);

        const createdCandidate = await useCreateCandidate.execute(candidate);

        if (createdCandidate) {
            return {
                success: true,
                message: 'Candidato creado satisfactoriamente',
                data: { ...createdCandidate },
                form: {},
            }
        } else {
            return {
                success: false,
                message: 'Por alguna razón no se ha podido crear el candidato.',
                form: createCandidate,
            }
        }
    } catch (error) {
        return {
            success: false,
            message: 'No se ha podido crear el candidato',
            form: createCandidate,
        }
    }
}