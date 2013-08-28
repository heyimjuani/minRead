(function($) {
	$.fn.minRead = function( options ) {

		var settings = $.extend({
			where		: ".min-read",
			archive		: false,
			archiveText	: ".text",
			anchor 		: ".article-link"
		}, options);

		return this.each( function() {
			var element = $(this);

			var wordAmount = element.text().split(' ');
			var timeRaw = wordAmount.length / 180;
			var timeRound = Math.round(timeRaw);
			if (timeRound == 0) { timeRound = 1 }

			element.parent().find(settings.where).text(timeRound + " min read");

			if (settings.archive) {
				var articleLink = element.find(settings.anchor);
				var articleUrl = articleLink.attr("href");
				console.log(articleUrl);
				$.get(articleUrl, function(data){
					data = data.replace(/<img.+>/gi, "");
					// console.log(data);
					var archiveWordAmount = $(data).find(settings.archiveText).text().split(' ');
					// console.log(archiveWordAmount);
					var archiveTimeRaw = archiveWordAmount.length / 180;
					console.log(archiveTimeRaw);
					var archiveTimeRound = Math.round(archiveTimeRaw);
					if (archiveTimeRound == 0) { archiveTimeRound = 1 }
					element.find(settings.where).text(archiveTimeRound + " min read");
				});
			}
		});
	}
}(jQuery));