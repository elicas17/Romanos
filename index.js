window.onload = () => {

    traducirRomano = true;
    comprobarEstado();

    document.getElementById("converR").addEventListener('click', () => {
        traducirRomano = true;
        document.getElementById("error").innerHTML="";
        comprobarEstado();
    });
    document.getElementById("converL").addEventListener('click', () => {
        traducirRomano = false;
        document.getElementById("error").innerHTML="";
        comprobarEstado();
    });


    document.getElementById("convertir").addEventListener('click', () => {
        document.getElementById("error").innerHTML="";
        var valoresAceptados= /^[0-9]+$/;
        var valoresAceptadosRoman= /[IiVvXxLlCcDdMm]/;
           
        input = document.getElementById("numero").value;
        if (input.length > 0) { 
            if (traducirRomano == true) {
                if (input.match(valoresAceptados)){
                respuesta = romanizar(input);
                }else{
                    document.getElementById("error").innerHTML="Solo puedes introducir numeros";
                }
            } else {
                if (input.match(valoresAceptadosRoman)){
                    respuesta = latinizar(input.toUpperCase());
                }else{
                    document.getElementById("error").innerHTML="Solo puedes introducir las letras 'I','V','X','L','C','D','M'";
                }
           
            }
        }else{
            document.getElementById("error").innerHTML="Campo vacio";
        }
        document.getElementById("resultado").innerHTML = respuesta;
    });

};
comprobarEstado = () => {
    if (traducirRomano == true) {
        document.getElementById("estadoE").innerHTML = "Latino"
        document.getElementById("estadoS").innerHTML = "Romano"
        document.getElementById("numero").value="1234";
    } else {
        document.getElementById("estadoE").innerHTML = "Romano"
        document.getElementById("estadoS").innerHTML = "Latino"
        document.getElementById("numero").value="IV";
    }
}
romanizar = (n) => {
    var
        values = [1, 5, 10, 50, 100, 500, 1000],
        letras = ['I', 'V', 'X', 'L', 'C', 'D', 'M'],
        res = [],
        num, letra, val, pos, insert;

    for (var i = 6; num = values[i], letra = letras[i]; i--) {
        // Suficientemente grande
        if (n >= num) {
            // Número de letras repetidas
            var r = Math.floor(n / num);

            // Restamos el actual
            n -= r * num;

            if (r < 4) {
                // Metemos las letras
                while (r--) {
                    res.push(letra);
                }
            } else {
                // No se pueden repetir 4+ veces
                val = res.pop(); // Última letra

                // Si es el string vacío o letra == "M" (no hay anterior)
                // usamos la letra anterior a esta
                pos = (val ? letras.indexOf(val) : i) + 1;

                // Y si letra == "M" -> letras[pos] no existirá y usamos M
                insert = letra + (letras[pos] || 'M');

                // Insertamos el string
                res.push(insert);
            }
        } else {
            // Si no vamos a poner letra usamos un ""
            // para que no afecte pop
            res.push('');
        }
    }

    return res.join('');

}
latinizar = (roman) => {
    if (roman == null)
        return -1;
    var totalValue = 0,
        value = 0, // Initialise!
        prev = 0;

    for (var i = 0; i < roman.length; i++) {
        var current = char_to_int(roman.charAt(i));
        if (current > prev) {
            // Undo the addition that was done, turn it into subtraction
            totalValue -= 2 * value;
        }
        if (current !== prev) { // Different symbol?
            value = 0; // reset the sum for the new symbol
        }
        value += current; // keep adding same symbols
        totalValue += current;
        prev = current;
    }
    console.log(totalValue)
    return totalValue;
}

function char_to_int(character) {
    switch (character) {
        case "I": return 1;
        case "V": return 5;
        case "X": return 10;
        case "L": return 50;
        case "C": return 100;
        case "D": return 500;
        case "M": return 1000;
        default: return -1;
    }

}