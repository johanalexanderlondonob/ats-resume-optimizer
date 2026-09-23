import { Candidate } from "@/domain/entities";
import { Prisma, Candidate as PrismaCandidate } from "@/generated/prisma/client";

export class CandidateMapper {
    static toDomain(data: PrismaCandidate): Candidate {
        return Candidate.create(data);
    }

    static toPersistence(candidate: Candidate): Prisma.CandidateCreateInput {
        return {
            id: candidate.id,
            fullName: candidate.fullName,
            email: candidate.email,
            phone: candidate.phone,
            city: candidate.city,
            country: candidate.country,
            secondaryPhone: candidate.secondaryPhone,
            portfolio: candidate.portfolio,
            github: candidate.github,
            linkedin: candidate.linkedin,
            createdAt: candidate.createdAt,
            updatedAt: candidate.updatedAt,
        }
    }

    // El id y createdAt son inmutables; updatedAt lo administra Prisma con @updatedAt.
    static toPersistenceUpdate(candidate: Candidate): Prisma.CandidateUpdateInput {
        return {
            fullName: candidate.fullName,
            email: candidate.email,
            phone: candidate.phone,
            city: candidate.city,
            country: candidate.country,
            secondaryPhone: candidate.secondaryPhone,
            portfolio: candidate.portfolio,
            github: candidate.github,
            linkedin: candidate.linkedin,
        }
    }
}