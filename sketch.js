let maskGraphics;
let iconSize = 40;
let currentPage = "meditation";
let clickCount = 0;
let progress = 0;
let progressMax = 10;
let currentStage = 1;
let showStartImage = false;

let sheepList = [];

let sleepBG = [];
let startImage = null;

let iconMeditation, iconVideos, iconRelax, iconSleep;
let iconSearch, iconMark, iconglass, iconBack;
let spacing;
let vid1, vid2, vid3, vid4, vid5;
let videoListMeditation = [];
let currentPlaying = null;

let offsetY = 0;
let dragging = false;
let dragStartY = 0;
let initialOffsetY = 0;

let screenW = 390;
let screenH = 844;
let topBarHeight = 60;
let navBarHeight = 80;

let contentHeight = 0;

let p1Img, p2Img, p3Img;

let p1v1, p1v2, p1v3;
let videoListP1 = [];
let offsetPage1Y = 0;

let p2v1, p2v2, p2v3;
let videoListP2 = [];
let offsetPage2Y = 0;

let p3v1, p3v2, p3v3;
let videoListP3 = [];
let offsetPage3Y = 0;
let offsetPage4Y = 0;

let rVid1, rVid2, rVid3, rVid4, rVid5, rVid6;
let videoListRelax = [];
let offsetRelaxY = 0;
let initialOffsetRelaxY = 0;
let contentHeightRelax = 0;

let relaxLabels = ["wave","drip", "capsule", "rain",   "blister","bonfire"];
let bgm;
function preload() {
  iconMeditation = loadImage("2.png");
  iconVideos = loadImage("3.png");
  iconRelax = loadImage("4.png");
  iconSleep = loadImage("5.png");
  iconMark = loadImage("1.png");
  iconSearch = loadImage("scj.png");
  iconglass = loadImage("magnifying-glass.png");

  iconBack = loadImage("left-arrow.png");
  bgm = loadSound("bgm(1).mp3");
  p1Img = loadImage("p1.jpg");
  p2Img = loadImage("p2.jpg");
  p3Img = loadImage("p3.jpg");

  for (let i = 1; i <= 8; i++) {
    sleepBG[i] = loadImage("game" + i + ".png");
  }
  startImage = loadImage("p0.png");
}
let button;
function back() {
  currentPage = "meditation";
  bgm.pause();
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  screenW=width;
  screenH=height;
  spacing = width / 4;
  button = createButton("back");
  button.position(20, 20);

  // Call repaint() when the button is pressed.
  button.mousePressed(back);
  button.touchStarted(back);

  button.hide();
  maskGraphics = createGraphics(400, 300);
  maskGraphics.background(0);
  maskGraphics.noStroke();
  maskGraphics.fill(255);
  maskGraphics.ellipse(width / 2, height / 2, 200, 200);

  vid1 = createVideo("mx1.mp4", () => {
    vid1.elt.currentTime = 0;
    vid1.pause();
  });
  vid2 = createVideo("mx2.mp4", () => {
    vid2.elt.currentTime = 0;
    vid2.pause();
  });
  vid3 = createVideo("mx3.mp4", () => {
    vid3.elt.currentTime = 0;
    vid3.pause();
  });
  vid4 = createVideo("mx4.mp4", () => {
    vid4.elt.currentTime = 0;
    vid4.pause();
  });
  vid5 = createVideo("mx5.mp4", () => {
    vid5.elt.currentTime = 0;
    vid5.pause();
  });

  videoListMeditation = [vid1, vid2, vid3, vid4, vid5];
  for (let vid of videoListMeditation) {
    vid.hide();
  }
  contentHeight = 5 * (180 + 20) + 120;

  p1v1 = createVideo("tks1.mp4", () => {
    p1v1.elt.currentTime = 0;
    p1v1.pause();
  });
  p1v2 = createVideo("tks2.mp4", () => {
    p1v2.elt.currentTime = 0;
    p1v2.pause();
  });
  p1v3 = createVideo("tks3.mp4", () => {
    p1v3.elt.currentTime = 0;
    p1v3.pause();
  });
  videoListP1 = [p1v1, p1v2, p1v3];
  for (let vid of videoListP1) {
    vid.hide();
  }

  p2v1 = createVideo("mf1.mp4", () => {
    p2v1.elt.currentTime = 0;
    p2v1.pause();
  });
  p2v2 = createVideo("mf2.mp4", () => {
    p2v2.elt.currentTime = 0;
    p2v2.pause();
  });
  p2v3 = createVideo("mf3.mp4", () => {
    p2v3.elt.currentTime = 0;
    p2v3.pause();
  });
  videoListP2 = [p2v1, p2v2, p2v3];
  for (let vid of videoListP2) {
    vid.hide();
  }

  p3v1 = createVideo("cp1.mp4", () => {
    p3v1.elt.currentTime = 0;
    p3v1.pause();
  });
  p3v2 = createVideo("cp2.mp4", () => {
    p3v2.elt.currentTime = 0;
    p3v2.pause();
  });
  p3v3 = createVideo("cp3.mp4", () => {
    p3v3.elt.currentTime = 0;
    p3v3.pause();
  });
  videoListP3 = [p3v1, p3v2, p3v3];
  for (let vid of videoListP3) {
    vid.hide();
  }

  rVid1 = createVideo("asmr1.mp4", () => {
    rVid1.elt.currentTime = 0;
    rVid1.pause();
  });
  rVid2 = createVideo("asmr2.mp4", () => {
    rVid2.elt.currentTime = 0;
    rVid2.pause();
  });
  rVid3 = createVideo("asmr3.mp4", () => {
    rVid3.elt.currentTime = 0;
    rVid3.pause();
  });
  rVid4 = createVideo("asmr4.mp4", () => {
    rVid4.elt.currentTime = 0;
    rVid4.pause();
  });
  rVid5 = createVideo("asmr5.mp4", () => {
    rVid5.elt.currentTime = 0;
    rVid5.pause();
  });
  rVid6 = createVideo("asmr6.mp4", () => {
    rVid6.elt.currentTime = 0;
    rVid6.pause();
  });

  videoListRelax = [rVid1, rVid2, rVid3, rVid4, rVid5, rVid6];
  for (let rv of videoListRelax) {
    rv.hide();
  }
  contentHeightRelax = 3 * (120 + 30) + 60;
}

