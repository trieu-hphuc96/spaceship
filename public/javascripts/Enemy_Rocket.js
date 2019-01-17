let _enemyRockets = new Array();

class EnemyRocket {
  static get list() {
    return _enemyRockets;
  }
  static set list(value) {
    _enemyRockets = value;
  }

  constructor(x, y) {
    this.sprite = new PIXI.Sprite(PIXI.loader.resources['../images/enemy_rocket.png'].texture);

    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.position.set(x - 75, y);

    this.speed = 5;
    EnemyRocket.list.push(this);

    stage.addChild(this.sprite);
  }

  update() {
    if (this.sprite.transform) {
      this.sprite.position.x -= this.speed;
    } else {
      return;
    }

    if (this.sprite.position.x < 0) {
      this.sprite.destroy();
      EnemyRocket.list.splice(EnemyRocket.list.indexOf(this), 1);
    }
  }
}
