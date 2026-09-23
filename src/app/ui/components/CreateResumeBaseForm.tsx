'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import type { EducationType } from "@/domain/entities/Education";
import type { LanguageLevel } from "@/domain/entities/Language";
import ResumeBaseSkillsSection, { type SkillRow } from "./ResumeBaseSkillsSection";

const INPUT_CLASS = "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-cyan-500";
const SELECT_CLASS = "block w-full appearance-none rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-cyan-500";
const LABEL_CLASS = "block text-sm/6 font-medium text-gray-900 dark:text-white";
const CARD_CLASS = "relative rounded-lg border border-gray-200 p-4 dark:border-white/10";

const EDUCATION_TYPE_OPTIONS: { value: EducationType; label: string }[] = [
    { value: 'Academic', label: 'Formación académica' },
    { value: 'Course', label: 'Curso' },
    { value: 'Bootcamp', label: 'Bootcamp' },
    { value: 'Certification', label: 'Certificación' },
];

const LANGUAGE_LEVEL_OPTIONS: { value: LanguageLevel; label: string }[] = [
    { value: 'A1', label: 'A1 · Principiante' },
    { value: 'A2', label: 'A2 · Básico' },
    { value: 'B1', label: 'B1 · Intermedio' },
    { value: 'B2', label: 'B2 · Intermedio alto' },
    { value: 'C1', label: 'C1 · Avanzado' },
    { value: 'C2', label: 'C2 · Avanzado alto' },
    { value: 'Native', label: 'Nativo' },
];

const CURRENCY_OPTIONS = ['COP', 'USD', 'EUR', 'MXN'];

function genId(): string {
    return Math.random().toString(36).slice(2);
}

interface EducationRow {
    key: string;
    type: EducationType;
    title: string;
    academy: string;
    description: string;
    linkCredential: string;
    startDate: string;
    finishDate: string;
    isCurrent: boolean;
}

interface ExperienceRow {
    key: string;
    company: string;
    position: string;
    startDate: string;
    finishDate: string;
    isCurrent: boolean;
    responsibilities: string;
}

interface AchievementRow {
    key: string;
    description: string;
    metric: string;
}

interface ProjectRow {
    key: string;
    title: string;
    role: string;
    evidenceUrl: string;
    achievements: AchievementRow[];
}

interface LanguageRow {
    key: string;
    title: string;
    level: LanguageLevel;
    academy: string;
    evidence: string;
}

interface ReferenceRow {
    key: string;
    fullName: string;
    phone: string;
    companyOrProject: string;
}

function newEducation(): EducationRow {
    return {
        key: genId(),
        type: 'Academic',
        title: '',
        academy: '',
        description: '',
        linkCredential: '',
        startDate: '',
        finishDate: '',
        isCurrent: false,
    };
}

function newExperience(): ExperienceRow {
    return {
        key: genId(),
        company: '',
        position: '',
        startDate: '',
        finishDate: '',
        isCurrent: false,
        responsibilities: '',
    };
}

function newAchievement(): AchievementRow {
    return { key: genId(), description: '', metric: '' };
}

function newProject(): ProjectRow {
    return { key: genId(), title: '', role: '', evidenceUrl: '', achievements: [] };
}

function newLanguage(): LanguageRow {
    return { key: genId(), title: '', level: 'B1', academy: '', evidence: '' };
}

function newReference(): ReferenceRow {
    return { key: genId(), fullName: '', phone: '', companyOrProject: '' };
}

function FieldError({ messages }: { messages?: string[] }) {
    if (!messages?.length) return null;

    return <p className="mt-2 text-sm text-red-600 dark:text-red-400">{ messages[0] }</p>;
}

function RemoveRowButton({ onClick, label }: { onClick: () => void; label: string }) {
    return (
        <button
            type="button"
            onClick={ onClick }
            className="absolute top-3 right-3 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400"
        >
            <span className="sr-only">{ label }</span>
            <TrashIcon aria-hidden="true" className="size-5"/>
        </button>
    );
}

function AddRowButton({ onClick, label }: { onClick: () => void; label: string }) {
    return (
        <button
            type="button"
            onClick={ onClick }
            className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
        >
            <PlusIcon aria-hidden="true" className="size-4"/>
            { label }
        </button>
    );
}

