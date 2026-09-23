import { PrismaSectorRepository } from "@/infrastructure/database/prisma/repositories/PrismaSectorRepository";
import { HttpErrorMapper } from "@/presentation/http/HttpErrorMapper";
import { NextResponse } from "next/server";

const sectorRepository = new PrismaSectorRepository();

export async function GET() {
    try {
        const sectors = await sectorRepository.findAll();

        return NextResponse.json(sectors.map((sector) => ({
            id: sector.id,
            name: sector.name,
            description: sector.description,
        })));
    } catch (error) {
        return HttpErrorMapper.toResponse(error);
    }
}
