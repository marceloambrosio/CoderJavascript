//Tipos de prestamos precargados, para un futuro poder agregar mas
const tipoPrestamo = [
    { tipo: 6, interes: 5 },
    { tipo: 12, interes: 10 },
    { tipo: 24, interes: 20 },
    { tipo: 36, interes: 30 },
];

//Prestamos aprobados precargados, para mostrar al final de proyecto
var prestamosAprobados = [
    [5000, 12, 459],
    [5000, 6, 875],
    [3000, 24, 150],
];

//PrestamosAprobados va a ser una clase de ser necesario
/* class PrestamosAprobados {
    constructor(montoPrestamo, cantCuotas, montoCuota) {
        this.montoPrestamo = montoPrestamo;
        this.cantCuotas = cantCuotas;
        this.montoCuota = montoCuota;
    }
}
*/



//Esta variables son las cantidades de cuotas que se van a permitir segun los ingresos
var cuotasValidas = [];

//Solicita los datos necesarios para iniciar
let prestamo = prompt("Ingrese el monto que desea solicitar");
let ingresos = prompt("Ingrese el monto total de sus ingresos mensuales");


calcularPrestamo(prestamo, ingresos);


function calcularPrestamo(montoPrestamo, montoIngresos) {
    //Esto calcula el monto maximo de la cuota (30% de los ingresos)
    let maxCuota = montoIngresos * 0.3;
    //Calcula la cantidad minima de cuotas que necesita para pagar
    let minCuotas = Math.ceil(montoPrestamo / maxCuota);

    //Carga en un array las cantidades de cuotas posibles
    for (const item of tipoPrestamo) {
        if (minCuotas <= parseInt(item.tipo)) cuotasValidas.push(item.tipo)
    }

    //Solicita el ingreso de la cantidad de cuotas posibles (verifica en el caso que no llegue al minimo)
    if (cuotasValidas.length === 0) {
        alert(`No se puede aprobar el credito, no hay planes disponibles para usted\nLa cuota mensual no puede superar $${maxCuota}`);

    } else {

        //No hay validacion de cuotas porque se va a resolver con un select en el html
        let cantCuotas = prompt(`Ingrese la cantidad de cuotas que desea pagar\nPuede elegir ${cuotasValidas.join(", ")}`)

        let interes = 0;

        //Busca en la tabla tipoPrestamos para determinar el interes
        for (const item of tipoPrestamo) {
            if (cantCuotas == parseInt(item.tipo)) interes = parseInt(item.interes) / 100 + 1;
        }

        //Calcula el monto de la cuota con el interes correspondiente
        let montoCuota = Math.ceil((montoPrestamo * interes) / cantCuotas);

        alert(`¡Felicitades, se aprobo su credito!\n
        Detalle: ${cantCuotas} cuotas de $${montoCuota}.`);
        //Se agrega al array de los prestamos aprobados
        prestamosAprobados.push([montoPrestamo, cantCuotas, montoCuota]);
        //Se muestran todos los prestamos aprobados
        alert(`Historial de prestamos aprobados:\n\nMonto prestamo, Cantidad cuotas, Monto cuota\n${prestamosAprobados.join("\n")}`)
    }

}


/* Para probar:
    Se aprueba el prestamo:
        Prestamo 5000
        Ingresos 2000

    No se aprueba el prestamo:
        Prestamo 5000
        Ingresos 200
*/