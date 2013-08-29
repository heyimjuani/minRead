(function($) {
	$.fn.minRead = function( options ) {

		var settings = $.extend($.fn.minRead.defaults, options);

		return this.each( function() {
			var element = $(this);

			var time = calculateTime(element.text(), settings);
			element.parent().find(settings.where).text(time + " min read");

			if (settings.archive) {
				var articleLink = element.find(settings.anchor);
				var articleUrl = articleLink.attr("href");
				console.log(articleUrl);
				$.get(articleUrl, function(data){
					data = data.replace(/<img.+>/gi, "");
					// console.log(data);
					var text = $(data).find(settings.archiveText).text();
					var archiveTime = calculateTime(text, settings);
					element.find(settings.where).text(archiveTimeRound + " min read");
				});
			}
		});
	};
	
	function calculateTime(text, settings) {
		return Math.ceil(text.split(' ').length / settings.wordsPerMinute) || 1;
	}
	
	$.fn.minRead.defaults = {
		where		: ".min-read",
		wordsPerMinute	: 180,
		archive		: false,
		archiveText	: ".text",
		anchor 		: ".article-link"
	};
})(jQuery);
