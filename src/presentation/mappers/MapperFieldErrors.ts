import { $ZodIssue } from "zod/v4/core";

export type FieldErrors = Record<string, string[]>;

/**
 * Transforma un arreglo de ZodIssue en un objeto plano compatible con useActionState y la UI.
 *
 * @param issues Arreglo de errores devuelto por `result.error.issues` en Zod.
 * @returns Objeto clave-valor con los mensajes de error asociados a cada campo.
 */
export function mapperFieldErrors(issues: $ZodIssue[]): FieldErrors {
    const errorsMap: FieldErrors = {};

    for (const issue of issues) {
        // Obtiene el nombre del campo (primer nivel del path) o lo asigna a _global
        const firstPathElement = issue.path[0];
        const valueElement = firstPathElement !== undefined ? String(firstPathElement) : "_global";

        // Si el campo aún no está inicializado en el objeto, crea el arreglo vacío
        if (!errorsMap[valueElement]) {
            errorsMap[valueElement] = [];
        }

        // Agrega el mensaje al listado del campo correspondiente
        errorsMap[valueElement].push(issue.message);
    }

    return errorsMap;
}
