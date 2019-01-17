class Enemy {
  constructor() {
    this.sprite = new PIXI.Sprite(PIXI.loader.resources['../images/enemy.png'].texture);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.position.set(renderer.width * 0.8, renderer.height * 0.4);
    this.sprite.scale.set(0.6, 0.6);

    // this.blankHealthBarSprite = new PIXI.Sprite(PIXI.loader.resources['../images/blank-health-bar.png'].texture);
    // this.blankHealthBarSprite.anchor.set(0.5, 0.5);
    // this.blankHealthBarSprite.position.set(0, this.sprite.height + 20);
    // this.blankHealthBarSprite.scale.set(0.3, 0.3);

    // this.fullHealthBarSprite = new PIXI.Sprite(PIXI.loader.resources['../images/full-health-bar.png'].texture);
    // this.fullHealthBarSprite.anchor.set(0.5, 0.5);
    // this.fullHealthBarSprite.position.set(0, this.sprite.height + 20);
    // this.fullHealthBarSprite.scale.set(0.3, 0.3);

    //Create the health bar
    this.healthBar = new PIXI.Container();
    this.healthBar.position.set(-this.sprite.width/2, this.sprite.height + 10);
    this.sprite.addChild(this.healthBar);

    //Create the black background rectangle
    let innerBar = new PIXI.Graphics();
    innerBar.beginFill(0x000000);
    innerBar.drawRect(0, 0, 128, 8);
    innerBar.endFill();
    this.healthBar.addChild(innerBar);

    //Create the front red rectangle
    let outerBar = new PIXI.Graphics();
    outerBar.beginFill(0xff3300);
    outerBar.drawRect(0, 0, 128, 8);
    outerBar.endFill();
    this.healthBar.addChild(outerBar);

    this.healthBar.outer = outerBar;

    this.directionX = 0;
    this.directionY = 0;
    this.speed = 10;

    this.fireSpeed = 100;
    this.fireCooldown = 0;

    // this.sprite.addChild(this.blankHealthBarSprite);
    // this.sprite.addChild(this.fullHealthBarSprite);
    // console.log(this.fullHealthBarSprite);
    stage.addChild(this.sprite);
  }

  update() {
    let nextX = this.sprite.position.x + this.directionX * this.speed;
    let nextY = this.sprite.position.y + this.directionY * this.speed;

    // Prevent from leaving the screen
    if (nextX > 0 && nextX < renderer.width) {
      this.sprite.position.x = nextX;
    }
    if (nextY > 0 && nextY < renderer.height) {
      this.sprite.position.y = nextY;
    }

    this.updateFire();
  }

  updateFire() {
    if (this.fireCooldown < this.fireSpeed) this.fireCooldown++;

    if (this.fireCooldown >= this.fireSpeed) {
      let enemyRocket = new EnemyRocket(this.sprite.position.x, this.sprite.position.y);
      this.fireCooldown = 0;
    }
  }
}
