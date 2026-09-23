import { Skill } from "@/domain/entities";
import { SkillRepository } from "@/domain/repositories/SkillRepository";
import { prisma } from "@/infrastructure/database/prisma/client";
import { SkillMapper } from "@/infrastructure/database/prisma/mappers/SkillMapper";
import { PrismaErrorMapper } from "@/infrastructure/database/prisma/PrismaErrorMapper";

export class PrismaSkillRepository implements SkillRepository {
    async findAll(filter?: { sectorId?: string }): Promise<Skill[]> {
        try {
            const skills = await prisma.skill.findMany({
                where: filter?.sectorId ? { sectorId: filter.sectorId } : undefined,
                include: { sector: true },
                orderBy: [{ category: "asc" }, { name: "asc" }],
            });

            return skills.map(SkillMapper.toDomain);
        } catch (error) {
            throw PrismaErrorMapper.toDomainError(error);
        }
    }
}
