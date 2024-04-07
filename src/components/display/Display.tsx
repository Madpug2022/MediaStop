'use client'

import { MovieI, SeriesI } from '@/interfaces/media'
import { storeData } from '@/store/slices/media.slice'
import { useAppDispatch } from '@/store/store'
import { useEffect, useState } from 'react'
import { TAB_ELEMENTS } from './config'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import React from 'react'
import DisplayCard from './DisplayCard'
import Pagination from './Pagination'
import Loader from '../ui/Loader'

const DisplayCardMemo = React.memo(DisplayCard);

const Display = ({ movieData, seriesData }:
    {
        movieData: MovieI[],
        seriesData: SeriesI[]

    }) => {
    const [tab, setTab] = useState('movies')
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(storeData({ movies: movieData, series: seriesData }))
    }, [dispatch, movieData, seriesData])

    const dataToDisplay = tab === 'movies' ? movieData : seriesData;
    const isDataLoaded = movieData && seriesData;

    return (
        <section
            data-testid="display-component"
            className='w-full h-full flex flex-col items-center bg-black p-2 rounded-lg gap-2'>
            <nav className='w-full flex items-center justify-between'>
                <ul className='flex justify-start gap-2'>
                    {TAB_ELEMENTS.map((element) => (
                        <li
                            data-testid={`tab-${element.value}`}
                            key={element.value}
                            className={`cursor-pointer p-2 rounded-lg hover:text-fourth transition-colors duration-300 ${tab === element.value ? 'border border-fourth text-fourth' : ''}`}
                            onClick={() => setTab(element.value)}
                        >
                            {element.name}
                        </li>
                    ))}
                </ul>
                <Pagination />
            </nav>
            {isDataLoaded ? (
                <div className='p-3 flex items-center justify-center w-full h-full'>
                    <Carousel
                        showIndicators={false}
                        infiniteLoop={true}
                        showStatus={false}
                        className='w-full h-full! flex flex-col items-center'>
                        {dataToDisplay.map((item) => (
                            <div key={item.id} className='w-full h-full flex items-center justify-center'>
                                <DisplayCardMemo
                                    id={item.id}
                                    image={item.poster_path}
                                    name={(item as MovieI).title || (item as SeriesI).name}
                                    score={item.vote_average}
                                    description={item.overview}
                                    releaseDate={(item as MovieI).release_date || (item as SeriesI).first_air_date}
                                    tab={tab}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
            ) : <Loader />}
        </section>
    )
}

export default Display
