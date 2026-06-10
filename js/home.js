window.addEventListener("load", () => {

    const splash =
    document.getElementById("splash-screen");

    if (!splash) return;

    if (sessionStorage.getItem("splashShown")) {
        splash.remove();
        return;
    }

    sessionStorage.setItem("splashShown", "true");

    setTimeout(() => {

        splash.classList.add("hide");

        setTimeout(() => {
            splash.remove();
        }, 800);

    }, 1800);

});

const titles = [
    "ESCAPE THE ORDINARY",
    "LIVE BEYOND BORDERS",
    "FIND YOUR NEXT CHAPTER"
];

let index = 0;

const heroTitle = document.getElementById("heroTitle1");

function changeTitle() {

    heroTitle.style.opacity = 0;

    setTimeout(() => {

        index++;

        if(index >= titles.length){
            index = 0;
        }

        heroTitle.textContent = titles[index];

        heroTitle.style.opacity = 1;

    }, 400);
}

setInterval(changeTitle, 5000);


const todayIndex = new Date().getDate() % destinations.length;

const dotd = destinations[todayIndex];


document.getElementById("dotd-name").textContent = dotd.name;

document.getElementById("dotd-desc").textContent = dotd.desc;


let dotdImageIndex = 0;

const dotdImg =
document.getElementById("dotd-img");

dotdImg.src = dotd.images[0];

setInterval(() => {

    dotdImg.style.transform = "translateX(-50px)";
    dotdImg.style.opacity = "0";

    setTimeout(() => {

        dotdImageIndex =
        (dotdImageIndex + 1) % dotd.images.length;

        dotdImg.src = dotd.images[dotdImageIndex];

        dotdImg.style.transform = "translateX(50px)";

        setTimeout(() => {
            dotdImg.style.transform = "translateX(0)";
            dotdImg.style.opacity = "1";
        }, 50);

    }, 500);

}, 3000);


document.getElementById("dotd-link").onclick = () => {

    localStorage.setItem("selectedDestination", JSON.stringify(dotd));

    window.location.href = "explore.html";
};


document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".count");

    const animateCount = (counter) => {

        if (counter.classList.contains("infinity")) return;

        const target = +counter.getAttribute("data-target");
        let count = 0;

        const speed = target / 70;

        const update = () => {
            count += speed;

            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };

        update();
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
            }
        });
    }, {
        threshold: 0.6
    });

    counters.forEach(counter => observer.observe(counter));

});