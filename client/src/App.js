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
                center: { lat: 37.9717 , lng: -100.8727 },
                zoom: 4.75,
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
    <div>
        <div className="flex flex-col items-center justify-center text-white bg-blue-800 p-4">
            <p className='text-5xl font-bold mb-3'>Frack On Track</p>
            <p className='text-lg'>by DataDrillers</p>
        </div>
        <div className="grid grid-cols-2">
            <div id='map' style={{height: 'calc(100vh - 120px)' }}></div>
            {data ? (
                <div>
                    
                </div>
            ) : (
                <div className='flex flex-col mx-24 mt-10 h-1/3'>
                <div className='grid grid-cols-2 mb-8'>
                    <div>
                        <p className='text-4xl font-semibold mb-4'>{data.name}</p>
                        <p className='mb-1'>{data.location}</p>
                        <p>Operated by {data.operator}</p>
                    </div>
                    <div className='ml-28'>
                        <p className='text-lg mb-3'>Water Use: {data.water} bbl</p>
                        <p className='text-lg mb-3'>Depth: {data.depth}ft</p>
                        <p className='text-lg mb-3'>Lateral Length: {data.length}ft</p>
                        <p className='text-lg'>Elevation: {data.elevation}ft</p>
                    </div>
                </div>
                <div className="flex justify-center mt-2">
                    <button className='max-w-xs text-lg text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-xl px-4 py-2'>Calculate Efficiency Rating</button>
                </div>
                </div>
            )}
        </div>
    </div>
    );
}