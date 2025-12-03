export default class GalleryImages extends Phaser.Scene {
    constructor() {
        super({ key: "GalleryImages" });
    }

    init(datos) {
        this.index = datos.index;
        this.rowNum = datos.rowNum;
        this.colNum = datos.colNum;
    }

    preload() {
        //Carga del JSON con la información de las imágenes de la galería
        this.load.json('galeria', 'assets/Gallery/gallery.json');

        //Carga de imágenes (aparte de las de la galería)
        this.load.image('flecha', 'assets/UI/FlechaGaleria.png');
        this.load.image('backButton', 'assets/UI/backbutton.png'); // Botón de galería (placeholder)
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    create() {
        //Color de fondo
        this.cameras.main.setBackgroundColor(0x967194);

        //Creación del objeto galería y carga de las imágenes
        this.gallery = this.cache.json.get('galeria').imagenes;
        this.gallery.forEach(item => {
            this.load.image(item.id, `assets/Gallery/${item.archivo}`);
        });

        //Configuración del botón de volver
        const backBtn = this.add.sprite(this.sys.game.canvas.width * 0.08, this.sys.game.canvas.height * 0.93, 'backButton').setInteractive({ useHandCursor: true }).setScale(0.4);
        backBtn.on('pointerdown', () => {
            this.scene.start("GalleryGrid", {
                primeraFila: Math.floor(this.index / this.colNum),
                selectedIndex: this.index
            });
        });

        //Tweens con hover del botón de volver
        backBtn.on('pointerover', () =>
            this.tweens.add({
                targets: backBtn,
                scale: 0.45,
                rotation: -0.125,
                duration: 150,
                ease: 'Expo.easeIn',
            }));
        backBtn.on('pointerout', () =>
            this.volverBack = this.tweens.add({
                targets: backBtn,
                scale: 0.4,
                rotation: 0,
                duration: 70,
                ease: 'Linear',
            }));

        //Botones de flechas
        this.flechaIzqX = this.sys.game.canvas.width * 0.06;
        this.flechaIzq = this.add.sprite(this.sys.game.canvas.width * 0.06, this.sys.game.canvas.height * 0.5, 'flecha').setInteractive({ useHandCursor: true }).setScale(0.8);

        this.flechaDerX = this.sys.game.canvas.width * 0.94;
        this.flechaDer = this.add.sprite(this.sys.game.canvas.width * 0.94, this.sys.game.canvas.height * 0.5, 'flecha').setInteractive({ useHandCursor: true }).setScale(0.8);
        this.flechaDer.flipX = true;

        //Tweens con hover de los botones de flechas
        const originalXIzq = this.flechaIzqX;
        this.tweens.killTweensOf(this.flechaIzq);
        this.flechaIzq.x = originalXIzq;
        this.flechaIzq.on('pointerover', () => this.tweens.add({
            targets: this.flechaIzq,
            x: originalXIzq - 8,
            duration: 70,
            ease: 'Linear',
        }));
        this.flechaIzq.on('pointerout', () => this.tweens.add({
            targets: this.flechaIzq,
            x: originalXIzq + 8,
            duration: 70,
            ease: 'Linear',
        }));
        const originalXDer = this.flechaDerX;
        this.tweens.killTweensOf(this.flechaDer);
        this.flechaDer.x = originalXDer;
        this.flechaDer.on('pointerover', () => this.tweens.add({
            targets: this.flechaDer,
            x: originalXDer + 8,
            duration: 70,
            ease: 'Linear',
        }));

        this.flechaDer.on('pointerout', () => this.tweens.add({
            targets: this.flechaDer,
            x: originalXDer - 8,
            duration: 70,
            ease: 'Linear',
        }));


        //Cambio el índice para que cambie de imagen, loopeando si llega a un extremo (haciendo clic en las flechas de la pantalla)
        this.flechaIzq.on('pointerdown', () => {
            this.indexShiftLeft();
        });
        this.flechaDer.on('pointerdown', () => {
            this.indexShiftRight();
        });

        //Controles
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on("keydown-ESC", () =>
            this.scene.start("GalleryGrid", {
                primeraFila: Math.floor(this.index / this.colNum),
                selectedIndex: this.index
            }));

        //Crea la galería en cuanto carga todas las imágenes
        this.load.once('complete', () => {
            this.createGallery();
        });

        //Carga explícita porque se cargan las imágenes en create
        this.load.start();
    }

    //Inicialización de galería
    createGallery() {
        this.mostrarImagenActual();
    }

    //Reduce en 1 el índice (con looping si se sale)
    indexShiftLeft() {
        this.index = (this.index - 1 + this.gallery.length) % this.gallery.length;
        this.mostrarImagenActual();

        //Tween de movimiento de la flecha a la izquierda, haciendo que reinicie en caso de empezar uno antes de que termine el anterior
        const originalX = this.flechaIzqX;
        this.tweens.killTweensOf(this.flechaIzq);
        this.flechaIzq.x = originalX;
        this.tweens.add({
            targets: this.flechaIzq,
            x: originalX - 30,
            scale: 0.9,
            duration: 100,
            ease: 'Linear',
            onComplete: () => {
                //Tween de regreso a la posición original
                this.tweens.add({
                    targets: this.flechaIzq,
                    x: originalX,
                    scale: 0.8,
                    duration: 100,
                    ease: 'Linear'
                });
            }
        });
    }

    //Aumenta en 1 el índice (con looping si se sale)
    indexShiftRight() {
        this.index = (this.index + 1) % this.gallery.length;
        this.mostrarImagenActual();

        //Tween de movimiento de la flecha a la derecha, haciendo que reinicie en caso de empezar uno antes de que termine el anterior
        const originalX = this.flechaDerX;
        this.tweens.killTweensOf(this.flechaDer);
        this.flechaDer.x = originalX;
        this.tweens.add({
            targets: this.flechaDer,
            x: originalX + 30,
            scale: 0.9,
            duration: 100,
            ease: 'Linear',
            onComplete: () => {
                //Tween de regreso a la posición original
                this.tweens.add({
                    targets: this.flechaDer,
                    x: originalX,
                    scale: 0.8,
                    duration: 100,
                    ease: 'Linear'
                });
            }
        });
    }

    update() {
        //Cambio el índice para que cambie de imagen, loopeando si llega a un extremo (con flecha de teclado)
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.left)) {
            this.indexShiftLeft();
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.right)) {
            this.indexShiftRight();
        }
    }

    //Cambia la información actual de la galería por la de la imagen del índice nuevo
    mostrarImagenActual() {
        const img = this.gallery[this.index];

        //Si ya existen, se destruyen (pasa siempre excepto la primera vez)
        if (this.sprite) this.sprite.destroy();
        if (this.nombre) this.nombre.destroy();
        if (this.autor) this.autor.destroy();
        if (this.grupo) this.grupo.destroy();
        if (this.descripcion) this.descripcion.destroy();
        if (this.indexNum) this.indexNum.destroy();

        //Creo unas dimensiones máximas para la imagen, como metíendola en una "caja"
        const sizeX = 500, sizeY = 500, posX = 165, posY = 120;
        const texture = this.textures.get(img.id);
        const frame = texture.getSourceImage();
        let imgScale = Math.min(sizeX / frame.width, sizeY / frame.height)
        this.sprite = this.add.image(posX + sizeX / 2, posY + sizeY / 2, img.id).setScale(imgScale);

        //Creo de nuevo los textos con sus propiedades
        const nombreX = 640, nombreY = 55, autorX = 720, autorY = 120, grupoX = 722, grupoY = 180, descX = 720, descY = 240, descLength = 380;
        
        this.nombre = this.add.text(nombreX, nombreY, img.nombre, {
            fontSize: '75px',
            fontFamily: 'Arial Black',
            color: '#4a3052'
        }).setOrigin(0.5, 0.5);
        this.autor = this.add.text(autorX, autorY, img.autor, {
            fontSize: '45px',
            fontFamily: 'Arial Black',
            color: '#4a3052'
        });
        this.grupo = this.add.text(grupoX, grupoY, img.grupo, {
            fontSize: '25px',
            fontFamily: 'Arial Black',
            color: '#4a3052'
        });
        this.descripcion = this.add.text(descX, descY, img.descripcion, {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#4a3052',
            wordWrap: { width: descLength }
        });

        //Contador de número de obras en la galería
        this.indexNumText;
        if (this.index < 9) {
            this.indexNumText = `0${this.index + 1}/`;
        }
        else {
            this.indexNumText = `${this.index + 1}/`;
        }
        if (this.gallery.length < 10) {
            this.indexNumText += '0';
        }
        this.indexNumText += this.gallery.length;

        const indexNumX = 40, indexNumY = 120;
        this.indexNum = this.add.text(indexNumX, indexNumY, this.indexNumText, {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#4a3052'
        });
    }
}