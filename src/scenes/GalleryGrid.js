export default class GalleryGrid extends Phaser.Scene {
    constructor() {
        super({ key: "GalleryGrid" });
    }

    init(datos) {
        this.globalIndex = datos.selectedIndex ?? 0;
    }

    preload() {
        this.load.json('galeria', 'assets/Gallery/gallery.json');
        this.load.image('flecha', 'assets/UI/FlechaGaleria.png');
        this.load.image('backButton', 'assets/UI/backbutton.png');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x967194);

        this.gallery = this.cache.json.get('galeria').imagenes;
        this.gallery.forEach(item => this.load.image(item.id, `assets/Gallery/${item.archivo}`));

        this.add.text(640, 45, "La Galería de las Ratas", {
            fontSize: '75px',
            fontFamily: 'Arial Black',
            color: '#4a3052'
        }).setOrigin(0.5);

        //Botón de volver
        const backBtn = this.add.sprite(this.sys.game.canvas.width * 0.08, this.sys.game.canvas.height * 0.93, 'backButton')
            .setInteractive({ useHandCursor: true })
            .setScale(0.4);
        backBtn.on('pointerdown', () => this.scene.start("MainMenu"));
        backBtn.on('pointerover', () => this.tweens.add({
            targets: backBtn,
            scale: 0.45,
            rotation: -0.125,
            duration: 150,
            ease: 'Expo.easeIn'
        }));
        backBtn.on('pointerout', () => this.tweens.add({
            targets: backBtn,
            scale: 0.4,
            rotation: 0,
            duration: 70,
            ease: 'Linear'
        }));

        //Flechas
        this.flechaArriba = this.add.sprite(this.sys.game.canvas.width / 2, this.sys.game.canvas.height * 0.18, "flecha")
            .setInteractive().setAngle(90).setScale(0.6);
        this.flechaArribaYOriginal = this.flechaArriba.y;
        this.flechaArribaScaleOriginal = this.flechaArriba.scale;

        this.flechaAbajo = this.add.sprite(this.sys.game.canvas.width / 2, this.sys.game.canvas.height * 0.92, "flecha")
            .setInteractive().setAngle(-90).setScale(0.6);
        this.flechaAbajoYOriginal = this.flechaAbajo.y;
        this.flechaAbajoScaleOriginal = this.flechaAbajo.scale;

        this.flechaArriba.on('pointerdown', () => this.indexShiftUp(true));
        this.flechaAbajo.on('pointerdown', () => this.indexShiftDown(true));

        //Tweens de flechas
        //Arriba
        this.flechaArriba.on("pointerover", () => {
            this.tweens.add({
                targets: this.flechaArriba,
                y: this.flechaArribaYOriginal - 10,
                duration: 120,
                ease: "Linear"
            });
        });
        this.flechaArriba.on("pointerout", () => {
            this.tweens.add({
                targets: this.flechaArriba,
                y: this.flechaArribaYOriginal,
                duration: 120,
                ease: "Linear"
            });
        });

        //Abajo
        this.flechaAbajo.on("pointerover", () => {
            this.tweens.add({
                targets: this.flechaAbajo,
                y: this.flechaAbajoYOriginal + 10,
                duration: 120,
                ease: "Linear"
            });
        });
        this.flechaAbajo.on("pointerout", () => {
            this.tweens.add({
                targets: this.flechaAbajo,
                y: this.flechaAbajoYOriginal,
                duration: 120,
                ease: "Linear"
            });
        });

        //Visibilidad inicial flechas
        this.flechaArriba.setVisible(this.filaActual > this.visibleRows - 1);
        this.flechaAbajo.setVisible(this.endIndex < this.gallery.length);

        //Controles
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on("keydown-ENTER", () => this.activarImagenSeleccionada());
        this.input.keyboard.on("keydown-ESC", () => this.scene.start("MainMenu"));

        this.load.once('complete', () => {
            this.createGrid();
            this.dibujarGrid();
        });
        this.load.start();
    }

    createGrid() {
        this.visibleCols = 4;
        this.visibleRows = 2;
        this.pageSize = this.visibleCols * this.visibleRows;

        this.boxSizeX = 240;
        this.boxSizeY = 200;
        this.startX = 175;
        this.startY = 275;
        this.spaceX = 70 + this.boxSizeX;
        this.spaceY = 40 + this.boxSizeY;

        this.firstTime = true;

        this.imageSprites = [];
        this.dibujarGrid();
    }

    dibujarGrid() {
        //Destruir sprites antiguos
        this.imageSprites.forEach(s => s.destroy());
        this.imageSprites = [];

        //Calcular fila actual y startIndex
        this.filaActual = Math.floor(this.globalIndex / this.visibleCols);
        console.log("Fila actual:", this.filaActual);
        console.log("Índice global:", this.globalIndex);
        console.log("Índice local:", this.globalIndex % this.pageSize);

        this.startIndex = this.globalIndex - (this.globalIndex % this.pageSize);
        this.endIndex = Math.min(this.startIndex + this.pageSize, this.gallery.length);

        const visibles = this.gallery.slice(this.startIndex, this.endIndex);
        visibles.forEach((img, i) => {
            const col = i % this.visibleCols;
            const row = Math.floor(i / this.visibleCols);

            const x = this.startX + col * this.spaceX;
            const y = this.startY + row * this.spaceY;

            const texture = this.textures.get(img.id);
            const frame = texture.getSourceImage();
            const imgScale = Math.min(this.boxSizeX / frame.width, this.boxSizeY / frame.height);

            const globalIndex = this.startIndex + i;
            const sprite = this.add.image(x, y, img.id).setInteractive({ useHandCursor: true });
            sprite.globalIndex = globalIndex;
            sprite.originalScale = imgScale;
            sprite.setScale(imgScale);

            sprite.on("pointerdown", () => {
                this.globalIndex = sprite.globalIndex;
                this.actualizarSeleccion(); this.activarImagenSeleccionada();
            });
            sprite.on("pointerover", () =>
                this.tweens.add({
                    targets: sprite,
                    scale: sprite.originalScale * 1.1,
                    duration: 100,
                    ease: 'Linear'
                }));
            sprite.on("pointerout", () => {
                if (sprite.globalIndex === this.globalIndex) return;
                this.tweens.add({
                    targets: sprite,
                    scale: sprite.originalScale,
                    duration: 100,
                    ease: 'Linear'
                });
            });

            this.imageSprites.push(sprite);
        });

        //Índice local dentro de la página
        this.selectedIndex = this.globalIndex - this.startIndex;
        this.actualizarSeleccion();
    }

    actualizarSeleccion() {
        this.imageSprites.forEach((s, i) => {
            if (i === this.selectedIndex) {
                s.clearFX();
                if (s.tweenSeleccion) s.tweenSeleccion.stop();
                s.tweenSeleccion = this.tweens.add({
                    targets: s,
                    scale: s.originalScale * 1.1,
                    duration: 100,
                    ease: 'Linear'
                });
                s.preFX.addGlow(0xffffff, 3);
            } else {
                s.clearFX();
                if (s.tweenSeleccion) s.tweenSeleccion.stop();
                this.tweens.add({
                    targets: s,
                    scale: s.originalScale,
                    duration: 100,
                    ease: 'Linear'
                });
            }
        });
    }

    indexShiftUp(clicked = false) {
        this.globalIndex = Math.max(this.globalIndex - this.visibleCols, 0);
        this.dibujarGrid();

        if (this.filaActual > this.visibleRows - 1) this.flechaArriba.setVisible(true);
        if (this.endIndex < this.gallery.length) this.flechaAbajo.setVisible(true);
        //Tween flecha arriba
        if (this.globalIndex % this.pageSize >= this.visibleCols || clicked) {
            const originalY = this.flechaArribaYOriginal;
            const originalScale = this.flechaArribaScaleOriginal;
            this.tweens.killTweensOf(this.flechaArriba);
            this.flechaArribaYOriginal = originalY;
            this.tweens.add({
                targets: this.flechaArriba,
                y: originalY - 20,
                scale: originalScale * 1.1,
                duration: 100,
                ease: 'Linear',
                onComplete: () => {
                    //Tween de regreso a la posición original
                    this.tweens.add({
                        targets: this.flechaArriba,
                        y: originalY,
                        scale: originalScale,
                        duration: 100,
                        ease: 'Linear',
                        onComplete: () => {
                            this.flechaArriba.setVisible(this.filaActual > this.visibleRows - 1);
                            this.flechaAbajo.setVisible(this.endIndex < this.gallery.length);
                        }
                    });
                }
            });
        }

    }

    indexShiftDown(clicked = false) {
        const maxIndex = this.gallery.length - 1;
        this.globalIndex = Math.min(this.globalIndex + this.visibleCols, maxIndex);

        this.dibujarGrid();

        if (this.filaActual > this.visibleRows - 1) this.flechaArriba.setVisible(true);
        if (this.endIndex < this.gallery.length) this.flechaAbajo.setVisible(true);
        //Tween flecha abajo
        if (this.globalIndex % this.pageSize < this.visibleCols || clicked) {
            const originalY = this.flechaAbajoYOriginal;
            const originalScale = this.flechaAbajoScaleOriginal;
            this.tweens.killTweensOf(this.flechaAbajo);
            this.flechaAbajoYOriginal = originalY;
            this.tweens.add({
                targets: this.flechaAbajo,
                y: originalY + 20,
                scale: originalScale * 1.2,
                duration: 100,
                ease: 'Linear',
                onComplete: () => {
                    //Tween de regreso a la posición original
                    this.tweens.add({
                        targets: this.flechaAbajo,
                        y: originalY,
                        scale: originalScale,
                        duration: 100,
                        ease: 'Linear',
                        onComplete: () => {
                            this.flechaArriba.setVisible(this.filaActual > this.visibleRows - 1);
                            this.flechaAbajo.setVisible(this.endIndex < this.gallery.length);
                        }
                    });
                }
            });
        }
    }


    update() {
        const maxIndex = this.gallery.length - 1;
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.left)) {
            if (this.globalIndex > 0) {
                this.globalIndex--;
                this.dibujarGrid();
                this.flechaArriba.setVisible(this.filaActual > this.visibleRows - 1);
                this.flechaAbajo.setVisible(this.endIndex < this.gallery.length);
                console.log("Max index:", maxIndex);
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.right)) {
            if (this.globalIndex < maxIndex) {
                this.globalIndex++;
                this.dibujarGrid();
                this.flechaArriba.setVisible(this.filaActual > this.visibleRows - 1);
                this.flechaAbajo.setVisible(this.endIndex < this.gallery.length);
                console.log("Max index:", maxIndex);
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.up)) {
            this.indexShiftUp();
            console.log("Max index:", maxIndex);


        }
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.down)) {
            this.indexShiftDown();
            console.log("Max index:", maxIndex);
        }
    }

    activarImagenSeleccionada() {
        this.scene.start("GalleryImages", {
            index: this.globalIndex,
            rowNum: this.visibleRows,
            colNum: this.visibleCols
        });
    }
}