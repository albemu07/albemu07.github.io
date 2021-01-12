import Objeto from './objeto.js';
export default class Player extends Objeto {
    constructor(scene, x, y,sprite, scale, colliderX, colliderY, animIdle, animRun, gamepad) {
      super(scene, x, y, sprite, colliderX, colliderY, scale, false);
      this.speedPlayer=100;     
      this.speedCaja=50;
      this.speed= this.speedPlayer
      this.animIdle = animIdle;
      this.animRun = animRun;
      this.colliderX = colliderX;
      this.colliderY = colliderY;
      this.scale = scale;
      this.pad = gamepad;
      this.lol = false;
    }

    getVelocityY(){
      return this.body.velocity.y;
    }
    
    getVelocityX(){
      return this.body.velocity.x;
    }

    speedChange(caja){
      if (caja)
        this.speed = this.speedCaja;
      else this.speed = this.speedPlayer;
    }

    grabLever(){
      if (this.pad){
        if (!this.lol && this.pad.B){
          this.lol = true;
          return true;
        }
        else if(this.lol && !this.pad.B){
          this.lol = false;
        }
      }
      else if (Phaser.Input.Keyboard.JustDown(this.cursors.grab)){        
        return true;            
      }
      return false;
    }

    grabDown(){
      if (this.cursors.grab.isDown || (this.pad && this.pad.B)){
        return true;
      }
      else return false;
    }

    setGamePad(controller){
      this.pad = controller;
    }

    stunDown()
    {
      if (this.cursors.stun.isDown || (this.pad && this.pad.Y)){
        return true;
      }
      else return false;
    }

    preUpdate(time, delta){
      super.preUpdate(time,delta);
      if (!this.pad){
        if (this.cursors.up.isDown) {
          this.body.setVelocityY(-this.speed);
          // this.flipX=false;
          // this.flipY=false;
          this.angle = 0;
        }
        else if (this.cursors.down.isDown) {
          this.body.setVelocityY(this.speed);
          // this.flipX=false;
          // this.flipY=true;
          this.angle = 180;
        }
        else{
            this.body.setVelocityY(0);
        }
        if (this.cursors.left.isDown) {
          this.body.setVelocityX(-this.speed);
          // this.flipX=true;
          // this.flipY=false;
          this.angle = 270;
        }
        else if (this.cursors.right.isDown) {
          this.body.setVelocityX(this.speed);
          // this.flipX=true;
          // this.flipY=true;
          this.angle = 90;
        }
        else{
          this.body.setVelocityX(0);
        } 
      }
      else {
        if (this.pad.up || this.pad.leftStick.y < -0.2) {
          this.body.setVelocityY(-this.speed);
          this.rotation = 0;
           this.flipX=false;
           this.flipY=false;
        }
        else if (this.pad.down || this.pad.leftStick.y > 0.2) {
          this.body.setVelocityY(this.speed);
          this.rotation = 180;
          this.flipX=false;
          this.flipY=true;
        }
        else{
            this.body.setVelocityY(0);
        }
        if (this.pad.left || this.pad.leftStick.x < -0.2) {
          this.body.setVelocityX(-this.speed);
           this.flipY=false;
           this.rotation = 90;
           this.flipX=true;
          
        }
        else if (this.pad.right || this.pad.leftStick.x > 0.2) {
          this.body.setVelocityX(this.speed);
           this.flipY=true;
           this.rotation = 270;
           this.flipX=true;
        }
        else{
          this.body.setVelocityX(0);
        } 
      }
 
      if(this.body.velocity.x===0 && this.body.velocity.y===0){
        this.anims.play(this.animIdle,true);
      }
      else{
        this.anims.play(this.animRun,true);
      }
    }
  }