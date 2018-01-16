/* globals $, Swiper */

// IE fix
if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

(function(window, $) {
  'use strict';
  if(typeof $.cookie('detected-IE') === 'undefined') {
    // detect IE8 and above
    if (document.documentMode) {
        alert('Internet Explorer browser is not supported, please use Google Chrome, Microsoft Edge or Safari for optimum experience!');
    }
    $.cookie('detected-IE', true, {expires: 365, path: '/' });
  }

})(window, $);

(function(window, $) {
  'use strict';

	$(document).on('submit', '[data-check-password]', function(event) {
    var password = $('#customer__password').val();
	  var confirmPassword = $('#customer__password-confirmation').val();
	  var errorMsg = $('#error-for-password');
	  var errorConfirmMsg = $('#error-for-confirm-password');
	  var decimal = /^(?=.*\d)(?=.*[A-Za-z]).{8,}$/;
	  if (!password.match(decimal)) {
	    event.preventDefault();
			errorMsg.show();
	    return false;
	  }
	  if (password !== confirmPassword) {
	    event.preventDefault();
	    errorConfirmMsg.show();
	    return false;
	  }
	});
})(window, $);

/**
 * Chosen
 * enhance <select /> elements
 */
(function(window, $) {
  'use strict';

  // Initialize chosen
  $('select').chosen({
    disable_search_threshold: 10,
    width: '100%'
  });

  $(document).on('click', '[data-action="open-quick-shop"]', function() {
    $('select').chosen({
      disable_search_threshold: 10,
      width: '100%'
    });
  });

  $('.product__option-selector').on('change', function() {
    var price = $(this).find('option:selected').attr('data-price');
    var compare_at_price = $(this).find('option:selected').attr('data-compare-at-price');
    if (compare_at_price) {
		$('.product__slideshow .product__price.product__price--old').text(compare_at_price);
		$('.product__slideshow .product__price.product__price--new').text(price);
		$(this).parents('.quick-shop').find('.product-item__price--old').text(compare_at_price);
		$(this).parents('.quick-shop').find('.product-item__price--new').text(price);
	}
	else {
		$('.product__slideshow .product__price').text(price);
		$(this).parents('.quick-shop').find('.product-item__price').text(price);
	}
  });

  // product detail page  recommended should be square
  if($(window).width() > 800 && $('.product-prescribe__swiper').length > 0){
    $('.recommended-block').height($('.recommended-block').width());
  }

  // Add event listeners
  $(document)
    .on('mouseover.dropdown', '.dropdown', function() {
      $(this).addClass('hover');
    })
    .on('mouseout.dropdown', '.dropdown', function() {
      $(this).removeClass('hover');
    })
    .on('click.dropdown', '.dropdown .dropdown__option', function() {
      $(this).parents('.dropdown').removeClass('hover');
    })
    .on('click.toggle', '[data-toggle]', function(event) {
      var $target = $(event.target);
      var target = $target.attr('data-toggle');
      var group = $target.attr('data-toggle__group');

      if (group) {
        var $group = $('[data-toggle][data-toggle__group="' + group + '"]');
        $group.toggleClass('is-active');
        $group.each(function() {
          $('[data-toggle__target="' + $(this).attr('data-toggle') + '"]').toggleClass('is-active');
        });
      } else {
        $target.toggleClass('is-active');
        $('[data-toggle__target="' + target + '"]').toggleClass('is-active');
      }
    });
})(window, $);

/**
 * Swiper
 */
(function(window, $, Swiper) {
  'use strict';

  // Fire up all swipers
  var swipers = [];
  $('[data-swiper]').each(function() {
    var $scope = $(this);
    var swiper = new Swiper($scope, {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 0,
      pagination: {
        el: $('[data-swiper__pagination]', $scope),
        clickable :true,
      },
      navigation: {
        nextEl: $('[data-swiper__next]', $scope),
        prevEl: $('[data-swiper__prev]', $scope)
      },
    });

    swipers.push(swiper);
  });
})(window, $, Swiper);


/**
 * Pre-registration
 *
 * Invite first-time user to (pre-) register
 * Depends on jQuery.cookie.js
 */
(function(window, $) {
  'use strict';

  // Note: we only want the pre-registration model popup if the user does not access the activate page
  var enabled = window.location.href.indexOf('/account/activate') == -1;
  var name = 'preRegistrationModal';
  var ns = 'pre-registration-modal';
  var cookieShown = 'pre-registration-modal--shown';
  var cookieData = 'pre-registration-modal--data';
  var expires = 365;

  if (enabled) {
    var module = (function() {
      function fnShowModal() {
        $('[data-pre-registration__modal]').bPopup({
          positionStyle: 'fixed',
          closeClass: 'modal__close-button',
          transition: 'slideDown',
          transitionClose: 'slideUp'
        });
      }

      function fnPrefill() {
        var data = JSON.parse($.cookie(cookieData));
        for (var p in data) {
          if (data.hasOwnProperty(p)) {
            var $input = $(':input[name="' + p + '"]');
            $input.val(data[p]);
          }
        }
      }

      function fnSubmitFormHandler(event) {
        event.preventDefault();

        var $form = $(event.currentTarget);
        $.cookie(cookieData, JSON.stringify($form.serializeObject()), {path: '/' });

        window.location.href = $form.attr('action');
      }

      function fnAddEventListeners() {
        $(document)
          .off('submit.' + ns, '[data-pre-registration__form]')
          .on('submit.' + ns, '[data-pre-registration__form]', fnSubmitFormHandler);
      }

      function fnInitialize() {
        fnAddEventListeners();

        if (typeof $.cookie(cookieShown) === 'undefined') {
          fnShowModal();
          $.cookie(cookieShown, true, {expires: expires, path: '/' });
        }

        if (window.location.pathname === '/account/register') {
          fnPrefill();
        }
      }

      return {
        initialize: fnInitialize
      };
    })();

    if (typeof window[name] !== 'undefined') {
      throw 'Module ' + name + ' could not (safely) be created';
    }

    window[name] = module;

    // On document ready, fire up
    $(function() {
      window[name].initialize();
    });
  }
})(window, $);

$.fn.serializeObject = function() {
  'use strict';

  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};
