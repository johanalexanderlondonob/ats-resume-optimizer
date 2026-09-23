import { Candidate } from "@/domain/entities";
import { CandidateAlreadyExistsError } from "@/domain/errors/CandidateAlreadyExistsError";
import { CandidateNotFoundError } from "@/domain/errors/CandidateNotFoundError";
import { CandidateRepository } from "@/domain/repositories/CandidateRepository";
import { UpdateCandidateDTO } from "../../dto/UpdateCandidateDTO";

export class UpdateCandidateUseCase {
    constructor(
        private readonly candidateRepository: CandidateRepository
    ) {
    }

    async execute(data: UpdateCandidateDTO): Promise<Candidate> {
        const existingCandidate = await this.candidateRepository.findById(data.id);

        if (!existingCandidate) {
            throw new CandidateNotFoundError(data.id);
        }

        // Si el correo cambió, no puede colisionar con el de otro candidato.
        const candidateWithEmail = await this.candidateRepository.findByEmail(data.email);

        if (candidateWithEmail && candidateWithEmail.id !== data.id) {
            throw new CandidateAlreadyExistsError(data.email);
        }

        const candidate = Candidate.create({
            ...data,
            id: existingCandidate.id,
            createdAt: existingCandidate.createdAt,
            updatedAt: new Date(),
        });

        return await this.candidateRepository.update(candidate);
    }
}
