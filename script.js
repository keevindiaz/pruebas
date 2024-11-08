function guardarYDescargar(event) {
    event.preventDefault();  // Prevenir el envío del formulario

    // Obtener los valores del formulario
    const usuario = document.getElementById("usuario").value;
    const cliente = document.getElementById("cliente").value;
    const trato = document.getElementById("trato").value;
    const contacto = document.getElementById("contacto").value;
    const email = document.getElementById("email").value;
    let comentario = document.getElementById("comentario").value;

    // Si el comentario está vacío, asigna el valor "Cerrado"
    if (comentario.trim() === "") {
        comentario = "Proyecto cerrado correctamente. Sin pendientes";
    }

    // Obtener las opciones seleccionadas
    const opcionesSeleccionadas = [];
    const checkboxes = document.querySelectorAll('input[name="opciones"]:checked');
    checkboxes.forEach(checkbox => {
        opcionesSeleccionadas.push(checkbox.value);
    });

    // Verificar si se seleccionó "Captura mediante" y obtener subopciones
    const opcionArchivos = document.getElementById("opcion-archivos").checked;
    const capturasubSeleccionada = opcionArchivos ? document.getElementById("capturasub").value : "";
    const frecuenciaSeleccionada = opcionArchivos ? document.getElementById("frecuencia").value : "";

    // Obtener la fecha actual
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    // Crear contenido del archivo de texto con la fecha actual
    const contenido = `Traspaso de información. Proyecto finalizado.
                                                                                            Fecha: ${fechaFormateada}

Consultor S.D: ${usuario}

Datos del cliente:
Cliente: ${cliente}
Número de trato: ${trato}
Contacto: ${contacto}
Email: ${email}

Módulos contratados:
${opcionesSeleccionadas.join("\n")}

Captura archivos?: ${opcionArchivos ? `Sí, mediante ${capturasubSeleccionada}, con frecuencia: ${frecuenciaSeleccionada}` : "No"}

Comentario: ${comentario}
    `;

    // Crear un Blob con el contenido
    const blob = new Blob([contenido], { type: 'text/plain' });

    // Crear enlace de descarga
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `${cliente}_${trato}.txt`; // Nombre del archivo

    // Asegurarse de limpiar cualquier enlace previo antes de generar uno nuevo
    if (document.getElementById("descarga-enlace")) {
        document.getElementById("descarga-enlace").remove();
    }

    // Agregar el enlace a la página
    enlace.id = "descarga-enlace";
    document.body.appendChild(enlace);

    // Hacer clic en el enlace para descargar
    enlace.click();

    // Limpiar URL
    URL.revokeObjectURL(enlace.href);

    // Limpiar los campos del formulario sin recargar la página
    document.getElementById("miFormulario").reset();

    // Mostrar comentario de guardado
    document.getElementById("resultado").innerText = "Datos guardados y descargados correctamente";
}

// Mostrar/ocultar el menú de captura si "Captura mediante" es seleccionado
document.querySelectorAll('input[name="api"]').forEach((radio) => {
    radio.addEventListener("change", function() {
        const menuCaptura = document.getElementById("menu-captura");
        // Si se selecciona "Sí", mostrar el menú de captura
        if (this.value === "Captura mediante") {
            menuCaptura.style.display = "block";
        } else {
        // Si se selecciona "No", ocultar el menú de captura
            menuCaptura.style.display = "none";
        }
    });
});

// Mostrar/ocultar el submenú de "Transformación" si es seleccionado
document.querySelectorAll('input[name="proyecto"]').forEach((radio) => {
    radio.addEventListener("change", function() {
        const menuTransformacion = document.getElementById("menu-adicional");
        if (document.getElementById("opcion-transformacion").checked) {
            menuTransformacion.style.display = "block";
        } else {
            menuTransformacion.style.display = "none";
        }
    });
});

// Agregar el evento al formulario para ejecutar la función de guardado y descarga
document.getElementById("miFormulario").addEventListener("submit", guardarYDescargar);
