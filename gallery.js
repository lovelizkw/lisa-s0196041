$(document).ready(function() {
    const images = [
        'image1.jpg',
        'image2.jpg', 
        'image3.jpg',
        'image4.jpg',
        'image5.jpg',
        'image6.jpg',
        'image7.jpg',
        'image8.jpg',
        'image9.jpg'
    ];

    const config = {
        imagesPerView: 3, 
        mobileBreakpoint: 768, 
        currentPosition: 0 
    };

    function initializeGallery() {
        createSlides();
        updateGalleryForScreenSize();
        updateInterface();
    }

    function createSlides() {
        const track = $('.gallery-track');
        track.empty(); 

        images.forEach(function(imageName, index) {
            const slide = $('<div>').addClass('gallery-slide');
            
            const image = $('<img>').attr({
                'src': imageName,
                'alt': 'Изображение ' + (index + 1),
                'loading': 'lazy'
            });

            slide.append(image);
            track.append(slide);
        });
    }

    function updateGalleryForScreenSize() {
        if ($(window).width() <= config.mobileBreakpoint) {
            config.imagesPerView = 1; 
        } else {
            config.imagesPerView = 3; 
        }
    }

    function updateSliderPosition() {
        const track = $('.gallery-track');
        const slideWidth = 100 / config.imagesPerView;
        const moveDistance = -config.currentPosition * slideWidth;
        track.css('transform', 'translateX(' + moveDistance + '%)');
    }

    function updatePageCounter() {
        const currentPage = $('.pager-current');
        const totalPages = $('.pager-total');
        
        const total = Math.ceil(images.length / config.imagesPerView);
        const current = Math.floor(config.currentPosition / config.imagesPerView) + 1;
        
        currentPage.text(current);
        totalPages.text(total);
    }

    function updateArrowButtons() {
        const prevButton = $('.arrow-prev');
        const nextButton = $('.arrow-next');
        
        const maxPosition = images.length - config.imagesPerView;
        
        prevButton.prop('disabled', config.currentPosition === 0);
        nextButton.prop('disabled', config.currentPosition >= maxPosition);
    }

    function moveToNextSlide() {
        const maxPosition = images.length - config.imagesPerView;
        
        if (config.currentPosition < maxPosition) {
            config.currentPosition++; 
            updateSliderPosition(); 
            updatePageCounter(); 
            updateArrowButtons(); 
        }
    }

    function moveToPrevSlide() {
        if (config.currentPosition > 0) {
            config.currentPosition--; 
            updateSliderPosition(); 
            updatePageCounter(); 
            updateArrowButtons(); 
        }
    }

    function updateInterface() {
        updateSliderPosition();
        updatePageCounter();
        updateArrowButtons();
    }

    function handleWindowResize() {
        const oldViewCount = config.imagesPerView;
        
        updateGalleryForScreenSize();
        
        if (oldViewCount !== config.imagesPerView) {
            config.currentPosition = Math.min(
                config.currentPosition,
                images.length - config.imagesPerView
            );
            updateInterface();
        }
    }

    function handleKeyboardPress(event) {
        if (event.key === 'ArrowLeft') {
            moveToPrevSlide();
        }
        else if (event.key === 'ArrowRight') {
            moveToNextSlide();
        }
    }

    $('.arrow-next').on('click', moveToNextSlide);

    $('.arrow-prev').on('click', moveToPrevSlide);

    $(window).on('resize', handleWindowResize);

    $(document).on('keydown', handleKeyboardPress);

    initializeGallery();

    console.log('Галерея запущена! Количество изображений: ' + images.length);
});