import { Sector } from "@/domain/entities";
import { SectorRepository } from "@/domain/repositories/SectorRepository";
import { prisma } from "@/infrastructure/database/prisma/client";
import { SectorMapper } from "@/infrastructure/database/prisma/mappers/SectorMapper";
import { PrismaErrorMapper } from "@/infrastructure/database/prisma/PrismaErrorMapper";

export class PrismaSectorRepository implements SectorRepository {
    async findAll(): Promise<Sector[]> {
        try {
            const sectors = await prisma.sector.findMany({ orderBy: { name: "asc" } });

            return sectors.map(SectorMapper.toDomain);
        } catch (error) {
            throw PrismaErrorMapper.toDomainError(error);
        }
    }
}
