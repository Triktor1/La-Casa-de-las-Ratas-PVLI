import MainMenu from './scenes/MainMenu.js';
import Level1 from './scenes/Level1.js';
import Shop from './scenes/Shop.js';
import SelectScene from './scenes/SelectScene.js';

let config = {
  type: Phaser.CANVAS,
  canvas: document.getElementById('gameCanvas'),
  width: 1280,
  height: 720,
  pixelArt: false,
  backgroundColor: "#201726",
  scale: {
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    mode: Phaser.Scale.FIT,
    min: {
        width: 328,
        height: 188
  },
    max: {
        width: 1312,
        height: 752
    },
    zoom: 1
  },
  scene: [MainMenu, Level1, Shop, SelectScene],

      physics: {  
        default: 'arcade', 
        arcade: { 
            debug: true 
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
};

  new Phaser.Game(config);