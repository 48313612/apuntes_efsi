let tareas = JSON.parse(localStorage.getItem('tareas')) || []; // Carga las tareas desde el almacenamiento local (localStorage)

let tareaS = []; //carga tareas aca, si se cierra la ejecucion, se borran todas las tareas ingresadas

const agregarTarea = () => {
    const input = document.getElementById('entradaTarea');
    const texto = input.value.trim(); // elimina espacios al inicio y fin
    if (texto) {
        const nuevaTarea = {
            texto,
            completada: false,
            creadaEn: Date.now(),
            completadaEn: null
        };
        tareas.push(nuevaTarea); // añade la nueva tarea al array
        guardarYactualizar(); // guarda en localStorage y actualiza la vista
        input.value = ''; // limpia el input
    }
};

const alternarTarea = (id) => {
    const tarea = tareas.find(t => t.creadaEn === id); // busca la tarea por ID (timestamp)
    if (tarea) {
        tarea.completada = !tarea.completada; // cambia el estado
        tarea.completadaEn = tarea.completada ? Date.now() : null; // si se completa, registra el tiempo
        guardarYactualizar();
    }
};

const eliminarTarea = (id) => {
    tareas = tareas.filter(t => t.creadaEn !== id); // filtra quitando esa tarea
    guardarYactualizar();
};

const eliminarCompletadas = () => {
    tareas = tareas.filter(({ completada }) => !completada); // elimina las completadas
    guardarYactualizar();
};

// si se hace sin localstorage ni json, esto no se usa
const guardarYactualizar = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas)); // guarda el array como texto
    actualizarTareas();  // actualiza la lista visualmente
};

const actualizarTareas = () => {
    const lista = document.getElementById('listaTareas');
    const filtro = document.getElementById('filtro')?.value || 'todas';

    lista.innerHTML = ''; //lista vacia

    const tareasFiltradas = tareas.filter(({ completada }) =>
        filtro === 'todas' ? true :
        filtro === 'completadas' ? completada :
        !completada
    );

    tareasFiltradas.sort((a, b) => a.creadaEn - b.creadaEn); // ordena por fecha

    tareasFiltradas.forEach(({ texto, completada, creadaEn }) => {
        const li = document.createElement('li');
        li.className = completada ? 'completada' : '';
        li.innerHTML = `
            <input type="checkbox" onclick="alternarTarea(${creadaEn})" ${completada ? 'checked' : ''}>
            <span class="${completada ? 'completada' : ''}">${texto}</span>
            <button onclick="eliminarTarea(${creadaEn})">Eliminar</button>
        `;
        lista.appendChild(li); //Agrega el <li> que acabas de crear al DOM, dentro del elemento lista.
    });
};

const mostrarTareaMasRapida = () => {
    const tareasCompletadas = tareas.filter(({ completada, creadaEn, completadaEn }) => completada && completadaEn && creadaEn);
    if (tareasCompletadas.length === 0) {
        alert('No hay tareas completadas.');
    }

    let tareaRapida = tareasCompletadas[0];
    let tiempoRapida = tareaRapida.completadaEn - tareaRapida.creadaEn;

    for (let i = 1; i < tareasCompletadas.length; i++) {
        const actual = tareasCompletadas[i];
        const tiempoActual = actual.completadaEn - actual.creadaEn;
        
        if (tiempoActual < tiempoRapida) {
            tareaRapida = actual;
            tiempoRapida = tiempoActual;
        }
    }

    const tiempoSegundos = (tiempoRapida / 1000).toFixed(2);
    alert(`La tarea completada más rápido fue "${tareaRapida.texto}" en ${tiempoSegundos} segundos.`);
};

actualizarTareas();