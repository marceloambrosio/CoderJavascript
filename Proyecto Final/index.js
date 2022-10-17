//Tipos de prestamos precargados, para un futuro poder agregar mas
const tipoPrestamo = [
    { tipo: 6, interes: 5 },
    { tipo: 12, interes: 10 },
    { tipo: 24, interes: 20 },
    { tipo: 36, interes: 30 },
];

//Carga las tasas de interes del section
fetch("./tasas.json")
    .then((response) => response.json())
    .then((data) => {
        let liTitle = document.createElement("li");
        liTitle.innerHTML = `Tasas de interes por cuota`;
        liTitle.classList.add('list-group-item');
        liTitle.classList.add('text-bg-warning')
        tasasPrestamo.append(liTitle);
        data.forEach((item) => {
            let li = document.createElement("li");
            li.innerHTML = `Para ${item.tipo} cuotas --> ${item.interes}% de interes`;
            li.classList.add('list-group-item');
            li.setAttribute('id', 'listaTasas');
            tasasPrestamo.append(li);
        })
    });

//Carga el historial de prestamos del localstorage en la section
let prestamosAprobados = JSON.parse(localStorage.getItem("prestamosAprobados"));
let liTitleHistorial = document.createElement("li");
liTitleHistorial.innerHTML = `Prestamos aprobados`;
liTitleHistorial.classList.add('list-group-item');
liTitleHistorial.classList.add('text-bg-warning')
historialPrestamos.append(liTitleHistorial);
for (const prest of prestamosAprobados) {
    if (prest.apelClient != '' & prest.nomClient != '' & prest.montPrest != '' & prest.cantCuot != '' & prest.montCuot != '') {
        let li = document.createElement("li");
        li.innerHTML = `${prest.apelClient}, ${prest.nomClient} | Prestamo: $${prest.montPrest} | ${prest.cantCuot} cuotas de $${prest.montCuot}.`;
        li.classList.add('list-group-item');
        historialPrestamos.append(li);
    }
};

//Verifico si no hay ningun prestamo cargado, si no hay cargo uno
//if (!JSON.parse(localStorage.getItem("prestamosAprobados"))) localStorage.setItem("prestamosAprobados", JSON.stringify([{ nomClient: 'Juan', apelClient: 'Perez',montPrest: 5000, cantCuot: 12, montCuot: 459 }]));
if (!JSON.parse(localStorage.getItem("prestamosAprobados"))) localStorage.setItem("prestamosAprobados", JSON.stringify([{ nomClient: '', apelClient: '', montPrest: '', cantCuot: '', montCuot: '' }]));

/////////////////////////////* INPUTS *////////////////////////////////
let botonPrestamo = document.getElementById("btnSolicitar");
botonPrestamo.addEventListener("click", (event) => {
    let nombre = document.getElementById("nombreCliente").value;
    let apellido = document.getElementById("apellidoCliente").value;
    let monto = document.getElementById("montoPrestamo").value;
    let ingresos = document.getElementById("ingresoMensual").value;
    let tipo = parseInt((document.getElementById("selectPrestamo").value).substring(0, 2));

    event.preventDefault();
    calcularPrestamo(nombre, apellido, monto, tipo);
    event.reload();
});

//Limpiar todos los campos input
let botonLimpiar = document.getElementById("btnLimpiar");
botonLimpiar.addEventListener("click", () => {
    document.getElementById("nombreCliente").value = "";
    document.getElementById("apellidoCliente").value = "";
    document.getElementById("montoPrestamo").value = "";
    document.getElementById("ingresoMensual").value = "";
    document.getElementById("selectPrestamo").value = "";
});

let botonLimpiarHistorial = document.getElementById("btnLimpiarHistorial");
botonLimpiarHistorial.addEventListener("click", (event) => {
    event.preventDefault(),
        Swal.fire({
            title: 'Limpiar historial de prestamos?',
            text: "Esto borrara todos los elementos guardados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ffc107',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Limpiar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                limpiarHistoriaPrestamos();
                Swal.fire({
                    icon: 'success',
                    title: 'Historial borrado',
                    showConfirmButton: true,
                    confirmButtonColor: '#ffc107',
                    confirmButtonText: 'Cerrar',
                }).then((result) => { window.location.reload() })
                //setTimeout(function () { window.location.reload(); }, 1500);
            }
        });
});

////////////////////////////////////////////////////////////////////////////////

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
    while (selectPrestamo.firstChild) {
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

/* let tasasPrestamo = document.getElementById("tasasPrestamo");
for (const item of tipoPrestamo) {
    let li = document.createElement("li");
    li.innerHTML = `Para ${item.tipo} cuotas --> ${item.interes}% de interes`;
    li.classList.add('list-group-item');
    li.setAttribute('id', 'listaTasas');
    tasasPrestamo.append(li);
}; */

function calcularPrestamo(nombreCliente, apellidoCliente, montoPrestamo, cuotasPrestamo) {
    let interesPrestamo = 0;
    //Carga en un array las cantidades de cuotas posibles
    for (const item of tipoPrestamo) {
        if (cuotasPrestamo === item.tipo) interesPrestamo = item.interes / 100 + 1;
    }

    //Se agrega el interes y se calculan las cuotas en base a ese valor
    prestamoConInteres = Math.ceil(montoPrestamo * interesPrestamo);
    montoCuotas = Math.ceil(prestamoConInteres / cuotasPrestamo);

    //alert(`¡Felicitades, se aprobo su prestamo de $${montoPrestamo}!\n
    //    Detalle: ${cuotasPrestamo} cuotas de $${montoCuotas}.`);

    Swal.fire({
        icon: 'success',
        title: 'Prestamo aprobado',
        text: `Detalle: ${cuotasPrestamo} cuotas de $${montoCuotas}.`,
        showConfirmButton: true,
        confirmButtonColor: '#ffc107',
        confirmButtonText: 'Cerrar',
    }).then((result) => { window.location.reload() })

    //PARA ACTUALIZAR LOS PRESTAMOS APROBADOS EN EL LOCALSTORAGE
    //Cargo un objeto con los nuevos datos
    let nuevosDatos = { nomClient: nombreCliente, apelClient: apellidoCliente, montPrest: montoPrestamo, cantCuot: cuotasPrestamo, montCuot: montoCuotas };
    //Cargos los elementos cargados del localstorage en datosExistentes
    let datosExistentes = JSON.parse(localStorage.getItem("prestamosAprobados"));
    //Agregos el nuevo objeto
    datosExistentes.push(nuevosDatos);
    //Cargo todo al localstorage
    localStorage.setItem('prestamosAprobados', JSON.stringify(datosExistentes));
}

function limpiarHistoriaPrestamos() {
    localStorage.clear();
    localStorage.setItem("prestamosAprobados", JSON.stringify([{ nomClient: '', apelClient: '', montPrest: '', cantCuot: '', montCuot: '' }]));
}