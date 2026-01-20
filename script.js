function nextScreen(n) {
  document.querySelector(".active").classList.remove("active");
  document.getElementById("screen" + n).classList.add("active");
}

/* NAME CHECK */
function checkName() {
  const name = document.getElementById("nameInput").value.trim().toLowerCase();

  if (name === "pushpa") {
    const music = document.getElementById("bgMusic");
    music.volume = 0.5; // soft background sound
    music.play().catch(() => {
      console.log("Music play blocked until user interaction");
    });

    nextScreen(2);
    drawHeart();
  } else {
    alert("This surprise is only for Sai ❤️");
  }
}

/* HEART ANIMATION */
function drawHeart() {
  const canvas = document.getElementById("heartCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let t = 0;
  const scale = 18;

  function animate() {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2 + x * scale,
      canvas.height / 2 - y * scale,
      3,
      0,
      Math.PI * 2
    );
    ctx.fill();

    t += 0.015;

    if (t < Math.PI * 2) {
      requestAnimationFrame(animate);
    } else {
      document.getElementById("birthdayText").style.display = "block";
      setTimeout(() => nextScreen(3), 3500);
    }
  }
  animate();
}

/* THANK YOU TYPE */
const message = "Thank you for being there 💖";
let i = 0;

function goToThankYou() {
  nextScreen(4);
  i = 0;
  document.getElementById("thankText").innerHTML = "";

  function type() {
    if (i < message.length) {
      document.getElementById("thankText").innerHTML += message.charAt(i);
      i++;
      setTimeout(type, 100);
    } else {
      // after typing ends, go to final screen
      setTimeout(() => nextScreen(5), 2000);
    }
  }
  type();
}

