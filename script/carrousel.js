import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.esm.browser.min.js'
      
        const swiper = new Swiper('.swiper', {
            direction: 'horizontal',
            spaceBetween: 10,
            slidesPerView: 3,
            loop: true,

            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            },
});


