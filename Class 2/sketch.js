let xMax = 400;
let yMax = 600;

let xRocket = xMax / 2;
let yRocket = yMax * 0.6;

let rocketspeed = 0;
let rocketAcceleration = 0.1; // Aumenta ancora l'accelerazione

let table;
let starImage;

function preload() {
  // Caricare immagini, suoni, font
  table = loadTable("stars.csv", "csv", "header");
  starImage = loadImage("star.png");
}

function setup() {
  createCanvas(xMax, yMax);
  frameRate(60);
}

function drawStarFromFile(index, posX, posY) {
  let starSize = table.getNum(index, "starSize");
  image(starImage, posX, posY, starSize, starSize);
}

function drawStarsFromFile() {
  for (let k = 0; k < table.getRowCount(); k++) {
      let starX = (k * 37) % width + (k % 3) * 5;
      let starY = (k * 73) % height + (k % 7);
    drawStarFromFile(k, starX, starY);
    }
   }

// function drawStar(i, starX, starY, randomTransparency, randomSize) {
//     if (i % 2 == 0) {
//       // stella a
//       fill(0, 0, 0, randomTransparency);
//       ellipse(starX, starY, randomSize);
//     } else if (i % 3 == 0) {
//       // stella b
//       fill(200, 100, 255, randomTransparency);
//       ellipse(starX, starY, randomSize);
//     } else {
//       // stella c
//       fill(255, 255, 100, randomTransparency);
//       ellipse(starX, starY, randomSize);
//     }

//     return;
//   }

// function drawStars(numStars=120) {
//     for (let i = 0; i < numStars; i++) {
//       let starX = (i * 37) % width + (i % 3) * 5;
//       let starY = (i * 73) % height + (i % 7);
  
//       let randomTransparency = random(150, 255);
//       let randomSize = random(2.8, 5.0);

//       drawStar(i, starX, starY, randomTransparency, randomSize);
//     }

//     return;
//   }

function flameBurningAnimation() {
  // Fiamma motore animata
  let flameHeight = 20 + sin(frameCount * 0.2) * 10; // animazione altezza
  let flameWidth = 15 + cos(frameCount * 0.1) * 4;   // animazione larghezza

  // Colore sfumato: centro più chiaro, bordi più arancioni
  noStroke();
  // Fiamma esterna
  fill(255, 140, 0, 180);
  beginShape();
  vertex(xRocket - flameWidth, yRocket + 90); // sinistra
  vertex(xRocket + flameWidth, yRocket + 90); // destra
  vertex(xRocket, yRocket + 90 + flameHeight + 10); // punta esterna
  endShape(CLOSE);

  // Fiamma interna
  fill(255, 220, 80, 220);  
  beginShape();
  vertex(xRocket - flameWidth * 0.5, yRocket + 90); // sinistra interna
  vertex(xRocket + flameWidth * 0.5, yRocket + 90); // destra interna
  vertex(xRocket, yRocket + 90 + flameHeight); // punta interna
  endShape(CLOSE);
  return;
}

function drawRocket() {
  // Aprire contesto di disegno
  push();
    // Alette laterali (stesso colore della punta)
  fill(200, 40, 40);
  noStroke();
  // Aletta sinistra
  triangle(
    xRocket - 40, yRocket + 50, // base sinistra
    xRocket - 70, yRocket + 120, // esterno sinistra
    xRocket - 25, yRocket + 90  // punta superiore aletta
  );
  // Aletta destra
  triangle(
    xRocket + 40, yRocket + 50, // base destra
    xRocket + 70, yRocket + 120, // esterno destra
    xRocket + 25, yRocket + 90  // punta superiore aletta
  );

  flameBurningAnimation();

  // Rettangolo corpo razzo
  fill(220); 
  rectMode(CENTER);
  rect(xRocket, yRocket, 80, 180, 0, 0, 20, 20);

  // Triangolo punta
  fill(200, 40, 40);
  triangle(xRocket - 40, yRocket - 90, xRocket + 40, yRocket - 90, xRocket, yRocket - 150);

  // Cerchio finestra
  fill(40, 150, 220); 
  stroke(255);
  strokeWeight(3);
  ellipse(xRocket, yRocket, 48, 48);

  pop();
  return;
}

let rocketMoving = false;

function mousePressed() {
  rocketMoving = !rocketMoving;
}

