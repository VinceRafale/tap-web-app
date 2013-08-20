/*
 * Backbone colleciton for managing Tours
 */
TapAPI.classes.collections.TourCollection = Backbone.Collection.extend({
    model: TapAPI.classes.models.TourModel,
    localStorage: new Backbone.LocalStorage('tours'),
    initialize: function() {
        this.listenTo(Backbone, 'tap.tourml.parsed', this.tourMLParsed);
    },
    syncTourML: function(url) {
        var tours = [],
            tourML, i, len;

        // populate the tour collection
        this.fetch();

        // load tourML
        TapAPI.tourMLParser.process(url);

        //clear the models
        this.set([]);
    },
    tourMLParsed: function(tours) {
        this.set(tours, {remove: false});
        for (var i = 0, len = tours.length; i < len; i++) {
            Backbone.trigger("tap.tour.loaded." + tours[i].get("id"), tours[i].get("id"));
        }
    },
    selectTour: function(tourID) {
        if (TapAPI.currentTour == tourID) return;

        if (!TapAPI.tours.get(tourID)) {
            console.log('Unable to load tour.');
            TapAPI.currentTour = undefined;
            return;
        }

        // set the current tour
        TapAPI.currentTour = tourID;

        // set root stop as the current stop if specified
        if(TapAPI.tours.get(tourID).get('rootStopRef')) {
            TapAPI.currentStop = TapAPI.tours.get(tourID).get('rootStopRef').id;
        }

        // create new instance of StopCollection
        TapAPI.tourStops = new TapAPI.classes.collections.StopCollection(null, tourID);
        // create new instance of AssetCollection
        TapAPI.tourAssets = new TapAPI.classes.collections.AssetCollection(null, tourID);

        // load data from local storage
        TapAPI.tourAssets.fetch();
        TapAPI.tourStops.fetch();

        Backbone.trigger('tap.tour.selected');
    }
});
