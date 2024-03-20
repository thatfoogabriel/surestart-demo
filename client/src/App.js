import { useState, useEffect } from 'react';

export default function App() {
    const [buttonText, setButtonText] = useState('Calculate Efficiency Rating');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [data, setData] = useState(null);
    const [img, setImg] = useState(false);
    const [insight, setInsight] = useState(false);
    const [verdict, setVerdict] = useState(false);
    const [geology, setGeology] = useState(false);
    const [drilling, setDrilling] = useState(false);
    const [age, setAge] = useState(false);
    const [inspection, setInspection] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [insightIndex, setInsightIndex] = useState(0);
    const [verdictIndex, setVerdictIndex] = useState(0);
    const [geologyIndex, setGeologyIndex] = useState(0);
    const [drillingIndex, setDrillingIndex] = useState(0);
    const [ageIndex, setAgeIndex] = useState(0);
    const [inspectionIndex, setInspectionIndex] = useState(0);
    const insights = [
        'High production efficiency, but high emissions. Nearing end of well lifespan.',
        'Very high emissions for its low production efficiency. Emits a high amount of carcinogenic gas. Long time since last inspection.'
    ]
    const verdicts = [
        'This well should be considered for evaluation in the coming months.',
        'This well should be considered for immediate evaluation.'
    ]
    const images = [
        '/C.png',
        '/F.png',
    ];
    const geologys =[
        'Sedimentary',
        'Metamorphic'
    ]
    const drillings =[
        'Constant',
        'Seasonal'
    ]
    const ages =[
        '18',
        '6'
    ]
    const inspections =[
        '2022',
        '2021'
    ]

    const handlePress = () => {
        setButtonText('Calculating...')
        setButtonDisabled(true)
        setTimeout(() => {
            const nextIndex = (imageIndex + 1) % images.length
            setImageIndex(nextIndex)
            setInsightIndex(nextIndex)
            setVerdictIndex(nextIndex)
            setGeologyIndex(nextIndex)
            setDrillingIndex(nextIndex)
            setAgeIndex(nextIndex)
            setInspectionIndex(nextIndex)
            setImg(true)
            setInsight(true)
            setVerdict(true)
            setGeology(true)
            setDrilling(true)
            setAge(true)
            setInspection(true)
            setButtonText('Successful!')
        }, 1000);
    };

    useEffect(() => {
        const handleMarkerClick = (markerName) => {
            setImg(false)
            setButtonText('Calculate Efficiency Rating')
            setButtonDisabled(false)
            fetch(`http://localhost:3001/api?marker=${markerName}`)
                .then((res) => res.json())
                .then((data) => setData(data.data))
            console.log(data)
        };

        const loadMapAndMarkers = async () => {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: 37.9717, lng: -98.8727 },
                zoom: 4.75,
            });

            const markers = [
                { position: { lat: 34.1706 , lng: -118.8376 }, title: "Oakridge 14A-3" },
                { position: { lat: 31.463772, lng: -100.437037 }, title: "McGill 4" },
                { position: { lat: 27.800583 , lng: -97.396378 }, title: "Permian 12X-3" },
                { position: { lat: 33.3170 , lng: -101.7240 }, title: "COSPER 1" },
                { position: { lat: 27.7525 , lng: -98.5721 }, title: "Bakken 5A-1" },
                { position: { lat: 32.2620 , lng: -96.8351 }, title: "Marcellus 8C-2" },
                { position: { lat: 34.7289 , lng: -97.3517 }, title: "Eagle Ford 21B-4" },
                { position: { lat: 36.31455420 , lng: -95.31873820 }, title: "MCDSU P-82" },
                { position: { lat: 37.1895 , lng: -99.2786 }, title: "Anadarko 10D" },
                { position: { lat: 38.5359 , lng: -99.2776 }, title: "Haynesville A-3" },
                { position: { lat: 38.4528 , lng: -99.9065 }, title: "Beardslee D-2" },
                { position: { lat: 37.2660 , lng: -96.9209 }, title: "Barnard 4" },
                { position: { lat: 32.4171 , lng: -104.4723 }, title: "Atoka San Andres Unit" },
                { position: { lat: 35.7152 , lng: -108.2378 }, title: "Sante Fe Pacific" },
                { position: { lat: 32.8969 , lng: -103.3587 }, title: "Utica 7C" },
                { position: { lat: 31.5396 , lng: -103.1279 }, title: "Spraberry 22" },
                { position: { lat: 34.0522 , lng: -118.2437 }, title: "WTU 2116" },
                { position: { lat: 34.2805 , lng: -119.2945 }, title: "J.H. 2" },
                { position: { lat: 35.4937 , lng: -118.8597 }, title: "Permian 42" },
                { position: { lat: 35.2828 , lng: -120.6596 }, title: "Signal E.T.S. 9" },
                { position: { lat: 37.8018067 , lng: -111.5853156 }, title: "Upper Valley U-5" },
                { position: { lat: 37.4634 , lng: -109.7592 }, title: "Lisbon USA-C3" },
                { position: { lat: 38.1549905 , lng: -109.143165 }, title: "Lisbon USA-C1" },
                { position: { lat: 37.8011 , lng: -112.9363 }, title: "ARE W2-10" },
                { position: { lat: 42.8139 , lng: -109.7592 }, title: "Pinocchio 6" },
                { position: { lat: 41.6032 , lng: -106.9123 }, title: "Mahoney Dome Unit 5" },
                { position: { lat: 43.0120 , lng: -108.6176 }, title: "Tribal 24" },
                { position: { lat: 44.6812 , lng: -106.9921 }, title: "TLMTU 26" },
                { position: { lat: 43.6587 , lng: -108.3268 }, title: "Kirby Creek Unit 29" },
                { position: { lat: 43.9557 , lng: -106.4273 }, title: "SUSSX Unit 214" },
                { position: { lat: 41.3114 , lng: -105.5911 }, title: "Champlin 301" },
                { position: { lat: 46.5186 , lng: -108.0912 }, title: "Van Arsdale 14" },
                { position: { lat: 47.4501 , lng: -105.8811 }, title: "Federal-McCone 5012" },
                { position: { lat: 46.9905 , lng: -104.1865 }, title: "Unit 32-H" },
                { position: { lat: 46.1831 , lng: -103.3949 }, title: "Cedar Creek Unit 8B" },
                { position: { lat: 48.2147 , lng: -101.5805 }, title: "Neshem 2" },
                { position: { lat: 46.8250 , lng: -102.6555 }, title: "Decker B1-30" },
                { position: { lat: 40.7056 , lng: -102.9896 }, title: "Forntrom 23-32" },
                { position: { lat: 39.2195 , lng: -104.5372 }, title: "Jean 3-8" },
                { position: { lat: 38.2743 , lng: -90.1870 }, title: "Theobald 4" },
                { position: { lat: 38.9030 , lng: -89.4742 }, title: "Young Heirs W-2" },
                { position: { lat: 39.7817 , lng: -89.6501 }, title: "" },
                { position: { lat: 39.1200 , lng: -88.5434 }, title: "" },
                { position: { lat: 40.4167 , lng: -86.8753 }, title: "" },
                { position: { lat: 39.1653 , lng: -86.5264 }, title: "" },
                { position: { lat: 42.9634 , lng: -85.6681 }, title: "" },
                { position: { lat: 42.6907 , lng: -83.4066 }, title: "" },
                { position: { lat: 42.2409 , lng: -83.2697 }, title: "" },
                { position: { lat: 44.7631 , lng: -85.6206 }, title: "" },
                { position: { lat: 44.2400 , lng: -86.2920 }, title: "" },
                { position: { lat: 39.9612 , lng: -82.9988 }, title: "" },
                { position: { lat: 39.7589 , lng: -84.1916 }, title: "" },
                { position: { lat: 40.7989 , lng: -81.3784 }, title: "" },
                { position: { lat: 42.1292 , lng: -80.0851 }, title: "" },
                { position: { lat: 41.4274 , lng: -78.5609 }, title: "" },
                { position: { lat: 41.8439 , lng: -79.1450 }, title: "" },
                { position: { lat: 41.9565 , lng: -78.6492 }, title: "" },
                { position: { lat: 42.0836 , lng: -78.4299 }, title: "" },
                { position: { lat: 42.3278 , lng: -77.6611 }, title: "" },
                { position: { lat: 42.9981 , lng: -78.1875 }, title: "" },
                { position: { lat: 42.9317 , lng: -76.5661 }, title: "" },
                { position: { lat: 40.2804 , lng: -75.1293 }, title: "" },
                { position: { lat: 39.3643 , lng: -74.4229 }, title: "" },
                { position: { lat: 37.6076 , lng: -79.7823 }, title: "" },
                { position: { lat: 38.3607 , lng: -75.5994 }, title: "" },
                { position: { lat: 39.6418 , lng: -77.7200 }, title: "" },
                { position: { lat: 38.4192 , lng: -82.4452 }, title: "" },
                { position: { lat: 38.4087 , lng: -81.4818 }, title: "" },
                { position: { lat: 38.5657 , lng: -81.1304 }, title: "" },
                { position: { lat: 37.2710 , lng: -79.9414 }, title: "" },
                { position: { lat: 35.5951 , lng: -82.5515 }, title: "" },
                { position: { lat: 36.5484 , lng: -82.5618 }, title: "" },
                { position: { lat: 35.4429 , lng: -84.5930 }, title: "" },
                { position: { lat: 36.2081 , lng: -86.2911 }, title: "" },
                { position: { lat: 35.6151 , lng: -87.0353 }, title: "" },
                { position: { lat: 33.4504 , lng: -88.8184 }, title: "" },
                { position: { lat: 32.3526 , lng: -90.8779 }, title: "" },
                { position: { lat: 32.3643 , lng: -88.7037 }, title: "" },
                { position: { lat: 31.6941 , lng: -89.1306 }, title: "" },
                { position: { lat: 31.3271 , lng: -89.2903 }, title: "" },
                { position: { lat: 29.5958 , lng: -90.7195 }, title: "" },
                { position: { lat: 29.6994 , lng: -91.2068 }, title: "" },
                { position: { lat: 30.2241 , lng: -92.0198 }, title: "" },
                { position: { lat: 30.2266 , lng: -93.2174 }, title: "" },
                { position: { lat: 31.1435 , lng: -93.2610 }, title: "" },
                { position: { lat: 31.6346 , lng: -92.1951 }, title: "" },
                { position: { lat: 32.0149 , lng: -93.3421 }, title: "" },
                { position: { lat: 32.5252 , lng: -93.7502 }, title: "" },
                { position: { lat: 32.5232 , lng: -92.6379 }, title: "" },
                { position: { lat: 32.5093 , lng: -92.1193 }, title: "" },
                { position: { lat: 30.3960 , lng: -88.8853 }, title: "" },
                { position: { lat: 34.1954 , lng: -82.1618 }, title: "" },
                { position: { lat: 34.1954 , lng: -79.7626 }, title: "" },
                { position: { lat: 33.6891 , lng: -78.8867 }, title: "" },
                { position: { lat: 34.2104 , lng: -77.8868 }, title: "" },
                { position: { lat: 35.9382 , lng: -77.7905 }, title: "" },
                { position: { lat: 26.1420 , lng: -81.7948 }, title: "" },
                { position: { lat: 25.4687 , lng: -80.4776 }, title: "" },
                { position: { lat: 29.5845 , lng: -81.2079 }, title: "" },
                { position: { lat: 46.1382 , lng: -122.9382 }, title: "" },
                { position: { lat: 47.0379, lng: -122.9007 }, title: "" },
                { position: { lat: 44.0521, lng: -123.0868 }, title: "" },
                { position: { lat: 44.0582, lng: -121.3153 }, title: "" },
                { position: { lat: 47.9790, lng: -122.2021 }, title: "" },
                { position: { lat: 46.6021, lng: -120.5059 }, title: "" },
                { position: { lat: 37.6819, lng: -121.7685 }, title: "" },
                { position: { lat: 37.9735, lng: -122.5311 }, title: "" },
                { position: { lat: 36.3208, lng: -121.2438 }, title: "" },
                { position: { lat: 36.1397, lng: -120.3601 }, title: "" },
                { position: { lat: 37.0965, lng: -113.5684 }, title: "" },

            ];

            markers.forEach((markerInfo) => {
                const marker = new window.google.maps.Marker({
                    position: markerInfo.position,
                    map: map,
                    title: markerInfo.title
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

        const loadGoogleMaps = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDhLNyW9dhWx8MFf53aZfHr5zDMdVVWwiQ&callback=initMap`;
            script.defer = true;
            window.initMap = loadMapAndMarkers;
            document.head.appendChild(script);
        };

        loadGoogleMaps();
    }, []);

    return (
    <div>
        <div className="flex justify-between text-black p-2">
            <a href="#" className="flex items-center">
                <img src="/logo.png" alt="" className='w-[4.2rem] ml-20 mr-1'/>
                <p className='text-4xl font-bold mt-7'>Frack On Track</p>
            </a>
            <div className='flex'>
                <a href="#">
                    <p className='text-3xl mr-14 mt-5'>Map</p>
                </a>
                <a href="#about-us">
                    <p className='text-3xl mr-20 mt-5'>About Us</p>
                </a>
            </div>
        </div>
        <div className='w-full h-0.5 bg-gray-600'></div>
        <div className="flex h-full bg-pageGreen">
                <div id='map' style={{ height: '869px', width: '700px', flex: '1' }}/>
                <div className="flex flex-col justify-center bg-gray-600 w-1"/>
                <div className='flex flex-col flex-1'>
                {data ? (
                <div className='flex justify-center'>
                    <div className='w-[700px] h-[830px] mt-5 bg-white'>
                        <div className='flex flex-col mx-20 mt-4 h-1/3 text-white'>
                            <div className='flex justify-center'>
                                <div className='w-full'>
                                    <p className='text-4xl text-black font-semibold mb-2 text-center'>{data.name}</p>
                                    <div className='flex justify-center'>
                                        <div className='w-full h-[3px] mb-1 bg-gray-300 rounded-xl'></div>
                                    </div>
                                    <p className='text-lg text-black'>Location: {data.location}</p>
                                    <p className='text-lg text-black mb-2'>Operated by: {data.operator}</p>
                                    <div className='flex justify-center'>
                                        <div className='w-full h-[3px] bg-gray-300 rounded-xl'></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-5">
                                <button 
                                    onClick={handlePress}
                                    className='max-w-xs text-white text-lg font-bold bg-buttonBlue hover:bg-hoverBlue rounded-md px-4 py-3'
                                    disabled={buttonDisabled}>
                                        {buttonText}
                                </button>
                            </div>
                            {img && data && (
                                <div>
                                    <div className='flex justify-center mt-4'>
                                        <img src={images[imageIndex]} alt='' className='w-11/12 h-auto'/>
                                    </div>
                                    <details className='text-black'>
                                        <summary className='font-bold'>Show Details</summary>
                                        <div className='flex'>
                                            <div className='ml-10 mr-2 flex flex-col'>
                                                <p>Water Use:</p>
                                                <p>Depth:</p>
                                                <p>Width:</p>
                                                <p>Elevation:</p>
                                            </div>
                                            <div className='flex flex-col'>
                                                <p>{data.water} bbl</p>
                                                <p>{data.depth} ft</p>
                                                <p>{data.length} ft</p>
                                                <p>{data.elevation} ft</p>
                                            </div>
                                            <div className='ml-10 mr-2 flex flex-col'>
                                                <p>Geology:</p>
                                                <p>Drilling Time:</p>
                                                <p>Well Age:</p>
                                                <p>Last Inspection:</p>
                                            </div>
                                            <div className='flex flex-col'>
                                                <p>{geology && geologys[geologyIndex]}</p>
                                                <p>{drilling && drillings[drillingIndex]}</p>
                                                <p>{age && ages[ageIndex]} years</p>
                                                <p>{inspection && inspections[inspectionIndex]}</p>
                                            </div>
                                        </div>
                                    </details>
                                    <p className='text-left text-black mt-5 mb-1'>
                                        <strong className='text-lg'>Our Insight:</strong> {insight && insights[insightIndex]}
                                    </p>
                                    <p className='text-left text-black'>
                                        <strong className='text-lg'>Verdict:</strong> {verdict && verdicts[verdictIndex]}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                ) : (
                    <div className="flex items-center justify-center mt-60 h-1/3 text-black text-4xl">
                        Click on a point to start
                    </div>
                )}
                </div>
        </div>
        <div className='w-full h-0.5 bg-gray-600'></div>
        <div id='about-us' className='flex justify-center h-full bg-pageGreen'>
            <div className='flex flex-col w-2/3 h-full bg-white my-10 py-10 px-32'>
                <div className='flex justify-center'>
                    <p className='text-4xl font-semibold'>About Us</p>
                </div>
                <div className='flex justify-center mt-5'>
                    <div className='w-full h-1 bg-gray-300 rounded-xl'></div>
                </div>
                <p className='text-2xl font-semibold mt-5'>
                    Who are we?
                </p>
                <p className='text-lg mt-2 ml-4'>
                    We are a team of college students of varying years and backgrounds, but who share a common interest in finding ways to use our technical skills to tackle important world issues. We took advantage of this opportunity to learn about machine learning and teamwork to build a product we could only dream of at first.
                </p>
                <p className='text-2xl font-semibold mt-5'>
                    What is Fracking?
                </p>
                <p className='text-lg mt-2 ml-4'>
                    Text goes here
                </p>
                <p className='text-2xl font-semibold mt-5'>
                    The Good and the Bad
                </p>
                <p className='text-lg mt-2 ml-4'>
                    Text goes here
                </p>
                <p className='text-2xl font-semibold mt-5'>
                    Our Goal
                </p>
                <p className='text-lg mt-2 ml-4'>
                    We hope to bring light to issues with fossil fuel production and make well data accessible to regulators, investors, and citizens to ensure transparency with how our energy usage affects the environment.
                </p>
            </div>
        </div>
        <div className=' flex justify-center items-center w-full h-40 bg-bottomBar'>
            <p className='text-lg text-white'>
                @2023 FrackOnTrack | Team Data Drillers | SureStart Create-A-Thon
            </p>
        </div>
    </div>
    );
}