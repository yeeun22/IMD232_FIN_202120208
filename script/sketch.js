let canvasContainer = document.querySelector('#canvas');
const fixedWidth = 210;
const fixedHeight = 297;
const aspectRatio = fixedWidth / fixedHeight;
//캔버스 너비 / 매터세계의 너비
let ratio;

//기본 생성주기
let defaultTextSpawnRate = 0.03;
let defaultFireSpawnRate = 0.5;

// 시간이 흐를수록 증가할 변수
let timePassed = 0;

const {
  Engine,
  Bodies,
  Composite,
  Runner,
  Body,
  Vector,
  Mouse,
  MouseConstraint,
} = Matter;

const matterEngine = Engine.create();
const matterRunner = Runner.create();

// 담을 통 만들기
const walls = [];
const texts = [];
const fires = [];

let m;
let mc;
let textBoxSize = 12;
let fireSize = 4;

// 배경 이미지 미리 로드
function preload() {
  // bgImage = loadImage(
  //   'https://yeeun22.github.io/IMD232_202120208/src/final/sketches/sketch14/png/graphic.png'
  // );
  bgImage = loadImage('./png/graphic.png');
}

// 음성인식 활성화 함수
function activateVoiceRecognition() {
  Activated = true;
  timePassed = 0; // 음성인식이 활성화된 순간부터의 경과 시간 초기화
}

// 음성인식 비활성화 함수
function deactivateVoiceRecognition() {
  Activated = false;
}

// 불
function createFires() {
  //불 1
  const fire1 = new MatterCircle(fixedWidth / 2 - 20, fixedHeight, fireSize);
  //나올때 랜덤 각도로 나오도록
  let angle = random(TAU * 0.7, TAU * 0.9);
  let speed = random(0.1, 0.5);
  let vecX = cos(angle) * speed;
  let vecY = sin(angle) * speed;
  Body.setVelocity(fire1.body, { x: vecX, y: vecY });

  fires.push(fire1);
  // 불 2
  const fire2 = new MatterCircle(fixedWidth / 2, fixedHeight, fireSize);
  Body.setVelocity(fire2.body, { x: vecX, y: vecY });
  fires.push(fire2);

  // 불 3
  const fire3 = new MatterCircle(fixedWidth / 2 + 20, fixedHeight, fireSize);
  Body.setVelocity(fire3.body, { x: vecX, y: vecY });
  fires.push(fire3);
}

// 텍스트
function createTexts() {
  // '지'1 추가
  const zi1 = new MatterRect(
    fixedWidth / 2 - 40,
    (fixedHeight * 4) / 5,
    textBoxSize,
    textBoxSize,
    {},
    '지'
  );
  let Aangle = random(TAU * 0.7, TAU * 0.9);
  let Aspeed = random(0.1, 0.5);
  let AvecX = cos(Aangle) * Aspeed;
  let AvecY = sin(Aangle) * Aspeed;
  Body.setVelocity(zi1.body, { x: AvecX, y: AvecY });
  texts.push(zi1);

  // '지'2 추가
  const zi2 = new MatterRect(
    fixedWidth / 2 + 30,
    (fixedHeight * 4) / 5,
    textBoxSize,
    textBoxSize,
    {},
    '지'
  );
  let Bangle = random(TAU * 0.7, TAU * 0.9);
  let Bspeed = random(0.1, 0.5);
  let BvecX = cos(Bangle) * Bspeed;
  let BvecY = sin(Bangle) * Bspeed;
  Body.setVelocity(zi2.body, { x: BvecX, y: BvecY });
  texts.push(zi2);

  // '글'1 추가
  const gle1 = new MatterRect(
    fixedWidth / 2 - 30,
    (fixedHeight * 4) / 5,
    textBoxSize,
    textBoxSize,
    {},
    '글'
  );
  Aangle = random(TAU * 0.5, TAU);
  Aspeed = random(0.1, 0.5);
  AvecX = cos(Aangle) * Aspeed;
  AvecY = sin(Aangle) * Aspeed;
  Body.setVelocity(gle1.body, { x: AvecX, y: AvecY });
  texts.push(gle1);

  // '글'2 추가
  const gle2 = new MatterRect(
    fixedWidth / 2 + 40,
    (fixedHeight * 4) / 5,
    textBoxSize,
    textBoxSize,
    {},
    '글'
  );
  Bangle = random(TAU * 0.5, TAU);
  Bspeed = random(0.1, 0.5);
  BvecX = cos(Bangle) * Bspeed;
  BvecY = sin(Bangle) * Bspeed;
  Body.setVelocity(gle2.body, { x: BvecX, y: BvecY });
  texts.push(gle2);
}

