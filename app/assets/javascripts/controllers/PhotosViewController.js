(function (root) {
	root.PhotoTagger = root.PhotoTagger || {};

	var PhotoViewController = root.PhotoTagger.PhotoViewController = function ($el) {
		root.Photo = root.PhotoTagger.Photo;
		this.$el = $el;
		this.myHTML = "";
		this.createEvents();
	};

	PhotoViewController.prototype.createEvents = function () {
		var that = this;
		$("div").on('submit', '#PhotoCreationForm', function (event) {

			event.preventDefault();
			that.submitPhoto($("#PhotoCreationForm").serializeJSON());
		});

		$("#createLink").on('click', function (e) {
			e.preventDefault();
			that.new();
		});

		$("#indexLink").on('click', function (e) {
			e.preventDefault();
			that.index();
		});
	}

	PhotoViewController.prototype.index = function () {
		var templateFunction = JST['templates/index'];
		var that = this;
		Photo.fetch(function () {
			var renderedTemplate = templateFunction({
				photos: Photo.all
			});

			that.myHTML = renderedTemplate;
			that.render();
		});
	};

	PhotoViewController.prototype.new = function () {
		var templateFunction = JST['templates/new'];
		var renderedTemplate = templateFunction({});
		this.myHTML = renderedTemplate;
		this.render();
	}

	PhotoViewController.prototype.submitPhoto = function (obj) {
		var myNewPhoto = new Photo(obj);
		myNewPhoto.save(function() {
			console.log("Photo saved.");
		});
	}

	PhotoViewController.prototype.render = function () {
		this.$el.html(this.myHTML);
	};

})(this);