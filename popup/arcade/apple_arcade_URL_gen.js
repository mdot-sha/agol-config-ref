function MetersToLatLon(x, y) {
    // Converts XY point from Spherical Mercator EPSG:900913 to lat/lon in WGS84 Datum
     // Source: http://www.maptiler.org/google-maps-coordinates-tile-bounds-projection/
	 // Source: https://community.esri.com/thread/222695-latlong-unit-conversion-with-arcade#comment-806053
    var originShift = 2.0 * PI * 6378137.0 / 2.0;

    var lon = (x / originShift) * 180.0;
    var lat = (y / originShift) * 180.0;

    lat = 180.0 / PI * (2.0 * Atan( Exp( lat * PI / 180.0)) - PI / 2.0);
    return [lat, lon];
}

function CreateAppleMapsURL(lat, lon) {
    return "http://maps.apple.com/?daddr=" + lat + "," + lon
}

var latlon = MetersToLatLon(Geometry($feature).X, Geometry($feature).Y);
var url = CreateAppleMapsURL(latlon[0], latlon[1]);
return url;