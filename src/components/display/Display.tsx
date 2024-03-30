'use client'

import { MovieI, SeriesI } from '@/interfaces/media'
import { storeData } from '@/store/slices/media.slice'
import { useAppDispatch } from '@/store/store'
import { useEffect, useState } from 'react'
import { TAB_ELEMENTS } from './config'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import DisplayCard from './DisplayCard'
import Pagination from './Pagination'

const Display = ({ movieData, seriesData }:
    {
        movieData: MovieI[],
        seriesData: SeriesI[]

    }) => {
    const [tab, setTab] = useState('movies')
    //Guardado en redux
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(storeData({ movies: movieData, series: seriesData }))
    }, [movieData, seriesData])
    return (
        <section
            className='w-full h-full flex flex-col items-center bg-black p-2 rounded-lg gap-2'>
            <nav className='w-full flex items-center justify-between'>
                <ul className='flex justify-start gap-2'>
                    {TAB_ELEMENTS.map((element, index) => (
                        <li
                            key={index}
                            className={`cursor-pointer p-2 rounded-lg hover:text-fourth transition-colors duration-300 ${tab === element.value ? 'border border-fourth text-fourth' : ''}`}
                            onClick={() => setTab(element.value)}
                        >
                            {element.name}
                        </li>
                    ))}
                </ul>
                <Pagination />
            </nav>
            <div className='p-3 flex items-center justify-center  w-full h-full'>
                <Carousel
                    showIndicators={false}
                    infiniteLoop={true}
                    showStatus={false}
                    className='w-full h-full! flex flex-col items-center'>
                    {tab === 'movies' ?
                        movieData.map((movie, index) => (
                            <div key={index} className='w-full h-full flex items-center justify-center'>
                                <DisplayCard
                                    id={movie.id}
                                    image={movie.poster_path}
                                    name={movie.title}
                                    score={movie.vote_average}
                                    description={movie.overview}
                                    releaseDate={movie.release_date}
                                    tab={tab}
                                />
                            </div>
                        ))
                        :
                        seriesData.map((serie, index) => (
                            <div key={index} className='w-full h-full flex items-center justify-center'>
                                <DisplayCard
                                    id={serie.id}
                                    image={serie.poster_path}
                                    name={serie.title}
                                    score={serie.vote_average}
                                    description={serie.overview}
                                    releaseDate={serie.first_air_date}
                                    tab={tab}
                                />
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        </section>
    )
}

export default Display
