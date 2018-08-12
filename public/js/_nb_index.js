(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });


    // ### PARTICLES
    // init particle background
    // https://github.com/jnicol/particleground
    particleground(document.getElementById('particles'), {
        dotColor: '#ffffff',
        lineColor: '#eeeeee',
        density: 6000,
        proximity: 140,
        maxSpeedX: 0.002,
        maxSpeedY: 0.002,
        directionX: "right"
    });

    /// ### TYPED
    // https://github.com/mattboldt/typed.js/
    Typed.new("#typed", {
        stringsElement: document.getElementById('typed-strings'),
        typeSpeed: 50,
        backDelay: 1000,
        loop: true,
        contentType: 'html',
        loopCount: null
    });

    $("#header_description").show();

    console.log("W3 4R3 H1R1NG ;)");

})(jQuery); // End of use strict
