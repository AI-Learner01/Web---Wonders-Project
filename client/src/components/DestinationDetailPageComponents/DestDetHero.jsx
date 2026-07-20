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
                <div className='absolute inset-0 bg-black/50' />

                {/* Hero Content */}
                <div className='relative z-10 flex h-full items-center justify-center'>
                    <div className='text-center text-white px-4'>


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
