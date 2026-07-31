/* ==========================================
   FROM PREM TO SARTHI ❤️
   SCRIPT.JS
   PART 1
========================================== */

// ---------- ELEMENTS ----------

const loading = document.getElementById("loading");
const musicOverlay = document.getElementById("musicOverlay");
const startExperience = document.getElementById("startExperience");

const music = document.getElementById("bgMusic");

const pages = [...document.querySelectorAll(".page")];

const petalsContainer = document.getElementById("petals");

const openGift = document.getElementById("openGift");
const giftImage = document.getElementById("giftImage");

const galleryButton = document.getElementById("galleryButton");
const birthdayButton = document.getElementById("birthdayButton");
const letterButton = document.getElementById("letterButton");
const endingButton = document.getElementById("endingButton");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

// ---------- PAGE INDEX ----------

let currentPage = 0;

// ---------- LOADING ----------

window.addEventListener("load", () => {

    setTimeout(() => {

        loading.classList.add("hidden");

    }, 700);

});

// ---------- PAGE SWITCH ----------

function showPage(index){

    if(index < 0) index = 0;

    if(index >= pages.length)
        index = pages.length - 1;

    pages.forEach(page=>{

        page.classList.remove("active");

    });

    pages[index].classList.add("active");

    currentPage = index;

}

// ---------- MUSIC ----------

let musicStarted = false;

async function startMusic(){

    if(musicStarted) return;

    try{

        music.volume = 0.6;

        await music.play();

        musicStarted = true;

    }

    catch(err){

        console.log("Music blocked.");

    }

}

// ---------- START BUTTON ----------

if(startExperience){

startExperience.addEventListener("click",()=>{

    musicOverlay.classList.add("hidden");

    startMusic();

});

}

// ---------- NAVIGATION ----------

if(openGift){

openGift.addEventListener("click",()=>{

    startMusic();

    showPage(1);

});

}

if(galleryButton){

galleryButton.addEventListener("click",()=>{

    showPage(3);

});

}

if(birthdayButton){

birthdayButton.addEventListener("click",()=>{

    showPage(4);

});

}

if(letterButton){

letterButton.addEventListener("click",()=>{

    showPage(5);

});

}

if(endingButton){

endingButton.addEventListener("click",()=>{

    showPage(6);

});

}

// ==========================================
// PART 2
// GIFT • LIGHTBOX • SWIPE • PETALS • HEARTS
// ==========================================

// ---------- GIFT OPEN ----------

if(giftImage){

giftImage.addEventListener("click",()=>{

    giftImage.classList.add("open");

    createBurst();

    setTimeout(()=>{

        showPage(2);

    },900);

});

}

// ---------- LIGHTBOX ----------

const galleryImages = document.querySelectorAll(".photo-grid img");

galleryImages.forEach(img=>{

    img.addEventListener("click",()=>{

        lightbox.classList.add("active");

        lightboxImage.src = img.src;

        lightboxImage.alt = img.alt;

        document.body.style.overflow="hidden";

    });

});

if(closeLightbox){

closeLightbox.addEventListener("click",closeViewer);

}

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        closeViewer();

    }

});

function closeViewer(){

    lightbox.classList.remove("active");

    document.body.style.overflow="";

}

// ---------- ESC KEY ----------

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeViewer();

    }

});

// ---------- SWIPE ----------

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart",(e)=>{

    touchStartX = e.changedTouches[0].clientX;

},{passive:true});

document.addEventListener("touchend",(e)=>{

    touchEndX = e.changedTouches[0].clientX;

    handleSwipe();

},{passive:true});

function handleSwipe(){

    const distance = touchEndX - touchStartX;

    if(Math.abs(distance)<70) return;

    if(distance<0){

        nextPage();

    }else{

        previousPage();

    }

}

function nextPage(){

    if(currentPage<pages.length-1){

        showPage(currentPage+1);

    }

}

function previousPage(){

    if(currentPage>0){

        showPage(currentPage-1);

    }

}

// ---------- PETALS ----------

function createPetal(){

    const petal = document.createElement("div");

    petal.className="petal";

    petal.style.left=Math.random()*window.innerWidth+"px";

    petal.style.animationDuration=
    (6+Math.random()*5)+"s";

    petal.style.opacity=
    (.5+Math.random()*.5);

    petal.style.transform=
    `scale(${0.5+Math.random()})`;

    petalsContainer.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },12000);

}

setInterval(createPetal,350);

// ---------- HEARTS ----------

