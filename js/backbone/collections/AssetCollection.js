// define assett collection
TapAssetCollection = Backbone.Collection.extend({
	model: TapAssetModel,
	initialize: function(models, id) {
		this.localStorage = new Backbone.LocalStorage(id + '-asset');
	}
});