function draw() {
  background(79, 60, 84);
  if (frameCount < 12) {
    image(startImage, 0, 0, width, height);
  } else {
    switch (currentPage) {
      case "meditation":
        drawMeditationPage();
        break;
      case "videos":
        drawVideoPageMain();
        break;
      case "videoPage1":
        drawVideoPage1();
        break;
      case "videoPage2":
        drawVideoPage2();
        break;
      case "videoPage3":
        drawVideoPage3();
        break;
      case "relax":
        drawRelaxPage();
        break;
      case "sleep":
        drawSleepPage();
        break;
      default:
        drawPlaceholderPage(currentPage);
        break;
    }
    if (currentPage != "sleep") {
      drawBottomNav();
      button.hide();
    }
  }
}

function drawSleepPage() {
  if (showStartImage) {
    imageMode(CORNER);
    image(startImage, 0, 0, width, height);
    return;
  }
  imageMode(CORNER);
  button.show();
  image(sleepBG[currentStage], 0, 0, width, height);
  fill(255);
  textSize(20);
  textAlign(RIGHT, TOP);
  text(clickCount, width - 30, 50);
  let barW = width * 0.8;
  let barH = 20;
  let barX = width * 0.1;
  let barY = height - 60;
  stroke(255);
  noFill();
  rect(barX, barY, barW, barH);
  fill(222, 163, 84, 150);
  let fillW = map(progress, 0, progressMax, 0, barW);
  rect(barX, barY, fillW, barH);
  for (let i = sheepList.length - 1; i >= 0; i--) {
    let s = sheepList[i];
    s.update();
    s.draw();
    if (s.dead) {
      sheepList.splice(i, 1);
    }
  }
  // console.log(sheepList.length)
}

