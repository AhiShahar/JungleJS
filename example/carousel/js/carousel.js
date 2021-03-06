var activeIndex = 0,
    limit = 0,
    disabled = false,
    $stage = void 0,
    $controls = void 0,
    canvas = false;

var appendControls = function () {
    for (var i = 0; i < limit; i++) {
        $('.controls').append('<a href="#" data-index="' + i + '"></a>');
    }
    var height = $('.controls').children().last().outerHeight();

    $('.controls').css('height', 30 + limit * height);
    $controls = $('.controls').children();
    $controls.eq(activeIndex).addClass('active');
};

var setIndexes = function () {
    $('.spinner').children().each(function (i, el) {
        $(el).attr('data-index', i);
        limit++;
    });
};

var duplicateSpinner = function () {
    var $el = $('.spinner').parent();
    var html = $('.spinner').parent().html();
    $el.append(html);
    $('.spinner').last().addClass('turn-right');
    $('.turn-right').removeClass('turn-left');
};

var prepareDom = function () {
    setIndexes();
    duplicateSpinner();
    appendControls();
};

var spin = function () {
    var inc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    if (disabled) return;
    if (!inc) return;
    activeIndex += inc;
    disabled = true;

    if (activeIndex >= limit) {
        activeIndex = 0;
    }

    if (activeIndex < 0) {
        activeIndex = limit - 1;
    }

    var $activeEls = $('.front-side.js-active');
    var $nextEls = $('.front-side[data-index=' + activeIndex + ']');
    $nextEls.addClass('js-next');

    if (inc > 0) {
        $stage.addClass('js-spin-top');
    } else {
        $stage.addClass('js-spin-bottom');
    }

    $controls.removeClass('active');
    $controls.eq(activeIndex).addClass('active');

    window.setTimeout(function () {
        spinCallback(inc);
    }, 1500, inc);
};

var spinCallback = function (inc) {
    $('.js-active').removeClass('js-active');
    $('.js-next').removeClass('js-next').addClass('js-active');
    $stage.addClass('js-transitions-disabled').removeClass('js-spin-top').removeClass('js-spin-bottom');

    $('.js-active').each(function (i, el) {
        var $el = $(el);
        $el.prependTo($el.parent());
    });
    window.setTimeout(function () {
        $stage.removeClass('js-transitions-disabled');
        disabled = false;
    }, 100);
};

var attachListeners = function () {

    document.onkeyup = function (e) {
        switch (e.keyCode) {
            case 38:
                spin(-1);
                break;
            case 40:
                spin(1);
                break;
        }
    };

    $controls.on('click', function (e) {
        e.preventDefault();
        if (disabled) return;
        var $el = $(e.target);
        var toIndex = parseInt($el.attr('data-index'), 10);
        spin(toIndex - activeIndex);
    });
};

var assignEls = function () {
    $stage = $('.static-display');
};

var init = function () {
    assignEls();
    prepareDom();
    attachListeners();
};


randomHex = function() {
  const result = [];
  for (var i = 0; i < 6; i++) {
    result.push(Math.floor(Math.random() * 16).toString(16));
  }
  return "#" + result.join("");
};

function createCarousel(){
    var newCarousel = $('<div class="controls"></div><div class="static-display"><div class="spinner spinner--left"></div></div>');
    $('.carousel').append(newCarousel);
}

$(document).ready(function () {

    createCarousel();

    var paragraphs = $(".static-context");
    var images = $(".static-image");
    console.log(paragraphs);
    for (var i = 0 ; i < paragraphs.length ; i++ ) {

        var newContext = paragraphs[i].innerHTML || "";
        var newImage = images[i].src;

        var staticCarousel = paragraphs[i].parentNode;
        staticCarousel.removeChild(paragraphs[i]);

        var staticImage = images[i].parentNode;
        staticImage.removeChild(images[i]);

        var newPane = $('<div class="front-side" data-bg="#'+(1+i)+''+(1+i)+''+(0+i)+''+(0+i)+''+(5+i)+''+(5+i)+'"><div class="content"><div class="static-left-window pane' + i + '"></div><div class="static-right-window"><div class="static-main">' + newContext + '</div></div></div></div>');
        $(".spinner").append(newPane);
        if ( i === 0 ) {
            $(".front-side").addClass("js-active");
        }

        var hexCode = randomHex();
        $('.content .static-left-window').last().css({"background": hexCode, "background-size": "contain", "background-image": 'url(' + newImage + ')', "background-repeat": "no-repeat", "background-position": "center"});
        // $('.content .static-left-window').last().css("background-size", "contain");
        // $('.content .static-left-window').last().css("background-image", 'url(' + newImage + ')');
        $('.content .static-right-window').last().css("background", hexCode);
    }
    init();
});
