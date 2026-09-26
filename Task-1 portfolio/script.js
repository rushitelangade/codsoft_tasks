/* =========================================================
   RUSHIKESH TELANGADE — PREMIUM PORTFOLIO JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const body = document.body;

    const header = document.querySelector(".header");

    const navbar = document.getElementById("navbar");

    const menuToggle = document.getElementById("menuToggle");

    const themeToggle = document.getElementById("themeToggle");

    const backToTop = document.getElementById("backToTop");

    const typingText = document.getElementById("typingText");

    const contactForm = document.getElementById("contactForm");

    const formMessage = document.getElementById("formMessage");


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            navbar.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (navbar.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        /* Close menu after clicking a navigation link */

        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* =====================================================
       DARK / LIGHT THEME
       ===================================================== */

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {

        body.classList.add("light-theme");

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (body.classList.contains("light-theme")) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

        }

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            body.classList.toggle("light-theme");

            const currentTheme =
                body.classList.contains("light-theme")
                    ? "light"
                    : "dark";

            localStorage.setItem(
                "portfolio-theme",
                currentTheme
            );

            updateThemeIcon();

        });

    }


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );


    handleHeaderScroll();


    /* =====================================================
       TYPING EFFECT
       ===================================================== */

    if (typingText) {

        const words = [
            "Frontend Developer",
            "Python Developer",
            "Data Analytics Learner",
            "Computer Science Engineering Student"
        ];

        let wordIndex = 0;
        let charIndex = 0;

        let isDeleting = false;


        function typeEffect() {

            const currentWord = words[wordIndex];

            if (isDeleting) {

                charIndex--;

            } else {

                charIndex++;

            }


            typingText.textContent =
                currentWord.substring(0, charIndex);


            let typingSpeed = isDeleting ? 45 : 85;


            if (!isDeleting && charIndex === currentWord.length) {

                typingSpeed = 1500;

                isDeleting = true;

            }


            else if (isDeleting && charIndex === 0) {

                isDeleting = false;

                wordIndex =
                    (wordIndex + 1) % words.length;

                typingSpeed = 400;

            }


            setTimeout(typeEffect, typingSpeed);

        }


        typeEffect();

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("active");

                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("active");

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");


    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute("id");


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                });


                const activeLink =
                    document.querySelector(
                        `.nav-link[href="#${sectionId}"]`
                    );


                if (activeLink) {

                    activeLink.classList.add("active");

                }

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    updateActiveNavigation();


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 600) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );


    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       MAGNETIC BUTTON EFFECT
       ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".primary-btn, .social-links a"
        );


    if (window.matchMedia("(pointer: fine)").matches) {

        magneticButtons.forEach(button => {

            button.addEventListener("mousemove", event => {

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `translate(${x * 0.12}px, ${y * 0.12}px)`;

            });


            button.addEventListener("mouseleave", () => {

                button.style.transform = "";

            });

        });

    }


    /* =====================================================
       3D CARD TILT
       ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".skill-card, .project-card, .cert-card"
        );


    if (window.matchMedia("(pointer: fine)").matches) {

        tiltCards.forEach(card => {

            card.addEventListener("mousemove", event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) / centerY) * -3;

                const rotateY =
                    ((x - centerX) / centerX) * 3;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-7px)`;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    /* =====================================================
       MOUSE FOLLOW GLOW
       ===================================================== */

    let glow = document.querySelector(".mouse-glow");


    if (!glow) {

        glow = document.createElement("div");

        glow.className = "mouse-glow";

        document.body.appendChild(glow);


        const glowStyle =
            document.createElement("style");


        glowStyle.textContent = `

            .mouse-glow {

                position: fixed;

                width: 220px;
                height: 220px;

                border-radius: 50%;

                pointer-events: none;

                z-index: -1;

                background:
                    radial-gradient(
                        circle,
                        rgba(109,93,252,.10),
                        transparent 70%
                    );

                transform:
                    translate(-50%, -50%);

                opacity: 0;

                transition:
                    opacity .3s ease;

            }

            @media (pointer: coarse) {

                .mouse-glow {
                    display: none;
                }

            }

        `;


        document.head.appendChild(glowStyle);

    }


    if (window.matchMedia("(pointer: fine)").matches) {

        window.addEventListener("mousemove", event => {

            glow.style.left =
                `${event.clientX}px`;

            glow.style.top =
                `${event.clientY}px`;

            glow.style.opacity = "1";

        });

    }


    /* =====================================================
       PROJECT IMAGE PARALLAX
       ===================================================== */

    const projectImages =
        document.querySelectorAll(
            ".project-card-image img, .main-project-image img"
        );


    if (window.matchMedia("(pointer: fine)").matches) {

        projectImages.forEach(image => {

            image.addEventListener("mousemove", event => {

                const rect =
                    image.getBoundingClientRect();

                const x =
                    ((event.clientX - rect.left) /
                        rect.width - .5) * 8;

                const y =
                    ((event.clientY - rect.top) /
                        rect.height - .5) * 8;


                image.style.transform =
                    `scale(1.06)
                     translate(${x}px, ${y}px)`;

            });


            image.addEventListener("mouseleave", () => {

                image.style.transform = "";

            });

        });

    }


    /* =====================================================
       CONTACT FORM VALIDATION
       ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById("name");

                const email =
                    document.getElementById("email");

                const subject =
                    document.getElementById("subject");

                const message =
                    document.getElementById("message");


                const nameValue =
                    name.value.trim();

                const emailValue =
                    email.value.trim();

                const subjectValue =
                    subject.value.trim();

                const messageValue =
                    message.value.trim();


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!nameValue) {

                    showFormMessage(
                        "Please enter your name.",
                        "error"
                    );

                    name.focus();

                    return;

                }


                if (!emailPattern.test(emailValue)) {

                    showFormMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    email.focus();

                    return;

                }


                if (!subjectValue) {

                    showFormMessage(
                        "Please enter a subject.",
                        "error"
                    );

                    subject.focus();

                    return;

                }


                if (messageValue.length < 10) {

                    showFormMessage(
                        "Message should contain at least 10 characters.",
                        "error"
                    );

                    message.focus();

                    return;

                }


                showFormMessage(
                    "Message validated successfully!",
                    "success"
                );


                contactForm.reset();

            }
        );

    }


    function showFormMessage(message, type) {

        if (!formMessage) return;

        formMessage.textContent = message;

        formMessage.style.color =
            type === "success"
                ? "var(--secondary)"
                : "#ff6b81";


        formMessage.style.opacity = "1";


        setTimeout(() => {

            formMessage.style.opacity = "0";

        }, 4000);

    }


    /* =====================================================
       CERTIFICATE LINK FEEDBACK
       ===================================================== */

    document
        .querySelectorAll(".cert-card a")
        .forEach(link => {

            link.addEventListener("click", () => {

                link.style.transform =
                    "scale(.97)";

                setTimeout(() => {

                    link.style.transform = "";

                }, 150);

            });

        });


    /* =====================================================
       SMOOTH ANCHOR NAVIGATION
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (!target) return;


                event.preventDefault();


                const headerOffset = 95;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerOffset;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            });

        });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (navbar) {

                navbar.classList.remove("active");

            }


            if (menuToggle) {

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        }

    });


    /* =====================================================
       IMAGE ERROR HANDLING
       ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener("error", () => {

                image.style.opacity = "0.35";

            });

        });


    /* =====================================================
       PAGE LOAD
       ===================================================== */

    window.addEventListener("load", () => {

        document.body.classList.add("page-loaded");

    });

});