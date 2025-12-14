export default class TropeButton extends Phaser.GameObjects.Sprite
{

    constructor(scene , x , y , sprite , precio , estado , desc, nombre,color)
    {
        super(scene , x , y , sprite , 0)
        
        const textura  = sprite;

        this.isUnlocked = estado;
        this.tropa = 0;
        this.desc = desc;
        this.Nombre = nombre;
        this.color = color; 
        this.precio = precio;
        this.anims.play(sprite);

        scene.add.existing(this);

        if (this.isUnlocked)
        {
            this.setTint(0x34383d);
        }

        //Precio
        this.priceText = scene.add.text(
            x,
            y + 70,              
            this.precio,
            {
                fontSize: '20px',
                fontFamily: 'Arial Black',
                color: '#ffffffff'
            });

        // Pluma
        this.plumaIcon = scene.add.image(
        this.priceText.x + this.priceText.width / 2 + 20,this.priceText.y,'pluma').setScale(0.25);
    }
        
    
    esComprada()
    {
        console.log("Caching");
        this.isUnlocked = true;
        this.setTint(0x34383d);
    }

}