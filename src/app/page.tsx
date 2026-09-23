import Link from "next/link";
import { UserPlusIcon, UsersIcon } from '@heroicons/react/24/outline'

export default function Home() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24 dark:bg-black">
            <main className="flex w-full max-w-2xl flex-col items-center text-center">
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                    Optimizador de hojas de vida
                </h1>
                <p className="mt-4 max-w-lg text-base text-gray-600 dark:text-gray-400">
                    Registra candidatos y agrega su hoja de vida en un solo lugar.
                </p>

                <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                    <Link
                        href="/candidates/create"
                        className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white p-6 text-center shadow-xs transition-colors hover:border-cyan-600 hover:bg-cyan-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-cyan-500 dark:hover:bg-white/10"
                    >
                        <UserPlusIcon aria-hidden="true" className="size-8 text-cyan-600 dark:text-cyan-400"/>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Agregar candidato</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Registra un nuevo usuario</span>
                    </Link>

                    <Link
                        href="/candidates"
                        className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white p-6 text-center shadow-xs transition-colors hover:border-cyan-600 hover:bg-cyan-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-cyan-500 dark:hover:bg-white/10"
                    >
                        <UsersIcon aria-hidden="true" className="size-8 text-cyan-600 dark:text-cyan-400"/>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Ver candidatos</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Consulta el listado y agrega su hoja de vida</span>
                    </Link>
                </div>
            </main>
        </div>
    );
}
