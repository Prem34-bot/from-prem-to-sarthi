// ==========================================
// FROM PREM TO SARTHI ❤️
// SCRIPT.JS
// ==========================================

// ---------- ELEMENTS ----------

const loading = document.getElementById("loading");

const pages = document.querySelectorAll(".page");

const music = document.getElementById("bgMusic");

const petalsContainer = document.getElementById("petals");

// Buttons

const openGiftBtn = document.getElementById("openGift");

const giftImage = document.getElementById("giftImage");

const galleryButton = document.getElementById("galleryButton");

const birthdayButton = document.getElementById("birthdayButton");

const letterButton = document.getElementById("letterButton");

const endingButton = document.getElementById("endingButton");

// ==========================================
// LOADING
// ==========================================

window.addEventListener("load", () => {

    setTimeout(() => {

        loading.classList.add("hidden");

    }, 1800);

});

// ==========================================
// PAGE SWITCH
// ==========================================

function showPage(id) {

    pages.forEach(page => {

        page.classList.remove("active");

    });

    const current = document.getElementById(id);

    current.classList.add("active");
    current.classList.add("fadeIn");

    setTimeout(() => {

        current.classList.remove("fadeIn");

    }, 700);

}

// ==========================================
// START MUSIC
// ==========================================

let musicStarted = false;

function startMusic() {

    if (musicStarted) return;

    music.play().catch(() => {});

    musicStarted = true;

}

// ==========================================
// BUTTON EVENTS
// ==========================================

openGiftBtn.addEventListener("click", () => {

    startMusic();

    showPage("gift");

});

giftImage.addEventListener("click", () => {

    giftImage.classList.add("open");

    createBurst();

    setTimeout(() => {

        showPage("flowers");

    }, 900);

});

galleryButton.addEventListener("click", () => {

    showPage("gallery");

});

birthdayButton.addEventListener("click", () => {

    showPage("birthday");

});

letterButton.addEventListener("click", () => {

    showPage("letter");

});

endingButton.addEventListener("click", () => {

    showPage("ending");

});

// ==========================================
// PETALS
// ==========================================

function createPetal() {

    const petal = document.createElement("div");

    petal.className = "petal";

    petal.style.left = Math.random() * window.innerWidth + "px";

    petal.style.animationDuration =
        (6 + Math.random() * 6) + "s";

    petal.style.opacity =
        0.5 + Math.random() * 0.5;

    petal.style.transform =
        `scale(${0.6 + Math.random()})`;

    petalsContainer.appendChild(petal);

    setTimeout(() => {

        petal.remove();

    }, 12000);

}

setInterval(createPetal, 300);

// ==========================================
// HEARTS
// ==========================================

function createHeart() {

    if (!document.getElementById("ending").classList.contains("active"))
        return;

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤";

    heart.style.left = Math.random() * window.innerWidth + "px";

    heart.style.animationDuration =
        (5 + Math.random() * 3) + "s";

    heart.style.fontSize =
        (18 + Math.random() * 18) + "px";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 8000);

}

setInterval(createHeart, 700);

// ==========================================
// GIFT BURST
// ==========================================

function createBurst() {

    for (let i = 0; i < 35; i++) {

        const heart = document.createElement("div");

        heart.innerHTML = "💖";

        heart.style.position = "fixed";

        heart.style.left =
            (window.innerWidth / 2) + "px";

        heart.style.top =
            (window.innerHeight / 2) + "px";

        heart.style.fontSize =
            (18 + Math.random() * 18) + "px";

        heart.style.pointerEvents = "none";

        heart.style.transition = "1s ease";

        document.body.appendChild(heart);

        requestAnimationFrame(() => {

            const angle = Math.random() * Math.PI * 2;

            const distance = 120 + Math.random() * 180;

            heart.style.transform = `translate(
                ${Math.cos(angle) * distance}px,
                ${Math.sin(angle) * distance}px
            ) scale(0.4)`;

            heart.style.opacity = "0";

        });

        setTimeout(() => {

            heart.remove();

        }, 1000);

    }

}

// ==========================================
// PHOTO ANIMATION
// ==========================================

const photos = document.querySelectorAll(".photo-grid img");

photos.forEach((photo) => {

    photo.addEventListener("mouseenter", () => {

        photo.style.transform = "scale(1.06) rotate(2deg)";

    });

    photo.addEventListener("mouseleave", () => {

        photo.style.transform = "";

    });

});

// ==========================================
// SCROLL TO TOP OF LETTER
// ==========================================

const letter = document.getElementById("letterText");

if (letter) {

    letter.scrollTop = 0;

}

// ==========================================
// PREVENT IMAGE DRAG
// ==========================================

document.querySelectorAll("img").forEach(img => {

    img.draggable = false;

});

// ==========================================
// END ❤️
// ==========================================