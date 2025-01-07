/* --------------------------------------
		CUSTOM FUNCTION WRITE HERE
-------------------------------------- */

$(window).scroll(function(){
    if ($(this).scrollTop() > 80) {
        $('.header').addClass('active');
    } else {
        $('.header').removeClass('active');
    }
});

window.onload = function(){ setTimeout("console.clear()",0) }

"use strict";
$(document).ready(function () {

	// ********* Popular Post Slider *************//
	$(".usercards").owlCarousel({
		loop: true,
		nav: false,
		dots: false,
		center: true,
		margin: 10,
		autoplay:true,
		lazyLoad: true,
		autoplayTimeout:1000,
		autoplayHoverPause:true,
		navText: [
			'<svg xmlns="http://www.w3.org/2000/svg" width="19" height="14" viewBox="0 0 19 14" fill="none"><path d="M17.5 6.15C17.9694 6.15 18.35 6.53056 18.35 7C18.35 7.46944 17.9694 7.85 17.5 7.85V6.15ZM0.39896 7.60104C0.0670128 7.2691 0.0670128 6.7309 0.39896 6.39896L5.80833 0.989592C6.14027 0.657647 6.67846 0.657647 7.01041 0.989592C7.34235 1.32154 7.34235 1.85973 7.01041 2.19167L2.20208 7L7.01041 11.8083C7.34235 12.1403 7.34235 12.6785 7.01041 13.0104C6.67846 13.3424 6.14027 13.3424 5.80833 13.0104L0.39896 7.60104ZM17.5 7.85H1V6.15H17.5V7.85Z" fill="#fff"/></svg>',
			'<svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 6.15C0.530558 6.15 0.15 6.53056 0.15 7C0.15 7.46944 0.530558 7.85 1 7.85V6.15ZM18.101 7.60104C18.433 7.2691 18.433 6.7309 18.101 6.39896L12.6917 0.989592C12.3597 0.657647 11.8215 0.657647 11.4896 0.989592C11.1576 1.32154 11.1576 1.85973 11.4896 2.19167L16.2979 7L11.4896 11.8083C11.1576 12.1403 11.1576 12.6785 11.4896 13.0104C11.8215 13.3424 12.3597 13.3424 12.6917 13.0104L18.101 7.60104ZM1 7.85H17.5V6.15H1V7.85Z" fill="#fff"/></svg>'
		],
		responsive: {
			0: {
				items: 1
			},
			500: {
				items: 2
			},
			992: {
				items: 1
			},
			1299: {
				items: 1
			}
		}
	});
	// ********* Audio Artical Slider *************//
	$(".audioartical-slider").owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		margin: 15,
		autoplay:true,
		lazyLoad: true,
		autoplayTimeout:1500,
		autoplayHoverPause:true,
		navText: [
			'<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" class="w-6 h-6"><path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd"></path></svg>',
			'<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" class="w-6 h-6"><path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd"></path></svg>'
		],
		responsive: {
			0: {
				items: 1
			},
			500: {
				items: 2
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			},
			1399: {
				items: 4
			}
		}
	});
	// ********* Author Slider *************//
	$(".authorslide").owlCarousel({
		loop: true,
		nav: false,
		dots: false,
		margin: 15,
		lazyLoad: true,
		autoplay:true,
		lazyLoad: true,
		autoplayTimeout:2000,
		autoplayHoverPause:true,
		navText: [
			'<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" class="w-6 h-6"><path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd"></path></svg>',
			'<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" class="w-6 h-6"><path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd"></path></svg>'
		],
		responsive: {
			0: {
				items: 2
			},
			450: {
				items: 3
			},
			768: {
				items: 4
			},
			1000: {
				items: 5
			},
			1399: {
				items: 6
			}
		}
	});

});

// ********* Popular Post Slider *************//
$(".client-testimonial").owlCarousel({
	loop: true,
	nav: true,
	dots: true,
	center: true,
	margin: 10,
	autoplay:true,
	lazyLoad: true,
	autoplayTimeout:1000,
	autoplayHoverPause:true,
	navText: [
		'<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" class="w-6 h-6"><path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd"></path></svg>',
		'<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" class="w-6 h-6"><path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd"></path></svg>'
	],
	responsive: {
		0: {
			items: 1
		},
		500: {
			items: 1
		},
		992: {
			items: 1
		},
		1299: {
			items: 1
		}
	}
});

var lightboxVideo = GLightbox({
	selector: '.glightbox'
});


function pad(n) {
	return (n < 10 ? '0' : '') + n;
}

// Current Date  
// const copyrightyear = document.querySelector('.copyrightyear')
// const dateyear = new Date().getFullYear()
// copyrightyear.innerHTML = dateyear