var swiper = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 0,
  initialSlide: 0
});

selectDropdown('Moisturiser');

$(".range_products .dropdown__option").on("click", function(e) {
  selectDropdown($(this).text());
   e.preventDefault();
});

function selectDropdown(filterValue){
	$(".range_products .dropdown__label").text(filterValue);
  var sliderWrap = $('#range-product__slider .swiper-wrapper');
  sliderWrap.html('');
  var length = 0;
  $('.range_products .product-item').each(function(index, element){
		if($(element).attr('product-type') == filterValue){
			$(element).addClass('show');
			sliderWrap.append($('<div class="swiper-slide"></div>').append($(element).clone()));
			length++;
		}else{
		 $(element).removeClass('show');
		}
	})

	swiper.update();
	swiper.slideTo(parseInt(length / 2))
}

