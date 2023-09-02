let tareas = [];

const agregarBtn = document.getElementById("btn");
const tareasBody = document.getElementById("tareasbody");

function listar() {
  tareasBody.innerHTML = "";
  tareas.forEach(function(tarea) {
    let newTr = document.createElement("tr");
    tareasBody.appendChild(newTr);
    newTr.innerHTML = 
      "<td>"+ tarea.id +"</td><td>"+ tarea.titulo +"</td><td><input type='checkbox' class='lista-check' lista-id="+ tarea.id +" onclick='actualizarTarea(event)'></td><button onclick='borrarTarea(event)' class='lista-borrar' lista-id="+ tarea.id +">X</button><td>";
    let check = newTr.getElementsByClassName("lista-check")[0];
    if(tarea.finalizado == true) {
      check.setAttribute("checked", "true");
    }
  });

  contarTotal();
  contarRealizadas();
}

function actualizarTarea(event) {
  let id = Number(event.target.getAttribute("lista-id"));
  tareas.forEach(function(tarea){
    if(tarea.id == id) {
      if(event.target.checked == true) {
        tarea.finalizado = true;
      } else {
        tarea.finalizado = false;
      }
    }
  });
  listar();
}

function borrarTarea(event) {
  let id = Number(event.target.getAttribute("lista-id"));
  tareas = tareas.filter(function(tarea){
    return tarea.id != id;
  });

  listar();
}

function contarTotal() {
  let total = tareas.length;
  document.getElementById("total").innerText = "Total: " + total;
}

function contarRealizadas() {
  let total = tareas.filter(function(tarea){ return tarea.finalizado == true }).length;
  document.getElementById("realizadas").innerText = "Realizadas: " + total;
}

agregarBtn.addEventListener("click", function(){
  const text = document.getElementById("input").value;
  tareas.push({
    titulo: text,
    id: tareas.length + 1,
    finalizado: false
  });

  listar();
  contarRealizadas();
});