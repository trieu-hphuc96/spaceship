class CloudManager {
  constructor() {
    this.cloudsList = [];

    function createACloud() {
      const sprite = Math.random() > 0.5 ? 'cloud_1' : 'cloud_2';
      this.cloud = new PIXI.Sprite(PIXI.loader.resources['../images/' + sprite + '.png'].texture);
      this.cloud.anchor.set(0.5, 0.5);
      this.cloud.position.set(renderer.width * 1.3, renderer.height * Math.random());

      // Diversify clouds size
      let minScale = 0.2;
      let maxScale = 1.2;
      let scale = Math.random() * (maxScale - minScale) + minScale;
      this.cloud.scale.set(scale, scale);

      stage.addChildAt(this.cloud, 0);
      this.cloudsList.push(this.cloud);
    }

    for (let i = 0; i <= 4; i++) {
      setTimeout(() => {
        createACloud.call(this);
      }, 1000 * i);
    }
  }

  update() {
    this.cloudsList.forEach(function(element, index, array) {
      element.position.x -= 4;

      if (element.position.x < -renderer.width * 0.1) {
        element.position.x = renderer.width * 1.3;
        element.position.y = renderer.height * Math.random();
      }
    });
  }
}