function createHeart(){

    if(!pages[6].classList.contains("active")) return;

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤️";

    heart.style.left=
    Math.random()*window.innerWidth+"px";

    heart.style.fontSize=
    (18+Math.random()*18)+"px";

    heart.style.animationDuration=
    (5+Math.random()*3)+"s";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },8000);

}

setInterval(createHeart,700);

// ---------- BURST ----------

function createBurst(){

    for(let i=0;i<35;i++){

        const heart=document.createElement("div");

        heart.innerHTML="💖";

        heart.style.position="fixed";

        heart.style.left=window.innerWidth/2+"px";

        heart.style.top=window.innerHeight/2+"px";

        heart.style.fontSize=
        (18+Math.random()*18)+"px";

        heart.style.pointerEvents="none";

        heart.style.transition="1s ease";

        document.body.appendChild(heart);

        requestAnimationFrame(()=>{

            const angle=Math.random()*Math.PI*2;

            const distance=120+Math.random()*180;

            heart.style.transform=
            `translate(${Math.cos(angle)*distance}px,
            ${Math.sin(angle)*distance}px)
            scale(.4)`;

            heart.style.opacity="0";

        });

        setTimeout(()=>{

            heart.remove();

        },1000);

    }

}

// ==========================================
// PART 3
// FINAL POLISH & PERFORMANCE
// ==========================================

// ---------- PAGE FADE ----------

function animateCurrentPage() {

    const page = pages[currentPage];

    page.animate(
        [
            {
                opacity: 0,
                transform: "translateY(25px)"
            },
            {
                opacity: 1,
                transform: "translateY(0)"
            }
        ],
        {
            duration: 450,
            easing: "ease-out"
        }
    );

}

// Override showPage with animation

const originalShowPage = showPage;

showPage = function(index){

    originalShowPage(index);

    animateCurrentPage();

    // Reset letter scroll
    const letter = document.getElementById("letterText");

    if(letter){

        letter.scrollTop = 0;

    }

};

// ---------- IMAGE PRELOAD ----------

window.addEventListener("load",()=>{

    document.querySelectorAll("img").forEach(img=>{

        const preload = new Image();

        preload.src = img.src;

    });

});

// ---------- PREVENT IMAGE DRAG ----------

document.querySelectorAll("img").forEach(img=>{

    img.draggable = false;

});

// ---------- RESUME MUSIC ----------

document.addEventListener("visibilitychange",()=>{

    if(document.hidden) return;

    if(musicStarted && music.paused){

        music.play().catch(()=>{});

    }

});

// ---------- SAFARI AUDIO ----------

document.body.addEventListener("touchstart",()=>{

    if(!musicStarted){

        startMusic();

    }

},{once:true});

// ---------- KEYBOARD ----------

document.addEventListener("keydown",(e)=>{

    switch(e.key){

        case "ArrowRight":

            nextPage();

        break;

        case "ArrowLeft":

            previousPage();

        break;

    }

});

// ---------- PRELOAD NEXT PAGE IMAGES ----------

const imageSources = [];

document.querySelectorAll("img").forEach(img=>{

    imageSources.push(img.src);

});

imageSources.forEach(src=>{

    const image = new Image();

    image.src = src;

});

// ---------- PERFORMANCE ----------

// Pause petals when tab isn't visible

let petalsRunning = true;

document.addEventListener("visibilitychange",()=>{

    petalsRunning = !document.hidden;

});

setInterval(()=>{

    if(!petalsRunning) return;

    createPetal();

},350);

// ---------- IOS DOUBLE TAP FIX ----------

let lastTouchEnd = 0;

document.addEventListener("touchend",function(event){

    const now = Date.now();

    if(now - lastTouchEnd <= 300){

        event.preventDefault();

    }

    lastTouchEnd = now;

},{passive:false});

// ---------- LIGHTBOX SWIPE ----------

let lightboxStartX = 0;

lightbox.addEventListener("touchstart",(e)=>{

    lightboxStartX = e.changedTouches[0].clientX;

},{passive:true});

lightbox.addEventListener("touchend",(e)=>{

    const endX = e.changedTouches[0].clientX;

    const difference = endX - lightboxStartX;

    if(Math.abs(difference) > 60){

        closeViewer();

    }

},{passive:true});

// ---------- READY ----------

console.log(

"%c❤️ From Prem To Sarthi ❤️",

"color:#ff4f89;font-size:20px;font-weight:bold;"

);

console.log(

"Website loaded successfully."

);

// ==========================================
// END
// ==========================================