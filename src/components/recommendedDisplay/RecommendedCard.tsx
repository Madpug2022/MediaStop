import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RecommendedCard = (
    {
        id,
        type,
        image,
        title,
    }:
        {
            id: number,
            type: string,
            image: string,
            title: string
        }
) => {
    return (
        <Link
            href={`/${type}/${id}`}
            prefetch={true}
            className='group relative h-full w-44 flex flex-col items-center '>
            <img
                className='rounded-lg h-full w-full opacity-50 group-hover:opacity-100 transition-opacity duration-300'
                src={`https://image.tmdb.org/t/p/w500${image}`}
                alt='poster'
            />
            <p className='absolute bottom-0 text-xs w-full flex items-center justify-center text-center bg-black min-h-8 group-hover:text-fourth transition-colors duration-300'>{title}</p>
        </Link>
    )
}

export default RecommendedCard
