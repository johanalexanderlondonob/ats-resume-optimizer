import { UpdateResumeBaseDTO } from "@/application/dto/UpdateResumeBaseDTO";
import {
    Achievement,
    Education,
    Experience,
    Language,
    Project,
    Reference,
    Responsibility,
    ResumeBase,
    ResumeBaseSkill,
} from "@/domain/entities";
import { CandidateNotFoundError } from "@/domain/errors/CandidateNotFoundError";
import { ResumeBaseNotFoundError } from "@/domain/errors/ResumeBaseNotFoundError";
import { CandidateRepository } from "@/domain/repositories/CandidateRepository";
import { ResumeBaseRepository } from "@/domain/repositories/ResumeBaseRepository";

export class UpdateResumeBaseUseCase {
    constructor(
        private readonly resumeBaseRepository: ResumeBaseRepository,
        private readonly candidateRepository: CandidateRepository,
    ) {
    }

    async execute(data: UpdateResumeBaseDTO): Promise<ResumeBase> {
        // Validamos que el candidato exista.
        const candidate = await this.candidateRepository.findById(data.candidateId);

        if (!candidate) {
            throw new CandidateNotFoundError(data.candidateId);
        }

        // La hoja de vida debe existir previamente para poder editarla.
        const existingResumeBase = await this.resumeBaseRepository.findByCandidateId(data.candidateId);

        if (!existingResumeBase) {
            throw new ResumeBaseNotFoundError(data.candidateId);
        }

        // Reconstruimos el registro conservando su id.
        const resumeBase = ResumeBase.create({
            id: existingResumeBase.id,
            candidateId: data.candidateId,
            candidate,
            profession: data.profession,
            aboutMe: data.aboutMe,
            professionalProfile: data.professionalProfile,
            salaryAspiration: data.salaryAspiration,
            salaryCurrency: data.salaryCurrency,
        });

        // Si los tiene, relacionamos los datos académicos con el registro (hoja de vida).
        resumeBase.educations = data.educations?.map((education) => new Education({
            resumeBase,
            resumeBaseId: resumeBase.id!,
            type: education.type,
            title: education.title,
            academy: education.academy,
            startDate: education.startDate,
            isCurrent: education.isCurrent,
            description: education.description,
            linkCredential: education.linkCredential,
            finishDate: education.finishDate,
        }));

        // Si los tiene, relacionamos la experiencia laboral con el registro (hoja de vida).
        resumeBase.experiences = data.experiences?.map((experience) => {
            const experienceEntity = new Experience({
                resumeBase,
                resumeBaseId: resumeBase.id!,
                startDate: experience.startDate,
                company: experience.company,
                position: experience.position,
                finishDate: experience.finishDate,
                hidden: experience.hidden,
            });

            experienceEntity.responsibilities = experience.responsibilities?.map((responsibility) => new Responsibility({
                experience: experienceEntity,
                experienceId: experienceEntity.id!,
                description: responsibility.description,
            }));

            return experienceEntity;
        });

        // Si los tiene, relacionamos los proyectos con el registro (hoja de vida).
        resumeBase.projects = data.projects?.map((project) => {
            const projectEntity = new Project({
                resumeBase,
                resumeBaseId: resumeBase.id!,
                title: project.title,
                role: project.role,
                evidenceUrl: project.evidenceUrl,
                achievements: [],
            });

            projectEntity.achievements = project.achievements?.map((achievement) => new Achievement({
                project: projectEntity,
                projectId: projectEntity.id!,
                description: achievement.description,
                metric: achievement.metric,
            })) ?? [];

            return projectEntity;
        });

        // Si los tiene, relacionamos los idiomas con el registro (hoja de vida).
        resumeBase.languages = data.languages?.map((language) => new Language({
            resumeBase,
            resumeBaseId: resumeBase.id!,
            title: language.title,
            level: language.level,
            academy: language.academy,
            evidence: language.evidence,
        }));

        // Si los tiene, relacionamos las referencias con el registro (hoja de vida).
        resumeBase.references = data.references?.map((reference) => new Reference({
            resumeBase,
            resumeBaseId: resumeBase.id!,
            fullName: reference.fullName,
            phone: reference.phone,
            companyOrProject: reference.companyOrProject,
        }));

        // Si los tiene, relacionamos las habilidades con el registro (hoja de vida).
        resumeBase.skills = data.skills?.map((skill) => new ResumeBaseSkill({
            resumeBaseId: resumeBase.id!,
            skillId: skill.skillId,
            resumeBase,
            skill: null,
            level: skill.level,
            yearsExperience: skill.yearsExperience,
            evidence: skill.evidence,
        }));

        // Finalmente, persistimos el registro (hoja de vida) reemplazando sus relaciones.
        return await this.resumeBaseRepository.update(resumeBase);
    }
}
