const cursorInner = document.querySelector(".cursor-inner");
const cursorOuter = document.querySelector(".cursor-outer");

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorInner.style.left = mouseX + "px";
    cursorInner.style.top = mouseY + "px";
});

function animate() {
    currentX += (mouseX - currentX) / 8;
    currentY += (mouseY - currentY) / 8;
    cursorOuter.style.left = currentX + "px";
    cursorOuter.style.top = currentY + "px";
    requestAnimationFrame(animate);
}

document.querySelectorAll('.checkbox_card input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            this.parentElement.classList.add('checked');
        } else {
            this.parentElement.classList.remove('checked');
        }
    });
});


animate();

// Apply hovered style to interactive elements
const interactiveElements = document.querySelectorAll("a, button, .hover-target");

interactiveElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        document.body.classList.add("hovered");
    });
    el.addEventListener("mouseleave", () => {
        document.body.classList.remove("hovered");
    });
});

let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile) {
    cursorInner.style.display = "none";
    cursorOuter.style.display = "none";
} else {
    cursorInner.style.display = "block";
    cursorOuter.style.display = "block";
}

const navbar = document.querySelector('.ts_temp_first_nav_main_div');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('ts_navbar-fixed');
    } else {
        navbar.classList.remove('ts_navbar-fixed');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".ts_temp_first_nav_div1_6 a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 200;
            if (scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("ts_nav_active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("ts_nav_active");
            }
        });
    });
});


const form = document.getElementById('contactForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const res = await fetch('mail.php', {
        method: 'POST',
        body: formData
    });
    const text = await res.text();
    if (text.trim() === 'success') {
        form.reset();
    } else {
        alert('Error sending message:\n' + text);
    }
});


document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Stop form from submitting

    const form = e.target;
    const formData = new FormData(form);
    const loader = document.getElementById("formLoader");
    const button = form.querySelector("button");

    // Show loader
    loader.style.display = "inline-block";
    button.disabled = true;

    fetch("mail.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(result => {
            loader.style.display = "none";
            button.disabled = false;

            if (result.trim() === 'success') {
                form.style.display = "none";
                const responseBox = document.getElementById("formResponse");
                responseBox.innerHTML = "<p style='color: black; font-size: 24px; font-weight: 700;'>✅ Thank you for contacting us! We'll be in touch you shortly.</p>";
                responseBox.style.display = "block";
            } else {
                alert("Something went wrong:\n" + result);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Something went wrong. Please try again later.");
            loader.style.display = "none";
            button.disabled = false;
        });
});