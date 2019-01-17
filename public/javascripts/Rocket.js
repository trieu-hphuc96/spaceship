let _list = new Array();

class Rocket {
  static get list() {
    return _list;
  }
  static set list(value) {
    _list = value;
  }

  constructor(x, y) {
    this.sprite = new PIXI.Sprite(PIXI.loader.resources['../images/rocket.png'].texture);

    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.position.set(x + 50, y);

    this.speed = 20;
    Rocket.list.push(this);

    stage.addChild(this.sprite);
  }

  update() {
    if (this.sprite.transform) {
      this.sprite.position.x += this.speed;
    } else {
      return;
    }

    if (this.sprite.position.x > renderer.width * 1.1) {
      this.sprite.destroy();
      Rocket.list.splice(Rocket.list.indexOf(this), 1);
    }
  }
}
