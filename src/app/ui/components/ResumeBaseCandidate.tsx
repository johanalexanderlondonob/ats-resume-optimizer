'use client'

import type {
    EducationResponseDTO,
    ExperienceResponseDTO,
    ResumeBaseResponseDTO,
} from "@/presentation/dto/ResumeBaseResponseDTO";
import type { EducationType } from "@/domain/entities/Education";
import type { LanguageLevel } from "@/domain/entities/Language";
import { PrinterIcon } from '@heroicons/react/20/solid'
import { Fragment } from "react";
import { CV_DOCUMENT_ID } from "@/app/ui/resume-theme/ThemeInitScript";
import ResumeThemeControls from "@/app/ui/resume-theme/ResumeThemeControls";
import { useResumeTheme } from "@/app/ui/resume-theme/useResumeTheme";

const MONTH_YEAR_FORMAT = new Intl.DateTimeFormat("es", { month: "short", year: "numeric", timeZone: "UTC" });

const EDUCATION_TYPE_LABEL: Record<EducationType, string> = {
    Academic: "Formación académica",
    Course: "Curso",
    Bootcamp: "Bootcamp",
    Certification: "Certificación",
};

const LANGUAGE_LEVEL_LABEL: Record<LanguageLevel, string> = {
    A1: "A1 · Principiante",
    A2: "A2 · Básico",
    B1: "B1 · Intermedio",
    B2: "B2 · Intermedio alto",
    C1: "C1 · Avanzado",
    C2: "C2 · Avanzado alto",
    Native: "Nativo",
};

function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatPeriod(startDate: string | Date, finishDate?: string | Date | null, isCurrent?: boolean): string {
    const start = capitalize(MONTH_YEAR_FORMAT.format(new Date(startDate)));

    if (isCurrent || !finishDate) return `${ start } — Presente`;

    return `${ start } — ${ capitalize(MONTH_YEAR_FORMAT.format(new Date(finishDate))) }`;
}

function byStartDateDesc(a: { startDate: string | Date }, b: { startDate: string | Date }): number {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
}