function drawTopBar(titleText = "DISCOVER") {
  fill(100, 80, 120);
  noStroke();
  rect(0, 0, width, topBarHeight);
  fill(255);
  textSize(18);
  textAlign(LEFT, CENTER);
  text(titleText, 20, topBarHeight / 2);
  let iconSizeLocal = 30;
  let gap = 10;
  // imageMode(CENTER);
  // image(iconSearch, width - iconSizeLocal * 2 - gap * 3, topBarHeight / 2, iconSizeLocal, iconSizeLocal);
  // image(iconglass, width - iconSizeLocal - gap, topBarHeight / 2, iconSizeLocal, iconSizeLocal);
}

function drawTopBarWithBack(titleText = "TITLE") {
  fill(100, 80, 120);
  noStroke();
  rect(0, 0, width, topBarHeight);
  let backSize = 30;
  imageMode(CENTER);
  image(iconBack, 30, topBarHeight / 2, backSize, backSize);
  if (
    mouseIsPressed &&
    dist(mouseX, mouseY, 30, topBarHeight / 2) < backSize / 2
  ) {
    currentPage = "videos";
    stopAllVideos();
  }
  push()
  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(titleText, width / 2, topBarHeight / 2);
  pop()
}
let curVid = null
function drawMeditationPage() {
  let startY = topBarHeight + 20;
  let vW = width - 60;
  let vH = 180;
  let gap = 40;
  let xPos = 30;
  push();
  translate(0, 0);
  for (let i = 0; i < videoListMeditation.length; i++) {
    let yPos = startY + i * (vH + gap);
    let actualY = yPos + offsetY;
    imageMode(CORNER);
    image(videoListMeditation[i], xPos, actualY, vW, vH);
    // image(iconMark, xPos, actualY + vH + 10, iconSize / 2, iconSize / 2);
    if (mouseIsPressed && overRect(xPos, actualY, vW, vH)&& mouseY < height - navBarHeight) {
      if(curVid!=videoListMeditation[i]){
      playVideo(videoListMeditation[i]);
                 curVid=videoListMeditation[i]

      }
     
    }
  }
  pop();
  let visibleAreaHeight = height - topBarHeight - navBarHeight;
  let minOffset = visibleAreaHeight - contentHeight;
  offsetY = constrain(offsetY, minOffset, 0);
  drawTopBar("MEDITATION");
}

function drawVideoPageMain() {
  let boxW = 150;
  let boxH = 200;
  let margin = 30;
  let startY = topBarHeight + 50;
  imageMode(CORNER);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  image(p1Img, margin, startY, boxW, boxH);
  if (mouseIsPressed && overRect(margin, startY, boxW, boxH)) {
    currentPage = "videoPage1";
    stopAllVideos();
  }
  let x2 = margin + boxW + margin;
  image(p2Img, x2, startY, boxW, boxH);
  if (mouseIsPressed && overRect(x2, startY, boxW, boxH)) {
    currentPage = "videoPage2";
    stopAllVideos();
  }
  let x3 = margin;
  let y3 = startY + boxH + margin;
  image(p3Img, x3, y3, boxW, boxH);
  if (mouseIsPressed && overRect(x3, y3, boxW, boxH)) {
    currentPage = "videoPage3";
    stopAllVideos();
  }
  let x4 = margin + boxW + margin;
  let y4 = startY + boxH + margin;
  fill(120);
  rect(x4, y4, boxW, boxH);
  fill(255);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("MORE", x4 + boxW / 2, y4 + boxH / 2);
  text("kinectic sand", margin + boxW / 2, startY + boxH / 2);
  text("chalk", x2 + boxW / 2, startY + boxH / 2);
  text("clay", margin + boxW / 2, y4 + boxH / 2);

  drawTopBar("VIDEOS");
}

