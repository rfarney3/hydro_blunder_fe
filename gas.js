const GAS = []
let gasGauge = 12

function checkCollision(gas) {

  let top = positionToInteger(gas.style.top)

  let boatLeftEdge = positionToInteger(document.getElementById("game-boat").style.left) + 50;
  let boatRightEdge = boatLeftEdge + 20;
  let gasLeftEdge = positionToInteger(gas.style.left)
  let gasRightEdge = gasLeftEdge + 35;

  let boatTopEdge = positionToInteger(document.getElementById("game-boat").style.top)
  let boatBottomEdge = boatTopEdge + 100;
  let gasTopEdge = top;
  let gasBottomEdge = gasTopEdge + 35;

  if (
    (gasLeftEdge <= boatLeftEdge && gasRightEdge >= boatLeftEdge) ||
    (gasLeftEdge >= boatLeftEdge && gasRightEdge <= boatRightEdge) ||
    (gasLeftEdge <= boatRightEdge && gasRightEdge >= boatRightEdge)
  ) {
    if (
      (gasTopEdge <= boatTopEdge && gasBottomEdge >= boatTopEdge) ||
      (gasTopEdge >= boatTopEdge && gasBottomEdge <= boatBottomEdge) ||
      (gasTopEdge <= boatBottomEdge && gasBottomEdge >= boatBottomEdge)
    ) {
      return true
    }
  } else {
    return false
  }
}

function startGas() {
  setInterval(function() {
    if (!gameEnded) {
      gasGauge -= 1;
      console.log(gasGauge)
      updateGas(gasGauge)
      if (gasGauge === 0) {
        return endGame()
      }
    }
  }, 1000);

  setInterval(function() {
    createGas(Math.floor(Math.random() * (765)))
  }, Math.random() * 2500 + 2000)
}

function createGas(leftpx) {
  if (!gameEnded) {
    let gasTank = document.createElement("img");

    gasTank.className = "gasTank";
    gasTank.style.left = `${leftpx}px`;
    gasTank.src = "./assets/images/gas.png"
    let top = gasTank.style.top = 0;

    document.getElementById("game-screen").append(gasTank);
    let fallSpeed = Math.random() * 4 + 1


    function moveGas() {
      gasTank.style.top = `${top += fallSpeed}px`;

      if (checkCollision(gasTank)) {
        gasTank.remove()
        // console.log('collided', gasGauge)
        let updatedGasLevel = gasGauge + 4
        console.log(updatedGasLevel)
        updateGas(updatedGasLevel)
        return gasGauge += 4

      }

      if (top < 565) {
        window.requestAnimationFrame(moveGas);
      }else {
        gasTank.remove()
      }
    }
    window.requestAnimationFrame(moveGas)

    GAS.push(gasTank);

    return gasTank;
  }
}
