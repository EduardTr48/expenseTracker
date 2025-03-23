import { Income } from "../types/income";

export const obtenerIngresoTotal = (ingresos: Income[]): number => {
    return ingresos.reduce((acc, ingreso) => (acc = acc + Number(ingreso.monto)), 0);
};
