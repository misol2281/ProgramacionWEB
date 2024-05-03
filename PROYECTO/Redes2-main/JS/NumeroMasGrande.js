function rollDice() {
  let bet1 = parseFloat(document.getElementById('bet1').value);
  let bet2 = bet1;
  if (isNaN(bet1) || bet1 <= 0) {
    alert("Por favor, ingresa una apuesta válida mayor que cero para el Jugador 1.");
    return;
  }

  let dado1 = Math.floor(Math.random() * 6) + 1;
  let dado2 = Math.floor(Math.random() * 6) + 1;
  let dado3 = Math.floor(Math.random() * 6) + 1;
  let dado4 = Math.floor(Math.random() * 6) + 1;
  let total1 = dado1 + dado2;
  let total2 = dado3 + dado4;

  lanzamientoDeDados(dado1, dado2, dado3, dado4, function() {
    document.querySelector(".img1").setAttribute("src","/Redes2/CSS/img/dado" + dado1 + ".jpg");
    document.querySelector(".img2").setAttribute("src","/Redes2/CSS/img/dado" + dado2 + ".jpg");
    document.querySelector(".img3").setAttribute("src","/Redes2/CSS/img/dado" + dado3 + ".jpg");
    document.querySelector(".img4").setAttribute("src","/Redes2/CSS/img/dado" + dado4 + ".jpg");

    WinSelector(total1,total2);
  });
}

// Cambiar las imágenes de los dados con un retraso y llamar a una función de devolución de llamada cuando la animación haya terminado
function lanzamientoDeDados(dado1, dado2, dado3, dado4, callback) {
  const diceElements = document.querySelectorAll('.dice'); // Obtener elementos de los dados
  const numImages = 6; // Número de imágenes de dados disponibles
  const duration = 500; // Duración total de la animación en milisegundos
  const interval = 50; // Intervalo de tiempo entre cambios en milisegundos

  let finishedAnimations = 0; // Contador para el número de animaciones terminadas

  diceElements.forEach(dice => {
    const initialImageIndex = Math.floor(Math.random() * numImages) + 1; // Valor inicial aleatorio del dado
    let currentImageIndex = initialImageIndex;
    let tiempoTranscurrido = 0;

    const animacion = setInterval(() => {
      currentImageIndex = (currentImageIndex % numImages) + 1; // Avanza al siguiente valor del dado
      const imageUrl = `/Redes2/CSS/img/dado${currentImageIndex}.jpg`; // Ruta de la imagen correspondiente al valor actual del dado
      dice.querySelector('img').setAttribute('src', imageUrl); // Cambiar la imagen y mostrarla en el HTML

      tiempoTranscurrido += interval;

      if (tiempoTranscurrido >= duration) {
        clearInterval(animacion);
        finishedAnimations++;

        if (finishedAnimations === diceElements.length) {
          // Todas las animaciones han terminado, llamar a la función de devolución de llamada
          callback();
        }
      }
    }, interval); 
  });
}


  function WinSelector(total1, total2) {
    let bet1 = parseFloat(document.getElementById('bet1').value);
    let premio = bet1 * 2;
    let mensajeDiv = document.getElementById('mensaje');
    let mensajeResult = document.getElementById('result');
    let mensajeWin = document.getElementById('mensaje2');

    let resultados = `Tus numeros suman: ${total1} Los dados de la casa suman ${total2}`;
    mensajeResult.textContent = resultados;

  
    if (total1 > total2) {
      let mensaje = `TU NUMERO ES MAYOR QUE EL DE LA CASA `;
      let premioMensaje = `GANASTE!! ${premio}`;
      mensajeDiv.textContent = mensaje;
      mensajeWin.textContent = premioMensaje;
    } else if (total2 === total1) {
      let empateMensaje = `AMBOS VALORES SUMAN LO MISMO `;
      let empatePremio = `EMPATE!! AMBOS RECUPERAN SU APUESTA`;
      mensajeDiv.textContent = empateMensaje;
      mensajeWin.textContent = empatePremioMensaje;
    } else {
      let casaMensaje = `LA CASA TIENE EL NUMERO MAS GRANDE `;
      let casaPremio = `PERDISTE!! ${bet1}`;
      mensajeDiv.textContent = casaMensaje;
      mensajeWin.textContent = casaPremio;
    }
  }