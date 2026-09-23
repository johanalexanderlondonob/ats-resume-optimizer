import { randomUUID } from "node:crypto";
import type { JobOfferSkill } from './JobOfferSkill';
import type { ResumeBaseSkill } from './ResumeBaseSkill';
import type { Sector } from './Sector';

export interface SkillProps {
    name: string;
    description: string;
    sectorId: string;
    sector?: Sector | null;
    category: string;
    resumes?: ResumeBaseSkill[];
    jobOffers?: JobOfferSkill[];
    id?: string;
}

export class Skill {
    id?: string;
    name: string;
    description: string;
    sectorId: string;
    sector?: Sector | null;
    category: string;
    resumes?: ResumeBaseSkill[];
    jobOffers?: JobOfferSkill[];

    constructor(
        props: SkillProps) {
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.sectorId = props.sectorId;
        this.sector = props.sector;
        this.category = props.category;
        this.resumes = props.resumes;
        this.jobOffers = props.jobOffers;
    }

    static create(props: SkillProps) {
        return new Skill({
            id: props.id ?? randomUUID(),
            ...props,
        });
    }
}
