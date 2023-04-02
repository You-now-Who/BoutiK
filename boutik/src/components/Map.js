import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import locImage from './images/location.png';
import eventImage from './images/event.png';

var amd = [];

const Map = ({ place }) => {
    const [position, setPosition] = useState([0, 0]);
    const [map, setMap] = useState(null);
    const [temples, setTemples] = useState([]);

    
    const getTemples = async (lat, lng) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
            );

            const { county, state, country } = response.data.address;

            console.log(county, state, country)

            const templesResponse = await axios.get(
                `https://nominatim.openstreetmap.org/search.php?q=${place}+${state}+${country}&format=jsonv2`
            );


            setTemples(templesResponse);
            
            var i;
            var x =[];
            for (i in templesResponse.data){
                console.log(templesResponse.data[i].lat, templesResponse.data[i].lon)
                console.log(templesResponse.data[i].display_name)
                x.push([[templesResponse.data[i].lat, templesResponse.data[i].lon], templesResponse.data[i].display_name])
            }
                
            amd = x;

        } catch (error) {
            console.error(error);
        }
        
    };


    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude)
          setPosition([position.coords.latitude, position.coords.longitude]);
            
          if (map) {
            map.flyTo(position, map.getZoom());
            }
            
            
            getTemples(position.coords.latitude, position.coords.longitude).then(
            (temples) => {
                console.log(temples);
            }
            );

        },
        (error) => {
          console.log(error);
        }
      );
    }, []);

    const locationIcon = L.icon({
        iconUrl: locImage,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
        popupAnchor: [0, -19]
      });

    const eventIcon = L.icon({
        iconUrl: eventImage,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
        popupAnchor: [0, -19]
        });

  return(
        <MapContainer center={position} zoom={13} whenCreated={setMap} style={{ height: "100vh", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position} icon={locationIcon}>
                  <Popup>Your current location</Popup> 
                </Marker>
                

                {amd.map((temple) => (
                    <Marker position={temple[0]} icon={eventIcon}>
                        <Popup>{temple[1]}</Popup>
                    </Marker>
                ))}

          </MapContainer>
  );
};

export default Map;