function draw() {
  background("#051c61ff"); // Colore di sfondo
  fill(255);
  textSize(20);
  text("mouseX: " + mouseX + ", mouseY: " + mouseY, 20, 20);

  push();
  noStroke();
  // drawStars(120);
  drawStarsFromFile();
  drawRocket();
  pop();

  if (rocketMoving) {
    // Muovi razzo
    yRocket = yRocket - 1;

    // Velocizza razzo
    rocketspeed += rocketAcceleration;
    rocketspeed = constrain(rocketspeed, 0, 30);
    yRocket -= rocketspeed;

    // Reset razzo quando esce dallo schermo
    if (yRocket < -100) {
      yRocket = yMax + 100;
      if (rocketspeed > 5)
        rocketspeed = 5;
    }
  }
}



// function draw() {
//   background("#051c61ff"); // Colore di sfondo
//   // Mostrare un testo bianco che dice le coordinate del mouse sul foglio da disegno
//   fill(255); // Bianco
//   textSize(20);
//   // Stringa, x, y
//   text("mouseX: " + mouseX + ", mouseY: " + mouseY, 20, 20);
  
// // Disegnare le stelle, 120, tre tipi: a, b, c, fino a che ne abbiamo 120, stelle ellipse
// push();
//   noStroke();
//   // 3 cicli

//   // Ciclo 1 specifica stella a, 40 
//   // for (let i = 0; i < 40; i++) {
//   //  let starX = (i*37) % width + (i%3) * 5;
//   //  let starY = (i*73) % height + (i%7);
//   //  fill(255,255,150);
//   //  ellipse(starX, starY, 1);
//   //}

//   // Ciclo 2 specifica stella b, 40
//   // for (let i = 0; i < 40; i++) {
//   //   let starX = (i*37) % width + (i%3) * 5;
//   //   let starY = (i*73) % height + (i%7);
//   //  fill(200,100,255);
//   //  ellipse(starX, starY, 3);
//   //}

//   // Ciclo 3 specifica stella c, 40
//   // for (let i = 0; i < 40; i++) {
//   //  let starX = (i*37) % width + (i%3) * 5;
//   //  let starY = (i*73) % height + (i%7);
//   //  fill(255,255,150);
//   //  ellipse(starX, starY, 3);
//   // }

//   // Ciclo unico specifica stella a, b, c, 120
//   // for (let i = 0; i < 120; i++) {
//   //   let starX = (i*37) % width + (i%3) * 5;
//   //   let starY = (i*73) % height + (i%7);

//   //   let randomX = random(0, width);
//   //   let randomY = random(0, height);

//   //   randomTransparency = random(150, 255);
//   //   randomSize = random(2.8, 5.0);

//   //   // operatore modulo %
//   //   // stella a se i è pari
//   //   if (i % 2 == 0) {
//   //     // stella a
//   //     fill(255,255,150);  
//   //     ellipse(starX, starY, randomSize);
//   //     // stelle b per ogni i divisibile per 3
//   //   } else if (i % 3 == 1) {
//   //     // stella b
//   //     fill(200,100,255);
//   //     ellipse(starX, starY, randomSize);
//   //   } else {
//   //     // stella c
//   //     fill(255,255,100);
//   //     ellipse(starX, starY, randomSize);
//   //   }
//   // }
//   drawStars(120);
// //   pop();
// //   // Aprire contesto di disegno
// //   push();
// // // Rettangolo
// //   fill(220); 
// //   stroke(40);
// // // Alternativa
// //   rectMode(CENTER);
// //   rect(xRocket, yRocket, 80, 180, 0, 0, 20, 20);
// // // pop ();
// // // Triangolo
// // fill(200, 40, 40);
// // triangle(xRocket - 40, yRocket - 90, xRocket + 40, yRocket - 90, xRocket, yRocket - 150);
// // // Cerchio
// //   fill (40, 150, 220); 
// //   stroke(255);
// //   strokeWeight(3);
// //   ellipse(xRocket, yRocket, 48, 48);
// // // Chiudere contesto di disegno
// //   pop();

//   drawRocket();
// pop();

// // Muovi razzo
//  yRocket = yRocket - 1;
//  if (yRocket < -100) {
//    yRocket = yMax + 100;
//  }

// // Velocizza razzo
// rocketspeed += rocketAcceleration;
// rocketspeed = constrain(rocketspeed, 0, 30); // Aumenta la velocità massima
// yRocket -= rocketspeed;

// // Reset razzo quando esce dallo schermo
// if (yRocket < -100) {
//   yRocket = yMax + 100;
//   if (rocketspeed > 5)
//     rocketspeed = 5; // Resetta la velocità quando il razzo viene riposizionato
// }

