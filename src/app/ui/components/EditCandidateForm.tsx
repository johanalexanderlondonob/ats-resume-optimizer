'use client'

import { ActionUpdateCandidate, FormUpdateCandidateState } from "@/app/candidates/actions/ActionUpdateCandidate";
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import Link from "next/link";
import { useActionState } from "react";

export interface EditCandidateFormValues {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    secondaryPhone: string;
    country: string;
    city: string;
    portfolio: string;
    github: string;
    linkedin: string;
}

function FieldError({ messages }: { messages?: string[] }) {
    if (!messages?.length) return null;

    return <p className="mt-2 text-sm text-red-600 dark:text-red-400">{ messages[0] }</p>;
}

export default function EditCandidateForm({ candidate }: { candidate: EditCandidateFormValues }) {
    const initialState: FormUpdateCandidateState = { form: candidate };
    const [stateCandidate, actionUpdateCandidate, pending] = useActionState(ActionUpdateCandidate, initialState)

    return (
        <form action={ actionUpdateCandidate }>
            <input type="hidden" name="id" value={ candidate.id }/>
            <div className="space-y-12 sm:space-y-16">
                <div>
                    <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Información personal</h2>
                    <p className="mt-1 max-w-2xl text-sm/6 text-gray-600 dark:text-gray-400">
                        Actualiza la información del candidato. Recuerda mantener el correo electrónico al día para no
                        perder las últimas novedades.
                    </p>

                    { stateCandidate.message && (
                        <p className={ `mt-6 text-sm font-medium ${ stateCandidate.success ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' }` }>
                            { stateCandidate.message }
                        </p>
                    ) }

                    <div
                        className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:border-t-gray-900/10 sm:pb-0 dark:border-white/10 dark:sm:divide-white/10 dark:sm:border-t-white/10">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label
                                htmlFor="fullName"
                                className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white"
                            >
                                Nombres completos
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    autoComplete="given-name"
                                    defaultValue={ stateCandidate.form?.fullName }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:max-w-xs sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-cyan-500"
                                />
                                <FieldError messages={ stateCandidate.errors?.fullName }/>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="email"
                                   className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white">
                                Correo electrónico
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    defaultValue={ stateCandidate.form?.email }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:max-w-md sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-cyan-500"
                                />
                                <FieldError messages={ stateCandidate.errors?.email }/>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label
                                htmlFor="phone"
                                className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white"
                            >
                                Teléfono principal
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    autoComplete="number-phone"
                                    defaultValue={ stateCandidate.form?.phone }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:max-w-xs sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-cyan-500"
                                />
                                <FieldError messages={ stateCandidate.errors?.phone }/>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label
                                htmlFor="secondaryPhone"
                                className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white"
                            >
                                Teléfono secundario
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <input
                                    id="secondaryPhone"
                                    name="secondaryPhone"
                                    type="text"
                                    autoComplete="number-phone"
                                    defaultValue={ stateCandidate.form?.secondaryPhone ?? '' }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:max-w-xs sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-cyan-500"
                                />
                                <FieldError messages={ stateCandidate.errors?.secondaryPhone }/>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="country"
                                   className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white">
                                País
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <div className="grid grid-cols-1 sm:max-w-xs">
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        defaultValue={ stateCandidate.form?.country }
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-cyan-500"
                                    >
                                        <option>Colombia</option>
                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                                    />
                                </div>
                                <FieldError messages={ stateCandidate.errors?.country }/>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="city"
                                   className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white">
                                Ciudad
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <div className="grid grid-cols-1 sm:max-w-xs">
                                    <select
                                        id="city"
                                        name="city"
                                        autoComplete="city-name"
                                        defaultValue={ stateCandidate.form?.city }
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-cyan-500"
                                    >
                                        <option>Medellín</option>
                                        <option>Caldas</option>
                                        <option>Pereira</option>
                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                                    />
                                </div>
                                <FieldError messages={ stateCandidate.errors?.city }/>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label
                                htmlFor="portfolio"
                                className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white"
                            >
                                Portafolio
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <input
                                    id="portfolio"
                                    name="portfolio"
                                    type="text"
                                    autoComplete="portfolio"
                                    defaultValue={ stateCandidate.form?.portfolio ?? '' }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:max-w-xl sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-cyan-500"
                                />
                                <FieldError messages={ stateCandidate.errors?.portfolio }/>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label
                                htmlFor="github"
                                className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white"
                            >
                                GitHub
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <input
                                    id="github"
                                    name="github"
                                    type="url"
                                    autoComplete="url"
                                    placeholder="https://github.com/usuario"
                                    defaultValue={ stateCandidate.form?.github ?? '' }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:max-w-xl sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-cyan-500"
                                />
                                <FieldError messages={ stateCandidate.errors?.github }/>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label
                                htmlFor="linkedin"
                                className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white"
                            >
                                LinkedIn
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <input
                                    id="linkedin"
                                    name="linkedin"
                                    type="url"
                                    autoComplete="url"
                                    placeholder="https://www.linkedin.com/in/usuario"
                                    defaultValue={ stateCandidate.form?.linkedin ?? '' }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:max-w-xl sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-cyan-500"
                                />
                                <FieldError messages={ stateCandidate.errors?.linkedin }/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href={ '/candidates' } type="button"
                      className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                    Descartar
                </Link>
                <button
                    type="submit"
                    disabled={ pending }
                    className="inline-flex justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-cyan-500 dark:shadow-none dark:hover:bg-cyan-400 dark:focus-visible:outline-cyan-500"
                >
                    { pending ? 'Guardando...' : 'Guardar cambios' }
                </button>
            </div>
        </form>
    )
}
