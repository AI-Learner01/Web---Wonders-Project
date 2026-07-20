import React, { useEffect, useState } from 'react'
import DestDetHero from '../../components/DestinationDetailPageComponents/DestDetHero'
import { images } from '../../data-destination/imageUrls'
import DestDetTabs from '../../components/DestinationDetailPageComponents/DestDetTabs'
import { useParams } from 'react-router-dom'
import { destinations } from '../../data-destination/destinations'

const DestinationDetailes = () => {

    const { slug } = useParams();
    const [destData, setDestData] = useState(null)
    const [loading, setLoading] = useState(true)
    const destination = destinations.find(
        (d) => d.slug === slug
    );



    useEffect(() => {
        const fetchDestination = async () => {
            setLoading(true)

            // 1. Find local data if it exists (for ratings & featured flags)
            const localData = destinations.find(
                (d) => d.slug.toLowerCase() === slug.toLowerCase() || d.slug.replace(/-/g, '') === slug.toLowerCase()
            );

            // 2. Format the search term for Wikipedia!
            // If local data exists, use the exact name (e.g., "Swiss Alps"). 
            // If not, try to clean up the URL slug by replacing hyphens with spaces.
            const wikiSearchTerm = localData
                ? (localData.wikiTitle || localData.name)
                : slug.replace(/-/g, ' ');

            try {
                // 2. Fetch live data from your Wikipedia API backend
                const res = await fetch(`http://localhost:5000/api/destinations/info?name=${wikiSearchTerm}`);
                const apiData = await res.json();

                if (apiData.success) {
                    // Merge local and API data smoothly
                    setDestData({
                        name: apiData.data.title || localData?.name || slug,
                        country: apiData.data.description || localData?.country || 'Global Destination',
                        image: apiData.data.thumbnail || localData?.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800', // Fallback image
                        rating: localData?.rating || 'New',
                        about: apiData.data.extract || localData?.description || 'No detailed information available.'
                    });
                }

                else if (localData) {
                    // Fallback to local data if Wikipedia API doesn't find it
                    setDestData({
                        ...localData,
                        about: localData.description
                    });
                }

                else {
                    setDestData(null); // Not found in API or Local
                }
            }

            catch (error) {
                console.error("Error fetching Wiki data", error);

                // Fallback to local if server is down
                if (localData) setDestData({ ...localData, about: localData.description });
                else setDestData(null);
            }

            finally {
                setLoading(false);
            }
        }

        fetchDestination()
    }, [slug]);


    if (loading) return <div className="flex h-screen items-center justify-center text-3xl font-bold text-gray-500">Loading Destination...</div>;
    if (!destData) return <div className="flex h-screen items-center justify-center text-3xl font-bold text-red-500">Destination Not Found</div>;

    return (
        <>
            <DestDetHero
                heroImage={destData.image}
                name={destData.name}
                country={destData.country}
                rating={destData.rating}
            />
            {/* Pass the newly fetched Wikipedia extract down to the Tabs component */}
            <DestDetTabs aboutText={destData.about} />
        </>
    )
}

export default DestinationDetailes
