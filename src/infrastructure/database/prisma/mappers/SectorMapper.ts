import { Sector } from "@/domain/entities";
import { Sector as PrismaSector } from "@/generated/prisma/client";

export class SectorMapper {
    static toDomain(data: PrismaSector): Sector {
        return Sector.create({
            id: data.id,
            name: data.name,
            description: data.description,
            skills: [],
        });
    }
}
