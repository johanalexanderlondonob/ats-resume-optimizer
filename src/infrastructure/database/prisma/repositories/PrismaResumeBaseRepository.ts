import { ResumeBase } from "@/domain/entities";
import { CandidateNotFoundError } from "@/domain/errors/CandidateNotFoundError";
import { ResumeBaseAlreadyExistsError } from "@/domain/errors/ResumeBaseAlreadyExistsError";
import { ResumeBaseNotFoundError } from "@/domain/errors/ResumeBaseNotFoundError";
import { ResumeBaseRepository } from "@/domain/repositories/ResumeBaseRepository";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/infrastructure/database/prisma/client";
import { ResumeBaseMapper } from "@/infrastructure/database/prisma/mappers/ResumeBaseMapper";
import { PrismaErrorMapper } from "@/infrastructure/database/prisma/PrismaErrorMapper";

const RESUME_BASE_INCLUDE = {
    candidate: true,
    educations: true,
    experiences: { include: { responsibilities: true } },
    projects: { include: { achievements: true } },
    languages: true,
    references: true,
    skills: { include: { skill: { include: { sector: true } } } },
} satisfies Prisma.ResumeBaseInclude;

export class PrismaResumeBaseRepository implements ResumeBaseRepository {

    // A este punto, el objeto que se viene a guardar, viene en forma de Entity.
    // Por lo tanto, se debe convertir a Persistence (o a base de datos).
    async save(resumeBase: ResumeBase): Promise<ResumeBase> {
        try {
            const data = ResumeBaseMapper.toPersistence(resumeBase);
            const created = await prisma.resumeBase.create({ data, include: RESUME_BASE_INCLUDE });

            return ResumeBaseMapper.toDomain(created);
        } catch (error) {
            throw PrismaErrorMapper.toDomainError(error, {
                onUniqueConstraintViolation: () => new ResumeBaseAlreadyExistsError(
                    resumeBase.candidate?.email ?? resumeBase.candidateId,
                ),
                onForeignKeyConstraintViolation: () => new CandidateNotFoundError(resumeBase.candidateId),
            });
        }
    }

    // La edición sustituye la hoja de vida completa. Como el esquema no define
    // `onDelete: Cascade`, borramos las filas hijas en orden (nietos antes que
    // hijos) y volvemos a crearlas dentro de una única transacción.
    async update(resumeBase: ResumeBase): Promise<ResumeBase> {
        const id = resumeBase.id!;

        try {
            const data = ResumeBaseMapper.toPersistenceUpdate(resumeBase);

            const operations = await prisma.$transaction([
                prisma.responsibility.deleteMany({ where: { experience: { resumeBaseId: id } } }),
                prisma.achievement.deleteMany({ where: { project: { resumeBaseId: id } } }),
                prisma.experience.deleteMany({ where: { resumeBaseId: id } }),
                prisma.project.deleteMany({ where: { resumeBaseId: id } }),
                prisma.education.deleteMany({ where: { resumeBaseId: id } }),
                prisma.language.deleteMany({ where: { resumeBaseId: id } }),
                prisma.reference.deleteMany({ where: { resumeBaseId: id } }),
                prisma.resumeBaseSkill.deleteMany({ where: { resumeBaseId: id } }),
                prisma.resumeBase.update({ where: { id }, data, include: RESUME_BASE_INCLUDE }),
            ]);

            const updated = operations[8];

            return ResumeBaseMapper.toDomain(updated);
        } catch (error) {
            throw PrismaErrorMapper.toDomainError(error, {
                onRecordNotFound: () => new ResumeBaseNotFoundError(resumeBase.candidateId),
                onForeignKeyConstraintViolation: () => new CandidateNotFoundError(resumeBase.candidateId),
            });
        }
    }

    async findByCandidateId(candidateId: string): Promise<ResumeBase | null> {
        try {
            const resumeBase = await prisma.resumeBase.findUnique({
                where: { candidateId },
                include: RESUME_BASE_INCLUDE,
            });

            if (!resumeBase) {
                return null;
            }

            return ResumeBaseMapper.toDomain(resumeBase);
        } catch (error) {
            throw PrismaErrorMapper.toDomainError(error);
        }
    }

    async findByCandidateEmail(candidateEmail: string): Promise<ResumeBase | null> {
        try {
            const resumeBase = await prisma.resumeBase.findFirst({
                where: { candidate: { email: candidateEmail } },
                include: RESUME_BASE_INCLUDE,
            });

            if (!resumeBase) {
                return null;
            }

            return ResumeBaseMapper.toDomain(resumeBase);
        } catch (error) {
            throw PrismaErrorMapper.toDomainError(error);
        }
    }

}
