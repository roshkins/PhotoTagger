(function (root) {
	root.PhotoTagger = root.PhotoTagger || {};

	var PhotoTaggingViewController = root.PhotoTagger.PhotoTaggingViewController =
		function ($el) {
			this.$el = $el;
			this.myHTML = "";
			this.createEvents();
	};

	PhotoTaggingViewController.prototype.createEvents = function () {
		var that = this;
		$('div').on('click', 'img', function () {
			console.log('-----')
			var id = parseInt(this.id.match(/photo_(\d*)/)[1]);

			that.show(id);
		});
	};

	PhotoTaggingViewController.prototype.show = function (id) {
		this.myHTML = JST["templates/show"]({ photo: Photo.find(id) });
		this.render();
	};

	PhotoTaggingViewController.prototype.render = function () {
		this.$el.html(this.myHTML);
	};



})(this);