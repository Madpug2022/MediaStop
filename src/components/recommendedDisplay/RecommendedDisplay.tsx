import { MovieI, SeriesI } from '@/interfaces/media'
import React from 'react'
import RecommendedCard from './RecommendedCard'

const RecommendedDisplay = ({ mediaData }: {
    mediaData: (MovieI | SeriesI)[]
}) => {

    return (
        <div className='px-2 h-full flex gap-2 flex-col'>
            <h3 className='text-white font-bold text-lg'>Podria gustarte tambien: </h3>
            <section className='flex w-full gap-5  h-full'>
                {mediaData.map((media, index) => (
                    <RecommendedCard
                        key={index}
                        id={media.id}
                        image={media.poster_path}
                        title={(media as MovieI).title || (media as SeriesI).name}
                        type={('title' in media) ? 'movies' : 'series'}
                    />
                ))}
            </section>
        </div>
    )
}

export default RecommendedDisplay
