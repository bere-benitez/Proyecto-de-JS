//obtener cada elemento de mi html que quiero manipular en el DOM, lo voy a llamar por su ID, lo guardo en una variable para poder trabajar con ese elemento
const nombreTarea = document.getElementById("nombreTarea");
const prioridadTarea = document.getElementById("prioridadTarea");
const horarioTarea = document.getElementById("horarioTarea");
const addTarea = document.getElementById("addTarea");
const listaDeTareas = document.getElementById("listaDeTareas");
const tareasPendientes = document.getElementById("tareasPendientes");

/* ESTABLECER MI ARRAY DE TAREAS que tendra una forma así:
const tareas=[
{
        id:1,
        nombre:"nombre de la tarea",
        prioridad:"tipo de prioridad",
        completada: va a iniciar en false,
        horario: "hora en la que se realizara esa tarea",
} 
]*/
/* con el parse convierto lo que esta en JSON a  un objeto como lo necesita JS */
const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let proximoID = tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1;

//FUNCION PARA DEVOLVER LOS DATOS DEL ARRAY DE TAREAS
const renderizarTareas = () => {
    listaDeTareas.innerHTML = "";

    tareas.forEach((tarea) => {
        const elementoTarea = document.createElement("li");
        elementoTarea.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completada;
        checkbox.addEventListener("change", () => marcarComoCompletada(checkbox, tarea.id));

        const infoDeLaTarea = document.createElement("span");
        infoDeLaTarea.innerHTML = `<strong>${tarea.nombre}</strong> | Prioridad: ${tarea.prioridad} | Horario: ${tarea.horario}`;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("btn", "btn-danger");
        botonEliminar.addEventListener("click", () => eliminarTarea(tarea.id));

        elementoTarea.append(checkbox);
        elementoTarea.append(infoDeLaTarea);
        elementoTarea.append(botonEliminar);
        listaDeTareas.append(elementoTarea);
    });

    mostrarTareasPendientes();
};

//FUNCION PARA GREGAR LA TAREA:
const agregarTarea=()=>{
    const nombre=nombreTarea.value; //la variable nombre va a ser referencia a la propiedadnombre del objeto tarea y le dare como valor lo que el usuario ingrese en el elemnto nombreTarea y esto con el resto de las propiedades
    const prioridad=prioridadTarea.value;
    const horario=horarioTarea.value;

    nombre&&prioridad&&horario?tareas.push({
        id:proximoID++,
        nombre: nombre,
        prioridad: prioridad,
        horario:horario,
        completada:false,
    }): alert("Completa todos los datos, por favor");
    localStorage.setItem("tareas", JSON.stringify(tareas));
    renderizarTareas();
};


//FUNCION PARA ELIMINAR MIS TAREASS
const eliminarTarea = (id) => {
    const indice = tareas.findIndex((tarea) => tarea.id === id);
    if (indice !== -1) {
        tareas.splice(indice, 1);
        localStorage.setItem("tareas", JSON.stringify(tareas));
        renderizarTareas();
    }
};


//funcion para que muestre mis las tareas pendientes
const mostrarTareasPendientes = () => {
    const pendientes = tareas.filter((tarea) => !tarea.completada).length;
    tareasPendientes.textContent = `Tareas pendientes: ${pendientes}`;
};


//marcar como completa la tarea
const marcarComoCompletada = (checkbox, id) => {
    const tarea = tareas.find((tarea) => tarea.id === id);
    if (tarea) {
        tarea.completada = checkbox.checked;
        localStorage.setItem("tareas", JSON.stringify(tareas));
        renderizarTareas();
    }
};

renderizarTareas();

//digo que cuando el usuario haga click sobre el boton agregarTarea se llame a la funcion agregarTareas
addTarea.addEventListener("click", agregarTarea);



