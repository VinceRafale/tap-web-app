define([
    'underscore',
    'jquery',
    'backbone',
    'tap/TapAPI',
    'tap/views/BaseView',
    'tap/TemplateManager'
], function(_, $, Backbone, TapAPI, BaseView, TemplateManager) {
    var footerView = BaseView.extend({
        attributes: {
            'data-role': 'footer',
            'data-id': 'foo1',
            'data-position': 'fixed',
            'data-tap-toggle': 'false'
        },
        template: TemplateManager.get('footer'),
        initialize: function() {
            this.listenTo(Backbone, 'tap.router.routed', this.render);
        },
        render: function() {
            if (_.isEmpty(TapAPI.currentTour)) return;

            this.$el.html(this.template({tourID: TapAPI.currentTour}));
            return this;
        }
    });
    return footerView;
});