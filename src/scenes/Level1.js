import Loro from "../enemies/loro.js";
import Torre from "../torres/TorreBase.js";

export default class Level1 extends Phaser.Scene {
    constructor(){
        super({key:"Level1"});
    }
    shopMoney;
    levelNum = 1;

    init(data){
        this.shopMoney = data.shopMoney || 0;
    }
    
    preload(){
        this.load.image('loro' , 'assets/ParrotPlaceholder.png')
        this.load.image('selectButton', 'assets/lvlselectboton.png'); 
        this.load.image('shopButton', 'assets/shop.png'); 
        this.load.image('torre', 'assets/torre.png');
        this.load.image('background', 'assets/bg.png');

    }
    
    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }
    
    create(){
        this.add.text(20,20,"Level1");
        const bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(2);
        bg.displayHeight = this.scale.height;
        bg.displayWidth = this.scale.width;
        
        //CAMINO DE LOS LOROS
        this.path = new Phaser.Curves.Path(100, 100);
        this.path.lineTo(400, 200);
        this.path.lineTo(400, 300);
        this.path.lineTo(900, 100);

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(2, 0xffffff, 1);
        this.path.draw(this.graphics);

        let enemies = this.physics.add.group();
        let loro = new Loro(this, this.path, 100, 100, 15, 10, 100, 'basicLoro', 'loro', 0);
        enemies.add(loro);
        loro.startFollowing();
        loro = new Loro(this, this.path, 100, 100, 15, 10, 100, 'basicLoro', 'loro', 0);
        enemies.add(loro);
        loro.startFollowingReversed();
       
        this.Torre = new Torre(this, 500, 200, 0, 10, "basictorre", "torre"); 
        
        //BOTONES
        //Seleccion de niveles
        const selectBtn = this.add.sprite(this.sys.game.canvas.width * 0.25, this.sys.game.canvas.height * 0.7, 'selectButton').setInteractive({ useHandCursor: true });
        selectBtn.on('pointerdown', () => {
            this.scene.start('SelectScene');
        });
        selectBtn.on('pointerover', () => selectBtn.setScale(1.1));
        selectBtn.on('pointerout', () => selectBtn.setScale(1.0));
        //Tienda
        const shopBtn = this.add.sprite(this.sys.game.canvas.width * 0.8, this.sys.game.canvas.height * 0.7, 'shopButton').setInteractive({ useHandCursor: true });
        shopBtn.on('pointerdown', () => {
            this.scene.start('Shop');
        });
        shopBtn.on('pointerover', () => shopBtn.setScale(1.1));
        shopBtn.on('pointerout', () => shopBtn.setScale(1.0));
    }

    enemyConfig(enemies){
        enemies.counter = 0;
    }
    endLevel(){
        this.scene.start('Shop', {shopMoney: this.shopMoney});
    }
}