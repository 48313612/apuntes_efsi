function validarForm() {
    //validaciones
    const mailValido = /^[a-z0-9]+@(gmail|hotmail|outlook)\.com$/.test(email);
    const tieneNum = /(?:\d)/.test(contraseña);
    const tieneLetra = /(?:[A-Z])/.test(contraseña) || /(?:[a-z])/.test(contraseña);
    if (contraseña.length >= 8 && tieneNum && tieneLetra && (contraseña === confirmarContraseña)) {
        contraseñaValida = true;
    }
    // Comprobar validaciones
    if (!mailValido) {
        alert('error');
        return false;
    }
    //submit valores ingresados
    registrarseForm.submit();
}

function saludar(){
    let nombre = prompt("Ingresa tu nombre:");
    //parseFloat para convertir un valor en int
    let numero = parseFloat(prompt("Ingresa un número:"));
    //trae mediante el id nombre el valor
    let ejercicio1 = document.getElementById("ejercicio1");
    //innerHTML es para darle un nuevo contenido
    ejercicio1.innerHTML = "Hola " + nombre;
    console.log("Hola " + nombre);
}