function drawVideoPage1() {
  let startY = topBarHeight + 20;
  let vW = width - 40;
  let vH = 180;
  let gap = 40;
  let xPos = 20;
  push();
  for (let i = 0; i < videoListP1.length; i++) {
    let yPos = startY + i * (vH + gap);
    let actualY = yPos;
    imageMode(CORNER);
    image(videoListP1[i], xPos, actualY, vW, vH);
    // image(iconMark, xPos, actualY + vH + 10, iconSize / 2, iconSize / 2);
    if (mouseIsPressed && overRect(xPos, actualY, vW, vH) && mouseY < height - navBarHeight) {
      playVideo(videoListP1[i]);
    }
  }
  pop();
  let visibleAreaHeight = height - topBarHeight - navBarHeight;
  let contentH = 3 * (vH + gap) + 20;
  let minOffset = visibleAreaHeight - contentH;
  offsetPage1Y = constrain(offsetPage1Y, minOffset, 0);
  push()
  drawTopBarWithBack("Kinectic sand");
  pop()
}

function drawVideoPage2() {
  let startY = topBarHeight + 20;
  let vW = width - 40;
  let vH = 180;
  let gap = 40;
  let xPos = 20;
  push();
  for (let i = 0; i < videoListP2.length; i++) {
    let yPos = startY + i * (vH + gap);
    let actualY = yPos;
    imageMode(CORNER);
    image(videoListP2[i], xPos, actualY, vW, vH);
    // image(iconMark, xPos, actualY + vH + 10, iconSize / 2, iconSize / 2);
    if (mouseIsPressed && overRect(xPos, actualY, vW, vH)) {
      playVideo(videoListP2[i]);
    }
  }
  pop();
  let visibleAreaHeight = height - topBarHeight - navBarHeight;
  let contentH = 3 * (vH + gap) + 20;
  let minOffset = visibleAreaHeight - contentH;
  offsetPage2Y = constrain(offsetPage2Y, minOffset, 0);
  drawTopBarWithBack("chalk");
}

function drawVideoPage3() {
  let startY = topBarHeight + 20;
  let vW = width - 40;
  let vH = 180;
  let gap = 40;
  let xPos = 20;
  push();
  for (let i = 0; i < videoListP3.length; i++) {
    let yPos = startY + i * (vH + gap);
    let actualY = yPos;
    imageMode(CORNER);
    image(videoListP3[i], xPos, actualY, vW, vH);
    // image(iconMark, xPos, actualY + vH + 10, iconSize / 2, iconSize / 2);
    if (mouseIsPressed && overRect(xPos, actualY, vW, vH)) {
      playVideo(videoListP3[i]);
    }
  }
  pop();
  let visibleAreaHeight = height - topBarHeight - navBarHeight;
  let contentH = 3 * (vH + gap) + 20;
  let minOffset = visibleAreaHeight - contentH;
  offsetPage3Y = constrain(offsetPage3Y, minOffset, 0);
  drawTopBarWithBack("clay");
}

function drawPlaceholderPage(pageName) {
  //     drawTopBar(pageName.toUpperCase());
  //   fill(255);
  //   textSize(24);
  //   textAlign(CENTER, CENTER);
  //   text(pageName + " Page (no)", width / 2, height / 2);
}

