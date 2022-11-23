//AOS animation
jQuery(document).ready(function () {
    $('#loader').fadeOut("slow");

    jQuery("section").each(function () {
        jQuery(this).attr("data-aos", "fade-up");
    });

    AOS.init({
        duration: 1000,
        once: true,
    });
});

// Auto-generate carousel indicator html
var bootCarousel = $(".carousel");
bootCarousel.append("<ol class='carousel-indicators'></ol>");
var indicators = $(".carousel-indicators");
bootCarousel.find(".carousel-inner").children(".carousel-item").each(function (index) {
    (index === 0) ?
        indicators.append("<li data-target='#homeBannerCarousel' data-slide-to='" + index + "' class='active'></li>") :
        indicators.append("<li data-target='#homeBannerCarousel' data-slide-to='" + index + "'></li>");
});

//Slick slider
$(document).ready(function () {
    $('.testimonials-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
        nextArrow: '<div class="right"><i class="slider-icon"></i></div>',
        prevArrow: '<div class="left"><i class="slider-icon"></i></div>',
        dots: true,
        infinite: true,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 1
            }
        }]
    });
    AOS.refresh();
});

//back to top js
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('.back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});

//file uploader
$('#file-upload').change(function () {
    var filepath = this.value;
    var m = filepath.match(/([^\/\\]+)$/);
    var filename = m[1];
    $('#filename').html(filename);
});

//number counter
var counted = 0;
$(window).scroll(function () {

    var oTop = $('#counter-panel').offset().top - window.innerHeight;
    if (counted == 0 && $(window).scrollTop() > oTop) {
        $('.counter').each(function () {
            var $this = $(this),
                countTo = $this.attr('data-count');
            $({
                countNum: $this.text()
            }).animate({
                    countNum: countTo
                },
                {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum);
                    }
                });
        });
        counted = 1;
    }
});

// Multi Steps Form
$(document).ready(function () {
    var base_color = "#ebebeb";
    var active_color = "#cc0500";


    var child = 1;
    var length = $("fieldset").length - 1;
    $("#ms-prev").addClass("disabled");
    $("#ms-submit").addClass("disabled");

    $("fieldset").not("fieldset:nth-of-type(1)").hide();
    $("fieldset").not("fieldset:nth-of-type(1)").css('transform', 'translateX(100px)');

    var svgWidth = length * 200 + 24;
    $("#ms_steps_svg_wrap").html(
        '<svg version="1.1" id="svg_form_time" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ' +
        svgWidth +
        ' 24" xml:space="preserve"></svg>'
    );

    function makeSVG(tag, attrs) {
        var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
        for (var k in attrs) el.setAttribute(k, attrs[k]);
        return el;
    }

    for (i = 0; i < length; i++) {
        var positionX = 12 + i * 200;
        var rect = makeSVG("rect", {x: positionX, y: 9, width: 200, height: 6});
        document.getElementById("svg_form_time").appendChild(rect);
        // <g><rect x="12" y="9" width="200" height="6"></rect></g>'
        var circle = makeSVG("circle", {
            cx: positionX,
            cy: 12,
            r: 12,
            width: positionX,
            height: 6
        });
        document.getElementById("svg_form_time").appendChild(circle);
    }

    var circle = makeSVG("circle", {
        cx: positionX + 200,
        cy: 12,
        r: 12,
        width: positionX,
        height: 6
    });
    document.getElementById("svg_form_time").appendChild(circle);

    $('#svg_form_time rect').css('fill', base_color);
    $('#svg_form_time circle').css('fill', base_color);
    $("circle:nth-of-type(1)").css("fill", active_color);


    $(".ms-action-btn").click(function () {
        $("#svg_form_time rect").css("fill", active_color);
        $("#svg_form_time circle").css("fill", active_color);
        var id = $(this).attr("id");
        if (id == "ms-next") {
            $("#ms-prev").removeClass("disabled");
            if (child >= length) {
                $(this).addClass("disabled");
                $('#ms-submit').removeClass("disabled");
            }
            if (child <= length) {
                child++;
            }
        } else if (id == "ms-prev") {
            $("#ms-next").removeClass("disabled");
            $('#ms-submit').addClass("disabled");
            if (child <= 2) {
                $(this).addClass("disabled");
            }
            if (child > 1) {
                child--;
            }
        }
        var circle_child = child + 1;
        $("#svg_form_time rect:nth-of-type(n + " + child + ")").css(
            "fill",
            base_color
        );
        $("#svg_form_time circle:nth-of-type(n + " + circle_child + ")").css(
            "fill",
            base_color
        );
        var currentFieldset = $("fieldset:nth-of-type(" + child + ")");
        currentFieldset.fadeIn();
        currentFieldset.css('transform', 'translateX(0)');
        currentFieldset.prevAll('fieldset').css('transform', 'translateX(-100px)');
        currentFieldset.nextAll('fieldset').css('transform', 'translateX(100px)');
        $('fieldset').not(currentFieldset).hide();
    });

});


//slider arrow
$(document).ready(function ($) {
    var sucessSlickArrowWidth = ($(window).width() - $(".slick-slide").width()) / 2;
    $(".slick-arrow").width(sucessSlickArrowWidth);
});


jQuery('.close-popup-btn').click(function(){
    iframe_element = jQuery(this).next('iframe.iframe-popup');
    iframe_src = iframe_element.attr('src');
    iframe_element.attr('src','');
    iframe_element.attr('src',iframe_src);
});