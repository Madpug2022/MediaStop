'use client'
/* eslint-disable */
import { MEDIA } from '@/api/media/media-api'
import { MovieI, SeriesI } from '@/interfaces/media'
import { useAppSelector } from '@/store/store'
import { Suspense, use, useEffect, useState } from 'react'
import error404 from '@/assets/images/404.png'
import Image from 'next/image'
import { getVoteAverageClass } from '@/helpers/averageScoreHelper'
import Loader from '@/components/ui/Loader'
import RecommendedDisplay from '@/components/recommendedDisplay/RecommendedDisplay'

const page = ({ params }: {
    params: {
        media: 'movies' | 'series',
        mediaId: string
    }
}) => {
    const [data, setData] = useState<MovieI | SeriesI | null>(useAppSelector(state => state.media[params.media].find(media => media.id == +params.mediaId)) || null);
    const [loading, setLoading] = useState(true);
    const [recommended, setRecommended] = useState<(MovieI | SeriesI)[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if (!data) {
            const endpoint = params.media === 'movies' ? 'movie' : 'tv';

            Promise.all([
                MEDIA.getMedia('US', endpoint, params.mediaId),
                MEDIA.getSimilarMedia('US', endpoint, params.mediaId)
            ]).then(([mediaRes, similarRes]) => {
                setData(mediaRes);
                setRecommended(similarRes.results);
            }).catch((e) => {
                setError(e.message)
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [params.media, params.mediaId]);

    if (loading) {
        return <Loader />;
    }

    if (!data || error) {
        return (
            <main className='w-full h-full flex items-center justify-center'>
                <div className='w-1/2 h-1/2 flex items-center flex-col justify-center p-4 gap-3'>
                    <Image src={error404} alt='404' width={250} height={250} className='rounded-lg' />
                    <h3 className='text-2xl font-bold text-fourth text-center'>No hemos encontrado lo que buscabas, por favor retorna por donde viniste</h3>
                </div>
            </main>
        );
    }

    return (
        <main className='w-full h-full flex items-center justify-center'>
            <div className='w-full h-full rounded-lg p-2 flex '>
                <Suspense fallback={<Loader />}>
                    <Image src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt={'Poster Image'} width={350} height={500} className='rounded-lg max-h-[500px] max-w-[350px]' />
                </Suspense>
                <div className='flex flex-col'>
                    <div className='flex flex-col p-2 h-full gap-2'>
                        <h2 className='text-4xl font-bold text-fourth'>{params.media == 'movies' ? (data as MovieI)?.title :
                            (data as SeriesI)?.name}</h2>
                        <p className='text-sm'>{data?.overview}</p>
                        <div className='flex gap-2 flex-col'>
                            <p className='text-xl'><span className='font-bold'>Fecha de lanzamiento: </span> {params.media == 'movies' ? (data as MovieI)?.release_date :
                                (data as SeriesI)?.first_air_date}</p>
                            <p className='text-xl'><span className='font-bold'>Popularidad: </span> {data?.popularity}</p>
                            <p className='text-xl mt-auto'><span className='font-bold'>Puntaje medio: </span> <span className={getVoteAverageClass(data?.vote_average!)}>{data?.vote_average}</span> de {data?.vote_count} votos</p>
                        </div>
                    </div>
                    <RecommendedDisplay mediaData={recommended.slice(0, 4)} />
                </div>
            </div>
        </main>
    )
}

export default page
