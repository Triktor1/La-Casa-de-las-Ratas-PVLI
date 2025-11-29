import MainMenu from './scenes/MainMenu.js';
import TutorialLevel from './scenes/TutorialLevel.js';
import Level1 from './scenes/Level1.js';
import Level2 from './scenes/Level2.js';
import Level3 from './scenes/Level3.js';
import Shop from './scenes/Shop.js';
import SelectScene from './scenes/SelectScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import TestEnemyScene from './scenes/TestEnemyScene.js';
import LevelClassTest from './scenes/LevelClassTest.js';
import Win from './scenes/Win.js';
import GalleryImages from './scenes/GalleryImages.js';
import GalleryGrid from './scenes/GalleryGrid.js';

let config = {
  type: Phaser.WEBGL,
  canvas: document.getElementById('gameCanvas'),
  width: 1280,
  height: 720,
  pixelArt: false,
  backgroundColor: "#201726",
  scale: {
    parent: 'canvasContainer',
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
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
  scene: [MainMenu, Level1, Level2, Level3, Shop, SelectScene, GameOverScene, Win, TutorialLevel, GalleryImages,  GalleryGrid, LevelClassTest],

      physics: {  
        default: 'arcade', 
        arcade: { 
            debug: false 
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
};

let game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.scale.refresh(window.innerWidth, window.innerHeight);
});