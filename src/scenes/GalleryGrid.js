export default class GalleryGrid extends Phaser.Scene {
    constructor() {
        super({ key: "GalleryGrid" });
    }

    init(datos) {
        this.globalIndex = datos.selectedIndex || 0;
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

        // Botón de volver
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

        // Flechas
        this.flechaArriba = this.add.sprite(this.sys.game.canvas.width / 2, this.sys.game.canvas.height * 0.18, "flecha")
            .setInteractive().setAngle(90).setScale(0.6);
        this.flechaArribaYOriginal = this.flechaArriba.y;

        this.flechaAbajo = this.add.sprite(this.sys.game.canvas.width / 2, this.sys.game.canvas.height * 0.92, "flecha")
            .setInteractive().setAngle(-90).setScale(0.6);
        this.flechaAbajoYOriginal = this.flechaAbajo.y;

        this.flechaArriba.on('pointerdown', () => this.indexShiftUp());
        this.flechaAbajo.on('pointerdown', () => this.indexShiftDown());

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on("keydown-ENTER", () => this.activarImagenSeleccionada());
        this.input.keyboard.on("keydown-ESC", () => this.scene.start("MainMenu"));

        this.load.once('complete', () => this.createGrid());
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

        this.imageSprites = [];
        this.dibujarGrid();
    }

    dibujarGrid() {
        // Destruir sprites antiguos
        this.imageSprites.forEach(s => s.destroy());
        this.imageSprites = [];

        // Calcular fila actual y startIndex
        this.filaActual = Math.floor(this.globalIndex / this.visibleCols / this.visibleRows);
        const startIndex = this.filaActual * this.visibleRows * this.visibleCols;
        const endIndex = Math.min(startIndex + this.pageSize, this.gallery.length);

        // Mostrar flechas
        this.flechaArriba.setVisible(this.filaActual > 0);
        this.flechaAbajo.setVisible(endIndex < this.gallery.length);

        const visibles = this.gallery.slice(startIndex, endIndex);
        visibles.forEach((img, i) => {
            const col = i % this.visibleCols;
            const row = Math.floor(i / this.visibleCols);

            const x = this.startX + col * this.spaceX;
            const y = this.startY + row * this.spaceY;

            const texture = this.textures.get(img.id);
            const frame = texture.getSourceImage();
            const imgScale = Math.min(this.boxSizeX / frame.width, this.boxSizeY / frame.height);

            const sprite = this.add.image(x, y, img.id).setInteractive({ useHandCursor: true });
            sprite.originalScale = imgScale;
            sprite.setScale(imgScale);
            sprite.globalIndex = startIndex + i;

            sprite.on("pointerdown", () => { this.globalIndex = sprite.globalIndex; this.actualizarSeleccion(); this.activarImagenSeleccionada(); });
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

        // Índice local dentro de la página
        this.selectedIndex = this.globalIndex - startIndex;
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

    indexShiftUp() {
        if (this.filaActual > 0) { this.filaActual--; this.globalIndex -= this.visibleCols * this.visibleRows; this.dibujarGrid(); }
    }
    indexShiftDown() {
        const maxFila = Math.ceil(this.gallery.length / (this.visibleCols * this.visibleRows)) - 1;
        if (this.filaActual < maxFila) {
            this.filaActual++; this.globalIndex += this.visibleCols * this.visibleRows; this.dibujarGrid();
        }
    }

    update() {
        const maxIndex = this.gallery.length - 1;

        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.left)) {
            if (this.globalIndex > 0) {
                this.globalIndex--; this.dibujarGrid();
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.right)) {
            if (this.globalIndex < maxIndex) {
                this.globalIndex++; this.dibujarGrid();
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.up)) {
            if (this.globalIndex - this.visibleCols >= 0) { 
                this.globalIndex -= this.visibleCols; this.dibujarGrid(); 
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.down)) {
            if (this.globalIndex + this.visibleCols <= maxIndex) { 
                this.globalIndex += this.visibleCols; this.dibujarGrid(); 
            }
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