function setup() {
  const canvas = createCanvas(
    canvasContainer.clientWidth,
    canvasContainer.clientWidth / aspectRatio
  );
  canvas.parent(canvasContainer);
  ratio = width / fixedWidth;

  //이미지
  image(bgImage, 0, 0, width, height);

  rectMode(CENTER);

  // 벽 (위치x, 위치y, 넓이, 높이)
  // 위쪽
  walls.push(
    new MatterRect(fixedWidth / 2, -25, fixedWidth + 100, 50, {
      isStatic: true,
    })
  );

  // 왼쪽
  walls.push(
    new MatterRect(-25, fixedHeight / 2, 50, fixedHeight + 100, {
      isStatic: true,
    })
  );

  // 오른쪽
  walls.push(
    new MatterRect(fixedWidth + 25, fixedHeight / 2, 50, fixedHeight + 100, {
      isStatic: true,
    })
  );

  // 중간
  walls.push(
    new MatterRect(
      fixedWidth / 2,
      (fixedHeight * 4) / 5 + 10,
      fixedWidth + 500,
      5,
      {
        isStatic: true,
      }
    )
  );

  //마우스 인터랙션
  m = Mouse.create(document.querySelector('.p5Canvas'));
  m.pixelRatio = pixelDensity() * ratio;
  mc = MouseConstraint.create(matterEngine, {
    mouse: m,
  });
  Composite.add(matterEngine.world, mc);

  // matter 중력
  matterEngine.gravity.y = -0.015;

  //점점 주기가 짧아짐
  activateVoiceRecognition();

  Runner.run(matterRunner, matterEngine);

  background('white');
}

function draw() {
  background('white');

  // 시간 경과 갱신
  timePassed++;

  // 생성 주기 감소 (기본 + h키 누르면 다시 살아남)
  let textSpawnRate = Activated
    ? map(timePassed, 0, 600, 0.08, 0.01) // 인식(또는 처음)후 600프레임 동안 주기 감소
    : defaultTextSpawnRate;

  let fireSpawnRate = Activated
    ? map(timePassed, 0, 600, 0.5, 0.1) // 인식(또는 처음)후 600프레임 동안 주기 감소
    : defaultFireSpawnRate;

  //불 생성주기 관리
  if (random() < fireSpawnRate) {
    createFires();
  }

  // 텍스트 생성주기 관리
  if (random() < textSpawnRate) {
    createTexts();
  }

  // 바람 설정
  const windForce = mc.mouse.position.x - fixedWidth / 2;
  let windVector = createVector(windForce * 0.00000003, 0);

  // 각 불에 적용
  fires.forEach((eachFire) => {
    // Body.applyForce(eachFire.body, eachFire.body.position, windVector);
    eachFire.display();
  });

  //이미지
  image(bgImage, 0, 0, width, height);

  // 각 텍스트에 적용
  texts.forEach((eachText) => {
    Body.applyForce(eachText.body, eachText.body.position, windVector);
    eachText.display();
  });
}

//  'H' ,'ㅎ' 키를 누르면 음성인식이 활성화되도록
function keyPressed() {
  if (key === 'H' || key === 'h' || key === 'ㅎ') {
    activateVoiceRecognition();
  }
}

// 화면 리사이즈
function windowResized() {
  canvasContainer = document.querySelector('#canvas');
  resizeCanvas(
    canvasContainer.clientWidth,
    canvasContainer.clientWidth / aspectRatio
  );
  ratio = width / fixedWidth;
}
