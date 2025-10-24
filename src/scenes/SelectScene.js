export default class MainMenu extends Phaser.Scene {
    constructor(){
        super({key:"SelectScene"});

    }

    init(){

    }
   
    preload(){
        this.load.image('botonlvl1', 'assets/boton1.png')
        this.load.image('botonlvl2', 'assets/boton2.png')
        this.load.image('botonlvl3', 'assets/boton3.png')
        this.load.image('botonShop', 'assets/shop.png')
        this.load.image('botonTutorial', 'assets/tutorial.png')
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    create(){
        this.add.text(20, 20, "Select Level");
      

        const btn1 = this.add.sprite(this.scale.width / 2, 220, 'botonlvl1').setInteractive({ useHandCursor: true });
        const btn2 = this.add.sprite(this.scale.width / 2, 320, 'botonlvl2').setInteractive({ useHandCursor: true });
        const btn3 = this.add.sprite(this.scale.width / 2, 420, 'botonlvl3').setInteractive({ useHandCursor: true });
        const btnShop = this.add.sprite(this.scale.width / 2, 520, 'botonShop').setInteractive({ useHandCursor: true });
        const btnTutorial = this.add.sprite(this.scale.width / 2, 620, 'botonTutorial').setInteractive({ useHandCursor: true });
        const buttonScale = 0.5;
        btn1.setScale(buttonScale);
        btn2.setScale(buttonScale);
        btn3.setScale(buttonScale);
        btnShop.setScale(buttonScale);
        btnTutorial.setScale(buttonScale);

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
        })

        btnTutorial.on('pointerdown', () => {
            this.scene.start('TutorialLevel');
        })

        //efectos
        btn1.on('pointerover', () => btn1.setScale(buttonScale+0.1));
        btn1.on('pointerout', () => btn1.setScale(buttonScale));
        btn2.on('pointerover', () => btn2.setScale(buttonScale+0.1));
        btn2.on('pointerout', () => btn2.setScale(buttonScale));
        btn3.on('pointerover', () => btn3.setScale(buttonScale+0.1));
        btn3.on('pointerout', () => btn3.setScale(buttonScale));
        btnShop.on('pointerover', () => btnShop.setScale(buttonScale+0.1));
        btnShop.on('pointerout', () => btnShop.setScale(buttonScale));
        btnTutorial.on('pointerover', () => btnTutorial.setScale(buttonScale+0.1));
        btnTutorial.on('pointerout', () => btnTutorial.setScale(buttonScale));
    }
}