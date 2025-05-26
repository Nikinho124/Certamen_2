const students = [];
const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv = document.getElementById("average");

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!name || !lastName || isNaN(grade) || grade < 1 || grade > 7) {
        alert("Por favor complete todos los campos correctamente.");
        return;
    }
    if (!nameRegex.test(name)) {
        alert("El campo 'Nombre' no puede contener números ni símbolos.");
        return;
    }
    if (!nameRegex.test(lastName)) {
        alert("El campo 'Apellido' no puede contener números ni símbolos.");
        return;
    }
    const student = { name, lastName, grade };
    students.push(student);
    addStudentToTable(student);
    calcularPromedio();
    this.reset();
});




function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Eliminar</button>
        </td>
    `;
    row.querySelector(".delete-btn").addEventListener("click", function () {
        deleteEstudiante(student, row);
    });
    row.querySelector(".edit-btn").addEventListener("click", function () {
        editEstudiante(student, row);
    });
    tableBody.appendChild(row);

  if (student.grade >= 4.0) {
    tableBody.prepend(row); 
  } else {
    tableBody.appendChild(row); 
  }
  calcularPromedio();
  actualizarResumen();
}


function calcularPromedio() {
    if (students.length === 0) {
        averageDiv.textContent = "Promedio General del Curso : N/A";
        return;
    }

    const total = students.reduce((sum, student) => sum + student.grade, 0);
    const promedio = total / students.length;
    averageDiv.textContent = `Promedio General del Curso : ${promedio.toFixed(2)}`;
}

function deleteEstudiante(student,row){
    console.log("borrar")
    const index=students.indexOf(student);
    if(index>-1){
        students.splice(index,1);
        calcularPromedio();
        row.remove();
    }
    calcularPromedio();
    actualizarResumen();
}

function editEstudiante(student, row) {
    document.getElementById("name").value = student.name;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("grade").value = student.grade;
    
    const index = students.indexOf(student);
    if (index > -1) {
        students.splice(index, 1); 
        row.remove(); 
        calcularPromedio();
    }
}
function actualizarResumen() {
    const total = students.length;
    const aprobados = students.filter(s => s.grade >= 4).length;
    const reprobados = total - aprobados;
  
    document.getElementById("totalEstudiantes").textContent = total;
    document.getElementById("aprobados").textContent = aprobados;
    document.getElementById("reprobados").textContent = reprobados;
  }

