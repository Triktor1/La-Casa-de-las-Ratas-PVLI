export default class TropeButton extends Phaser.GameObjects.Image
{

    constructor(scene , x , y , sprite , precio , estado , desc)
    {
        super(scene , x , y , sprite , 0)
        
        const textura  = sprite;

        this.isUnlocked = estado;
        this.tropa = 0;
        this.desc = desc;
        this.precio = precio;
        scene.add.existing(this);

        if (this.isUnlocked)
        {
            this.setTint(0x34383d);
        }
        
    }
    esComprada()
    {
        console.log("Caching");
        this.isUnlocked = true;
        this.setTint(0x34383d);
    }

}