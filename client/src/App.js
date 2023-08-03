import { useState, useEffect } from 'react';

export default function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const handleMarkerClick = (markerName) => {
            fetch(`http://localhost:3001/api?marker=${markerName}`)
                .then((res) => res.json())
                .then((data) => setData(data.data))
        }

        window.initMap = () => {
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: 35.8997 , lng: -120.4327 },
                zoom: 6,
            });

            const markers = [
                { position: { lat: 34.052235 , lng: -118.243683 }, title: "California Oil Drill" },
                { position: { lat: 34.010929, lng: -118.491508 }, title: "Mobil Oil Site" },
                { position: { lat: 34.197506 , lng: -119.177055 }, title: "ABA Energy Oil Well" },
                { position: { lat: 36.974117 , lng: -122.030792 }, title: "Greater Santa Cruz Oil Well" },
                { position: { lat: 37.7749 , lng: -122.4194 }, title: "Easton-Monell Drill" }
            ];

            markers.forEach((markerInfo) => {
                const marker = new window.google.maps.Marker({
                    position: markerInfo.position,
                    map,
                    title: markerInfo.title,
                });

                const infoWindow = new window.google.maps.InfoWindow({
                    content: markerInfo.title,
                });

                marker.addListener('mouseover', () => {
                    infoWindow.open(map, marker);
                });
            
                marker.addListener('mouseout', () => {
                    infoWindow.close();
                });

                marker.addListener('click', () => {
                    handleMarkerClick(markerInfo.title);
                });
            });
        };

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA5z4f1PUjzTAw4_u2W1SFAsJ-1JYJXRnw&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        return () => {document.head.removeChild(script);};
        }, []);

    return (
    <div className="App">
        <div id="map" style={{ width: '640px', height: '480px' }}></div>
        {data && (
            <div>
                <p>Name: {data.name}</p>
                <p>Location: {data.location}</p>
                <p>Depth (meters): {data.depth}</p>
                <p>Energy Produced (watts): {data.energy}</p>
                <p>Emissions (kilotons): {data.emissions}</p>
            </div>
        )}
    </div>
    );
}