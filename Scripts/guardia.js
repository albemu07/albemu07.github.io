import Enemigo from './enemigo.js'
export default class Guardia extends Enemigo
{
    constructor(scene,x,y,x2,y2,horizontal,type,sprite)
    {
        super(scene, x, y,x2,y2,horizontal,type, sprite);

        this.velocidad = 60;
        this.distraida =false;
 
    }
    preUpdate()
    {
        this.scene.physics.moveTo(this, this.posX,this.posY, this.velocidad);
            
        if (this.horizontal)
        {
            this.moveH();
        }  
        else 
        {            
            this.moveV();
        }

        if (!this.distraida)
        {
            this.vision.visible =true;
            this.velocidad =60;
        }
        else 
        {
            this.vision.visible =false;
            this.velocidad=0;
        }
    }
    distract(active)
    {
        this.distraida =active;

    }
   

}