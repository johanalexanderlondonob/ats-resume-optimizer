import Link from "next/link";
import EditCandidateForm from "@/app/ui/components/EditCandidateForm";
import { PrismaCandidateRepository } from "@/infrastructure/database/prisma/repositories/PrismaCandidateRepository";

export default async function EditCandidatePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const candidateRepository = new PrismaCandidateRepository();
    const candidate = await candidateRepository.findById(id);

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

    return (
        <main className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <h1 className="text-2xl font-bold tracking-wide">Editar candidato</h1>
            <EditCandidateForm
                candidate={ {
                    id: candidate.id!,
                    fullName: candidate.fullName,
                    email: candidate.email,
                    phone: candidate.phone,
                    secondaryPhone: candidate.secondaryPhone ?? '',
                    country: candidate.country,
                    city: candidate.city,
                    portfolio: candidate.portfolio ?? '',
                    github: candidate.github ?? '',
                    linkedin: candidate.linkedin ?? '',
                } }
            />
        </main>
    );
}