function drawBottomNav() {
  fill(60);
  noStroke();
  rect(0, height - navBarHeight, width, navBarHeight);
  
  imageMode(CENTER);
  image(
    iconMeditation,
    spacing * 0.5,
    height - navBarHeight / 2,
    iconSize,
    iconSize
  );
  push();
  fill(255);
  textSize(10);
  text("meditation", spacing * 0.5 - 22, height - 15);
  pop();
  if (
    mouseIsPressed &&
    dist(mouseX, mouseY, spacing * 0.5, height - navBarHeight / 2) <
      iconSize / 2
  ) {
    currentPage = "meditation";
    bgm.pause();
    stopAllVideos();
  }

  image(
    iconVideos,
    spacing * 1.5,
    height - navBarHeight / 2,
    iconSize,
    iconSize
  );
  push();
  fill(255);
  textSize(10);
  text("videos", spacing * 1.5 - 16, height - 15);
  pop();
  if (
    mouseIsPressed &&
    dist(mouseX, mouseY, spacing * 1.5, height - navBarHeight / 2) <
      iconSize / 2
  ) {
    currentPage = "videos";
    bgm.pause();
    stopAllVideos();
  }
  image(
    iconRelax,
    spacing * 2.5,
    height - navBarHeight / 2,
    iconSize,
    iconSize
  );
  push();
  fill(255);
  textSize(10);
  text("relax", spacing * 2.5 - 11, height - 15);
  pop();
  if (
    mouseIsPressed &&
    dist(mouseX, mouseY, spacing * 2.5, height - navBarHeight / 2) <
      iconSize / 2
  ) {
    currentPage = "relax";
    bgm.pause();
    stopAllVideos();
  }
  image(
    iconSleep,
    spacing * 3.5,
    height - navBarHeight / 2,
    iconSize,
    iconSize
  );
  push();
  fill(255);
  textSize(10);
  text("sleep", spacing * 3.5 - 16, height - 15);
  pop();
  if (
    mouseIsPressed &&
    dist(mouseX, mouseY, spacing * 3.5, height - navBarHeight / 2) <
      iconSize / 2
  ) {
    bgm.loop();
    currentPage = "sleep";
    clickCount = 0;
    progress = 0;
    progressMax = 10;
    currentStage = 1;
    showStartImage = false;
    sheepList = [];
    stopAllVideos();
  }
}

async function playVideo(videoToPlay) {
  try {
    stopAllVideos();
    await new Promise(resolve => setTimeout(resolve, 200));
    currentPlaying = videoToPlay;
    videoToPlay.play();
  } catch (err) {
    console.warn("视频播放失败:", err);
  }
}

async function stopAllVideos() {
  let allVids = [
    ...videoListMeditation,
    ...videoListP1,
    ...videoListP2,
    ...videoListP3,
    ...videoListRelax,
  ];
  for (let vid of allVids) {
    // if(!vid.isPaused()){
    try {
      vid.pause();
      vid.elt.currentTime = 0;
      // await new Promise(resolve => setTimeout(resolve, 100));
    } catch (err) {
      console.warn("视频播放失败:", err);
    }
  }
  currentPlaying = null;
}

// let clickHandledRelax = false;

function drawRelaxPage() {
  let startY = topBarHeight + 40;
  let diameter = 150;
  let gap = 70;
  let xLeft = width / 4;
  let xRight = (3 * width) / 4;
  let yStart = startY + diameter / 2;
  push();
  for (let i = 0; i < 6; i++) {
    let row = floor(i / 2);
    let col = i % 2;
    let cx = col === 0 ? xLeft : xRight;
    let cy = yStart + row * (diameter + gap)+offsetPage4Y;
    let frame = videoListRelax[i].get();
    imageMode(CENTER);
    image(frame, cx, cy, diameter, diameter);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(relaxLabels[i], cx, cy);
    if (
      // !clickHandledRelax &&
      mouseIsPressed &&
      dist(mouseX, mouseY, cx, cy) < diameter / 2
    ) {
      console.log("pressed")
      playVideo(videoListRelax[i]);
      // clickHandledRelax = true;
    }
  }
  pop();
  let visibleAreaHeight = height - topBarHeight - navBarHeight;
  let minOffset = visibleAreaHeight - contentHeightRelax;

  // let visibleAreaHeight = height - topBarHeight - navBarHeight;
  // let contentH = 3 * (vH + gap) + 20;
  // let minOffset = visibleAreaHeight - contentH;
  offsetPage4Y = constrain(offsetPage4Y, -100, 0);
  drawTopBar("RELAX");
}

