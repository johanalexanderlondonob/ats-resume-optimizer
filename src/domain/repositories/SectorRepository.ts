import { Sector } from "../entities";

export interface SectorRepository {
    findAll(): Promise<Sector[]>;
}
