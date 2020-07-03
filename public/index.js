$(document).ready( function () {
    const heading = $('.navbar');
  //   const icon = $('i');
	// let iconWidth = icon.width();

	// alert(icon.parent().width());

    $(this).on('scroll', function () {
        let scrollTop = $(this).scrollTop();

        if (scrollTop > 100) {
            heading.addClass('affix');
        } else {
          heading.removeClass('affix');
        }
    });
});