function mousePressedSleepPage() {
  if (showStartImage) currentPage = "meditation";
  clickCount++;
  progress++;
  sheepList.push(new Sheep(width * 0.2, height * 0.5));
  if (progress >= progressMax) {
    currentStage++;
    progressMax *= 2;
    progress = 0;
    if (currentStage > 5) {
      showStartImage = true;
    }
  }
}
let lastPressed =0
function mousePressed() {
  if (mouseY > topBarHeight && mouseY < height - navBarHeight) {
      // console.log(mouseY < height - navBarHeight)

    dragging = true;
    dragStartY = mouseY;
    if (currentPage === "meditation") {
      initialOffsetY = offsetY;
    } else if (currentPage === "videoPage1") {
      initialOffsetY = offsetPage1Y;
    } else if (currentPage === "videoPage2") {
      initialOffsetY = offsetPage2Y;
    } else if (currentPage === "videoPage3") {
      initialOffsetY = offsetPage3Y;
    }else if (currentPage === "relax") {
      initialOffsetY = offsetPage4Y;
    }
    if (
      currentPage === "relax" &&
      mouseY > topBarHeight &&
      mouseY < height - navBarHeight
    ) {
      dragging = true;
      dragStartY = mouseY;
    }
    if (currentPage == "sleep") {
      mousePressedSleepPage();
    }
  }
}
let preTouchY = 0;
function touchStarted() {
  // 只记录第一个触摸点
  if (touches.length > 0) {
    dragStartY = touches[0].y;
    if (currentPage === "meditation") {
      initialOffsetY = offsetY;
    } else if (currentPage === "videoPage1") {
      initialOffsetY = offsetPage1Y;
    } else if (currentPage === "videoPage2") {
      initialOffsetY = offsetPage2Y;
    } else if (currentPage === "videoPage3") {
      initialOffsetY = offsetPage3Y;
    }else if (currentPage === "relax") {
      initialOffsetY = offsetPage4Y;
    }
    if (currentPage == "sleep") {
      mousePressedSleepPage();
    }
    // 记录当前初始偏移量
    // initialOffsetY = this[pageConfig[currentPage].offset] || 0;
  }
  return false; // 阻止默认滚动
}
function touchMoved() {
  let dy=0;
   for (let touch of touches) {
      dy = touch.y - dragStartY;
    //  preTouchY = touch.y
   }
    if (currentPage === "meditation") {
      offsetY = initialOffsetY + dy;
    } else if (currentPage === "videoPage1") {
      offsetPage1Y = initialOffsetY + dy;
    } else if (currentPage === "videoPage2") {
      offsetPage2Y = initialOffsetY + dy;
    } else if (currentPage === "videoPage3") {
      offsetPage3Y = initialOffsetY + dy;
    }else if (currentPage === "relax") {
      offsetPage4Y = initialOffsetY + dy;
    }
    console.log(dy,offsetPage4Y)


    // dragStartY=preTouchY

}
function mouseDragged() {
  if (dragging) {
    let dy = mouseY - dragStartY;
    if (currentPage === "meditation") {
      offsetY = initialOffsetY + dy;
    } else if (currentPage === "videoPage1") {
      offsetPage1Y = initialOffsetY + dy;
    } else if (currentPage === "videoPage2") {
      offsetPage2Y = initialOffsetY + dy;
    } else if (currentPage === "videoPage3") {
      offsetPage3Y = initialOffsetY + dy;
    }else if (currentPage === "relax") {
      offsetPage4Y = initialOffsetY + dy;
    }
  }
}

function mouseReleased() {
  dragging = false;
  if (currentPage === "relax") {
    // clickHandledRelax = false;
  }
}

class Sheep {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = -10;
    this.vx = 3;
    this.gravity = 0.5;
    this.bounceCount = 0;
    this.dead = false;
    this.size = 30;
  }

  update() {
    this.y += this.vy;
    this.x += this.vx;
    this.vy += this.gravity;
    let groundY = height * 0.6;
    if (this.y >= groundY) {
      this.y = groundY;
      this.vy = -this.vy * 0.7;
      this.bounceCount++;
      if (this.bounceCount >= 3) {
        this.dead = true;
      }
    }
  }

  draw() {
    push();
    translate(-100, -200);
    image(sleepBG[8], this.x, this.y, 273, 204);
    pop();
  }
}

function overRect(rx, ry, rw, rh) {
  return mouseX > rx && mouseX < rx + rw && mouseY > ry && mouseY < ry + rh;
}
