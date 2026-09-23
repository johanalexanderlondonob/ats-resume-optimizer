import type { CreateResumeBaseDTO } from "./CreateResumeBaseDTO";

/**
 * La actualización reemplaza por completo la hoja de vida y todas sus
 * relaciones, por lo que el contrato de entrada es idéntico al de creación.
 * El `candidateId` identifica la hoja de vida a modificar.
 */
export type UpdateResumeBaseDTO = CreateResumeBaseDTO;
