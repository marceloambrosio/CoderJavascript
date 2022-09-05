let prestamo = prompt("Ingrese el monto que desea solicitar")
let ingresos = prompt("Ingrese el monto total de sus ingresos mensuales")
let cuotas = prompt("Ingrese la cantidad de cuotas que desea pagar")

var prestamosAprobados = [];

function calcularCuotas(montoPrestamo, montoIngresos, cantCuotas) {
    //Esto calcula el monto maximo de la cuota (30% de los ingresos)
    let maxCuota = montoIngresos * 0.3;
    //Calcula el valor de la cuota (El prestamo tiene un 10% de recargo)
    let montoCuota = ((montoPrestamo * 1.1) / cantCuotas);
    //Calcula la cantidad minima de cuotas que necesita para pagar
    let minCuotas = Math.trunc((montoPrestamo * 1.1) / maxCuota) + 1;

    
    if (montoCuota > maxCuota) {
        alert(`No se puede aprobar el credito\n
        La cuota seria de $${montoCuota} y no puede superar $${maxCuota}\n
        Tendrian que ser al menos ${minCuotas} cuotas.`);

    } else {
        alert(`¡Felicitades, se aprobo su credito!\n
        Detalle: ${cantCuotas} cuotas de $${montoCuota}.`);
        //Se agrega al array de los prestamos aprobados
        prestamosAprobados.push([montoPrestamo, cantCuotas, montoCuota])
        //Se muestran todos los prestamos aprobados
        alert(`Historial de prestamos aprobados:\n${prestamosAprobados}`)
    }

}

calcularCuotas(prestamo,ingresos,cuotas);


/* Para probar:
    Se aprueba el prestamo:
        Prestamo 5000
        Ingresos 1000
        Cuotas 19 o mas

    No se aprueba el prestamo:
        Prestamo 5000
        Ingresos 1000
        Cuotas 18 o menos
*/