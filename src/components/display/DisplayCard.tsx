import Image from 'next/image'
import React from 'react'

const DisplayCard = ({ id, image, name, score, description, releaseDate }:
    {
        id: number,
        image: string,
        name: string,
        score: number,
        description: string,
        releaseDate: string
    }) => {
    return (
        <div className='flex items-center justify-center h-full w-full bg-primary/40 rounded-md'>
            <Image src={`https://image.tmdb.org/t/p/w500${image}`} width={400} height={500} alt={name} className='max-h-[28rem] max-w-[20rem] border-2 border-primary p-1' />
            <div className='w-full flex flex-col h-full py-4 gap-5'>
                <h3 className='text-4xl text-fourth'>{name}</h3>
                <div className='flex flex-col w-full gap-2'>
                    <p className='text-left italic text-xs'><span className='font-bold'>Estreno: </span>{releaseDate}</p>
                    <p className='text-sm text-left line-clamp-6 h-full '>{description}</p>
                </div>
                <div className='flex p-10 w-full justify-end'>
                    <p className='text-fourth text-xl font-bold'><span>Puntaje: </span>{score.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

export default DisplayCard
