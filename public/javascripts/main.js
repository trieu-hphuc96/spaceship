/*****************************************************
                    Main.js
*****************************************************/

var stage = new PIXI.Container();
var cloudManager;
var player;
var enemy;

PIXI.loader
  .add([
    '../images/X.png',
    '../images/Y.png',
    '../images/cloud_1.png',
    '../images/cloud_2.png',
    '../images/spaceship.png',
    '../images/rocket.png',
    '../images/enemy.png',
    '../images/enemy_rocket.png',
    '../images/blank-health-bar.png',
    '../images/full-health-bar.png'
  ])
  .load(init);

function hitTestRectangle(r1, r2) {
  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y ;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y ;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {
    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {
      //There's definitely a collision happening
      hit = true;
    } else {
      //There's no collision on the y axis
      hit = false;
    }
  } else {
    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
}

function init() {
  renderer.backgroundColor = 0x22a7f0;

  cloudManager = new CloudManager();
  player = new Player();
  enemy = new Enemy();

  renderer.render(stage);

  loop();
}

function loop() {
  cloudManager.update();
  player.update();
  enemy.update();

  Rocket.list.map(element => {
    element.update();
    // if(enemy.sprite.position.x < element.sprite.position.x + element.sprite.width) {
    // !(enemy.healthBar.outer.width === 0) && (enemy.healthBar.outer.width > 10 || (enemy.healthBar.outer.width = 0)) && (enemy.healthBar.outer.width -= 10);

    // element.sprite.destroy();
    // Rocket.list.splice(Rocket.list.indexOf(element), 1);
    // return;
    // }
    if (EnemyRocket.list.length > 0) {
      const lastEnemyRocket = EnemyRocket.list[EnemyRocket.list.length - 1];

      if (element.sprite.transform && hitTestRectangle(lastEnemyRocket.sprite, element.sprite)) {
        element.sprite.destroy();
        lastEnemyRocket.sprite.destroy();

        Rocket.list.splice(Rocket.list.indexOf(element), 1);
        EnemyRocket.list.splice(EnemyRocket.list.indexOf(lastEnemyRocket), 1);
        return;
      }
    }

    if (element.sprite.transform && hitTestRectangle(enemy.sprite, element.sprite)) {
      console.log('HIT!');
      !(enemy.healthBar.outer.width === 0) && (enemy.healthBar.outer.width > 10 || (enemy.healthBar.outer.width = 0)) && (enemy.healthBar.outer.width -= 10);

      element.sprite.destroy();
      Rocket.list.splice(Rocket.list.indexOf(element), 1);
      return;
    }
  });

  EnemyRocket.list.map(element => {
    element.update();
    // if(player.sprite.position.x + player.sprite.width > element.sprite.position.x + element.sprite.width) {
    //     element.sprite.destroy();
    //     // console.log(player.sprite.position.x, player.sprite.width, element.sprite.position.x, element.sprite.width);
    //     EnemyRocket.list.splice(EnemyRocket.list.indexOf(element), 1);
    //     return;
    // }

    if (element.sprite.transform && hitTestRectangle(player.sprite, element.sprite)) {
      element.sprite.destroy();

      !(player.healthBar.outer.width === 0) && (player.healthBar.outer.width > 10 || (player.healthBar.outer.width = 0)) && (player.healthBar.outer.width -= 10);
      // console.log(player.sprite.position.x, player.sprite.width, element.sprite.position.x, element.sprite.width);
      EnemyRocket.list.splice(EnemyRocket.list.indexOf(element), 1);
      return;
    }
  });

  requestAnimationFrame(loop);
  renderer.render(stage);
}
