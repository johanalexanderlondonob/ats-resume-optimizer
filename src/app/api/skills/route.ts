import { PrismaSkillRepository } from "@/infrastructure/database/prisma/repositories/PrismaSkillRepository";
import { HttpErrorMapper } from "@/presentation/http/HttpErrorMapper";
import { NextRequest, NextResponse } from "next/server";

const skillRepository = new PrismaSkillRepository();

export async function GET(request: NextRequest) {
    const sectorId = request.nextUrl.searchParams.get("sectorId") ?? undefined;

    try {
        const skills = await skillRepository.findAll({ sectorId });

        return NextResponse.json(skills.map((skill) => ({
            id: skill.id,
            name: skill.name,
            description: skill.description,
            category: skill.category,
            sectorId: skill.sectorId,
        })));
    } catch (error) {
        return HttpErrorMapper.toResponse(error);
    }
}
