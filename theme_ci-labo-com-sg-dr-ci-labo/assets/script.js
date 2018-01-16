/**
 * Plugin to handle all the dynamic features of a product
 */

(function ($) {

  'use strict';

  var pluginName = 'product',
    namespace = 'plugin_' + pluginName;

  /**
   * The Plugin constructor
   * @constructor
   * @param {HTMLElement} element The element that will be monitored
   * @param {object} options The plugin options
   */
  function Plugin(element, options) {
    this.element = $(element);
    this.enableHistoryState = options['enableHistoryState'];
    this.hasColorSwatch = options['hasColorSwatch'];
    this.product = options['product'];
    this.selectedVariantId = options['selectedVariantId'];
    this.ajaxAddToCart = options['ajaxAddToCart'];

    this._init();
  }

  /**
   * Init the plugin
   */
  Plugin.prototype._init = function() {
    // Add a listener when clicking the add to cart button
    if (this.ajaxAddToCart) {
      this.element.find('[data-action="add-to-cart"]').on('click', $.proxy(this.addToCart, this));
      this.element.find('[data-action="close-form-status"]').on('click', function(e) {
        $(e.currentTarget).closest('.quick-shop').bPopup().close();
        $(e.currentTarget).closest('.product__form-status').slideUp();
        e.preventDefault();
      });
    }

    // Init the option selectors
    if (this.product['variants'].length > 1) {
      var optionSelectors = new Shopify.OptionSelectors('product-select-' + this.product['id'], {
        product: this.product,
        onVariantSelected: $.proxy(this.onVariantSelected, this),
        enableHistoryState: this.enableHistoryState
      });

      optionSelectors.selectVariant(this.selectedVariantId);

      var productForm = this.element.find('.product__form');

      // If there is only one option, Shopify OptionSelector does not add the label, so we do it
      if (this.product['options'].length === 1) {
        productForm.find('#product-select-' + this.product['id'] + '-option-0').before(
          '<label for="product-select-' + this.product['id'] + '-option-0">' + this.product['options'][0] + '</label>'
        );
      }

      // We add our own classes for easier styling
      var selectorWrappers = productForm.find('.selector-wrapper'),
        selectorLabels = selectorWrappers.find('label'),
        selectorSelects = selectorWrappers.find('select');

      selectorWrappers.addClass('form__control');
      selectorLabels.addClass('form__label');

      selectorSelects.wrap('<div class="form__select"></div>')
        .before('<svg class="icon icon-arrow-bottom"><use xlink:href="#icon-arrow-bottom"></use></svg>');
    } else {
      this.onVariantSelected(this.product['variants'][0]);
    }

    // Let's integrate with color swatch
    if (this.hasColorSwatch) {
      this.element.find('.swatch__item').on('click', function () {
        var optionIndex = $(this).closest('.swatch').attr('data-option-index'),
          optionValue = $(this).find(':radio').val();

        $(this).siblings().removeClass('swatch__item--active').end().addClass('swatch__item--active');

        $(this).closest('.product__form').find('.single-option-selector')
          .eq(optionIndex).val(optionValue).trigger('change');
      });
    }

    // Finally, the size chart link
    var sizeChart = $('.product__size-chart');

    if (sizeChart.length > 0) {
      var sizeChartModal = $('.size-chart-modal');

      $('label[for="product-select-' + sizeChart.attr('data-product') + '-option-' + sizeChart.attr('data-option-index') + '"]')
        .append(sizeChart);

      sizeChart.on('click', function() {
        sizeChartModal.bPopup({
          positionStyle: 'fixed',
          closeClass: 'modal__close',
          opacity: 0.5,
          transition: 'slideDown',
          transitionClose: 'slideDown'
        });
      });
    }
  };

  /**
   * Called when the variant changes
   */
  Plugin.prototype.onVariantSelected = function(variant) {
    var productMeta = this.element.find('.product__meta'),
      productPrices = productMeta.find('.product__prices'),
      addToCartButton = this.element.find('.product__add-to-cart');

    // For the various meta, as they depend on the variant status, we always remove them to start with
    productMeta.find('.product__price, .product__sale-percent, .label:not(.label--custom)').remove();

    if (variant) {
      if (!variant['available']) {
        addToCartButton.removeClass('button--primary').addClass('button--secondary').attr('disabled', 'disabled').text(window.languages.soldOutLabel);
      } else {
        addToCartButton.removeClass('button--secondary').addClass('button--primary').removeAttr('disabled').text(window.languages.addToCartLabel);

        // Otherwise, the product could be on sale
        if (variant['compare_at_price'] > variant['price']) {
          productPrices.append('<span class="product__price product__price--old" data-money-convertible>' + Shopify.formatMoney(variant['compare_at_price'], window.shop['moneyFormat']) + '</span>');
          productPrices.append('<span class="product__price product__price--new" data-money-convertible>' + Shopify.formatMoney(variant['price'], window.shop['moneyFormat']) + '</span>');
          productPrices.append('<span class="product__sale-percent">-' + Math.round(((variant['compare_at_price'] - variant['price']) * 100 / variant['compare_at_price'])) + '%</span>');
        } else {
          productPrices.append('<span class="product__price" data-money-convertible>' + Shopify.formatMoney(variant['price'], window.shop['moneyFormat']) + '</span>');
        }
      }

      this.element.find('.product__inventory-count').text(variant['inventory_quantity']);

      // Let's update the swatch
      if (this.hasColorSwatch) {
        for (var i = 0, length = variant.options.length; i < length; i++) {
          var valueToCheck = variant.options[i];

          var radioButton = this.element.find('.swatch[data-option-index="' + i + '"] :radio').filter(function () {
            return $(this).val() === valueToCheck;
          });

          if (radioButton.size()) {
            radioButton.attr('checked', 'checked').closest('.swatch__item').addClass('swatch__item--active').siblings().removeClass('swatch__item--active');
          }
        }
      }
    } else {
      // Variant simply do not exist, so we update the add to cart button
      addToCartButton.removeClass('button--primary').addClass('button--secondary').attr('disabled', 'disabled').text(window.languages.unavailableLabel);
      this.element.find('.product__inventory-count').text(0);
    }

    
      Currency.convertAll(window.shop['shopCurrency'], $('.currency-selector__select').val());
    

    // We trigger an event so that other code can bind their own logic
    $(document).trigger('variant_changed', variant);
  };

  /**
   * Called when the product is added to the cart
   */
  Plugin.prototype.addToCart = function() {
    var productStatus = this.element.find('.product__form-status'),
      addToCartButton = this.element.find('.product__add-to-cart');

    addToCartButton.text(window.languages.addingToCartLabel).attr('disabled', 'disabled');

    $.ajax({
      method: 'POST',
      url: '/cart/add.js',
      data: this.element.find('.product__form').serialize(),
      dataType: 'json',
      success: function() {
        productStatus.find('.product__form-message').removeClass('product__form-message--error').addClass('product__form-message--success').text(window.languages.productAddedStatus);
      },
      error: function(data) {
        productStatus.find('.product__form-message').addClass('product__form-message--error').removeClass('product__form-message--success').text(data.responseJSON['description']);
      },
      complete: function() {
        addToCartButton.text(window.languages.addToCartLabel).removeAttr('disabled');
        productStatus.slideDown();

        // Finally, we do another call to get the latest status of the cart
        $.ajax({
          url: '/cart.js',
          dataType: 'json'
        }).always(function(cart) {
          $(document).trigger('cart.updated', cart);
        });
      }
    });

    return false;
  };

  $.fn[pluginName] = function(options) {
    var method = false,
      methodArgs = arguments;

    if (typeof options == 'string') {
      method = options;
    }

    return this.each(function() {
      var plugin = $.data(this, namespace);

      if (!plugin && !method) {
        $.data(this, namespace, new Plugin(this, options));
      } else if (method) {
        callMethod(plugin, method, Array.prototype.slice.call(methodArgs, 1));
      }
    });
  };
}(jQuery));

