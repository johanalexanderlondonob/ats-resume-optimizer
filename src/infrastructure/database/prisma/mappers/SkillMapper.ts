import { Skill } from "@/domain/entities";
import { Skill as PrismaSkill } from "@/generated/prisma/client";
import { SectorMapper } from "@/infrastructure/database/prisma/mappers/SectorMapper";
import type { Sector as PrismaSector } from "@/generated/prisma/client";

type PrismaSkillWithSector = PrismaSkill & { sector?: PrismaSector };

export class SkillMapper {
    static toDomain(data: PrismaSkillWithSector): Skill {
        return Skill.create({
            id: data.id,
            name: data.name,
            description: data.description,
            sectorId: data.sectorId,
            sector: data.sector ? SectorMapper.toDomain(data.sector) : undefined,
            category: data.category,
            resumes: [],
            jobOffers: [],
        });
    }
}
