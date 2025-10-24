export default class MainMenu extends Phaser.Scene {
    constructor(){
        super({key:"SelectScene"});

    }

    init(){

    }
    
    preload(){
        this.load.image('btn1', 'assets/boton1.png')
        this.load.image('btn2', 'assets/boton2.png')
        this.load.image('btn3', 'assets/boton3.png')
        this.load.image('shop', 'assets/shop.png')
        this.load.image('tutorial', 'assets/tutorial.png')



    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    create(){
        this.add.text(20, 20, "Select Level");

        const btn1 = this.add.sprite(this.scale.width / 2, 220, 'btn1').setInteractive({ useHandCursor: true });
        const btn2 = this.add.sprite(this.scale.width / 2, 320, 'btn2').setInteractive({ useHandCursor: true });
        const btn3 = this.add.sprite(this.scale.width / 2, 420, 'btn3').setInteractive({ useHandCursor: true });
        const btnShop = this.add.sprite(this.scale.width / 2, 520, 'shop').setInteractive({ useHandCursor: true });
        const btnTut = this.add.sprite(this.scale.width / 2, 620, 'tutorial').setInteractive({ useHandCursor: true });

        btn1.on('pointerdown', () => {
            this.scene.start('Level1');
        });

        btn2.on('pointerdown', () => {
            this.scene.start('Level2');
        });

        btn3.on('pointerdown', () => {
            this.scene.start('Level3');
        });
        btnShop.on('pointerdown', () => {
            this.scene.start('Shop');
        });
        btnTut.on('pointerdown', () => {
            this.scene.start('TutorialLevel');
        });

        //efectos
        btn1.on('pointerover', () => btn1.setScale(1.1));
        btn1.on('pointerout', () => btn1.setScale(1.0));
        btn2.on('pointerover', () => btn2.setScale(1.1));
        btn2.on('pointerout', () => btn2.setScale(1.0));
        btn3.on('pointerover', () => btn3.setScale(1.1));
        btn3.on('pointerout', () => btn3.setScale(1.0));
        btnShop.on('pointerover', () => btnShop.setScale(1.1));
        btnShop.on('pointerout', () => btnShop.setScale(1.0));
        btnTut.on('pointerover', () => btnTut.setScale(1.1));
        btnTut.on('pointerout', () => btnTut.setScale(1.0));

    }
}