var router = new RouterRouter();

router.route('account/addresses', function() {
  /**
   * -------------------------
   * MODALS
   * -------------------------
   */

  $('[data-action="open-new-address-modal"]').on('click', function(e) {
    $('.addresses__new').bPopup({
      positionStyle: 'fixed',
      closeClass: 'addresses__close',
      transition: 'slideDown',
      transitionClose: 'slideUp'
    });

    e.preventDefault();
  });

  $('[data-action="open-edit-address-modal"]').on('click', function(e) {
    $('.addresses__edit[data-address="' + $(this).attr('data-address') + '"]').bPopup({
      positionStyle: 'fixed',
      closeClass: 'addresses__close',
      transition: 'slideDown',
      transitionClose: 'slideUp'
    });

    e.preventDefault();
  });
});
router.route('*all', function() {
  var pageOverlay=  $('.page__overlay');

  /**
   * -------------------------
   * CART COUNT
   * -------------------------
   */

  var cartItemCount = $('.cart-item-count');

  $(document).on('cart.updated', function(event, data) {
    cartItemCount.text(data['item_count']);
  });

  /**
   * -------------------------
   * MOBILE NAV
   * -------------------------
   */

  $('.header__mobile-icon').on('click', function(event) {
    var element = $(this);

    // If no content to display, we want the user to be redirected to the page
    if (element.attr('data-has-menu') === 'false') {
      return;
    }

    var tab = element.closest('.header__mobile-tab');

    // We close the other tab (if any open) and add the class to itself
    tab.siblings().removeClass('header__mobile-tab--open').find('.header__mobile-content').slideUp(0);

    tab.toggleClass('header__mobile-tab--open');
    tab.find('.header__mobile-content').slideToggle(150);

    if (tab.hasClass('header__mobile-tab--open')) {
      pageOverlay.addClass('page__overlay--open');
      tab.find('.mobile-search__input').focus();
    } else {
      pageOverlay.removeClass('page__overlay--open');
      tab.find('.mobile-search__input').blur();
    }

    event.preventDefault();
  });

  $('.menu__icon-container').on('click', function(event) {
    var menu = $(this).closest('.menu__item');

    menu.toggleClass('menu__item--open');

    if (menu.hasClass('menu__item--open')) {
      menu.children('.menu__links').slideDown();
    } else {
      menu.find('.menu__links').slideUp();
      menu.find('.menu__item--open').removeClass('menu__item--open');
    }

    event.preventDefault();
  });

  bouncefix.add('header__mobile-content');

  /**
   * -------------------------
   * MEGA NAV
   * -------------------------
   */

  var megaNavDropdownImageContainer = $('.mega-nav__image');

  $('.dropdown-column__list-link[data-image]').on('mouseenter', function() {
    megaNavDropdownImageContainer.attr('src', $(this).attr('data-image'));
  });

  /**
   * -------------------------
   * QUICK SHOP
   * -------------------------
   */

  $('body').on('click', '[data-action="open-quick-shop"]', function() {
    // We get the ID of the product
    var productId = $(this).attr('data-product-id');

    // We get the corresponding quick shop. Because multiple may exist in the page, we only display the first one
    $('.quick-shop[data-product-id="' + productId + '"]').first().bPopup({
      positionStyle: 'fixed',
      closeClass: 'quick-shop__close-button',
      onOpen: function() {
        var quickShop = $(this),
            isInitialized = quickShop.attr('data-initialized');

        // First, let's initialize the various resources (images, and slideshow)
        if (isInitialized === 'false') {
          var slider = quickShop.find('.quick-shop__slideshow').slick({
            fade: true,
            adaptiveHeight: true,
            lazyLoad: 'progressive',
            arrows: false,
            dots: false
          }).slick('getSlick');

          // Finally, let's initialize the product selectors
          window['initializeQuickShop' + productId]();

          $(document).on('variant_changed.quick_shop', function(event, variant) {
            if (variant['featured_image']) {
              var position = quickShop.find('.quick-shop__slideshow-slide[data-image-id="' + variant['featured_image']['id'] + '"]').index();
              slider.goTo(position);
            }
          });

          quickShop.attr('data-initialized', 'true');
        }
      }
    });

    return false;
  });

  /**
   * -------------------------
   * AUTOMATIC CURRENCY CONVERSION
   * -------------------------
   */

  
    var shopCurrency = window.shop.shopCurrency,
      currencySelector = $('.currency-selector__select');

    // Sometimes merchants change their shop currency, let's tell our JavaScript file
    Currency.moneyFormats[shopCurrency].money_with_currency_format = window.shop.moneyWithCurrencyFormat;
    Currency.moneyFormats[shopCurrency].money_format = window.shop.moneyFormat;

    // Default currency
    var defaultCurrency = "SGD" || shopCurrency;

    // Cookie currency
    var cookieCurrency = Currency.cookie.read();

    // If there's no cookie.
    if (cookieCurrency == null || cookieCurrency === 'undefined') {
      if (shopCurrency !== defaultCurrency) {
        Currency.convertAll(shopCurrency, defaultCurrency);
      } else {
        Currency.currentCurrency = defaultCurrency;
      }
      Currency.cookie.write(shopCurrency);
    } else if (currencySelector.size() && currencySelector.find('option[value=' + cookieCurrency + ']').size() === 0) {
      // If the cookie value does not correspond to any value in the currency dropdown.
      Currency.currentCurrency = shopCurrency;
      Currency.cookie.write(shopCurrency);
    } else if (cookieCurrency === shopCurrency) {
      Currency.currentCurrency = shopCurrency;
    } else {
      Currency.convertAll(shopCurrency, cookieCurrency);
    }

    currencySelector.val(Currency.currentCurrency).change(function() {
      var newCurrency = $(this).val();
      Currency.convertAll(Currency.currentCurrency, newCurrency);

      $('.selected-currency').text(Currency.currentCurrency);
    });
  

  /**
   * -------------------------
   * MARKETING POPUP
   * -------------------------
   */

  

  /**
   * -------------------------
   * SEARCH
   * -------------------------
   */

  $('body').on('click', '[data-action="open-mega-search"]', function() {
    $('.mega-search').bPopup({
      positionStyle: 'fixed',
      closeClass: 'icon-cross',
      opacity: 0.8,
      position: ['auto', 200],
      onOpen: function() {
        setTimeout(function() {$('.mega-search__input').focus()}, 0);
      }
    });

    return false;
  });

  // Let's trigger the auto-complete
  var autocompleteXhr,
    megaSearchSuggestions = $('.mega-search__suggestions'),
    megaSearchSpinner = $('.mega-search__spinner');

  $('.mega-search__input').autoComplete({
    minChars: 1,
    delay: 50,

    // Function that is called to get suggestions from Shopify
    source: function(term, done) {
      try {
        autocompleteXhr.abort();
      } catch(e) {}

      megaSearchSpinner.show();

      var searchData = {
        q: term + '*', // We automatically add wildcard for partial matching
        view: 'json',
        type: "product"
      };

      autocompleteXhr = $.ajax({
        url: '/search',
        dataType: 'json',
        data: searchData
      }).then(function(data) {
        megaSearchSpinner.hide();
        done(data);

        
          Currency.convertAll(window.shop['shopCurrency'], $('.currency-selector__select').val(), megaSearchSuggestions.find('[data-money-convertible]'));
        
      });
    },

    renderItem: function(data, search) {
      var objectType = data['object_type'],
        node = null;

      switch (objectType) {
        case 'product':
          node = ''
            + '<div>'
            +   '<img class="mega-search__image" src="' + data['image'] + '">'
            +   '<div class="mega-search__info">'
            +       '<span class="mega-search__item-title">' + data['title'] + '</span>'
            +       '<span class="mega-search__item-subtitle">' + window.languages.autocompleteStartingAt + ' <span data-money-convertible>' + Shopify.formatMoney(data['price_min'], window.shop.moneyFormat) + '</span></span>'
            +   '</div>'
            + '</div>';

          break;

        case 'article':
          node = ''
            + '<div>'
            +   '<img class="mega-search__image" src="' + data['image'] + '">'
            +   '<div class="mega-search__info">'
            +       '<span class="mega-search__item-title">' + data['title'] + '</span>'
            +       '<span class="mega-search__item-subtitle">' + data['blog'] + '</span>'
            +   '</div>'
            + '</div>';

          break;

        case 'page':
          node = ''
            + '<div>'
            +   '<img class="mega-search__image" src="' + data['image'] + '">'
            +   '<div class="mega-search__info">'
            +       '<span class="mega-search__item-title">' + data['title'] + '</span>'
            +       '<span class="mega-search__item-subtitle">' + window.languages.autocompletePageType + '</span>'
            +   '</div>'
            + '</div>';
          break;

        case 'all_results':
          node = ''
            + '<div>'
              + '<span class="mega-search__all-results">' + window.languages.autocompleteSeeAll + ' (' + data['results_count'] + ')' + '</span>'
            + '</div>';

          break;
      }

      return '<li class="mega-search__suggestion autocomplete-suggestion" data-url="' + data['url'] + '">' + node + '</li>';
    },

    // Function called when an element is selected
    onSelect: function(e, term, item) {
      location.href = item.attr('data-url');
      e.preventDefault();
    }
  });

  /**
   * -------------------------
   * ALTERNATE IMAGES
   * -------------------------
   */

  // Focal offers a feature where people can hover a collection item and display an alternate image. This can happen
  // in various pages (home, collection, search, product...). The trick is that touch devices do not have hover, so
  // it's useless to load alternate images for those devices. Instead, we add alternate images tag for non-touch
  // devices, which will start loading the alternate images
  if (!Modernizr.touchevents || Modernizr.mq('(min-width: 1025px)')) {
    var loadAlternateProductImages = function() {
      $('.product-item:not(.related-products__item) .product-item__image[data-alternate-src]').each(function(index, item) {
        var image = $(item),
          alternateImage = new Image();

        alternateImage.src = image.attr('data-alternate-src');
        alternateImage.className = 'product-item__image product-item__image--alternate';

        alternateImage.onload = function() {
          image.after(alternateImage);
          image.closest('.product-item__figure').addClass('product-item__figure--alternate-image-loaded');
        };
      });
    };

    loadAlternateProductImages();

    $(document).on('shopify:section:load', function() {
      loadAlternateProductImages();
    });
  }

  /**
   * -------------------------
   * OTHER
   * -------------------------
   */

  $(document).on('shopify:section:load', function() {
    window.doPostSectionsInit();
  });
});
router.route('cart', function() {
  var cartTotal = $('.cart__total-amount');

  // Add the note using CartJS
  $('.cart__note').on('change', function() {
    $.post('/cart/update.js', {note: $(this).val()});
  });

  $('.cart-item__quantity').on('change', function() {
    // We add one because Shopify uses 1-index numbering
    var element = $(this),
      lineItem = element.closest('.cart-item'),
      lineIndex = parseInt(lineItem.attr('data-index'));

    $.ajax({
      type: 'POST',
      url: '/cart/change.js',
      dataType: 'json',
      data: {
        line: lineIndex,
        quantity: element.val()
      },
      success: function(data) {
        var lineItemLinePrice = data['items'][lineIndex - 1]['line_price'],
          moneyFormat = window.shop.moneyFormat;

        lineItem.find('.cart-item__line-price').html(Shopify.formatMoney(lineItemLinePrice, moneyFormat));
        cartTotal.html(Shopify.formatMoney(data['total_price'], moneyFormat));

        
          Currency.convertAll();
        

        // Trigger event so that other part of the code can update other code like the top cart
        $(document).trigger('cart.updated', data);
      }
    });
  });

  /**
   * -------------------------
   * TERMS AND CONDITIONS
   * -------------------------
   */

  $('body').on('click', 'input[name="checkout"]', function() {
    var termsCheckbox = $('#terms');

    if (termsCheckbox.length > 0 && !termsCheckbox.is(':checked')) {
      alert(window.languages.cartTerms);
      return false;
    }
  });

  /**
   * -------------------------
   * SHIPPING ESTIMATOR
   * -------------------------
   */

  (function() {
    var initShippingEstimator = function() {
      // new Shopify.CountryProvinceSelector('address_country', 'address_province', {hideElement: 'address_province_container'});

      var shippingEstimator = $('.shipping-estimator'),
        shippingEstimatorSubmit = shippingEstimator.find('.shipping-estimator__submit'),
        shippingEstimatorResults = shippingEstimator.find('.shipping-estimator__results'),
        shippingEstimatorList = shippingEstimatorResults.find('.alert__errors'),
        cartEstimatedShipping = $('.cart__taxes');

      $('.shipping-estimator__submit').on('click', function() {
        shippingEstimatorSubmit.text(window.languages.shippingEstimatorSubmitting);

        $.ajax({
          method: 'GET',
          url: '/cart/shipping_rates.json',
          data: {
            shipping_address: {
              country: shippingEstimator.find('#address_country').val(),
              province: shippingEstimator.find('#address_province').val(),
              zip: shippingEstimator.find('#address_zip').val()
            }
          },
          success: function(results) {
            shippingEstimatorList.empty();
            shippingEstimatorResults.find('.alert').removeClass('alert--error').addClass('alert--success');

            if (results['shipping_rates'].length === 0) {
              shippingEstimatorResults.find('.alert__title').text(window.languages.shippingEstimatorNoRates);
            } else {
              shippingEstimatorResults.find('.alert__title').text(window.languages.shippingEstimatorRates);
            }

            results['shipping_rates'].forEach(function(item) {
              var amount = Shopify.formatMoney(item['price'] * 100, window.shop.moneyFormat);
              shippingEstimatorList.append('<li>' + item['name'] + ': <span data-money-convertible>' + amount + '</span></li>');
            });

            if (results['shipping_rates'].length > 0) {
              var firstPrice = Shopify.formatMoney(results['shipping_rates'][0]['price'] * 100, window.shop.moneyFormat);
              cartEstimatedShipping.text(window.languages.cartEstimatedShipping + ' ' + firstPrice);
              cartEstimatedShipping.show();
            }
          },
          error: function(results) {
            shippingEstimatorList.empty();
            shippingEstimatorResults.find('.alert').removeClass('alert--success').addClass('alert--error');
            shippingEstimatorResults.find('.alert__title').text(window.languages.shippingEstimatorError);

            var response = results.responseJSON,
              errors = [];

            for (var key in response) {
              if (response.hasOwnProperty(key)) {
                errors.push({key: key, value: response[key][0]});
              }
            }

            errors.forEach(function(item) {
              shippingEstimatorList.append('<li>' + item['key'] + ': ' + item['value'] + '</li>');
            });
          },
          complete: function(results) {
            shippingEstimatorSubmit.text(window.languages.shippingEstimatorSubmit);
            shippingEstimatorResults.show();
          }
        });

        return false;
      });
    };

    initShippingEstimator();

    $(document).on('shopify:section:load', '#shopify-section-cart', function() {
      initShippingEstimator();
    });
  }());
});
router.route('collections/*type', function() {
  /**
   * -------------------------
   * SORT BY AND FILTERS
   * -------------------------
   */

  Shopify.queryParams = {};

  $('.header__push-filter--sort select').val(window.shop.collectionSortBy).on('change', function () {
    Shopify.queryParams.sort_by = $(this).val();
    location.search = $.param(Shopify.queryParams);
  });

  if (location.search.length) {
    for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
      aKeyValue = aCouples[i].split('=');

      if (aKeyValue.length > 1) {
        Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
      }
    }
  }

  $('.header__push-filter--tags select').on('change', function (event) {
    window.location.href = $(event.currentTarget).find(':selected').val();
  });

  /**
   * -------------------------
   * PAGINATION MODE
   * -------------------------
   */

  var initInfiniteScrollHelper = function(element) {
    element.infiniteScrollHelper({
      loadingClassTarget: '.collection__loader',
      loadingClass: 'collection__loader--loading',
      startingPageCount: window.shop.currentPage,
      hasMore: true,

      loadMore: function(page, done) {
        var loadingTarget = $(this.loadingClassTarget);

        if (!this.hasMore || loadingTarget.length == 0) {
          done();
          return;
        }

        var targetUrl = $.query.load(loadingTarget.attr('data-next-page'));

        // We need to modify the "page" attribute of the fetched URL
        targetUrl = targetUrl.set('page', page);

        $.ajax({
          url: location.protocol + '//' + location.host + location.pathname,
          data: targetUrl.toString().slice(1) // Allow to remove the initial "?" character
        }).then(function(content) {
          done();

          var productItems = $(content).children();

          // Check if there is still content to load
          if (productItems.length === 0) {
            $('.collection__list--infinite-scroll').infiniteScrollHelper('destroy');
            loadingTarget.remove();
          } else {
            if (!Modernizr.touchevents || Modernizr.mq('(min-width: 1025px)')) {
              productItems.find('.product-item__image[data-alternate-src]').each(function(index, item) {
                var image = $(item),
                  alternateImage = new Image();

                alternateImage.src = image.attr('data-alternate-src');
                alternateImage.className = 'product-item__image product-item__image--alternate';

                alternateImage.onload = function() {
                  image.after(alternateImage);
                  image.closest('.product-item__figure').addClass('product-item__figure--alternate-image-loaded');
                };
              });
            }

            // We can append the content to the .collection__list container
            $('.collection__list').append(productItems);
          }
        });
      }
    });
  };

  initInfiniteScrollHelper($('.collection__list--infinite-scroll'));

  $(document).on('shopify:section:unload', function(event) {
    $(event.target).find('.collection__list--infinite-scroll').infiniteScrollHelper('destroy');
  });

  $(document).on('shopify:section:load', function(event) {
    initInfiniteScrollHelper($(event.target).find('.collection__list--infinite-scroll'));
  });
});
router.route('account/register', function() {
  /**
   * -------------------------
   * TERMS AND CONDITIONS
   * -------------------------
   */
  $(document).on('submit', 'form#create_customer', function(event) {
    var termsCheckbox = $('#terms');
    var password = $('#customer__password').val();
    var errorMsg = $('#error-for-password');
    var decimal = /^(?=.*\d)(?=.*[A-Za-z]).{8,}$/;
	  if (!password.match(decimal)) {
	    event.preventDefault();
			errorMsg.show();
			document.documentElement.scrollTop = 0;
	    return false;
	  }

    if (termsCheckbox.length > 0 && !termsCheckbox.is(':checked')) {
      event.preventDefault();
      alert(window.languages.cartTerms);
      return false;
    }
  });
});
router.route('', function() {
  var isMobile = Modernizr.mq('(max-width: 48em)');
  /**
   * SLIDESHOW
   */

  var initSlideshow = function(slideshow) {
    slideshow.find('.slideshow__slides').slick({
      autoplay: (slideshow.attr('data-autoplay') === 'true'),
      autoplaySpeed: parseInt(slideshow.attr('data-cycle-speed')),
      adaptiveHeight: true,
      useTransform: true,
      dots: true,
      fade: (slideshow.attr('data-animation-type') === 'fade'),
      appendArrows: slideshow,
      appendDots: slideshow.find('.slideshow__pagination'),
      prevArrow: slideshow.find('.slideshow__prev'),
      nextArrow: slideshow.find('.slideshow__next'),
      zIndex: 1
    });

    slideshow.find('.slideshow__prev, .slideshow__next').on('click', function(e) {
      e.preventDefault();
    });
  };

  var slideshows = $('.slideshow');

  slideshows.each(function(idx, item) {
    initSlideshow($(item));
  });

  $(document).on('shopify:section:unload', '.shopify-section__slideshow', function(event) {
    $(event.target).find('.slideshow__slides').slick('unslick');
  });

  $(document).on('shopify:section:load', '.shopify-section__slideshow', function(event) {
    initSlideshow($(event.target).find('.slideshow'));
  });

  $(document).on('shopify:block:select', '.shopify-section__slideshow', function(event) {
    var currentSlide = $(event.target),
      slideshow = currentSlide.closest('.slideshow__slides');

    slideshow.slick('slickGoTo', currentSlide.attr('data-slide-index'));
    slideshow.slick('slickPause');
  });

  $(document).on('shopify:block:deselect', '.shopify-section__slideshow', function(event) {
    $(event.target).closest('.slideshow__slides').slick('slickPlay');
  });

  /**
   * INSTAGRAM
   */

  var formatInstagramDate = function(image) {
    var date = new Date(image.created_time * 1000),
      m = date.getMonth(),
      d = date.getDate(),
      y = date.getFullYear();

    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    image.created_time = monthNames[m] + ' ' + d + ', ' + y;

    return true;
  };

  var initInstagramWidget = function(instagramWidget) {
    var template = '<div class="grid__cell 1/2 1/3--handheld-and-up 1/' + instagramWidget.attr('data-images-per-row') + '--lap-and-up">' +
      '<div class="instagram__image-wrapper">' +
        '<a href="{{link}}" target="_blank">' +
          '<div class="instagram__overlay">' +
            '<p class="instagram__caption">{{caption}}</p>' +
            '<time class="instagram__date">{{model.created_time}}</time>' +
          '</div>' +
          '<img class="instagram__image" src="{{image}}"/>' +
        '</a>' +
      '</div>' +
    '</div>'; 

    var feed = new Instafeed({
      get: 'user',
      userId: 'self',
      accessToken: instagramWidget.attr('data-access-token'),
      sortBy: 'most-recent',
      limit: instagramWidget.attr('data-limit-images'),
      resolution: resolution,
      template: template,
      filter: $.proxy(formatInstagramDate)
    });

    feed.run();
  };

  var resolution = isMobile ? 'low_resolution' : 'standard_resolution',
    instagramWidget = $('.index-module__instagram[data-access-token]');

  instagramWidget.each(function(idx, item) {
    initInstagramWidget($(item));
  });

  $(document).on('shopify:section:load', '.shopify-section__instagram', function(event) {
    // Instagram
    var instagramWidget = $(event.target).find('.index-module__instagram[data-access-token]');

    if (instagramWidget.length > 0) {
      initInstagramWidget(instagramWidget);
    }
  });
});
/**
 * ----------------------------------------------------------------------------------------------------
 * LOGIN
 * ----------------------------------------------------------------------------------------------------
 */

