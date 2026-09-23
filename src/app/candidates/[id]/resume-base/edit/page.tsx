import Link from "next/link";
import EditResumeBaseForm from "@/app/ui/components/EditResumeBaseForm";
import { PrismaCandidateRepository } from "@/infrastructure/database/prisma/repositories/PrismaCandidateRepository";
import { PrismaResumeBaseRepository } from "@/infrastructure/database/prisma/repositories/PrismaResumeBaseRepository";
import { ResumeBaseResponseMapper } from "@/presentation/mappers/ResumeBaseResponseMapper";

export default async function EditResumeBaseCandidatePage({ params }: { params: Promise<{ id: string }> }) {
    const candidateId = (await params).id;

    const candidateRepository = new PrismaCandidateRepository();
    const resumeBaseRepository = new PrismaResumeBaseRepository();

    const candidate = await candidateRepository.findById(candidateId);

    if (!candidate) {
        return (
            <main className="flex flex-col items-center justify-center gap-4 py-24">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Candidato no encontrado</p>
                <Link href="/candidates" className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                    Volver al listado de candidatos
                </Link>
            </main>
        );
    }

    const existingResumeBase = await resumeBaseRepository.findByCandidateId(candidateId);

    if (!existingResumeBase) {
        return (
            <main className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    { candidate.fullName } aún no tiene una hoja de vida registrada
                </p>
                <Link
                    href={ `/candidates/${ candidateId }/resume-base/create` }
                    className="text-sm font-semibold text-cyan-600 dark:text-cyan-400"
                >
                    Crear hoja de vida
                </Link>
            </main>
        );
    }

    const resumeBase = ResumeBaseResponseMapper.toResponse(existingResumeBase);

    return (
        <main className="flex flex-col items-center gap-4 py-8 md:py-10">
            <div className="w-full max-w-3xl px-4 text-center">
                <h1 className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white">Editar hoja de vida</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Candidato: <span className="font-medium text-gray-700 dark:text-gray-300">{ candidate.fullName }</span>
                </p>
            </div>
            <EditResumeBaseForm candidateId={ candidateId } resumeBase={ resumeBase }/>
        </main>
    );
}
