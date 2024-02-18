// متغيرات اللعبة
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const players = [];
const food = [];
const foodCount = 100;

// دالة بدء اللعبة
function startGame() {
  // إنشاء اللاعبين
  for (let i = 0; i < 10; i++) {
    players.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 10,
      direction: Math.random() * 2 * Math.PI,
    });
  }

  // إنشاء الطعام
  for (let i = 0; i < foodCount; i++) {
    food.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    });
  }

  // حلقة اللعبة الرئيسية
  setInterval(() => {
    // تحديث حالة اللعبة
    update();

    // رسم اللعبة
    draw();
  }, 1000 / 60);
}

// دالة تحديث حالة اللعبة
function update() {
  // تحديث موقع اللاعبين
  for (let player of players) {
    player.x += Math.cos(player.direction) * player.size;
    player.y += Math.sin(player.direction) * player.size;

    // منع اللاعبين من الخروج من حدود الساحة
    if (player.x < 0) player.x = canvas.width;
    if (player.y < 0) player.y = canvas.height;
    if (player.x > canvas.width) player.x = 0;
    if (player.y > canvas.height) player.y = 0;

    // التحقق من اصطدام اللاعبين بالطعام
    for (let i = 0; i < food.length; i++) {
      if (
        player.x > food[i].x - player.size &&
        player.x < food[i].x + player.size &&
        player.y > food[i].y - player.size &&
        player.y < food[i].y + player.size
      ) {
        // إزالة الطعام من الساحة
        food.splice(i, 1);

        // زيادة حجم اللاعب
        player.size += 1;
      }
    }

    // التحقق من اصطدام اللاعبين ببعضهم البعض
    for (let otherPlayer of players) {
      if (player !== otherPlayer) {
        if (
          player.x > otherPlayer.x - player.size &&
          player.x < otherPlayer.x + otherPlayer.size &&
          player.y > otherPlayer.y - player.size &&
          player.y < otherPlayer.y + otherPlayer.size
        ) {
          // إنهاء اللعبة
          console.log("Game over!");
          break;
        }
      }
    }
  }
}

// دالة رسم اللعبة
function draw() {
// مسح canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// رسم الطعام
for (let food of food) {
  ctx.fillStyle = "green";
  ctx.fillRect(food.x, food.y, 10, 10);
}

// رسم اللاعبين
for (let player of players) {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, 2 * Math.PI);
  ctx.fill();
}
}
// إضافة مستمعات الأحداث للتحكم في حركة الدودة
document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 38: // Up arrow
      player.direction -= 0.1;
      break;
    case 40: // Down arrow
      player.direction += 0.1;
      break;
    case 37: // Left arrow
      player.direction -= 0.1;
      break;
    case 39: // Right arrow
      player.direction += 0.1;
      break;
  }
});

// إضافة وظيفة للتحقق من حدود الساحة
function checkBounds(player) {
  if (player.x < 0) player.x = canvas.width;
  if (player.y < 0) player.y = canvas.height;
  if (player.x > canvas.width) player.x = 0;
  if (player.y > canvas.height) player.y = 0;
}

// تحديث حلقة اللعبة الرئيسية
setInterval(() => {
  // تحديث موقع اللاعبين
  for (let player of players) {
    player.x += Math.cos(player.direction) * player.size;
    player.y += Math.sin(player.direction) * player.size;

    // التحقق من حدود الساحة
    checkBounds(player);

    // ...

  }

  // ...

}, 1000 / 60);
