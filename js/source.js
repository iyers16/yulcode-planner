
const modal = document.getElementById("myModal");
const btn = document.getElementById("close");
const bttn = document.querySelector('button');
const allocDiv = document.getElementById("reservations");


btn.onclick = function() {
    modal.style.display = "none";
}

function requestDate() {
    //Format used in code : dd/mm/yyyy
    let [userY, userM, userD] = $('#date').val().split('-');
    let today = new Date();

    var todayD = String(today.getDate());
    var todayM = String(today.getMonth());
    var todayY = String(today.getFullYear());

    var todayFormattedDate = todayD.concat(todayM.concat(todayY));
    var userFormattedDate = userD.concat(userM.concat(userY));
    
    //Tests in console
    console.log(todayFormattedDate);
    console.log(userFormattedDate);

    var t = document.createElement('div');
    t.innerHTML = `Today is: ${todayFormattedDate} and you wanted to reserve ${userFormattedDate}`;
    allocDiv.appendChild(t);


    modal.style.display = "none";

}

map = new Mazemap.Map({
"container": "map",
"campuses": 89,
"center": {
    "lng": -73.56795092623447,
    "lat": 45.503502511197446
},
"zoom": 20,
"zLevel": 1,
"scrollZoom": true,
"doubleClickZoom": true,
"touchZoomRotate": true
});

const basicVertexX1 = -73.56795;
const basicVertexY1 = 45.50350;
const basicVertexX2 = basicVertexX1 + 0.00003;
const basicVertexY2 = basicVertexY1 + 0.00003;
//format in {Lat, Long} == {X, Y}
var CUSTOM_FEATURES = [
    {
        type: "Feature",
        properties: { zLevel: 1, name: 'Desk A' },
        geometry: {
            type: "Polygon",
            coordinates: [ [[basicVertexX1, basicVertexY1],
                            [basicVertexX1, basicVertexY2],
                            [basicVertexX2, basicVertexY2],
                            [basicVertexX2, basicVertexY1] ] ]
        }
    },
    {
        type: "Feature",
        properties: { zLevel: 1, name: 'Desk B' },
        geometry: {
            type: "Polygon",
            coordinates: [ [[basicVertexX1 - 0.00005, basicVertexY1 - 0.00005],
                            [basicVertexX1 - 0.00005, basicVertexY2 - 0.00005],
                            [basicVertexX2 - 0.00005, basicVertexY2 - 0.00005],
                            [basicVertexX2 - 0.00005, basicVertexY1 - 0.00005] ] ]

        }

    },
    {
        type: "Feature",
        properties: { zLevel: 1, name: 'Desk C' },
        geometry: {
            type: "Polygon",
            coordinates: [ [[basicVertexX1 -  0.00010, basicVertexY1 -  0.00010],
                            [basicVertexX1 -  0.00010, basicVertexY2 -  0.00010],
                            [basicVertexX2 -  0.00010, basicVertexY2 -  0.00010],
                            [basicVertexX2 -  0.00010, basicVertexY1 -  0.00010] ] ]

        }

    }
];

map.on('load', function(){

    map.setCenter([-73.56795092623447, 45.503502511197446 ]);
    map.addLayer({
        id: 'custom-polygon-layer',
        type: "fill",
        source: {
            type: 'geojson',
            data: null,
        },
        paint: {
            "fill-color": "#fc0",
            "fill-outline-color": "red"
        }
    });

    
    map.layerEventHandler.on('click', null, () => {
        modal.style.display = "none";
    })
    map.layerEventHandler.on('click', 'custom-polygon-layer', (e, features) => {
        

        console.log('@@@ clicked custom-polygon-layer features: ', features);
        var topFeature = features[0];
        console.log("you clicked feature named: " + topFeature.properties.name);
        console.log(topFeature.layer.paint["fill-color"]);
        document.getElementById("myModal").style.display = "block";
        
    });

    map.on('zlevel', redrawPolygons);
    redrawPolygons();

});


function redrawPolygons() {
    var zLevel = map.getZLevel();

    var filteredFeatures = CUSTOM_FEATURES.filter( feature => feature.properties.zLevel === zLevel );

    map.getSource("custom-polygon-layer").setData({type: "FeatureCollection", features: filteredFeatures});
}
