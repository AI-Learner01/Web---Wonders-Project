import React from 'react'
import Navbar from '../../components/DestinationDetailPageComponents/Navbar'
import DestDetHero from '../../components/DestinationDetailPageComponents/DestDetHero'
import { images } from '../../data-destination/imageUrls'
import DestDetTabs from '../../components/DestinationDetailPageComponents/DestDetTabs'

const DestinationDetailes = () => {
  return (
    <>
    
      <Navbar/>
      <DestDetHero
        heroImage={images.hero.destinations}
        name="Bali"
        country="Indonesia"
        rating={4.9}
      />
      <DestDetTabs/>
    </>
  )
}

export default DestinationDetailes
