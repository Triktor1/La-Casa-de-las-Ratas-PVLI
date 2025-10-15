import MainMenu from './scenes/MainMenu.js';
import Level1 from './scenes/Level1.js';
import Shop from './scenes/Shop.js';

let config = {
  type: Phaser.CANVAS,
  canvas: document.getElementById('gameCanvas'),
  width: 1280,
  height: 720,
  pixelArt: false,
  scale: {
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
  },
  scene: [MainMenu, Level1, Shop]
};

  new Phaser.Game(config);