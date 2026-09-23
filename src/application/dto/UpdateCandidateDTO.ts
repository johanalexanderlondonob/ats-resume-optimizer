import type { CreateCandidateDTO } from "./CreateCandidateDTO";

export interface UpdateCandidateDTO extends CreateCandidateDTO {
    id: string;
}
