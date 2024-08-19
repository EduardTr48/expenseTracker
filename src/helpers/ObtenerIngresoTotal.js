export const obtenerIngresoTotal = (ingresos) => {
    return ingresos.reduce((acc, ingreso) => (acc = acc + Number(ingreso.monto)), 0);
};
