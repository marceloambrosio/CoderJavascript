//Tipos de prestamos precargados, para un futuro poder agregar mas
const tipoPrestamo = [
    { tipo: 6, interes: 5 },
    { tipo: 12, interes: 10 },
    { tipo: 24, interes: 20 },
    { tipo: 36, interes: 30 },
];

//Prestamos aprobados precargados, para mostrar al final de proyecto
var prestamosAprobados = [
    { montoPrestamo: 5000, cantCuotas: 12, montoCuota: 459 },
    { montoPrestamo: 5000, cantCuotas: 6, montoCuota: 875 },
    { montoPrestamo: 3000, cantCuotas: 24, montoCuota: 150 },
    /*     [5000, 12, 459],
        [5000, 6, 875],
        [3000, 24, 150], */
];

//PrestamosAprobados va a ser una clase de ser necesario
/* class PrestamosAprobados {
    constructor(montoPrestamo, cantCuotas, montoCuota) {
        this.montoPrestamo = montoPrestamo;
        this.cantCuotas = cantCuotas;
        this.montoCuota = montoCuota;
    }
} */


/* INPUTS */
let botonPrestamo = document.getElementById("btnSolicitar");
botonPrestamo.addEventListener("click", () => {
    console.log("Se hizo click");
    let nombre = document.getElementById("nombreCliente").value;
    alert(nombre);
    let apellido = document.getElementById("apellidoCliente").value;
    alert(apellido);
    let monto = document.getElementById("montoPrestamo").value;
    alert(monto);
    let ingresos = document.getElementById("ingresoMensual").value;
    alert(ingresos);
    let tipo = document.getElementById("selectPrestamo").value;
    alert(tipo);

    calcularPrestamo(monto,ingresos);
}
)

/* calcularPrestamo(monto, ingresos); */



//Esta variables son las cantidades de cuotas que se van a permitir segun los ingresos
var cuotasValidas = [];

//Solicita los datos necesarios para iniciar
/* let prestamo = prompt("Ingrese el monto que desea solicitar");
let ingresos = prompt("Ingrese el monto total de sus ingresos mensuales");

calcularPrestamo(prestamo, ingresos); */


let historialPrestamos = document.getElementById("historialPrestamos");
for (const prest of prestamosAprobados) {
    let li = document.createElement("li");
    li.innerHTML = `Prestamo: $${prest.montoPrestamo} | ${prest.cantCuotas} cuotas de $${prest.montoCuota}.`;
    historialPrestamos.append(li);
};

let selectPrestamo = document.getElementById("selectPrestamo");
for (const item of tipoPrestamo) {
    let option = document.createElement("option");
    option.innerHTML = `${item.tipo} cuotas con ${item.interes}% de interes`;
    selectPrestamo.append(option);
};

let tasasPrestamo = document.getElementById("tasasPrestamo");
for (const item of tipoPrestamo) {
    let li = document.createElement("li");
    li.innerHTML = `Para ${item.tipo} cuotas --> ${item.interes}% de interes`;
    tasasPrestamo.append(li);
};

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
        prestamosAprobados.push({ montoPrestamo, cantCuotas, montoCuota });
        //Se agrega al array de los prestamos aprobados
        /* prestamosAprobados.push([montoPrestamo, cantCuotas, montoCuota]); */
        //Se muestran todos los prestamos aprobados
        /* alert(`Historial de prestamos aprobados:\n\nMonto prestamo, Cantidad cuotas, Monto cuota\n${prestamosAprobados.join("\n")}`) */
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


