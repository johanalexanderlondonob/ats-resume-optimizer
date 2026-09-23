import { Skill } from "../entities";

export interface SkillRepository {
    findAll(filter?: { sectorId?: string }): Promise<Skill[]>;
}