function SectionHeader({ title, description, onAdd, addLabel }: {
    title: string;
    description: string;
    onAdd: () => void;
    addLabel: string;
}) {
    return (
        <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
                <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">{ title }</h2>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-600 dark:text-gray-400">{ description }</p>
            </div>
            <AddRowButton onClick={ onAdd } label={ addLabel }/>
        </div>
    );
}

interface FieldErrors {
    profession?: string[];
    salaryAspiration?: string[];
    salaryCurrency?: string[];
    _global?: string[];
}

export default function CreateResumeBaseForm({ candidateId }: { candidateId: string }) {
    const router = useRouter();

    const [profession, setProfession] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [professionalProfile, setProfessionalProfile] = useState('');
    const [salaryAspiration, setSalaryAspiration] = useState('');
    const [salaryCurrency, setSalaryCurrency] = useState('COP');

    const [educations, setEducations] = useState<EducationRow[]>([]);
    const [experiences, setExperiences] = useState<ExperienceRow[]>([]);
    const [projects, setProjects] = useState<ProjectRow[]>([]);
    const [languages, setLanguages] = useState<LanguageRow[]>([]);
    const [references, setReferences] = useState<ReferenceRow[]>([]);
    const [skills, setSkills] = useState<SkillRow[]>([]);

    const [errors, setErrors] = useState<FieldErrors>({});
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [pending, setPending] = useState(false);

    function updateEducation(key: string, patch: Partial<EducationRow>) {
        setEducations(prev => prev.map(row => row.key === key ? { ...row, ...patch } : row));
    }

    function updateExperience(key: string, patch: Partial<ExperienceRow>) {
        setExperiences(prev => prev.map(row => row.key === key ? { ...row, ...patch } : row));
    }

    function updateProject(key: string, patch: Partial<Omit<ProjectRow, 'achievements'>>) {
        setProjects(prev => prev.map(row => row.key === key ? { ...row, ...patch } : row));
    }

    function addAchievement(projectKey: string) {
        setProjects(prev => prev.map(row => row.key === projectKey
            ? { ...row, achievements: [...row.achievements, newAchievement()] }
            : row));
    }

    function updateAchievement(projectKey: string, achievementKey: string, patch: Partial<AchievementRow>) {
        setProjects(prev => prev.map(row => row.key === projectKey
            ? {
                ...row,
                achievements: row.achievements.map(a => a.key === achievementKey ? { ...a, ...patch } : a),
            }
            : row));
    }

    function removeAchievement(projectKey: string, achievementKey: string) {
        setProjects(prev => prev.map(row => row.key === projectKey
            ? { ...row, achievements: row.achievements.filter(a => a.key !== achievementKey) }
            : row));
    }

    function updateLanguage(key: string, patch: Partial<LanguageRow>) {
        setLanguages(prev => prev.map(row => row.key === key ? { ...row, ...patch } : row));
    }

    function updateReference(key: string, patch: Partial<ReferenceRow>) {
        setReferences(prev => prev.map(row => row.key === key ? { ...row, ...patch } : row));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setPending(true);
        setErrors({});
        setMessage(null);

        const dto = {
            candidateId,
            profession: profession.trim(),
            aboutMe: aboutMe.trim() || undefined,
            professionalProfile: professionalProfile.trim() || undefined,
            salaryAspiration: Number(salaryAspiration),
            salaryCurrency: salaryCurrency.trim().toUpperCase(),
            educations: educations.map(row => ({
                type: row.type,
                title: row.title.trim(),
                academy: row.academy.trim(),
                description: row.description.trim() || undefined,
                linkCredential: row.linkCredential.trim() || undefined,
                startDate: row.startDate,
                finishDate: row.isCurrent ? undefined : (row.finishDate || undefined),
                isCurrent: row.isCurrent,
            })),
            experiences: experiences.map(row => ({
                company: row.company.trim(),
                position: row.position.trim(),
                startDate: row.startDate,
                finishDate: row.isCurrent ? undefined : (row.finishDate || undefined),
                responsibilities: row.responsibilities
                    .split('\n')
                    .map(line => line.trim())
                    .filter(Boolean)
                    .map(description => ({ description })),
            })),
            projects: projects.map(row => ({
                title: row.title.trim(),
                role: row.role.trim(),
                evidenceUrl: row.evidenceUrl.trim() || undefined,
                achievements: row.achievements
                    .filter(a => a.description.trim())
                    .map(a => ({
                        description: a.description.trim(),
                        metric: a.metric.trim() || undefined,
                    })),
            })),
            languages: languages.map(row => ({
                title: row.title.trim(),
                level: row.level,
                academy: row.academy.trim(),
                evidence: row.evidence.trim() || undefined,
            })),
            references: references.map(row => ({
                fullName: row.fullName.trim(),
                phone: row.phone.trim(),
                companyOrProject: row.companyOrProject.trim(),
            })),
            skills: skills.map(row => ({
                skillId: row.skillId,
                level: row.level.trim() || undefined,
                yearsExperience: row.yearsExperience ? Number(row.yearsExperience) : undefined,
                evidence: row.evidence.trim() || undefined,
            })),
        };

        try {
            const response = await fetch('/api/resume-bases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dto),
            });
            const json = await response.json();

            if (!response.ok || json?.error) {
                const issues: { field: string; message: string }[] = json?.error?.issues ?? [];
                const fieldErrors: FieldErrors = {};

                for (const issue of issues) {
                    const key = issue.field as keyof FieldErrors;
                    fieldErrors[key] = [...(fieldErrors[key] ?? []), issue.message];
                }

                setErrors(fieldErrors);
                setMessage({
                    type: 'error',
                    text: json?.error?.message ?? 'No se ha podido crear la hoja de vida',
                });
                return;
            }

            setMessage({ type: 'success', text: json.message ?? 'Hoja de vida creada satisfactoriamente' });
            router.push(`/candidates/${ candidateId }/resume-base/preview`);
        } catch {
            setMessage({ type: 'error', text: 'No se ha podido crear la hoja de vida' });
        } finally {
            setPending(false);
        }
    }

    return (
        <form onSubmit={ handleSubmit } className="w-full max-w-3xl px-4">
            <div className="space-y-12 sm:space-y-16">

                { message && (
                    <p className={ `text-sm font-medium ${ message.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' }` }>
                        { message.text }
                    </p>
                ) }

                {/* Datos generales */ }
                <div>
                    <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Datos generales</h2>
                    <p className="mt-1 max-w-2xl text-sm/6 text-gray-600 dark:text-gray-400">
                        Información principal que encabeza la hoja de vida.
                    </p>

                    <div
                        className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:border-t-gray-900/10 sm:pb-0 dark:border-white/10 dark:sm:divide-white/10 dark:sm:border-t-white/10">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="profession" className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white">
                                Profesión
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <input
                                    id="profession"
                                    value={ profession }
                                    onChange={ e => setProfession(e.target.value) }
                                    className={ `${ INPUT_CLASS } sm:max-w-md` }
                                    required
                                />
                                <FieldError messages={ errors.profession }/>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="professionalProfile" className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white">
                                Perfil profesional
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <textarea
                                    id="professionalProfile"
                                    rows={ 3 }
                                    value={ professionalProfile }
                                    onChange={ e => setProfessionalProfile(e.target.value) }
                                    className={ `${ INPUT_CLASS } sm:max-w-2xl` }
                                    placeholder="Resumen que se mostrará en la hoja de vida"
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="aboutMe" className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white">
                                Sobre mí
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <textarea
                                    id="aboutMe"
                                    rows={ 3 }
                                    value={ aboutMe }
                                    onChange={ e => setAboutMe(e.target.value) }
                                    className={ `${ INPUT_CLASS } sm:max-w-2xl` }
                                    placeholder="Notas de uso interno (opcional)"
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="salaryAspiration" className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white">
                                Aspiración salarial
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0 flex gap-3">
                                <input
                                    id="salaryAspiration"
                                    type="number"
                                    min={ 0 }
                                    value={ salaryAspiration }
                                    onChange={ e => setSalaryAspiration(e.target.value) }
                                    className={ `${ INPUT_CLASS } sm:max-w-xs` }
                                    required
                                />
                                <select
                                    id="salaryCurrency"
                                    value={ salaryCurrency }
                                    onChange={ e => setSalaryCurrency(e.target.value) }
                                    className={ `${ SELECT_CLASS } sm:max-w-24` }
                                >
                                    { CURRENCY_OPTIONS.map(code => <option key={ code } value={ code }>{ code }</option>) }
                                </select>
                            </div>
                            <div className="sm:col-start-2 sm:col-span-2">
                                <FieldError messages={ errors.salaryAspiration ?? errors.salaryCurrency }/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Habilidades */ }
                <div>
                    <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Habilidades</h2>
                    <p className="mt-1 max-w-2xl text-sm/6 text-gray-600 dark:text-gray-400">
                        Elige un sector productivo y selecciona las habilidades del catálogo que apliquen a este perfil.
                    </p>
                    <ResumeBaseSkillsSection skills={ skills } onChange={ setSkills }/>
                </div>

                {/* Educación */ }
                <div>
                    <SectionHeader
                        title="Educación"
                        description="Formación académica, cursos, bootcamps o certificaciones."
                        addLabel="Agregar estudio"
                        onAdd={ () => setEducations(prev => [...prev, newEducation()]) }
                    />
                    <div className="mt-6 space-y-4">
                        { educations.map(row => (
                            <div key={ row.key } className={ CARD_CLASS }>
                                <RemoveRowButton label="Eliminar estudio" onClick={ () => setEducations(prev => prev.filter(e => e.key !== row.key)) }/>
                                <div className="grid grid-cols-1 gap-4 pr-8 sm:grid-cols-2">
                                    <div>
                                        <label className={ LABEL_CLASS }>Tipo</label>
                                        <select
                                            value={ row.type }
                                            onChange={ e => updateEducation(row.key, { type: e.target.value as EducationType }) }
                                            className={ `${ SELECT_CLASS } mt-2` }
                                        >
                                            { EDUCATION_TYPE_OPTIONS.map(opt => <option key={ opt.value } value={ opt.value }>{ opt.label }</option>) }
                                        </select>
                                    </div>
                                    <div>
                                        <label className={ LABEL_CLASS }>Título</label>
                                        <input value={ row.title } onChange={ e => updateEducation(row.key, { title: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } required/>
                                    </div>
                                    <div>
                                        <label className={ LABEL_CLASS }>Institución</label>
                                        <input value={ row.academy } onChange={ e => updateEducation(row.key, { academy: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } required/>
                                    </div>
                                    <div>
                                        <label className={ LABEL_CLASS }>Link de la credencial</label>
                                        <input value={ row.linkCredential } onChange={ e => updateEducation(row.key, { linkCredential: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } placeholder="https://…"/>
                                    </div>
                                    <div>
                                        <label className={ LABEL_CLASS }>Fecha de inicio</label>
                                        <input type="month" value={ row.startDate } onChange={ e => updateEducation(row.key, { startDate: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } required/>
                                    </div>
                                    <div>
                                        <label className={ LABEL_CLASS }>Fecha de finalización</label>
                                        <input type="month" disabled={ row.isCurrent } value={ row.finishDate } onChange={ e => updateEducation(row.key, { finishDate: e.target.value }) } className={ `${ INPUT_CLASS } mt-2 disabled:opacity-50` }/>
                                    </div>
                                    <div className="flex items-center gap-2 sm:col-span-2">
                                        <input id={ `current-edu-${ row.key }` } type="checkbox" checked={ row.isCurrent } onChange={ e => updateEducation(row.key, { isCurrent: e.target.checked }) } className="size-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"/>
                                        <label htmlFor={ `current-edu-${ row.key }` } className="text-sm text-gray-700 dark:text-gray-300">Actualmente en curso</label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className={ LABEL_CLASS }>Descripción</label>
                                        <textarea rows={ 2 } value={ row.description } onChange={ e => updateEducation(row.key, { description: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` }/>
                                    </div>
                                </div>
                            </div>
                        )) }
                        { educations.length === 0 && <p className="text-sm text-gray-400">Aún no has agregado estudios.</p> }
                    </div>
                </div>

                {/* Experiencia laboral */ }
                <div>
                    <SectionHeader
                        title="Experiencia laboral"
                        description="Cargos ocupados y logros principales de cada uno."
                        addLabel="Agregar experiencia"
                        onAdd={ () => setExperiences(prev => [...prev, newExperience()]) }
                    />
                    <div className="mt-6 space-y-4">
                        { experiences.map(row => (
                            <div key={ row.key } className={ CARD_CLASS }>
                                <RemoveRowButton label="Eliminar experiencia" onClick={ () => setExperiences(prev => prev.filter(e => e.key !== row.key)) }/>
                                <div className="grid grid-cols-1 gap-4 pr-8 sm:grid-cols-2">
                                    <div>
                                        <label className={ LABEL_CLASS }>Empresa</label>
                                        <input value={ row.company } onChange={ e => updateExperience(row.key, { company: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } required/>
                                    </div>
                                    <div>
                                        <label className={ LABEL_CLASS }>Cargo</label>
                                        <input value={ row.position } onChange={ e => updateExperience(row.key, { position: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } required/>
                                    </div>
                                    <div>
                                        <label className={ LABEL_CLASS }>Fecha de inicio</label>
                                        <input type="month" value={ row.startDate } onChange={ e => updateExperience(row.key, { startDate: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } required/>
                                    </div>
                                    <div>
                                        <label className={ LABEL_CLASS }>Fecha de finalización</label>
                                        <input type="month" disabled={ row.isCurrent } value={ row.finishDate } onChange={ e => updateExperience(row.key, { finishDate: e.target.value }) } className={ `${ INPUT_CLASS } mt-2 disabled:opacity-50` }/>
                                    </div>
                                    <div className="flex items-center gap-2 sm:col-span-2">
                                        <input id={ `current-exp-${ row.key }` } type="checkbox" checked={ row.isCurrent } onChange={ e => updateExperience(row.key, { isCurrent: e.target.checked }) } className="size-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"/>
                                        <label htmlFor={ `current-exp-${ row.key }` } className="text-sm text-gray-700 dark:text-gray-300">Cargo actual</label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className={ LABEL_CLASS }>Responsabilidades y logros</label>
                                        <textarea rows={ 3 } value={ row.responsibilities } onChange={ e => updateExperience(row.key, { responsibilities: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } placeholder="Una responsabilidad o logro por línea"/>
                                    </div>
                                </div>
                            </div>
                        )) }
                        { experiences.length === 0 && <p className="text-sm text-gray-400">Aún no has agregado experiencia laboral.</p> }
                    </div>
                </div>

                {/* Proyectos */ }
                <div>
                    <SectionHeader
                        title="Proyectos"
                        description="Proyectos relevantes junto con sus logros medibles."
                        addLabel="Agregar proyecto"
                        onAdd={ () => setProjects(prev => [...prev, newProject()]) }
                    />
                    <div className="mt-6 space-y-4">
                        { projects.map(row => (
                            <div key={ row.key } className={ CARD_CLASS }>
                                <RemoveRowButton label="Eliminar proyecto" onClick={ () => setProjects(prev => prev.filter(p => p.key !== row.key)) }/>
                                <div className="grid grid-cols-1 gap-4 pr-8 sm:grid-cols-2">
                                    <div>
                                        <label className={ LABEL_CLASS }>Título</label>
                                        <input value={ row.title } onChange={ e => updateProject(row.key, { title: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } required/>
                                    </div>
                                    <div>
                                        <label className={ LABEL_CLASS }>Rol</label>
                                        <input value={ row.role } onChange={ e => updateProject(row.key, { role: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } required/>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className={ LABEL_CLASS }>Repositorio de evidencias</label>
                                        <input type="url" value={ row.evidenceUrl } onChange={ e => updateProject(row.key, { evidenceUrl: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } placeholder="https://github.com/... (respalda todos los logros del proyecto)"/>
                                    </div>
                                </div>

                                <div className="mt-4 pr-8">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Logros</p>
                                        <AddRowButton label="Agregar logro" onClick={ () => addAchievement(row.key) }/>
                                    </div>
                                    <div className="mt-3 space-y-3">
                                        { row.achievements.map(achievement => (
                                            <div key={ achievement.key } className="relative rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-white/10 dark:bg-white/5">
                                                <button type="button" onClick={ () => removeAchievement(row.key, achievement.key) } className="absolute top-2 right-2 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400">
                                                    <span className="sr-only">Eliminar logro</span>
                                                    <TrashIcon aria-hidden="true" className="size-4"/>
                                                </button>
                                                <div className="grid grid-cols-1 gap-3 pr-6 sm:grid-cols-3">
                                                    <div className="sm:col-span-2">
                                                        <label className={ LABEL_CLASS }>Descripción</label>
                                                        <input value={ achievement.description } onChange={ e => updateAchievement(row.key, achievement.key, { description: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` }/>
                                                    </div>
                                                    <div>
                                                        <label className={ LABEL_CLASS }>Métrica</label>
                                                        <input value={ achievement.metric } onChange={ e => updateAchievement(row.key, achievement.key, { metric: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } placeholder="+30%"/>
                                                    </div>
                                                </div>
                                            </div>
                                        )) }
                                        { row.achievements.length === 0 && <p className="text-sm text-gray-400">Sin logros agregados.</p> }
                                    </div>
                                </div>
                            </div>
                        )) }
                        { projects.length === 0 && <p className="text-sm text-gray-400">Aún no has agregado proyectos.</p> }
                    </div>
                </div>

                {/* Idiomas */ }
                <div>
                    <SectionHeader
                        title="Idiomas"
                        description="Idiomas que dominas y su nivel."
                        addLabel="Agregar idioma"
                        onAdd={ () => setLanguages(prev => [...prev, newLanguage()]) }
                    />
                    <div className="mt-6 space-y-4">
                        { languages.map(row => (
                            <div key={ row.key } className={ CARD_CLASS }>
                                <RemoveRowButton label="Eliminar idioma" onClick={ () => setLanguages(prev => prev.filter(l => l.key !== row.key)) }/>
                                <div className="grid grid-cols-1 gap-4 pr-8 sm:grid-cols-2">
                                    <div>
                                        <label className={ LABEL_CLASS }>Idioma</label>
                                        <input value={ row.title } onChange={ e => updateLanguage(row.key, { title: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } required/>
                                    </div>
                                    <div>
                                        <label className={ LABEL_CLASS }>Nivel</label>
                                        <select value={ row.level } onChange={ e => updateLanguage(row.key, { level: e.target.value as LanguageLevel }) } className={ `${ SELECT_CLASS } mt-2` }>
                                            { LANGUAGE_LEVEL_OPTIONS.map(opt => <option key={ opt.value } value={ opt.value }>{ opt.label }</option>) }
                                        </select>
                                    </div>
                                    <div>
                                        <label className={ LABEL_CLASS }>Certificado por</label>
                                        <input value={ row.academy } onChange={ e => updateLanguage(row.key, { academy: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } required/>
                                    </div>
                                    <div>
                                        <label className={ LABEL_CLASS }>Evidencia</label>
                                        <input value={ row.evidence } onChange={ e => updateLanguage(row.key, { evidence: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } placeholder="Enlace del certificado (opcional)"/>
                                    </div>
                                </div>
                            </div>
                        )) }
                        { languages.length === 0 && <p className="text-sm text-gray-400">Aún no has agregado idiomas.</p> }
                    </div>
                </div>

                {/* Referencias */ }
                <div>
                    <SectionHeader
                        title="Referencias"
                        description="Contactos que pueden dar referencia de tu trabajo."
                        addLabel="Agregar referencia"
                        onAdd={ () => setReferences(prev => [...prev, newReference()]) }
                    />
                    <div className="mt-6 space-y-4">
                        { references.map(row => (
                            <div key={ row.key } className={ CARD_CLASS }>
                                <RemoveRowButton label="Eliminar referencia" onClick={ () => setReferences(prev => prev.filter(r => r.key !== row.key)) }/>
                                <div className="grid grid-cols-1 gap-4 pr-8 sm:grid-cols-3">
                                    <div>
                                        <label className={ LABEL_CLASS }>Nombre completo</label>
                                        <input value={ row.fullName } onChange={ e => updateReference(row.key, { fullName: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } required/>
                                    </div>
                                    <div>
                                        <label className={ LABEL_CLASS }>Teléfono</label>
                                        <input value={ row.phone } onChange={ e => updateReference(row.key, { phone: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } required/>
                                    </div>
                                    <div>
                                        <label className={ LABEL_CLASS }>Empresa o proyecto</label>
                                        <input value={ row.companyOrProject } onChange={ e => updateReference(row.key, { companyOrProject: e.target.value }) } className={ `${ INPUT_CLASS } mt-2` } required/>
                                    </div>
                                </div>
                            </div>
                        )) }
                        { references.length === 0 && <p className="text-sm text-gray-400">Aún no has agregado referencias.</p> }
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-6 dark:border-white/10">
                <button
                    type="submit"
                    disabled={ pending }
                    className="inline-flex justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-cyan-500 dark:shadow-none dark:hover:bg-cyan-400 dark:focus-visible:outline-cyan-500"
                >
                    { pending ? 'Guardando...' : 'Agregar hoja de vida' }
                </button>
            </div>
        </form>
    )
}
