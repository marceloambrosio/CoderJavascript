/* PRIMERO PREGUNTAR CUANTO SE QUIERE AHORRAR
DESPUES
HACER UN WHILE QUE DIGA CUANTO DINERO SE INGRESA CADA VEZ
FINALIZAR CON UN MENSAJE CUANDO LLEGUE AL OBJETIVO */

let objetivo = prompt("Cuanto dinero (U$D) quieres ahorrar?")
objetivo = parseInt(objetivo);

let ahorro = 0;
let ingreso = 0;

while (ahorro < objetivo) {
    ingreso = prompt(`Tenes ahorrado ${ahorro}U$D\nCuanto dinero quiere ingresar?`);
    ingreso = parseInt(ingreso);
    ahorro = ahorro + ingreso;

    if (ahorro >= objetivo) {
        let sobra = ahorro - objetivo;
        if (sobra > 0) {
            alert(`¡Fecilicidades!\nJuntaste los ${objetivo}U$D que necesitabas.\nTe sobraron ${sobra}U$D`)
        } else {
            alert(`¡Fecilicidades!\nJuntaste los ${objetivo}U$D que necesitabas`)
        }
    }
}