function guardarYDescargar(event) {
    event.preventDefault();  // Prevenir el envío del formulario

    // Obtén los valores del formulario
    const usuario = document.getElementById("usuario").value;
    const cliente = document.getElementById("cliente").value;
    const trato = document.getElementById("trato").value;
    let comentario = document.getElementById("comentario").value;

    // Si el comentario está vacío, asigna el valor "Cerrado"
    if (comentario.trim() === "") {
        comentario = "Proyecto cerrado correctamente. Sin pendientes";
    }

    // Obtén los valores de los checkboxes seleccionados
    const checkboxes = document.querySelectorAll('input[name="opciones"]:checked');
    const opcionesSeleccionadas = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Verificar si se seleccionó "Transformación"
    const opcionTransformacion = document.getElementById("opcion-transformacion").checked;
    const subopcionesSeleccionadas = document.getElementById("subopciones") ? document.getElementById("subopciones").value : '';

    // Validar si se seleccionó "Transformación" y si se eligió una subopción
    if (opcionTransformacion && !subopcionesSeleccionadas) {
        alert("Por favor, seleccione una versión para 'Transformación'");
        return;
    }

    // Obtener la opción seleccionada en el grupo "Contiene API"
    const apiSeleccionada = document.querySelector('input[name="api"]:checked') ? document.querySelector('input[name="api"]:checked').value : "";

    // Obtener la opción seleccionada en el grupo "El proyecto es"
    const proyectoSeleccionado = document.querySelector('input[name="proyecto"]:checked') ? document.querySelector('input[name="proyecto"]:checked').value : "";

    // Guardar en localStorage (para persistencia temporal si es necesario)
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("cliente", cliente);
    localStorage.setItem("trato", trato);
    localStorage.setItem("opcionesSeleccionadas", JSON.stringify(opcionesSeleccionadas));
    if (apiSeleccionada) {
        localStorage.setItem("apiSeleccionada", apiSeleccionada);
    }
    if (opcionTransformacion) {
        localStorage.setItem("subopcion", subopcionesSeleccionadas);
    }
    if (proyectoSeleccionado) {
        localStorage.setItem("proyectoSeleccionado", proyectoSeleccionado);
    }
    localStorage.setItem("comentario", comentario);

    // Crear contenido del archivo de texto sin tabulaciones ni espacios extras
    const contenido = `Traspaso de información. Proyecto finalizado.

Usuario: ${usuario}

Cliente: ${cliente}

Número de trato: ${trato}

El proyecto contiene:
${opcionesSeleccionadas.join("\n")}

API seleccionada: ${apiSeleccionada} 

${proyectoSeleccionado ? `Proyecto: ${proyectoSeleccionado}${opcionTransformacion ? ` - Versión: ${subopcionesSeleccionadas}` : ""}` : ""}

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

// Mostrar/ocultar el menú de subopciones si "Transformación" es seleccionado
document.querySelectorAll('input[name="proyecto"]').forEach(radio => {
    radio.addEventListener("change", function() {
        const opcionTransformacion = document.getElementById("opcion-transformacion").checked;
        const menuAdicional = document.getElementById("menu-adicional");
        menuAdicional.style.display = opcionTransformacion ? "block" : "none"; // Mostrar u ocultar
    });
});

// Agregar el evento al formulario para ejecutar la función de guardado y descarga
document.getElementById("miFormulario").addEventListener("submit", guardarYDescargar);
