$(document).ready(function() {

    const $body = $('body');
    const $modal = $('#requestDishModal');
    const $openModalBtn = $('#openRequestModal');
    const $closeBtn = $modal.find('.close-btn');
    const $cancelBtn = $('#cancelRequest');
    const $submitForm = $('#dishRequestForm');

    const toggleBodyScroll = (lock) => {
        if (lock) {
            $body.addClass('modal-open');
        } else {
            $body.removeClass('modal-open');
        }
    };

    const closeModal = () => {
        $modal.css('display', 'none'); 
        toggleBodyScroll(false);
    };

    $openModalBtn.on('click', function() {
        $modal.css('display', 'block');
        toggleBodyScroll(true);
    });

    $closeBtn.on('click', closeModal);

    $cancelBtn.on('click', function(e) {
        e.preventDefault();
        closeModal();
    });

    $submitForm.on('submit', function(e) {
        e.preventDefault();
        this.reset();
        closeModal();
    });

    $(window).on('click', function(event) {
        if (event.target === $modal[0]) {
            closeModal();
        }
    });

    const $carouselTrack = $('.carousel-track');
    const $prevBtn = $('.prev-btn');
    const $nextBtn = $('.next-btn');

    const getItemWidth = () => {
        const $item = $('.carousel-item').first();
        return $item.length ? $item.outerWidth(true) : 0; 
    };

    const scrollCarousel = (direction) => {
        const itemWidth = getItemWidth();
        if (itemWidth === 0) return;

        const scrollDistance = itemWidth * 1;
        const currentScroll = $carouselTrack.scrollLeft();

        if (direction === 'next') {
            $carouselTrack.animate({
                scrollLeft: currentScroll + scrollDistance
            }, 500);
        } else if (direction === 'prev') {
            $carouselTrack.animate({
                scrollLeft: currentScroll - scrollDistance
            }, 500);
        }
    };

    $nextBtn.on('click', () => scrollCarousel('next'));
    $prevBtn.on('click', () => scrollCarousel('prev'));
    
    $carouselTrack.on('click', '.qty-plus', function() {
        const $input = $(this).siblings('.qty-display');
        let count = parseInt($input.val());
        $input.val(count + 1);
    });

    $carouselTrack.on('click', '.qty-minus', function() {
        const $input = $(this).siblings('.qty-display');
        let count = parseInt($input.val());
        if (count > 1) { 
            $input.val(count - 1);
        }
    });

    const video = document.getElementById('servicesVideo');
    const $playIconOverlay = $('#servicesPlayIcon');
    const $iconElement = $playIconOverlay.find('i'); 

    if (video && $playIconOverlay.length && $iconElement.length) {
        
        const toggleVideoState = () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        };
        
        $('.video-container').on('click', toggleVideoState); 

        video.addEventListener('play', () => {
            $playIconOverlay.fadeOut(300);
            $iconElement.removeClass('fa-play').addClass('fa-pause');
        });

        video.addEventListener('pause', () => {
            $iconElement.removeClass('fa-pause').addClass('fa-play');
            $playIconOverlay.fadeIn(300);
        });

        if (video.paused) {
            $iconElement.removeClass('fa-pause').addClass('fa-play');
            $playIconOverlay.show();
        } else {
            $iconElement.removeClass('fa-play').addClass('fa-pause');
            $playIconOverlay.hide();
        }
    }
});