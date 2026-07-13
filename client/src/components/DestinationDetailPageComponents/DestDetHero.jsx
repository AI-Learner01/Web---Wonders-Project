import React from 'react'

const DestDetHero = ({
    heroImage,
    name,
    country,
    rating,
}) => {
    return (
        <div>
            <section
                className='relative h-[70vh] min-h-[450px] w-full bg-cover bg-center'
                style={{
                    backgroundImage: `url(${heroImage})`,
                }}
            >

                {/* Dark Overlay */}
                <div className='absolute inset-0 bg-black/10' />

                {/* Hero Content */}
                <div className='relative z-10 flex h-full items-center justify-center'>
                    <div className='text-center text-white px-4'>

                        {/* Rating */}
                        <div className='mb-5 inline-flex ietms-center gap-2 rounded-full bg-white/60 px-5 py-2 backdrop-blur-md'>
                            <span className='text-red-400 text-lg'>⭐</span>
                            <span className="font-semibold text-lg">
                                {rating}
                            </span>
                        </div>

                        {/* Destination name */}
                        <h1 className='text-5xl font-extrabold md:text-7xl drop-shadow-lg'>
                            {name}
                        </h1>

                        {/* Country */}
                        <p className="flex flex-row gap-2 mt-5 text-3xl font-light tracking-wide">
                            ✵ <p className='font-semibold'>{country}</p>
                        </p>
                    </div>
                </div>


            </section>
        </div>
    )
}

export default DestDetHero
