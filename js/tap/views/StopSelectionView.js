define([
    'jquery',
    'underscore',
    'backbone',
    'tap/TapAPI',
    'tap/views/BaseView',
    'backbone-super'
], function($, _, Backbone, TapAPI, BaseView) {
    var stopSelectionView = BaseView.extend({
        initialize: function() {
            this._super('initialize');
            this.activeToolbarButton = '';
        }
    });
    return stopSelectionView;
});