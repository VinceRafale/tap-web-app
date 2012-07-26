// TapAPI Namespace Initialization //
if (typeof TapAPI === 'undefined'){TapAPI = {};}
if (typeof TapAPI.views === 'undefined'){TapAPI.views = {};}
if (typeof TapAPI.views.registry === 'undefined'){TapAPI.views.registry = {};}
// TapAPI Namespace Initialization //

jQuery(function() {

	// Defines the base view for a page
	TapAPI.views.Page = Backbone.View.extend({

		initialize: function(args) {

			// TODO: check for an index menu setting in the current tour

			// Check for a default app index menu setting
			var navbar_items = null;
			if (tap.config.navbar_items !== undefined) {
				navbar_items = tap.config.navbar_items;
			} else {
				navbar_items = [
					{ label: 'Menu', prefix: 'tourstoplist' },
					{ label: 'Keypad', prefix: 'tourkeypad' },
					{ label: 'Map', prefix: 'tourmap'}
				];
			}

			_.defaults(this.options, {
				page_title: '',
				back_label: 'Back',
				nav_menu: navbar_items,
				active_index: null,
				header_nav: (tap.config.header_nav !== undefined) ? tap.config.header_nav : true
			});

			if (this.onInit) {
				this.onInit();
			}
		},

		close: function() {
			this.$el.empty().undelegate();
			this.unbind();
			this.undelegateEvents();
			if (this.onClose){
				this.onClose();
			}
		},

		render: function(event) {

			this.$el.empty();
			this.$el.html(TapAPI.templateManager.get('page')({
				title: this.options.page_title,
				back_label: this.options.back_label,
				header_nav: this.options.header_nav,
				nav_menu: this.options.nav_menu,
				active_index: this.options.active_index,
				tour_id: tap.currentTour
			}));
			this.renderContent();
			return this;

		},

		// Sub-classes should override this function
		renderContent: function() {
			console.log('Warning: abstract TapApi.views.Page::renderContent');
		}

	});
	
});
