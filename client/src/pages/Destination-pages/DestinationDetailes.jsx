import React from 'react'
import DestDetHero from '../../components/DestinationDetailPageComponents/DestDetHero'
import { images } from '../../data-destination/imageUrls'
import DestDetTabs from '../../components/DestinationDetailPageComponents/DestDetTabs'
import { useParams } from 'react-router-dom'
import { destinations } from '../../data-destination/destinations'

const DestinationDetailes = () => {

    const { slug } = useParams();
    const destination = destinations.find(
        (d) => d.slug === slug
    );
    console.log(slug);
    if (!destination) {
        return <h1>Destination Not Found</h1>;
    }
    return (
        <>
            <DestDetHero
                heroImage={destination.image}
                name={destination.name}
                country={destination.country}
                rating={destination.rating}
            />
            <DestDetTabs />
        </>
    )
}

export default DestinationDetailes
