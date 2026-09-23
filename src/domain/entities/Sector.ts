import { randomUUID } from "node:crypto";
import type { Skill } from './Skill';

export interface SectorProps {
    name: string;
    description?: string | null;
    skills?: Skill[];
    id?: string;
}

export class Sector {
    id?: string;
    name: string;
    description?: string | null;
    skills?: Skill[];

    constructor(props: SectorProps) {
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.skills = props.skills;
    }

    static create(props: SectorProps) {
        return new Sector({
            id: props.id ?? randomUUID(),
            ...props,
        });
    }
}
