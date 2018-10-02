/*
	Alpha by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $banner = $('#banner');

    // Breakpoints.
    breakpoints({
        wide: ('1281px', '1680px'),
        normal: ('981px', '1280px'),
        narrow: ('737px', '980px'),
        narrower: ('737px', '840px'),
        mobile: ('481px', '736px'),
        mobilep: (null, '480px')
    });

    // Play initial animations on page load.
    $window.on('load', function () {
        window.setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Dropdowns.
    $('#nav > ul').dropotron({
        alignment: 'right'
    });

    // NavPanel.

    // Button.
    $(
        '<div id="navButton">' +
        '<a href="#navPanel" class="toggle"></a>' +
        '</div>'
    )
        .appendTo($body);

    // Panel.
    $(
        '<div id="navPanel">' +
        '<nav>' +
        $('#nav').navList() +
        '</nav>' +
        '</div>'
    )
        .appendTo($body)
        .panel({
            delay: 500,
            hideOnClick: true,
            hideOnSwipe: true,
            resetScroll: true,
            resetForms: true,
            side: 'left',
            target: $body,
            visibleClass: 'navPanel-visible'
        });

    // Header.
    if (!browser.mobile
        && $header.hasClass('alt')
        && $banner.length > 0) {

        $window.on('load', function () {

            $banner.scrollex({
                bottom: $header.outerHeight(),
                terminate: function () {
                    $header.removeClass('alt');
                },
                enter: function () {
                    $header.addClass('alt reveal');
                },
                leave: function () {
                    $header.removeClass('alt');
                }
            });

        });

    }

    $("#anmeldung").on("submit", function (event) {
        event.preventDefault(); // prevent reload

        var formData = new FormData(this);
        formData.append('service_id', 'SERVICE_ID');
        formData.append('template_id', 'TEMPLATE_ID');
        formData.append('user_id', 'USER_ID');

        $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
            type: 'POST',
            data: formData,
            contentType: false, // auto-detection
            processData: false // no need to parse formData to string
        }).done(function () {
            $("#anmeldung").hide();
            $("#anmeldung-intro").hide();
            $("#anmeldungsuccess").show();
        }).fail(function (error) {
            alert('Oops... ' + JSON.stringify(error));
        });
    });

    // Smooth scrolling
    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                         var $target = $(target);
                        $target.focus();
                    });
                }
            }
        });

})(jQuery);