class MatterCircle {
  constructor(x, y, r, options) {
    this.r = r;

    this.body = Bodies.circle(x, y, this.r, options);
    Composite.add(matterEngine.world, this.body);

    // 랜덤주기
    this.lifespan = random(50, 80);
  }

  display() {
    push();
    translate(ratio * this.body.position.x, ratio * this.body.position.y);
    rotate(this.body.angle);
    // 생명주기에 따라 alpha값 조절
    let alpha = map(this.lifespan, 0, 50, 0, 255);
    alpha = constrain(alpha, 0, 255);

    noStroke();
    // stroke(0, 0, 0, alpha);
    fill(255, alpha - 50, 0, alpha);

    // 수명 기간에 따라 크기 변화
    // let radius = map(alpha, 0, 255, ratio * this.r * 0.2, ratio * this.r);
    let radius = ratio * this.r;

    //원 그리기
    ellipse(0, 0, radius);
    pop();

    // 생명 -1
    this.lifespan--;
    // 생명 <=0이면 없애기
    if (this.lifespan <= 0) {
      this.remove();
    }
  }

  remove() {
    Composite.remove(matterEngine.world, this.body);

    //생명주기 - 없애기
    const index = fires.indexOf(this);
    if (index !== -1) {
      fires.splice(index, 1);
    }
  }
}
