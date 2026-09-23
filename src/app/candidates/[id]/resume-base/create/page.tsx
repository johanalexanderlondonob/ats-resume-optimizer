import Link from "next/link";
import CreateResumeBaseForm from "@/app/ui/components/CreateResumeBaseForm";
import { PrismaCandidateRepository } from "@/infrastructure/database/prisma/repositories/PrismaCandidateRepository";
import { PrismaResumeBaseRepository } from "@/infrastructure/database/prisma/repositories/PrismaResumeBaseRepository";

export default async function CreateResumeBaseCandidatePage({ params }: { params: Promise<{ id: string }> }) {
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

    if (existingResumeBase) {
        return (
            <main className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    { candidate.fullName } ya tiene una hoja de vida registrada
                </p>
                <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
                    Solo se permite una hoja de vida por candidato. Puedes editar la existente o consultarla.
                </p>
                <div className="flex items-center gap-4">
                    <Link
                        href={ `/candidates/${ candidateId }/resume-base/edit` }
                        className="text-sm font-semibold text-cyan-600 dark:text-cyan-400"
                    >
                        Editar hoja de vida
                    </Link>
                    <Link
                        href={ `/candidates/${ candidateId }/resume-base/preview` }
                        className="text-sm font-semibold text-cyan-600 dark:text-cyan-400"
                    >
                        Ver hoja de vida
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="flex flex-col items-center gap-4 py-8 md:py-10">
            <div className="w-full max-w-3xl px-4 text-center">
                <h1 className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white">Agregar hoja de vida</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Candidato: <span className="font-medium text-gray-700 dark:text-gray-300">{ candidate.fullName }</span>
                </p>
            </div>
            <CreateResumeBaseForm candidateId={ candidateId }/>
        </main>
    );
}
