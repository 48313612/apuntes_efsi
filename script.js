function validarForm() {
    //validaciones
    const mailValido = /^[a-z0-9]+@(gmail|hotmail|outlook)\.com$/.test(email);
    const tieneNum = /(?:\d)/.test(contraseña);
    const tieneLetra = /(?:[A-Z])/.test(contraseña) || /(?:[a-z])/.test(contraseña);
    if (contraseña.length >= 8 && tieneNum && tieneLetra && (contraseña === confirmarContraseña)) {
        contraseñaValida = true;
    }
    // Comprobar validaciones
    if (!mailValido) { alert('error'); return false; }
    //submit valores ingresados
    registrarseForm.submit();
}

function saludar(){
    let nombre = prompt("Ingresa tu nombre:");
    //parseFloat para convertir un valor en int
    let numero = parseFloat(prompt("Ingresa un número:"));
    //trae mediante el id nombre el valor
    let ejercicio1 = document.getElementById("ejercicio1");
    //innerHTML es para darle un nuevo contenido a la respuesta
    ejercicio1.innerHTML = "Hola " + nombre;
    console.log("Hola " + nombre);
}

function calculadora() {
    let num1 = document.getElementById('num1').value;
    let num1Valido = validacion(num1);
    //si el numero es valido aparece en verde en tiempo real, sino en rojo
    document.getElementById('num1').style.backgroundColor = 
        num1 === '' ? '' : (num1Valido ? "#D6E5BD" : "#ff686b");
}

function calcular() {
    let num1 = parseFloat(document.getElementById('num1').value);
    let num2 = 1;
    let resultado = num1 + num2;
    let mensaje = `El resultado es ${resultado}`;
    let alertaVerde = document.getElementById('alertaVerde');
    let alertaRojo = document.getElementById('alertaRojo');
    if (resultado >= 0) {
        console.log("verde");
        alertaVerde.innerHTML = mensaje;
        alertaVerde.style.display = "block";
    } else {
        alertaRojo.innerHTML = mensaje;
        alertaRojo.style.display = "block";
    }
}

function mostrarMayorNota() {
    let notaMatematica = parseFloat(document.getElementById('notaMatematica').value);
    let notaLengua = parseFloat(document.getElementById('notaLengua').value);
    let notaEFSI = parseFloat(document.getElementById('notaEFSI').value);

    let notas = [
        { materia: "Matematica", nota: notaMatematica },
        { materia: "Lengua", nota: notaLengua },
        { materia: "EFSI", nota: notaEFSI }
    ];

    let mayorNota = Math.max(...notas.map(nota => nota.nota));

    let materiasConMayorNota = notas.filter(nota => nota.nota === mayorNota);

    let materias = materiasConMayorNota.map(nota => nota.materia).join(", ");
    
    let mensaje = `Las materias con la mayor nota (${mayorNota}) son: ${materias}`;
    let alertaAzul = document.getElementById('alertaAzul');
    alertaAzul.innerHTML = mensaje;
    alertaAzul.style.display = "block";
}