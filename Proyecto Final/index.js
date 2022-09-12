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
    let apellido = document.getElementById("apellidoCliente").value;
    let monto = document.getElementById("montoPrestamo").value;
    let ingresos = document.getElementById("ingresoMensual").value;
    let tipo = parseInt((document.getElementById("selectPrestamo").value).substring(0,2));

    calcularPrestamo(monto, tipo);
});

let ingresosInput = document.getElementById("ingresoMensual");
ingresosInput.onkeyup = () => {
    //Esto calcula el monto maximo de la cuota (30% de los ingresos)
    let ingresos = document.getElementById("ingresoMensual").value;
    let maxCuota = ingresos * 0.3;

    //Calcula la cantidad minima de cuotas que necesita para pagar
    let monto = document.getElementById("montoPrestamo").value;
    let minCuotas = Math.ceil(monto / maxCuota);

    //Busca las cuotas posibles para el select
    let selectPrestamo = document.getElementById("selectPrestamo");

    //Esto borra la lista del select para que no se carguen siempre
    while (selectPrestamo.firstChild){
        selectPrestamo.removeChild(selectPrestamo.firstChild)
    }
        for (const item of tipoPrestamo) {
            if (minCuotas <= parseInt(item.tipo)) {
                let option = document.createElement("option");
                option.innerHTML = `${item.tipo} cuotas con ${item.interes}% de interes`;
                selectPrestamo.append(option);
            }
        }

    }

//Carga el array de historial de prestamos en la section
let historialPrestamos = document.getElementById("historialPrestamos");
for (const prest of prestamosAprobados) {
    let li = document.createElement("li");
    li.innerHTML = `Prestamo: $${prest.montoPrestamo} | ${prest.cantCuotas} cuotas de $${prest.montoCuota}.`;
    historialPrestamos.append(li);
};

//Carga las tasas de interes del section
let tasasPrestamo = document.getElementById("tasasPrestamo");
for (const item of tipoPrestamo) {
    let li = document.createElement("li");
    li.innerHTML = `Para ${item.tipo} cuotas --> ${item.interes}% de interes`;
    tasasPrestamo.append(li);
};

function calcularPrestamo(montoPrestamo, cuotasPrestamo) {

    let interesPrestamo = 0;
    //Carga en un array las cantidades de cuotas posibles
    for (const item of tipoPrestamo) {
        /* if (minCuotas <= parseInt(item.tipo)) cuotasValidas.push(item.tipo) */
        if (cuotasPrestamo===item.tipo) interesPrestamo = item.interes / 100 + 1;
    }

    montoPrestamo = Math.ceil(montoPrestamo * interesPrestamo);
    montoCuotas = Math.ceil(montoPrestamo / cuotasPrestamo);

    alert(`¡Felicitades, se aprobo su prestamo de $${montoPrestamo}!\n
        Detalle: ${cuotasPrestamo} cuotas de $${montoCuotas}.`);

    prestamosAprobados.push({montoPrestamo: montoPrestamo, cantCuotas: cuotasPrestamo, montoCuota: montoCuotas});

}