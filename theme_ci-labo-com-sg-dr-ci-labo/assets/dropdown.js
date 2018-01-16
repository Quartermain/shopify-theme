$('.dropdown').mouseover(function(){
	$(this).addClass('hover');
})

$('.dropdown').mouseout(function(){
	$(this).removeClass('hover');
})

$('.dropdown .dropdown__option').click(function(){
	$(this).parents('.dropdown').removeClass('hover');
})
