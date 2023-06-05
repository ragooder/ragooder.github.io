let slider_A_cos;
let slider_A_vol;
let slider_B_cos;
let slider_B_vol;
let dependency_slider;
let square_x;
let square_y;
let square_s;
let square_2_s;

function setup() {
  createCanvas(1200, 900);

  square_x = 75;
  square_y = 175;
  square_s = 275;
  square_2_x = width - (square_x + square_s) + 10;

  slider_A_cos = createSlider(0, 100, 40, 5);
  slider_A_cos.position(50, 50);

  slider_A_vol = createSlider(0, 500, 120, 20);
  slider_A_vol.position(50, 90);

  slider_B_cos = createSlider(0, 100, 60, 5);
  slider_B_cos.position(450, 50);

  slider_B_vol = createSlider(0, 500, 80, 20);
  slider_B_vol.position(450, 90);

  dependency_slider = createSlider(-1, 1, 0, 0.1);
  dependency_slider.position(900, 50);
}

function draw() {
  let rA = slider_A_cos.value();
  let ra = rA / 100;
  let rB = slider_B_cos.value();
  let rb = rB / 100;

  let va = slider_A_vol.value();
  let vb = slider_B_vol.value();

  let dep = dependency_slider.value();

  let v11 = va + vb;
  let r11 = ra * rb;
  let v10 = va;
  let r10 = ra * (1 - rb);
  let v01 = vb;
  let r01 = (1 - ra) * rb;
  let v00 = 0;
  let r00 = (1 - ra) * (1 - rb);

  let risked_vol = v11 * r11 + v10 * r10 + v01 * r01;

  let agg_vol;
  if (r00 == 1) {
    agg_vol = 0;
  } else {
    agg_vol = risked_vol / (1 - r00);
  }

  let rmod;
  if (dep >= 0) {
    rmod = min(r10, r01);
  } else {
    rmod = min(r11, r00);
  }

  let r11_d = r11 + rmod * dep;
  let r10_d = r10 - rmod * dep;
  let r01_d = r01 - rmod * dep;
  let r00_d = r00 + rmod * dep;

  let rb_given_a = r11_d / ra;
  let rb_given_no_a = r01_d / (1 - ra);

  let rB_given_a = round(rb_given_a * 100);
  let rB_given_no_a = round(rb_given_no_a * 100);

  let risked_vol_d = v11 * r11_d + v10 * r10_d + v01 * r01_d;

  let agg_vol_d;
  if (r00_d == 1) {
    agg_vol_d = 0;
  } else {
    agg_vol_d = risked_vol / (1 - r00_d);
  }

  let sx = 20;
  let sy = 700;
  let sx2 = width / 2 + sx;
  let tx = 520;
  let ty = 155;
  let tsx = 50;
  let tsy = 40;
  let tsyo = 20;

  background(0);
  rectMode(CORNERS);
  textAlign(CENTER);

  stroke(255);
  strokeWeight(1);
  strokeCap(ROUND);
  line(0, 125, width, 125);
  line(600, 520, 600, height);
  line(0, 520, width, 520);
  line(967, 45, 967, 75);
  line(tx - 2 * tsx, ty + tsyo + 10, tx + 4.5 * tsx, ty + tsyo + 10);
  line(
    tx - 2 * tsx,
    ty + tsyo + tsy * 4 + 20,
    tx + 4.5 * tsx,
    ty + tsy * 4 + tsyo + 20
  );
  line(550, 420, 600, 420);
  line(550, 480, 600, 480);
  line(625, 420, 653, 420);
  line(625, 480, 653, 480);

  fill(255);
  noStroke();
  textSize(20);
  text("Segment A", 200, 30);
  text("Segment B", 600, 30);
  text("Dependency", 967, 30);

  textAlign(LEFT);
  textSize(16);
  text("CoS P(A) = " + rA + "%", 200, 65);
  text("CoS P(B) = " + rB + "%", 600, 65);
  text("Volume = " + va + " mmboe", 200, 105);
  text("Volume = " + vb + " mmboe", 600, 105);
  //text(dependency_slider.value(), 1100, 65);//

  textAlign(CENTER);
  text("P(A)", square_x + square_s / 2, square_y + square_s + 45);
  text("P(A)", square_2_x + square_s / 2, square_y + square_s + 45);

  translate(square_x - 50, square_y + square_s / 2);
  rotate(radians(-90));
  text("P(B)", 0, 0);
  rotate(radians(90));
  translate(-(square_x - 50), -(square_y + square_s / 2));

  translate(square_2_x - 50, square_y + square_s / 2);
  rotate(radians(-90));
  text("P(B)", 0, 0);
  rotate(radians(90));
  translate(-(square_2_x - 50), -(square_y + square_s / 2));

  textSize(12);
  text("Independent", 967, 90);
  text("Max\nNeg", 895, 80);
  text("Max\nPos", 1040, 80);
  text("(Impact of Seg A outcome on Seg B)", 967, 115);

  textSize(14);
  if (rA > 0 && rA < 100) {
    text(rA + "%", square_x + square_s * ra, square_y + square_s + 20);
  }

  if (rB > 0 && rB < 100) {
    text(rB + "%", square_x - 20, square_y + square_s * (1 - rb) + 5);
  }

  if (rA > 0 && rA < 100) {
    text(rA + "%", square_2_x + square_s * ra, square_y + square_s + 20);
  }

  if (rB_given_a > 0 && rB_given_a < 100) {
    text(
      rB_given_a + "%",
      square_2_x - 20,
      square_y + square_s * (1 - rb_given_a) + 5
    );
  }

  if (rB_given_no_a > 0 && rB_given_no_a < 100) {
    text(
      rB_given_no_a + "%",
      square_2_x + square_s + 20,
      square_y + square_s * (1 - rb_given_no_a) + 5
    );
  }

  text("0%", square_x - 20, square_y + square_s + 10);
  text("100%", square_x - 20, square_y);
  text("100%", square_x + square_s + 20, square_y + square_s + 20);

  text("0%", square_2_x - 20, square_y + square_s + 10);
  text("100%", square_2_x - 20, square_y);
  text("100%", square_2_x + square_s + 20, square_y + square_s + 20);

  textSize(20);
  text("Independent Case", square_x + square_s / 2, square_y - 20);
  text("Dependent Case", square_2_x + square_s / 2, square_y - 20);

  stroke(0);
  strokeWeight(1);

  noFill();
  fill(255);
  rect(square_x, square_y, square_x + square_s, square_y + square_s);
  rect(square_2_x, square_y, square_2_x + square_s, square_y + square_s);

  fill("rgba(255, 0, 255, 0.5)");
  rect(square_x, square_y + square_s, square_x + square_s * ra, square_y);
  rect(square_2_x, square_y + square_s, square_2_x + square_s * ra, square_y);

  fill("rgba(255, 255, 0, 0.5)");
  rect(
    square_x,
    square_y + square_s,
    square_x + square_s * ra,
    square_y + square_s * (1 - rb)
  );
  rect(
    square_x + square_s * ra,
    square_y + square_s,
    square_x + square_s,
    square_y + square_s * (1 - rb)
  );
  rect(
    square_2_x,
    square_y + square_s,
    square_2_x + square_s * ra,
    square_y + square_s * (1 - rb_given_a)
  );
  rect(
    square_2_x + square_s * ra,
    square_y + square_s,
    square_2_x + square_s,
    square_y + square_s * (1 - rb_given_no_a)
  );

  stroke(255);
  strokeWeight(3);

  line(sx, sy, sx + 100, sy - 75);
  line(sx, sy, sx + 100, sy + 75);
  line(sx2, sy, sx2 + 100, sy - 75);
  line(sx2, sy, sx2 + 100, sy + 75);

  line(sx + 125, sy - 75, sx + 125 + 100, sy - 75 - 40);
  line(sx + 125, sy - 75, sx + 125 + 100, sy - 75 + 40);
  line(sx + 125, sy + 75, sx + 125 + 100, sy + 75 - 40);
  line(sx + 125, sy + 75, sx + 125 + 100, sy + 75 + 40);
  line(sx2 + 125, sy - 75, sx2 + 125 + 100, sy - 75 - 40);
  line(sx2 + 125, sy - 75, sx2 + 125 + 100, sy - 75 + 40);
  line(sx2 + 125, sy + 75, sx2 + 125 + 100, sy + 75 - 40);
  line(sx2 + 125, sy + 75, sx2 + 125 + 100, sy + 75 + 40);

  noStroke();
  fill(255);
  textSize(14);

  text("Region\nColour", tx - 1.4 * tsx, ty);
  text("Seg\nA", tx, ty);
  text("Seg\nB", tx + tsx, ty);
  text("Indep.\nProb", tx + 2.5 * tsx, ty);
  text("Dep.\nProb", tx + 4 * tsx, ty);
  text("Overall CoS:", tx + 0.5 * tsx, ty + 5 * tsy + tsyo);

  textSize(16);
  text("✅", tx, ty + tsy + tsyo);
  text("✅", tx, ty + 2 * tsy + tsyo);
  text("❌", tx, ty + 3 * tsy + tsyo);
  text("❌", tx, ty + 4 * tsy + tsyo);
  text("✅", tx + tsx, ty + tsy + tsyo);
  text("❌", tx + tsx, ty + 2 * tsy + tsyo);
  text("✅", tx + tsx, ty + 3 * tsy + tsyo);
  text("❌", tx + tsx, ty + 4 * tsy + tsyo);

  textSize(14);
  text(round(r11 * 100) + "%", tx + 2.5 * tsx, ty + tsy + tsyo);
  text(round(r10 * 100) + "%", tx + 2.5 * tsx, ty + tsy * 2 + tsyo);
  text(round(r01 * 100) + "%", tx + 2.5 * tsx, ty + tsy * 3 + tsyo);
  text(round(r00 * 100) + "%", tx + 2.5 * tsx, ty + tsy * 4 + tsyo);
  text(round((1 - r00) * 100) + "%", tx + 2.5 * tsx, ty + tsy * 5 + tsyo);

  text(round(r11_d * 100) + "%", tx + 4 * tsx, ty + tsy + tsyo);
  text(round(r10_d * 100) + "%", tx + 4 * tsx, ty + tsy * 2 + tsyo);
  text(round(r01_d * 100) + "%", tx + 4 * tsx, ty + tsy * 3 + tsyo);
  text(round(r00_d * 100) + "%", tx + 4 * tsx, ty + tsy * 4 + tsyo);
  text(round((1 - r00_d) * 100) + "%", tx + 4 * tsx, ty + tsy * 5 + tsyo);

  textAlign(LEFT);
  textSize(12);
  text("P(B✅|A✅)  =                    =              =   ", 460, 425);
  text("P(B✅|A❌)  =                    =              =   ", 460, 485);

  if (ra > 0) {
    text(rB_given_a + "%", 675, 425);
  }
  if (ra < 1) {
    text(rB_given_no_a + "%", 675, 485);
  }

  textAlign(CENTER);
  text("P(✅✅)", 575, 412);
  text("P(A✅)", 575, 435);
  text(round(r11_d * 100) + "%", 640, 412);
  text(rA + "%", 640, 435);
  text("P(❌✅)", 575, 472);
  text("P(A❌)", 575, 495);
  text(round(r01_d * 100) + "%", 640, 472);
  text(100 - rA + "%", 640, 495);

  textSize(14);
  text(rA + "%", sx + 40, sy - 50);
  text(100 - rA + "%", sx + 40, sy + 60);
  text(rA + "%", sx2 + 40, sy - 50);
  text(100 - rA + "%", sx2 + 40, sy + 60);

  text(rB + "%", sx + 175, sy - 105);
  text(100 - rB + "%", sx + 175, sy - 35);
  text(rB + "%", sx + 175, sy + 45);
  text(100 - rB + "%", sx + 175, sy + 115);

  if (ra > 0) {
    text(rB_given_a + "%", sx2 + 175, sy - 105);
    text(100 - rB_given_a + "%", sx2 + 175, sy - 35);
  }
  if (ra < 1) {
    text(rB_given_no_a + "%", sx2 + 175, sy + 45);
    text(100 - rB_given_no_a + "%", sx2 + 175, sy + 115);
  }

  text("Segment A", sx + 50, 550);
  text("Segment B", sx + 175, 550);
  text("Resources\n(mmboe)", sx + 320, 540);
  text("Chance\n(%)", sx + 405, 540);
  text("Risked Resources\n(mmboe)", sx + 510, 540);

  text("Segment A", sx2 + 50, 550);
  text("Segment B", sx2 + 175, 550);
  text("Resources\n(mmboe)", sx2 + 320, 540);
  text("Chance\n(%)", sx2 + 405, 540);
  text("Risked Resources\n(mmboe)", sx2 + 510, 540);

  textSize(16);
  text("✅", sx + 112, sy - 70);
  text("❌", sx + 112, sy + 80);
  text("✅", sx2 + 112, sy - 70);
  text("❌", sx2 + 112, sy + 80);

  text("✅✅", sx + 250, sy - 110);
  text("✅❌", sx + 250, sy - 30);
  text("❌✅", sx + 250, sy + 40);
  text("❌❌", sx + 250, sy + 120);
  text("✅✅", sx2 + 250, sy - 110);
  text("✅❌", sx2 + 250, sy - 30);
  text("❌✅", sx2 + 250, sy + 40);
  text("❌❌", sx2 + 250, sy + 120);

  let ww = 30;
  let wh = 20;

  rectMode(CENTER);
  rect(sx + 550, sy - 115, ww, wh);
  rect(sx + 550, sy - 35, ww, wh);
  rect(sx + 550, sy + 35, ww, wh);
  rect(sx + 550, sy + 115, ww, wh);
  rect(sx2 + 550, sy - 115, ww, wh);
  rect(sx2 + 550, sy - 35, ww, wh);
  rect(sx2 + 550, sy + 35, ww, wh);
  rect(sx2 + 550, sy + 115, ww, wh);
  rect(tx - 1.4 * tsx, ty + tsy + tsyo - 5, ww * 1.5, wh * 1.2);
  rect(tx - 1.4 * tsx, ty + tsy * 2 + tsyo - 5, ww * 1.5, wh * 1.2);
  rect(tx - 1.4 * tsx, ty + tsy * 3 + tsyo - 5, ww * 1.5, wh * 1.2);
  rect(tx - 1.4 * tsx, ty + tsy * 4 + tsyo - 5, ww * 1.5, wh * 1.2);

  fill("rgba(255, 0, 255, 0.5)");
  rect(sx + 550, sy - 115, ww, wh);
  rect(sx + 550, sy - 35, ww, wh);
  rect(sx2 + 550, sy - 115, ww, wh);
  rect(sx2 + 550, sy - 35, ww, wh);
  rect(tx - 1.4 * tsx, ty + tsy + tsyo - 5, ww * 1.5, wh * 1.2);
  rect(tx - 1.4 * tsx, ty + tsy * 2 + tsyo - 5, ww * 1.5, wh * 1.2);

  fill("rgba(255, 255, 0, 0.5)");
  rect(sx + 550, sy - 115, ww, wh);
  rect(sx + 550, sy + 35, ww, wh);
  rect(sx2 + 550, sy - 115, ww, wh);
  rect(sx2 + 550, sy + 35, ww, wh);
  rect(tx - 1.4 * tsx, ty + tsy + tsyo - 5, ww * 1.5, wh * 1.2);
  rect(tx - 1.4 * tsx, ty + tsy * 3 + tsyo - 5, ww * 1.5, wh * 1.2);

  fill(255);

  textSize(14);
  py = sy - 110;
  text(v11, sx + 320, py);
  text(v11, sx2 + 320, py);
  text(round(r11 * 100), sx + 405, py);
  text(round(r11_d * 100), sx2 + 405, py);
  text(round(v11 * r11), sx + 500, py);
  text(round(v11 * r11_d), sx2 + 500, py);

  py = sy - 30;
  text(v10, sx + 320, py);
  text(v10, sx2 + 320, py);
  text(round(r10 * 100), sx + 405, py);
  text(round(r10_d * 100), sx2 + 405, py);
  text(round(v10 * r10), sx + 500, py);
  text(round(v10 * r10_d), sx2 + 500, py);

  py = sy + 40;
  text(v01, sx + 320, py);
  text(v01, sx2 + 320, py);
  text(round(r01 * 100), sx + 405, py);
  text(round(r01_d * 100), sx2 + 405, py);
  text(round(v01 * r01), sx + 500, py);
  text(round(v10 * r01_d), sx2 + 500, py);

  py = sy + 120;
  text(v00, sx + 320, py);
  text(v00, sx2 + 320, py);
  text(round(r00 * 100), sx + 405, py);
  text(round(r00_d * 100), sx2 + 405, py);
  text(round(v00 * r00), sx + 500, py);
  text(round(v10 * r00_d), sx2 + 500, py);

  py = sy + 170;
  text("Aggregate:", sx + 225, py);
  text("Aggregate:", sx2 + 225, py);
  text(round(agg_vol) + " mmboe", sx + 320, py);
  text(round(agg_vol_d) + " mmboe", sx2 + 320, py);
  text(round((1 - r00) * 100) + "%", sx + 405, py);
  text(round((1 - r00_d) * 100) + "%", sx2 + 405, py);
  text(round(risked_vol) + " mmboe", sx + 500, py);
  text(round(risked_vol_d) + " mmboe", sx2 + 500, py);

  stroke(255, 0, 0);
  strokeCap(SQUARE);

  line(
    tx - 1.4 * tsx - (ww * 1.5) / 2,
    ty + tsy * 4 + tsyo - 5 - (wh * 1.2) / 2,
    tx - 1.4 * tsx + (ww * 1.5) / 2,
    ty + tsy * 4 + tsyo - 5 + (wh * 1.2) / 2
  );
  line(
    tx - 1.4 * tsx - (ww * 1.5) / 2,
    ty + tsy * 4 + tsyo - 5 + (wh * 1.2) / 2,
    tx - 1.4 * tsx + (ww * 1.5) / 2,
    ty + tsy * 4 + tsyo - 5 - (wh * 1.2) / 2
  );
  line(
    sx + 550 - ww / 2,
    sy + 115 - wh / 2,
    sx + 550 + ww / 2,
    sy + 115 + wh / 2
  );
  line(
    sx + 550 - ww / 2,
    sy + 115 + wh / 2,
    sx + 550 + ww / 2,
    sy + 115 - wh / 2
  );
  line(
    sx2 + 550 - ww / 2,
    sy + 115 - wh / 2,
    sx2 + 550 + ww / 2,
    sy + 115 + wh / 2
  );
  line(
    sx2 + 550 - ww / 2,
    sy + 115 + wh / 2,
    sx2 + 550 + ww / 2,
    sy + 115 - wh / 2
  );

  strokeWeight(5);
  if (r00 > 0) {
    line(
      square_x + square_s * ra,
      square_y,
      square_x + square_s,
      square_y + square_s * (1 - rb)
    );
    line(
      square_x + square_s * ra,
      square_y + square_s * (1 - rb),
      square_x + square_s,
      square_y
    );
  }

  if (r00_d > 0) {
    line(
      square_2_x + square_s * ra,
      square_y,
      square_2_x + square_s,
      square_y + square_s * (1 - rb_given_no_a)
    );
    line(
      square_2_x + square_s * ra,
      square_y + square_s * (1 - rb_given_no_a),
      square_2_x + square_s,
      square_y
    );
  }
}
