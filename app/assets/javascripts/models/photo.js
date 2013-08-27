(function (root) {
	root.PhotoTagger = root.PhotoTagger || {};

	var Photo = root.PhotoTagger.Photo = function (obj) {
		obj = obj || {};
		for (var attr in obj){
			this[attr] = obj[attr];
		}
	};

	Photo.baseUrl = "/photos";
	Photo.prototype.update = function (callback) {
		var obj = this;
		$.ajax({
			url: Photo.baseUrl + '/' + obj.id,
			type: 'PUT',
			data: obj,
			success: function (responseData) {
				callback(new Photo(responseObj));
				console.log("Photo updated!");
			},
			error: function (repsonseData) {
				console.log(responseData);
				return "Photo unable to update.";
			}
		});
	};

	Photo.prototype.create = function (callback) {
		var obj = this;
		var dataJSON = {photo: obj.photo};
		console.log(dataJSON);
		$.ajax({
			url: Photo.baseUrl,
			type: 'POST',
			data: (dataJSON),
			success: function (responseData) {
				var newPhoto = new Photo(responseData);
				Photo.all.push(newPhoto);
				callback(newPhoto);
				console.log("Photo created!");
			},
			error: function (responseData) {
				console.log(responseData);
				return "Photo unable to be created.";
			}
		});
	};

	Photo.prototype.save = function (callback) {
		var obj = this;
		if (typeof obj.id === "undefined") {
			obj.create(callback);
		} else {
			obj.update(callback);
		}
	};

	Photo.prototype.fetch = function (callback) {
		var obj = this;
		$.ajax({
			url: Photo.baseUrl + '/' + obj.id,
			type: 'GET',
			success: function (responseObj) {
				for (var attr in responseObj) {
					obj[attr] = responseObj[attr];
				}
				callback(new Photo(responseObj));
				console.log("Photo model fetched. Current model is: " + obj);
			}
		});
	};

	Photo.prototype.destroy = function (callback) {
		var obj = this;
		$.ajax({
			url: Photo.baseUrl + '/' + obj.id,
			type: 'DELETE',
			success: function (responseObj) {
				var newPhoto = new Photo(responseObj);
				Photo.all.splice(Photo.all.indexOf(newPhoto), 1);
				console.log("Photo deleted.");
				callback(newPhoto);
			}
		});
	};

	Photo.all = [];

	Photo.fetch = function (callback) {
		$.ajax({
			url: Photo.baseUrl + ".json",
			type: 'GET',
			success: function (responseObjects) {
				//console.log(responseObjects);
				var responsePhotos = [];
				responseObjects.forEach(function (item) {
					responsePhotos.push(new Photo(item));
				});
				Photo.all = responsePhotos;
				callback();
			}
		});
	};

	Photo.find = function (id) {
		var result = null;
		Photo.all.forEach(function (item) {
			if (item.id === id) {
				result = item;
			}
		});
		return result;
	};
})(this);