//declare global variables
var blogSwiper;
var fixedWidth;
var pageTop = $("#pageTop");

topIndicator();

//toggle event for hamburger menu bar even the document or window is not ready
setNav();

$(document).ready(function () {
    sliderStart();
    initBlogSwiper();
    setTimeout(trimText, 500);
    pageScrollUp();
    viewRole();
    fixedWidth = $(window).width();
});

$(window).on('ready load scroll', function () {
    setScrollAnimation();
});

var resizeIDApp;
$(window).on('resize', function () {
    clearTimeout(resizeIDApp)
    resizeIDApp = setTimeout(doneResizingApp, 500);
});

$(window).scroll(function () {
    if ($(this).scrollTop() >= 100) {
        pageTop.addClass('show');
    } else {
        pageTop.removeClass('show');
    }
});


// **************************set functions *******************************
//for menu toggle
function setNav() {
    var hamburger = $('.main-hamburger'),
        mobile_nav = $('.main-mobile-nav'),
        body = $('body');

    $(hamburger).on('click', function () {
        $(mobile_nav).toggleClass('toggle-nav');
        $(hamburger).toggleClass('toggle-menu');
        $(body).toggleClass('toggle-body');
    });
}

// for resizing functions
function doneResizingApp() {
    if (fixedWidth != $(window).width()) {
        trimText();
        fixedWidth = $(window).width();
    }
}

// for slider
function sliderStart() {
    if ($('#slide_wrapp').length > 0) {
        const slide = document.getElementById('slide_wrapp');
        const slideItem = slide.querySelectorAll('.slide_item');
        const totalNum = slideItem.length - 1;
        const FadeTime = 2000;
        const IntarvalTime = 5000;
        let actNum = 0;
        let nowSlide;
        let NextSlide;

        slideItem[0].classList.add('show_', 'zoom_');


        setInterval(() => {
            if (actNum < totalNum) {

                let nowSlide = slideItem[actNum];
                let NextSlide = slideItem[++actNum];

                nowSlide.classList.remove('show_');
                NextSlide.classList.add('show_', 'zoom_');
                setTimeout(() => {
                    nowSlide.classList.remove('zoom_');
                }, FadeTime);

            } else {
                let nowSlide = slideItem[actNum];
                let NextSlide = slideItem[actNum = 0];

                nowSlide.classList.remove('show_');
                NextSlide.classList.add('show_', 'zoom_');
                setTimeout(() => {
                    nowSlide.classList.remove('zoom_');
                }, FadeTime);
            };
        }, IntarvalTime);
    }
}
//for scroll animation
function setScrollAnimation() {
    $('.effect-fade').each(function () {
        var elemPos = $(this).offset().top;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll > elemPos - windowHeight) {
            $(this).addClass('effect-scroll');
        }
    });
}
//for text truncation
function trimText() {
    if ($(window).width() < 1025) {
        $('.line1').trunk8({
            lines: 1
        });
        $('.line2').trunk8({
            lines: 2
        });
        $('.line10').trunk8({
            lines: 5
        });
    } else {
        $('.line1').trunk8({
            lines: 1
        });
        $('.line2').trunk8({
            lines: 2
        });
        $('.line10').trunk8({
            lines: 10
        });
    }
}

function initBlogSwiper() {
    if ($('.blog-swiper').length > 0) {
        blogSwiper = new Swiper('.blog-swiper', {
            speed: 400,
            loop: true,
            slidesPerView: 1,
            pagination: {
                el: '.blog-pagination',
                clickable: true,
            },
            breakpoints: {
                991: {
                    slidesPerView: 3
                }
            }
        });
    }
}

function topIndicator() {
    if ($('.top-indicator').length == 0) {
        $('.main-header').addClass('header-bg');
    }
}

function pageScrollUp() {
    pageTop.click(function () {
        $('body, html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
}

function viewRole(){
    if($('#view-role').length > 0){
        var viewRole = $('#view-role');
        viewRole.click(function () {
            $('body, html').animate({
                scrollTop: $('#career-roles').offset().top - (100)
            }, 400);
            return false;
        });
    }
}