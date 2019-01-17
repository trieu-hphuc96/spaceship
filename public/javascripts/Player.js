class Player {
  constructor() {
    this.sprite = new PIXI.Sprite(PIXI.loader.resources['../images/spaceship.png'].texture);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.position.set(renderer.width * 0.2, renderer.height * 0.4);
    this.sprite.scale.set(0.4, 0.4);

    // this.xSprite = new PIXI.Sprite(PIXI.loader.resources["../images/X.png"].texture);
    // this.xSprite.anchor.set(0.5, 0.5);
    // this.xSprite.position.set(this.sprite.width,0 );
    // this.xSprite.scale.set(0.4, 0.4);

    //Create the health bar
    this.healthBar = new PIXI.Container();
    this.healthBar.position.set(-this.sprite.width / 2, this.sprite.height + 30);
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

    function createRetangle(width, height) {
      let container, centerPoint, leftEdge, rightEdge, upperEdge, lowerEdge;

      console.log(width, height);

      container = new PIXI.Container();
      container.position.set(0, 0);

      centerPoint = new PIXI.Graphics();
      centerPoint.beginFill(0xff3300);
      centerPoint.drawRect(0, 0, 5, 5);
      centerPoint.endFill();

      leftEdge = new PIXI.Graphics();
      leftEdge.beginFill(0xff3300);
      leftEdge.drawRect(-width / 2, -height / 2, 8, height);
      leftEdge.endFill();

      rightEdge = new PIXI.Graphics();
      rightEdge.beginFill(0xff3300);
      rightEdge.drawRect(width / 2, -height / 2, 8, height);
      rightEdge.endFill();

      upperEdge = new PIXI.Graphics();
      upperEdge.beginFill(0xff3300);
      upperEdge.drawRect(-width / 2, -height / 2, width, 8);
      upperEdge.endFill();

      lowerEdge = new PIXI.Graphics();
      lowerEdge.beginFill(0xff3300);
      lowerEdge.drawRect(-width / 2, height / 2, width, 8);
      lowerEdge.endFill();

      container.addChild(centerPoint);
      container.addChild(leftEdge);
      container.addChild(rightEdge);
      container.addChild(upperEdge);
      container.addChild(lowerEdge);

      return container;
    }

    const rectangle = createRetangle(this.sprite.texture.orig.width, this.sprite.texture.orig.height);

    console.log(this.sprite);

    this.sprite.addChild(rectangle);

    this.keyState = { 32: false, 37: false, 38: false, 39: false, 40: false };
    this.keyCodes = { 37: -1, 38: -1, 39: 1, 40: 1 };

    this.directionX = 0;
    this.directionY = 0;
    this.speed = 10;

    this.fireSpeed = 10;
    this.fireCooldown = 0;

    // console.log(this.xSprite);
    stage.addChild(this.sprite);
    // this.sprite.addChild(this.xSprite);

    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
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

    if (this.keyState[32] && this.fireCooldown >= this.fireSpeed) {
      let rocket = new Rocket(this.sprite.position.x, this.sprite.position.y);
      this.fireCooldown = 0;
    }
  }

  onKeyDown(key) {
    this.keyState[key.keyCode] = true;

    if (key.keyCode == 37 || key.keyCode == 39) this.directionX = this.keyCodes[key.keyCode];
    else if (key.keyCode == 38 || key.keyCode == 40) this.directionY = this.keyCodes[key.keyCode];
  }

  onKeyUp(key) {
    this.keyState[key.keyCode] = false;

    if (!this.keyState[37] && this.keyState[39]) this.directionX = this.keyCodes[39];
    else if (this.keyState[37] && !this.keyState[39]) this.directionX = this.keyCodes[37];
    else this.directionX = 0;

    if (!this.keyState[38] && this.keyState[40]) this.directionY = this.keyCodes[40];
    else if (this.keyState[38] && !this.keyState[40]) this.directionY = this.keyCodes[38];
    else this.directionY = 0;
  }
}
