class MatterRect {
  constructor(x, y, w, h, options, text) {
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);
    Composite.add(matterEngine.world, this.body);
    this.text = text;
    this.textSize = 9 * ratio;
    // 랜덤주기
    this.lifespan = random(800, 1500);
  }

  display() {
    // 생명주기에 따라 alpha값 조절
    let alpha = map(this.lifespan, 0, 1500, 0, 255);
    alpha = constrain(alpha, 0, 255);

    //텍스트 감싸는 원
    push();
    translate(ratio * this.body.position.x, ratio * this.body.position.y);
    stroke(0, 0, 0, alpha);
    ellipse(0, -2, textBoxSize * ratio);
    pop();

    //텍스트
    push();
    translate(ratio * this.body.position.x, ratio * this.body.position.y);
    textAlign(CENTER, CENTER);

    fill(0, 0, 0, alpha);
    textSize(this.textSize);
    text(this.text, 0, 0);
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
    const index = texts.indexOf(this);
    if (index !== -1) {
      texts.splice(index, 1);
    }
  }
}
