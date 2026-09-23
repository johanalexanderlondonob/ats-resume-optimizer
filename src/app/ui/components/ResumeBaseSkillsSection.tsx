'use client'

import { useEffect, useMemo, useState } from "react";
import { TrashIcon } from '@heroicons/react/20/solid'

const INPUT_CLASS = "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-cyan-500";
const SELECT_CLASS = "block w-full appearance-none rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-cyan-500";
const LABEL_CLASS = "block text-sm/6 font-medium text-gray-900 dark:text-white";

function genId(): string {
    return Math.random().toString(36).slice(2);
}

export interface SkillRow {
    key: string;
    skillId: string;
    name: string;
    category: string;
    level: string;
    yearsExperience: string;
    evidence: string;
}

interface SectorDTO {
    id: string;
    name: string;
    description?: string | null;
}

interface SkillCatalogItemDTO {
    id: string;
    name: string;
    description: string;
    category: string;
    sectorId: string;
}

export function newSkillRowFromCatalog(skill: SkillCatalogItemDTO): SkillRow {
    return {
        key: genId(),
        skillId: skill.id,
        name: skill.name,
        category: skill.category,
        level: '',
        yearsExperience: '',
        evidence: '',
    };
}

export default function ResumeBaseSkillsSection({ skills, onChange }: {
    skills: SkillRow[];
    onChange: (skills: SkillRow[]) => void;
}) {
    const [sectors, setSectors] = useState<SectorDTO[]>([]);
    const [sectorId, setSectorId] = useState<string>('');
    const [catalog, setCatalog] = useState<SkillCatalogItemDTO[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/sectors')
            .then(res => res.json())
            .then((data: SectorDTO[]) => {
                setSectors(data);
                setSectorId(prev => prev || data[0]?.id || '');
            })
            .catch(() => setSectors([]));
    }, []);

    useEffect(() => {
        if (!sectorId) return;

        let cancelled = false;

        fetch(`/api/skills?sectorId=${ sectorId }`)
            .then(res => res.json())
            .then((data: SkillCatalogItemDTO[]) => {
                if (!cancelled) setCatalog(data);
            })
            .catch(() => {
                if (!cancelled) setCatalog([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [sectorId]);

    const selectedIds = useMemo(() => new Set(skills.map(row => row.skillId)), [skills]);

    const groupedCatalog = useMemo(() => {
        const term = search.trim().toLowerCase();
        const filtered = term
            ? catalog.filter(skill => skill.name.toLowerCase().includes(term))
            : catalog;

        const groups = new Map<string, SkillCatalogItemDTO[]>();
        for (const skill of filtered) {
            groups.set(skill.category, [...(groups.get(skill.category) ?? []), skill]);
        }

        return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
    }, [catalog, search]);

    function toggleSkill(skill: SkillCatalogItemDTO, checked: boolean) {
        if (checked) {
            onChange([...skills, newSkillRowFromCatalog(skill)]);
        } else {
            onChange(skills.filter(row => row.skillId !== skill.id));
        }
    }

    function updateSkillRow(key: string, patch: Partial<SkillRow>) {
        onChange(skills.map(row => row.key === key ? { ...row, ...patch } : row));
    }

    function removeSkillRow(key: string) {
        onChange(skills.filter(row => row.key !== key));
    }

    return (
        <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className={ LABEL_CLASS }>Sector productivo</label>
                    <select
                        value={ sectorId }
                        onChange={ e => setSectorId(e.target.value) }
                        className={ `${ SELECT_CLASS } mt-2` }
                    >
                        { sectors.map(sector => (
                            <option key={ sector.id } value={ sector.id }>{ sector.name }</option>
                        )) }
                    </select>
                </div>
                <div>
                    <label className={ LABEL_CLASS }>Buscar habilidad</label>
                    <input
                        value={ search }
                        onChange={ e => setSearch(e.target.value) }
                        className={ `${ INPUT_CLASS } mt-2` }
                        placeholder="Ej. React, Docker, Comunicación..."
                    />
                </div>
            </div>

            <div className="max-h-96 overflow-y-auto rounded-lg border border-gray-200 p-4 dark:border-white/10">
                { loading && <p className="text-sm text-gray-400">Cargando catálogo de habilidades...</p> }
                { !loading && groupedCatalog.length === 0 && (
                    <p className="text-sm text-gray-400">No se encontraron habilidades para este sector.</p>
                ) }
                { !loading && groupedCatalog.map(([category, items]) => (
                    <div key={ category } className="mb-4 last:mb-0">
                        <h4 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">{ category }</h4>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            { items.map(skill => (
                                <label
                                    key={ skill.id }
                                    title={ skill.description }
                                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                                >
                                    <input
                                        type="checkbox"
                                        checked={ selectedIds.has(skill.id) }
                                        onChange={ e => toggleSkill(skill, e.target.checked) }
                                        className="mt-0.5 size-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"
                                    />
                                    <span>{ skill.name }</span>
                                </label>
                            )) }
                        </div>
                    </div>
                )) }
            </div>

            <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Habilidades seleccionadas</p>
                <div className="mt-3 space-y-3">
                    { skills.map(row => (
                        <div key={ row.key } className="relative rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-white/10 dark:bg-white/5">
                            <button
                                type="button"
                                onClick={ () => removeSkillRow(row.key) }
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400"
                            >
                                <span className="sr-only">Quitar habilidad</span>
                                <TrashIcon aria-hidden="true" className="size-4"/>
                            </button>
                            <div className="grid grid-cols-1 gap-3 pr-6">
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{ row.name }</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{ row.category }</p>
                                </div>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                    <div>
                                        <label className={ LABEL_CLASS }>Nivel</label>
                                        <input
                                            value={ row.level }
                                            onChange={ e => updateSkillRow(row.key, { level: e.target.value }) }
                                            className={ `${ INPUT_CLASS } mt-2` }
                                            placeholder="Avanzado"
                                        />
                                    </div>
                                    <div>
                                        <label className={ LABEL_CLASS }>Años de experiencia</label>
                                        <input
                                            type="number"
                                            min={ 0 }
                                            value={ row.yearsExperience }
                                            onChange={ e => updateSkillRow(row.key, { yearsExperience: e.target.value }) }
                                            className={ `${ INPUT_CLASS } mt-2` }
                                        />
                                    </div>
                                    <div>
                                        <label className={ LABEL_CLASS }>Evidencia</label>
                                        <input
                                            value={ row.evidence }
                                            onChange={ e => updateSkillRow(row.key, { evidence: e.target.value }) }
                                            className={ `${ INPUT_CLASS } mt-2` }
                                            placeholder="Enlace o referencia (opcional)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) }
                    { skills.length === 0 && <p className="text-sm text-gray-400">Aún no has seleccionado habilidades.</p> }
                </div>
            </div>
        </div>
    );
}
