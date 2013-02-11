define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
	var tourListView = TapAPI.views.Page.extend({

		onInit: function() {
			this.options.page_title = 'Tour List';
			this.options.header_nav = false;
			this.options.footer_nav = false;
		},

		renderContent: function() {
			var content_template = TapAPI.templateManager.get('tour-list');

			this.$el.find(":jqmData(role='content')").append(content_template);

			var tourList = this.$el.find('#tour-list');
			// iterate through all of the tour models to setup new views
			_.each(this.model.models, function(tour) {
				tourList.append(new TapAPI.views.TourListItem({model: tour}).render().el);
			}, this);
			$('#tour-list').listview('refresh'); // refresh listview since we generated the data dynamically

		}

	});

	// setup an individual view of a tour
	TapAPI.views.TourListItem = Backbone.View.extend({
		tagName: 'li',
		template: TapAPI.templateManager.get('tour-list-item'),
		render: function() {
			this.$el.html(this.template({
				title: this.model.get('title') ? this.model.get('title') : undefined,
				id: this.model.get('id')
			}));
			return this;
		}
	});
	return tourListView;
});