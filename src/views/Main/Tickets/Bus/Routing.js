import { MapLayer, withLeaflet } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";

const rgbToHex = rgb => {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = `0${hex}`;
    }
    return hex;
};

class Routing extends MapLayer {
    createLeafletElement() {
        const { map, stations } = this.props;
        const color = `#${rgbToHex(Math.floor(Math.random()*256))}${rgbToHex(Math.floor(Math.random()*256))}${rgbToHex(Math.floor(Math.random()*256))}`;
        console.log(color)
        const leafletElement = L.Routing.control({
            waypoints: stations.map(({lat, lng}) => L.latLng(lat, lng)),
            // router: new L.Routing.Google(),
            lineOptions: {
                styles: [
                    {
                        color ,
                        opacity: 0.6,
                        weight: 4
                    }
                ]
            },
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: false,
            showAlternatives: false
        }).addTo(map.leafletElement);
        return leafletElement.getPlan();
    }
}
export default withLeaflet(Routing);