function formatSalary(amount: number, currency: string): string {
    try {
        return new Intl.NumberFormat("es", {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(amount);
    } catch {
        return `${ amount } ${ currency }`;
    }
}

// Enlaces como texto visible (el ATS lee el texto, no el href) y clicables en el PDF.
function EvidenceLink({ label, url }: { label: string, url: string }) {
    return (
        <p className="cv-body mt-1 break-all text-cv-ink-soft">
            { label }: <a href={ url } className="text-cv-ink-soft">{ url }</a>
        </p>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="cv-section-title mb-3 border-b-2 border-cv-rule pb-1 text-cv-accent">
            { children }
        </h2>
    );
}

export default function ResumeBaseCandidate({ resumeBase }: { resumeBase: ResumeBaseResponseDTO }) {
    const { palette, font, setPalette, setFont } = useResumeTheme();

    if (resumeBase === undefined) return <p>No hay datos del candidato por mostrar</p>

    const candidate = resumeBase.candidate;
    const summary = resumeBase.professionalProfile ?? resumeBase.aboutMe;

    // Las experiencias ocultas se descartan antes de renderizar el documento, así no llegan ni a la vista previa ni al PDF.
    const allExperiences = resumeBase.experiences ?? [];
    const experiences = allExperiences.filter((experience) => !experience.hidden).sort(byStartDateDesc);
    const hiddenExperiencesCount = allExperiences.length - experiences.length;
    const educations = [...(resumeBase.educations ?? [])].sort(byStartDateDesc);
    const projects = resumeBase.projects ?? [];
    const languages = resumeBase.languages ?? [];
    const references = resumeBase.references ?? [];
    const skills = resumeBase.skills ?? [];

    const skillsByCategory = new Map<string, typeof skills>();
    for (const skill of skills) {
        const category = skill.category ?? "Otras";
        skillsByCategory.set(category, [...(skillsByCategory.get(category) ?? []), skill]);
    }
    const skillGroups = Array.from(skillsByCategory.entries());

    // Los enlaces van como texto visible (lo que lee el ATS) y con href para que sean clicables en el PDF.
    const contactItems: { text: string, href?: string }[] = [
        { text: candidate?.email ?? "" },
        { text: candidate?.phone ?? "" },
        { text: candidate?.secondaryPhone ?? "" },
        { text: [candidate?.city, candidate?.country].filter(Boolean).join(", ") },
        { text: candidate?.portfolio ?? "", href: candidate?.portfolio ?? undefined },
        { text: candidate?.github ?? "", href: candidate?.github ?? undefined },
        { text: candidate?.linkedin ?? "", href: candidate?.linkedin ?? undefined },
    ].filter((item) => item.text);

    return (
        <>
            {/* Panel del editor: paleta, tipografía, nota de salario y exportación. Nunca se imprime. */}
            <div className="mb-4 flex flex-col gap-4 rounded-md border border-gray-200 bg-gray-50 p-4 print:hidden">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-gray-500">
                        Expectativa salarial: <span
                        className="font-medium text-gray-700">{ formatSalary(resumeBase.salaryAspiration, resumeBase.salaryCurrency) }</span>
                        <span className="ml-2 text-xs text-gray-400">(no se incluye en el PDF)</span>
                        { hiddenExperiencesCount > 0 && (
                            <span className="mt-1 block text-xs text-gray-400">
                                { hiddenExperiencesCount === 1
                                    ? "1 experiencia laboral oculta (no se incluye en el PDF)"
                                    : `${ hiddenExperiencesCount } experiencias laborales ocultas (no se incluyen en el PDF)` }
                            </span>
                        ) }
                    </p>
                    <button
                        type="button"
                        onClick={ () => window.print() }
                        className="inline-flex items-center gap-2 rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600"
                    >
                        <PrinterIcon aria-hidden="true" className="size-4"/>
                        Imprimir / Guardar como PDF
                    </button>
                </div>
                <ResumeThemeControls
                    palette={ palette }
                    font={ font }
                    onPaletteChange={ setPalette }
                    onFontChange={ setFont }
                />
            </div>

            {/* Documento imprimible: una sola columna, encabezados semánticos y texto real
                (sin tablas, sin iconos, sin fondos de color) para máxima compatibilidad con
                parsers ATS. Todo va alineado a la izquierda y en flujo de lectura: nada de
                justify-between ni chips en fila, porque los parsers que leen por posición
                separan el texto alineado a la derecha en otra "columna" y terminan asociando
                fechas o niveles con la entrada equivocada. Los colores y la tipografía llegan por variables CSS controladas
                por data-cv-palette/data-cv-font (ver globals.css y src/app/ui/resume-theme). */}
            <article
                id={ CV_DOCUMENT_ID }
                data-cv-palette={ palette }
                data-cv-font={ font }
                suppressHydrationWarning
                className="font-cv w-full rounded-lg border border-cv-rule bg-white p-8 text-cv-ink sm:p-12 print:rounded-none print:border-0 print:p-0 print:shadow-none"
            >
                <header className="mb-6 border-b border-cv-rule pb-4">
                    <h1 className="cv-name text-cv-accent">{ candidate?.fullName }</h1>
                    <p className="cv-title mt-1 text-cv-ink">{ resumeBase.profession }</p>
                    { contactItems.length > 0 && (
                        <p className="cv-body mt-3 text-cv-ink-soft">
                            { contactItems.map((item, index) => (
                                <Fragment key={ index }>
                                    { index > 0 && " · " }
                                    { item.href ? <a href={ item.href } className="text-cv-ink-soft">{ item.text }</a> : item.text }
                                </Fragment>
                            )) }
                        </p>
                    ) }
                </header>

                { summary && (
                    <section className="cv-entry mb-6">
                        <SectionTitle>Perfil profesional</SectionTitle>
                        <p className="cv-body text-cv-ink">{ summary }</p>
                    </section>
                ) }

                { skillGroups.length > 0 && (
                    <section className="cv-entry mb-6">
                        <SectionTitle>Habilidades</SectionTitle>
                        <div className="space-y-1.5">
                            { skillGroups.map(([category, items]) => (
                                <p key={ category } className="cv-body text-cv-ink">
                                    <span className="cv-heading text-cv-ink-soft">{ category }: </span>
                                    { items.map(skill => [
                                        skill.name,
                                        skill.level && ` · ${ skill.level }`,
                                        skill.yearsExperience ? ` (${ skill.yearsExperience } ${ skill.yearsExperience === 1 ? "año" : "años" })` : "",
                                    ].filter(Boolean).join("")).join(", ") }
                                </p>
                            )) }
                        </div>
                    </section>
                ) }

                { projects.length > 0 && (
                    <section className="mb-6">
                        <SectionTitle>Proyectos</SectionTitle>
                        <div className="space-y-4">
                            { projects.map(project => (
                                <div key={ project.id } className="cv-entry">
                                    <h3 className="cv-heading text-cv-ink">{ project.title }</h3>
                                    <p className="cv-heading text-cv-ink-soft">{ project.role }</p>
                                    { project.achievements.length > 0 && (
                                        <ul className="cv-body mt-2 list-disc space-y-1 pl-5 text-cv-ink">
                                            { project.achievements.map(achievement => (
                                                <li key={ achievement.id }>
                                                    { achievement.description }
                                                    { achievement.metric && (
                                                        <span className="font-semibold"> — { achievement.metric }</span>
                                                    ) }
                                                </li>
                                            )) }
                                        </ul>
                                    ) }
                                    { project.evidenceUrl && <EvidenceLink label="Evidencias" url={ project.evidenceUrl }/> }
                                </div>
                            )) }
                        </div>
                    </section>
                ) }

                { experiences.length > 0 && (
                    <section className="mb-6">
                        <SectionTitle>Experiencia laboral</SectionTitle>
                        <div className="space-y-4">
                            { experiences.map((experience: ExperienceResponseDTO) => (
                                <div key={ experience.id } className="cv-entry">
                                    <h3 className="cv-heading text-cv-ink">{ experience.position }</h3>
                                    <p className="cv-heading text-cv-ink-soft">
                                        { experience.company }
                                        <span className="cv-meta"> | { formatPeriod(experience.startDate, experience.finishDate) }</span>
                                    </p>
                                    { experience.responsibilities.length > 0 && (
                                        <ul className="cv-body mt-2 list-disc space-y-1 pl-5 text-cv-ink">
                                            { experience.responsibilities.map(responsibility => (
                                                <li key={ responsibility.id }>{ responsibility.description }</li>
                                            )) }
                                        </ul>
                                    ) }
                                </div>
                            )) }
                        </div>
                    </section>
                ) }

                { educations.length > 0 && (
                    <section className="mb-6">
                        <SectionTitle>Educación</SectionTitle>
                        <div className="space-y-4">
                            { educations.map((education: EducationResponseDTO) => (
                                <div key={ education.id } className="cv-entry">
                                    <h3 className="cv-heading text-cv-ink">{ education.title }</h3>
                                    <p className="cv-heading text-cv-ink-soft">
                                        { education.academy } · { EDUCATION_TYPE_LABEL[education.type] }
                                        <span className="cv-meta"> | { formatPeriod(education.startDate, education.finishDate, education.isCurrent) }</span>
                                    </p>
                                    { education.description && (
                                        <p className="cv-body mt-1 text-cv-ink">{ education.description }</p>
                                    ) }
                                    { education.linkCredential && <EvidenceLink label="Credencial" url={ education.linkCredential }/> }
                                </div>
                            )) }
                        </div>
                    </section>
                ) }

                { languages.length > 0 && (
                    <section className="cv-entry mb-6">
                        <SectionTitle>Idiomas</SectionTitle>
                        <div className="divide-y divide-dashed divide-cv-rule">
                            { languages.map(language => (
                                <p key={ language.id } className="cv-body py-1.5 text-cv-ink">
                                    <span className="cv-heading text-cv-ink">{ language.title }</span>
                                    <span className="cv-meta text-cv-ink-soft"> — { LANGUAGE_LEVEL_LABEL[language.level] } · { language.academy }</span>
                                </p>
                            )) }
                        </div>
                    </section>
                ) }

                { references.length > 0 && (
                    <section className="cv-entry">
                        <SectionTitle>Referencias</SectionTitle>
                        <div className="space-y-1.5">
                            { references.map(reference => (
                                <p key={ reference.id } className="cv-body text-cv-ink">
                                    <span className="cv-heading text-cv-ink">{ reference.fullName }</span>
                                    { " — " }
                                    <span className="text-cv-ink-soft">{ reference.companyOrProject } · { reference.phone }</span>
                                </p>
                            )) }
                        </div>
                    </section>
                ) }
            </article>
        </>
    )
}
