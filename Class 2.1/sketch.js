let xMax = 400;
let yMax = 600;

// Posizioni e dimensioni per i personaggi
let characterWidth = 125;
let characterHeightTall = 250; // Personaggio alto 
let characterHeightShort = 175; // Personaggio basso
let cornerRadius = 75; // Raggio degli angoli smussati
let floorHeight = 125; // Altezza del pavimento

// Posizioni iniziali centrate
let xCharTall = xMax / 2 - characterWidth / 2 - 5 ; // Personaggio alto
let xCharShort = xMax / 2 + characterWidth / 2 + 5; // Personaggio basso
let yCharBottom = yMax - floorHeight; // Base dei personaggi sul pavimento

// --- Soglia per il cambio di espressione ---
const MOUSE_PROXIMITY_THRESHOLD = 100; // Distanza in pixel per attivare la sorpresa

function setup() {
  createCanvas(xMax, yMax);
  frameRate(60);
  angleMode(RADIANS);
}

function draw() {
  // Sfondo (Mura e Pavimento)
  
  // Mura celesti 
  background("#53a4c4ff"); // Celeste
  
  // Pavimento blu 
  fill("#00008B"); // Blu scuro
  noStroke();
  rect(0, yMax - floorHeight, xMax, floorHeight);

  // Disegno dei personaggi e delle feature (occhi + bocca)
  
  // Personaggio Giallo
  let yCharTallTop = yCharBottom - characterHeightTall;
  drawCharacter(
    xCharTall, 
    yCharTallTop, 
    characterWidth, 
    characterHeightTall, 
    "#FFD700" // Giallo
  );

  // Occhi e Bocca del personaggio giallo
  drawFeatures(
    xCharTall, 
    yCharTallTop + 50,  // Posizione y occhi base
    yCharTallTop + 100, // Posizione y bocca base
    characterWidth,
    10 // Dimensione della pupilla
  );

  // Personaggio Viola
  let yCharShortTop = yCharBottom - characterHeightShort;
  drawCharacter(
    xCharShort, 
    yCharShortTop, 
    characterWidth, 
    characterHeightShort, 
    "#8A2BE2" // Viola
  );
  
  // Occhi e Bocca del personaggio viola
  drawFeatures(
    xCharShort, 
    yCharShortTop + 40, // Posizione y occhi base
    yCharShortTop + 85, // Posizione y bocca base
    characterWidth,
    10 // Dimensione della pupilla
  );
}

// Funzione per disegnare un rettangolo con angoli super smussati verso l'alto
function drawCharacter(x, y, w, h, color) {
  push();
  fill(color);
  stroke(0);
  strokeWeight(0.5);
  
  rect(x - w/2, y, w, h, cornerRadius, cornerRadius, 0, 0);
  pop();
}

// Funzione combinata per disegnare Occhi (con curva) e Bocca (dinamica)
function drawFeatures(centerX, eyeYTopBase, mouthYBase, characterW, pupilSize) {
  let eyeYBase = eyeYTopBase + 20; 
  let eyeGlobeDiameter = 20; 
  let pupilGlobeDiameter = pupilSize; 
  
  // --- Calcoli di Spostamento Globale (Condivisi tra occhi e bocca) ---
  
  let baseEyeSpacing = characterW / 8; 
  let maxEyeGlobalShift = 7.5; 
  let globalOffsetX = map(mouseX, 0, xMax, -maxEyeGlobalShift, maxEyeGlobalShift, true);

  let maxGlobalOffsetY = cornerRadius * 0.1; 
  let globalOffsetY = map(abs(globalOffsetX), 0, maxEyeGlobalShift, 0, maxGlobalOffsetY, true); 
  
  let eyeYGlobal = eyeYBase + globalOffsetY;

  // --- Tracciamento Pupilla ---
  
  let viewCenterX = centerX + globalOffsetX;
  let pupilMoveRange = (eyeGlobeDiameter - pupilGlobeDiameter) / 2 - 1; 
  let angle = atan2(mouseY - eyeYGlobal, mouseX - viewCenterX); 
  let pupilOffsetX = cos(angle) * pupilMoveRange;
  let pupilOffsetY = sin(angle) * pupilMoveRange;

  // --- Disegno Occhi ---
  
  let eyeLeftX = centerX - baseEyeSpacing + globalOffsetX; 
  let eyeRightX = centerX + baseEyeSpacing + globalOffsetX; 

  stroke(0); 
  strokeWeight(1);
  
  // Occhio Sinistro
  fill(255);
  ellipse(eyeLeftX, eyeYGlobal, eyeGlobeDiameter, eyeGlobeDiameter);
  fill(0);
  noStroke(); 
  ellipse(eyeLeftX + pupilOffsetX, eyeYGlobal + pupilOffsetY, pupilGlobeDiameter, pupilGlobeDiameter); 
  
  // Occhio Destro
  fill(255);
  stroke(0); 
  ellipse(eyeRightX, eyeYGlobal, eyeGlobeDiameter, eyeGlobeDiameter);
  fill(0);
  noStroke(); 
  ellipse(eyeRightX + pupilOffsetX, eyeYGlobal + pupilOffsetY, pupilGlobeDiameter, pupilGlobeDiameter);


  // --- Disegno Bocca (Dinamica) ---
  
  let mouthCenterX = centerX + globalOffsetX; 
  let mouthY = mouthYBase + globalOffsetY;    
  let mouthWidth = characterW * 0.3; 
  let mouthHeight = 8; // Altezza base

  // NUOVA LOGICA: Calcola la distanza del mouse dal punto centrale della bocca
  let distanceToMouse = dist(mouthCenterX, mouthY, mouseX, mouseY);
  
  push();
  noFill();
  stroke(0);
  strokeWeight(2);
  
  if (distanceToMouse < MOUSE_PROXIMITY_THRESHOLD) {
    // Bocca SORPRESA (Bocca a 'O' / Piccola ellisse verticale)
    let surprisedSize = map(distanceToMouse, 0, MOUSE_PROXIMITY_THRESHOLD, mouthWidth * 0.5, 0); // Più vicino = più grande
    ellipse(mouthCenterX, mouthY, surprisedSize, mouthHeight * 1.2);
  } else {
    // Bocca SORRIDENTE (Arco)
    arc(mouthCenterX, mouthY, mouthWidth, mouthHeight, 0, PI); 
  }
  
  pop();
}