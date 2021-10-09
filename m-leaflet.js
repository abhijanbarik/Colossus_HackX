M.Page.Leaflet = (function () {
  let emergencyTrackerMap;
  let currentUserData = {};
  const shivamStaticData = [
    [22.669168182344652, 88.37385872945154],
    [22.664139066431463, 88.37731299614217],
    [22.663218222424323, 88.37261135536883],
    [22.664316151108963, 88.3691187079372],
    [22.666618231118214, 88.37965422134356],
    [22.665803653376816, 88.36543415680057],
    [22.660136891717595, 88.37570100502242],
    [22.665839069844548, 88.36752590718798],
    [22.664457818630034, 88.38195706580653],
    [22.66923901362637, 88.37990369616115],
  ];

  const staticData = [
    [23.10237968662475, 72.57372493064378],
    [23.10278738713578, 72.57241562429166],
    [23.102312556329224, 72.57426013292398],
    [23.104439474049368, 72.57533356725126],
    [23.106090399677377, 72.56753058418685],
    [23.106504407085918, 72.5822444305123],
    [23.109586921238876, 72.57822007362886],
    [23.107484936200493, 72.57744718389459],
    [23.111584397340174, 72.5739515106826],
    [23.111523116364605, 72.56978723405915],
  ];

  const _init = () => {
    loadMap();
    $("#triggerMeHelp").on("click", triggerHelp);
    $("#triggerMeHelp").on("click", triggerHelp);
    $("#triggerMeHelp").on("click", triggerHelp);
    $("#triggerMeHelp").on("click", triggerHelp);
  };

  const loadMap = () => {
    const HELSINKI = [60.1708, 24.9375];
    emergencyTrackerMap = L.map("mapid");
    const tile_url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const layer = L.tileLayer(tile_url, {
      attribution: "OSM",
    });
    emergencyTrackerMap.addLayer(layer);
    emergencyTrackerMap.setView(HELSINKI, 19);

    emergencyTrackerMap
      .locate({
        setView: true,
        watch: true,
      })
      .on("locationfound", function (e) {
        var LeafIcon = L.Icon.extend({});
        var redIcon = new LeafIcon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        });

        const marker = L.marker([e.latitude, e.longitude], {
          icon: redIcon,
        }).bindPopup("Your are here :)");
        currentUserData.lat = e.latitude;
        currentUserData.lng = e.longitude;
        emergencyTrackerMap.addLayer(marker);
        //emergencyTrackerMap.addLayer(circle);
      })
      .on("locationerror", function (e) {
        console.log(e);
      });
  };

  const generateLocationAndTriggerHelp = () => {
    const data = {};
    emergencyTrackerMap
      .locate({
        setView: true,
        watch: true,
      })
      .on("locationfound", function (e) {
        data.lat = e.latitude;
        data.lng = e.longitude;
        triggerHelp(data);
      });
  };

  const _showNotification = function (response) {
    UIkit.notification({
      message: response.responseJSON.Error.Message || "Try again later.",
      status: "danger",
      timeout: 3000,
      pos: "top-center",
    });
  };

  const populateUserData = (response) => {};

  const showHospitalIcon = () => {
    var LeafIcon = L.Icon.extend({
      options: {
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76],
      },
    });
    var hospitalIcon = new LeafIcon({
      iconUrl: "./hospital.svg",
    });
    const shivamHospital = [22.664134632880167, 88.3781483254079];
    const hospital = [
      [23.106252846931156, 72.56954737169845],
      [23.1082219726501, 72.57776743805107],
      [23.10227060099542, 72.57180393746766],
    ];
    const newMarker = L.marker(hospital[0], { icon: hospitalIcon });
    emergencyTrackerMap.addLayer(newMarker);

    const newMarker2 = L.marker(hospital[1], { icon: hospitalIcon });
    emergencyTrackerMap.addLayer(newMarker2);

    const newMarker3 = L.marker(hospital[2], { icon: hospitalIcon });
    emergencyTrackerMap.addLayer(newMarker3);
  };

  const showAmbulanceIcon = () => {};

  const triggerHelp = () => {
    const generatedLocations = [];
    setTimeout(function () {
      for (let i = 0; i < staticData.length; i++) {
        const newMarker = L.marker(staticData[i]);
        emergencyTrackerMap.addLayer(newMarker);
      }
      showHospitalIcon();
    }, 1000);

    // $.ajax({
    //   url: "/api/v1/triggerHelp",
    //   type: "POST",
    //   data: JSON.stringify({
    //     ...data,
    //   }),
    //   success: _onAddHandler,
    //   error: _showNotification,
    //   contentType: "application/json",
    //   dataType: "json",
    // });
  };

  const _addMarkerToMap = () => {};

  return {
    init: _init,
    addMarkerToMap: _addMarkerToMap,
  };
})();

window.onload = function () {
  M.Page.Leaflet.init();
};
