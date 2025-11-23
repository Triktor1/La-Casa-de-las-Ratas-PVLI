export default class Gallery extends Phaser.Scene {
    constructor() {
        super({ key: "Gallery" });
    }

    init() {

    }

    preload() {
        //Carga del JSON con la información de las imágenes de la galería
        this.load.json('galeria', 'assets/Gallery/gallery.json');

        //Carga de imágenes (aparte de las de la galería)
        this.load.image('flecha', 'assets/UI/FlechaGaleria.png');
        this.load.image('backButton', 'assets/start.png'); // Botón de galería (placeholder)
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    create() {
        this.cameras.main.setBackgroundColor(0xa6859f);
        //Creación del objeto galería y carga de las imágenes
        this.gallery = this.cache.json.get('galeria').imagenes;
        this.gallery.forEach(item => {
            this.load.image(item.id, `assets/Gallery/${item.archivo}`);
        });

        //Texto del título de la galería
        const titleX = 640, titleY = 55;
        this.add.text(titleX, titleY, "La Galería de las Ratas", {
            fontSize: '75px',
            fontFamily: 'Arial Black',
            color: '#4a3052'
        }).setOrigin(0.5, 0.5);

        //Configuración del botón de volver
        const galleryBtn = this.add.sprite(this.sys.game.canvas.width * 0.07, this.sys.game.canvas.height * 0.92, 'backButton').setInteractive({ useHandCursor: true }).setScale(0.4);
        galleryBtn.on('pointerdown', () => {
            this.scene.start("MainMenu");
        });
        galleryBtn.on('pointerover', () => galleryBtn.setScale(0.45));
        galleryBtn.on('pointerout', () => galleryBtn.setScale(0.4));

        //Botones de flechas
        this.flechaIzqX = this.sys.game.canvas.width * 0.06;
        this.flechaIzq = this.add.sprite(this.sys.game.canvas.width * 0.06, this.sys.game.canvas.height * 0.5, 'flecha').setInteractive({ useHandCursor: true }).setScale(0.8);

        this.flechaDerX = this.sys.game.canvas.width * 0.94;
        this.flechaDer = this.add.sprite(this.sys.game.canvas.width * 0.94, this.sys.game.canvas.height * 0.5, 'flecha').setInteractive({ useHandCursor: true }).setScale(0.8);
        this.flechaDer.flipX = true;

        //Cambio el índice para que cambie de imagen, loopeando si llega a un extremo (haciendo clic en las flechas de la pantalla)
        this.flechaIzq.on('pointerdown', () => {
            this.indexShiftLeft();
        });
        this.flechaDer.on('pointerdown', () => {
            this.indexShiftRight();
        });

        //Controles con flechas de teclado
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        //Crea la galería en cuanto carga todas las imágenes
        this.load.once('complete', () => {
            this.createGallery();
        });

        //Carga explícita porque se cargan las imágenes en create
        this.load.start();
    }

    //Inicialización de galería
    createGallery() {
        this.index = 0;
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
            x: originalX - 10,
            duration: 100,
            ease: 'Linear',
            onComplete: () => {
                //Tween de regreso a la posición original
                this.tweens.add({
                    targets: this.flechaIzq,
                    x: originalX,
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
            x: originalX + 10,
            duration: 100,
            ease: 'Linear',
            onComplete: () => {
                //Tween de regreso a la posición original
                this.tweens.add({
                    targets: this.flechaDer,
                    x: originalX,
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
        if (this.descripcion) this.descripcion.destroy();
        if (this.indexNum) this.indexNum.destroy();

        //Creo unas dimensiones máximas para la imagen, como metíendola en una "caja"
        const sizeX = 650, sizeY = 500, posX = 80, posY = 120;
        const texture = this.textures.get(img.id);
        const frame = texture.getSourceImage();
        let imgScale = Math.min(sizeX / frame.width, sizeY / frame.height)
        this.sprite = this.add.image(posX + sizeX / 2, posY + sizeY / 2, img.id).setScale(imgScale);

        //Creo de nuevo los textos con sus propiedades
        const nombreX = 720, nombreY = 120, autorX = 722, autorY = 180, descX = 720, descY = 240, descLength = 380;
        this.nombre = this.add.text(nombreX, nombreY, img.nombre, {
            fontSize: '50px',
            fontFamily: 'Arial Black',
            color: '#4a3052'
        });
        this.autor = this.add.text(autorX, autorY, img.autor, {
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
        if (this.index < 9) this.indexNumText = `0${this.index + 1}/${this.gallery.length}`;
        else this.indexNumText = `${this.index + 1}/${this.gallery.length}`;

        const indexNumX = 40, indexNumY = 120;
        this.indexNum = this.add.text(indexNumX, indexNumY, this.indexNumText, {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#4a3052'
        });
    }
}