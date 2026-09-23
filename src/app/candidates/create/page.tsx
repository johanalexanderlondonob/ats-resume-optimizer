import CreateCandidateForm from "@/app/ui/components/CreateCandidateForm";

export default function CreateCandidatePage() {
    return (
        <main className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <h1 className="text-2xl font-bold tracking-wide">Crear candidato</h1>
            <CreateCandidateForm/>
        </main>
    );
}