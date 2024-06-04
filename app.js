let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let thumbnailDom = document.querySelector('.carousel .thumbnail');
let listitemDom = document.querySelector('.carousel .list');

nextDom.onclick = function() {
    showSlider('next');
}
prevDom.onclick = function() {
    showSlider('prev');
}

let timeRunning = 3000;
let timeAutoNext = 7000;
let runTimeOut;
let runAutorun = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

function showSlider(type) {
    let itemSlider = document.querySelectorAll('.carousel .list .item');
    let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');
    
    if (type === 'next') {
        listitemDom.appendChild(itemSlider[0]);
        thumbnailDom.appendChild(itemThumbnail[0]);
        carouselDom.classList.add('next');
    } else {
        let positionLastItem = itemSlider.length - 1;

        listitemDom.prepend(itemSlider[positionLastItem]);
        thumbnailDom.prepend(itemThumbnail[positionLastItem]);
        carouselDom.classList.add('prev');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runAutorun);
    runAutorun = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
}
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("fullscreen-modal");
    const modalImg = document.getElementById("fullscreen-img");
    const closeBtn = document.querySelector(".fullscreen-modal .close");

    document.querySelectorAll('.gallery-card .card').forEach(card => {
        card.addEventListener('click', function() {
            const bgImage = this.style.backgroundImage;
            const imageUrl = bgImage.slice(5, bgImage.length - 2); // Extract URL from background-image property
            
            // Add a slight delay to allow the hover effect to complete before opening the modal
            setTimeout(() => {
                modal.style.display = "block";
                modalImg.src = imageUrl;
            }, 400);
        });
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});
/*---------------------------active------------------------*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(id)) {
                    link.classList.add('active');
                }
            });
        }
    });
}


const scriptURL = 'https://script.google.com/macros/s/AKfycbzMH7V0UqwXTBmzWTNYDEK0fJuyDCpBW95ma1b2eZ42OJTaHXdvz6S2dAany3mAP7bA/exec';
const form = document.querySelector('.submit-to-google-sheet');
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            if (response.ok) {
                msg.innerHTML = "Message Sent Successfully";
                setTimeout(() => {
                    msg.innerHTML = "";
                }, 5000);
                form.reset();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => console.error('Error!', error.message));
});