router.route('account/login', function() {
  /**
   * -------------------------
   * SWITCH TO RECOVER FORM
   * -------------------------
   */

  var switchToRecoverForm = function() {
    $('.account__login, .account__recover').toggle();
    $('.header__push-title').text(window.languages.recoverPassword);
  };

  $('[data-action="display-recover-form"]').on('click', function() {
    switchToRecoverForm();
    return false;
  });

  // We also switch if we directly have the hash "recover"
  if (window.location.hash === '#recover' || window.recoverPassword === true) {
    switchToRecoverForm();
  }
});
/**
 * ----------------------------------------------------------------------------------------------------
 * PRODUCT ROUTE
 * ----------------------------------------------------------------------------------------------------
 */

var productRoute = function() {
  /**
   * -------------------------
   * SLIDESHOW SLIDER
   * -------------------------
   */

  // For performance reason, we only create the zoom when we reach the slide. Also, if on a small mobile,
  // we remove this feature because it's hard to use
  var initProductSlideshow = function(productSlideshow) {
    var productSlideshowImages = productSlideshow.find('.product__slideshow-slide'),
        isZoomEnabled = productSlideshow.attr('data-zoom-enabled'),
        zoomMagnification = productSlideshow.attr('data-zoom-magnification');

    productSlideshow.on('init afterChange', function(event, slick) {
      var currentSlide = $(slick.$slides[slick.currentSlide]);

      if (isZoomEnabled === 'true' && !currentSlide.attr('data-slide-initialized') && !Modernizr.touchevents) {
        currentSlide.zoom({
          url: currentSlide.attr('data-image-large-url'),
          touch: false,
          magnify: zoomMagnification,
          onZoomIn: function() {
            $(this).prev().addClass('product__slideshow-image--zoomed');
          },
          onZoomOut: function() {
            $(this).prev().removeClass('product__slideshow-image--zoomed');
          }
        });
      }
    });

    productSlideshow.slick({
      useTransform: true,
      adaptiveHeight: true,
      initialSlide: parseInt(productSlideshow.attr('data-initial-slide')),
      dots: true,
      appendArrows: $('.product__slideshow'),
      appendDots: $('.product__slideshow').find('.slideshow__pagination'),
      prevArrow: $('.product__slideshow').find('.slideshow__prev'),
      nextArrow: $('.product__slideshow').find('.slideshow__next'),
    });


    $('.product__slideshow-nav-image').on('click', function(e) {
      productSlideshow.slick('slickGoTo', parseInt($(this).attr('data-slide-index')));
      e.preventDefault();
    });

    // We attach an event whenever the variant changed so we have the opportunity to modify the featured image
    $(document).on('variant_changed.product_slideshow', function(event, variant) {
      if (variant && variant['featured_image']) {
        var itemToFind = productSlideshowImages.filter('[data-image-id="' + variant['featured_image']['id'] + '"]'),
          index = productSlideshowImages.index(itemToFind);

        productSlideshow.slick('slickGoTo', index);
      }
    });
  };

  initProductSlideshow($('.product__slideshow--main'));

  $(document).on('shopify:section:unload', function(event) {
    var target = $(event.target);

    target.find('.product__slideshow--main').slick('unslick');
    target.find('.product__slideshow-nav-image').off('click');
    $(document).off('.product_slideshow');
  });

  $(document).on('shopify:section:load', function(event) {
    initProductSlideshow($(event.target).find('.product__slideshow--main'));
  });

  /**
   * -------------------------
   * TABS
   * -------------------------
   */

  var initProductTabs = function() {
    $('.product__tab-title').on('click', function() {
      var element = $(this),
        tabsContent = element.closest('.product__tabs').find('.product__tabs-content .product__tab-content');

      // If it's already active, do nothing
      if (element.hasClass('product__tab-title--active')) {
        return;
      }

      element.siblings().removeClass('product__tab-title--active').end().addClass('product__tab-title--active');

      tabsContent.filter('.product__tab-content--active').fadeOut(125, function() {
        tabsContent.removeClass('product__tab-content--active').eq(element.attr('data-tab-index')).addClass('product__tab-content--active').fadeIn(125);
      });
    });

    $('.product__tab-selector select').on('change', function() {
      var element = $(this),
        tabsContent = element.closest('.product__tabs').find('.product__tabs-content .product__tab-content');

      tabsContent.filter('.product__tab-content--active').fadeOut(125, function() {
        tabsContent.removeClass('product__tab-content--active').eq(element.val()).addClass('product__tab-content--active').fadeIn(125);
      });
    });
  };

  initProductTabs();

  $(document).on('shopify:section:load', function(event) {
    initProductTabs();
  });

  /**
   * -------------------------
   * RELATED PRODUCTS
   * -------------------------
   */

  $('.related-products').find('.product-item__image[data-alternate-src]').each(function(index, item) {
    var image = $(item),
      alternateImage = new Image();

    alternateImage.src = image.attr('data-alternate-src');
    alternateImage.className = 'product-item__image product-item__image--alternate';

    alternateImage.onload = function() {
      image.after(alternateImage);
      image.closest('.product-item__figure').addClass('product-item__figure--alternate-image-loaded');
    };
  });
};

router.route('products/*type', productRoute);
router.route('collections/*collection/products/*type', productRoute);
router.route('search', function() {
  /**
   * -------------------------
   * PAGINATION MODE
   * -------------------------
   */

  
});