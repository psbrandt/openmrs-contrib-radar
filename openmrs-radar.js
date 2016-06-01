// https://docs.google.com/spreadsheets/d/1iX_7eUOqHCq2sRrZIDg3HNao_2N0ZaO9VsIdp6d2Rf0/pubhtml
var SPREADSHEET_KEY = '1iX_7eUOqHCq2sRrZIDg3HNao_2N0ZaO9VsIdp6d2Rf0';
var CURRENT_RADAR = 'Q3 2016';

var MOVEMENT_MAP = {
    'Moved': 't',
    'Unchanged': 'c'
};

var T_RANGE_MAPS = {
    'Languages & Frameworks': {
        'min': 90,
        'max': 180
    },
    'Standards & Conventions': {
        'min': 0,
        'max': 90
    },
    'Modules & Distributions': {
        'min': 180,
        'max': 270,
    },
    'Platforms & Integrations': {
        'min': 270,
        'max': 360
    }
};

var R_RANGE_MAPS = {
    'Adopt': {
        'min': 0,
        'max': 90
    },
    'Trial': {
        'min': 90,
        'max': 180,
    },
    'Assess': {
        'min': 180,
        'max': 270
    },
    'Hold': {
        'min': 270,
        'max': 360
    }
};

// radar variables
var radar_arcs = [{
    'r': 90,
    'name': 'Adopt'
}, {
    'r': 180,
    'name': 'Trial'
}, {
    'r': 270,
    'name': 'Assess'
}, {
    'r': 360,
    'name': 'Hold'
}];
var h = 800;
var w = 1200;

var radar_data = [{
    'quadrant': 'Languages & Frameworks',
    'left': 20,
    'top': 18,
    'color': '#F26522',
    'items': []
}, {
    'quadrant': 'Standards & Conventions',
    'left': w - 280 + 30,
    'top': 18,
    'color': '#009384',
    'items': []
}, {
    'quadrant': 'Modules & Distributions',
    'left': 20,
    'top': (h / 2 + 18),
    'color': '#EEA616',
    'items': []
}, {
    'quadrant': 'Platforms & Integrations',
    'color': '#5B57A6',
    'left': (w - 250 + 30),
    'top': (h / 2 + 18),
    'items': []
}];

var buildRadarData = function(data, tabletop) {
    var sheet = data[CURRENT_RADAR];
    console.log(sheet);

    // set title
    document.title = 'Technology Radar (' + CURRENT_RADAR + ')';

    // process sheet
    for (var i = 0; i < sheet.elements.length; i++) {
        var e = sheet.elements[i];

        if (e.Recommendation) {

            var quadrant = radar_data.filter(function(q) {
                return q.quadrant === e.Category;
            })[0];

            var r_min = R_RANGE_MAPS[e.Recommendation].min;
            var r_max = R_RANGE_MAPS[e.Recommendation].max;
            var r_range = r_max - r_min;

            var t_min = T_RANGE_MAPS[e.Category].min;
            var t_max = T_RANGE_MAPS[e.Category].max;
            var t_range = t_max - t_min;

            quadrant.items.push({
                'name': e.Technology,
                'pc': {
                    'r': Math.floor(parseFloat(e.Strength)/100 * r_range + r_min - 1),
                    't': Math.floor(Math.random() * t_range + t_min)
                },
                'movement': MOVEMENT_MAP[e.Movement]
            });

        }
    }

    // render radar
    init(h, w);
}

var fetchData = function(data, tabletop) {
    Tabletop.init({
        key: SPREADSHEET_KEY,
        callback: buildRadarData,
        simpleSheet: false
    });
}

$(fetchData);
