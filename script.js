function devuelveTextoDeAlerta() {
  return "uooooo! Vaya alerta";
}

function desaparece(nombre) {
	var button = document.getElementById(nombre);
  button.style.visibility='hidden';
}

  new Phaser.Game({
  type: Phaser.CANVAS,
  canvas: document.getElementById('gameCanvas'),
  width: 1280,
  height: 720,
});