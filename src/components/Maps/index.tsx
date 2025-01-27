import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import MarkerIMG from 'assets/marker.png'
import Icon from 'ol/style/Icon';

export default function Maps() {
    const mapContainer = useRef<HTMLDivElement>(null); // Defina o tipo da ref como HTMLDivElement
    const [map, setMap] = useState<Map | null>(null); // Defina o tipo do estado map como Map | null

    useEffect(() => {
        const iconFeature = new Feature({
            geometry: new Point([-49.101271, -26.5060218]),
            name: 'IG Energia Renovável',
            population: 4000,
            rainfall: 500,
        });

        const iconStyle = new Style({
            image: new Icon({
                anchor: [0.5, 46],
                width: 25,
                height: 25,
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: MarkerIMG,
            }),
        });

        iconFeature.setStyle(iconStyle);

        if (!map && mapContainer.current) {
            const newMap = new Map({
                target: mapContainer.current,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                    new VectorLayer({
                        source: new VectorSource({
                            features: [iconFeature],
                        }),
                    })
                ],
                view: new View({
                    projection: 'EPSG:4326',
                    center: [-49.101271, -26.5060218], // Converta as coordenadas para usar longitude e latitude
                    zoom: 18, // Defina o nível de zoom
                })
            });
            setMap(newMap);
        }
    }, [map]);

    return (
        <div ref={mapContainer} className='map' style={{ width: '100%', height: '100%' }} />
    )
}