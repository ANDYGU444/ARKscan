// Variables globales para almacenar el estado de la aplicación.
// No se inicializan con valores, solo se declaran.
let usuario = "";
let usuarios = {}
let saldo = 0;
let historial = [];

// Esta función se ejecuta automáticamente cuando la página se carga.
window.onload = function () {
    // 1. Cargar el usuario actual y todos los usuarios registrados desde localStorage.
    // JSON.parse() convierte las cadenas de texto JSON de localStorage a objetos JavaScript.
    // El '|| "{}" es una protección: si no hay datos, crea un objeto vacío para evitar errores.
    const actual = JSON.parse(localStorage.getItem("usuario_actual"));
    usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");

    // 2. Verificar la sesión del usuario.
    // Si no hay un usuario actual o si ese usuario no existe en la lista de usuarios,
    // la sesión no es válida.
    if (!actual || !usuarios[actual.usuario]) {
        // Si la sesión es inválida, se muestra una alerta y se redirige a la página principal.
        alert("Sesión inválida");
        window.location.href = "index.html";
        return; // Se detiene la ejecución de la función.
    }
    // 3. Inicializar el estado de la aplicación para el usuario loqueado.
    usuario = actual.usuario;
    saldo = usuarios[usuario].saldo;
    // Cargar el historial de transacciones específico para este usuario.
    // Cada historial se guarda con una clave única: "historial_" + nombre de usuario.
    historial = JSON.parse(localStorage.getItem("historial_" + usuario) || "[]");
    // 4. Actualizar la interfaz de usuario (UI).
    // Se muestra el nombre del usuario y su saldo actual en la página.
    document.getElementById("usuario").textContent = usuario;
    document.getElementById("saldo").textContent = saldo;
    // Se llama a la función para mostrar el historial en la tabla.
    mostrarHistorial();
};

// Función para actualizar el saldo en la interfaz y en localStorage.
function actualizarSaldo() {
    // Actualiza el texto del saldo en la UI.
    document.getElementById("saldo").textContent = saldo;
    // Actualiza el saldo en el objeto de 'usuarios'.
    usuarios[usuario].saldo = saldo;
    // Guarda el objeto 'usuarios' completo y actualizado de nuevo en localStorage.
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Función para registrar una nueva transacción (depósito o retiro). 
function registrarTransaction(tipo, monto) {
    const fecha = new Date().toLocaleString();
    historial.push({ tipo, monto, fecha });
    localStorage.setItem("historial_" + usuario, JSON.stringify(historial));

    // Agrega la transacción con animación
    const tbody = document.getElementById("historial-body");
    const fila = document.createElement("tr");
    fila.classList.add("nueva-transaccion");
    fila.innerHTML = `<td>${tipo}</td><td>$${monto}</td><td>${fecha}</td>`;
    tbody.prepend(fila); // Agrega al inicio
}

// Función para renderizar (mostrar) el historial de transacciones en la tabla. 
function mostrarHistorial() {
    const tbody = document.getElementById("historial-body");
    const btn = document.getElementById("btn-borrar");

    tbody.innerHTML = ""; // Limpia el contenido actual de la tabla

    // Mostrar las transacciones más recientes primero
    historial.slice().reverse().forEach(tx => {
        const fila = `<tr><td>${tx.tipo}</td><td>$${tx.monto}</td><td>${tx.fecha}</td></tr>`;
        tbody.innerHTML += fila;
    });

    // Mostrar u ocultar el botón de borrar según si hay historial
    btn.style.display = historial.length > 0 ? "inline-block" : "none";
}
// Function para la operación de depósito.
function depositar() {
    const monto = parseFloat(document.getElementById("monto").value);// Convierte el valor a un número decimal. 
    // Valida que el monto sea un número y que sea positivo. 
    if (isNaN(monto) || monto <= 0) {
        alert("Ingrese un monto válido");
        return;
    }

    saldo += monto;// Suma el monto al saldo actual.
    actualizarSaldo();// Llama a la función para guardar el nuevo saldo.
    registrarTransaction("Depósito", monto);// Registra la transacción.
    document.getElementById("monto").value = "";// Limpia el campo de entrada.

    const btn = document.getElementById("btn-depositar");
    btn.classList.add("boton-pulse");
    setTimeout(() => btn.classList.remove("boton-pulse"), 400);

}



// Function para la operación de retiro.
function retirar() {
    const monto = parseFloat(document.getElementById("monto").value); // Convierte el valor a un número.
    // Valida que el monto sea un número y que sea positivo.
    if (isNaN(monto) || monto <= 0) {
        alert("Ingrese un monto válido");
        return;
    }

    // Valida que haya fondos suficientes.
    if (monto > saldo) {
        alert("Fondos insuficientes");
        return;
    }

    saldo -= monto; // Resta el monto al saldo actual.
    actualizarSaldo(); // Llama a la función para guardar el nuevo saldo.
    registrarTransaction("Retiro", monto); // Registra la transacción.
    document.getElementById("monto").value = ""; // Limpia el campo de entrada.

    const btn = document.getElementById("btn-retirar");
    btn.classList.add("boton-bounce");
    setTimeout(() => btn.classList.remove("boton-bounce"), 400);
}


// Función para cerrar la sesión.
function cerrarSesion() {
    const cajeroDiv = document.querySelector(".cajero");
    const modal = document.getElementById("modal-salida");
    const btn = document.getElementById("btn-cerrar");

    btn.classList.add("boton-slideOut");

    setTimeout(() => {
        cajeroDiv.classList.add("usuario-eliminado");
        localStorage.removeItem("usuario_actual");
        modal.style.display = "flex";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    }, 500);

}

function borrarHistorial() {
    const btn = document.getElementById("btn-borrar");

    if (historial.length === 0) {
        alert("No hay historial para borrar.");
        return;
    }

    const confirmacion = confirm("¿Estás seguro de que deseas borrar el historial y reiniciar el saldo?");
    if (!confirmacion) return;

    // Animación de sacudida
    btn.classList.add("boton-sacudida");

    setTimeout(() => {
        // Vaciar historial y reiniciar saldo
        historial = [];
        saldo = 0;

        // Actualizar localStorage
        localStorage.setItem("historial_" + usuario, JSON.stringify(historial));
        actualizarSaldo();

        // Actualizar la interfaz
        mostrarHistorial();
        document.getElementById("saldo").textContent = saldo;

        // Ocultar el botón
        btn.style.display = "none";

        alert("Historial borrado y saldo reiniciado.");
        btn.classList.remove("boton-sacudida");
    }, 400); // Espera a que termine la animación
}

