/* eslint-disable */
import { MOVIES } from "@/api/movies/Movies-api";
import { SERIES } from "@/api/series/Series-api";
import Display from "@/components/display/Display";
import DynamicImageDisplay from "@/components/imageDisplay/DynamicDisplat";
import { MovieResultsI, SeriesResultsI } from "@/interfaces/media";
import { Suspense } from "react";
import Loading from "./loading";

/*Normalmente no lo construiria asi, pero tuve que cambiar ciertas cosas porque la version de Jest no detecta nuevos cambios mas actuales en Reactt 18 y Next */
/*
Si estubiera usando react completamente sin server side components la construccion del componente seria distinta:
export default function HomePage({ searchParams = { page: '1' } }) {
  const page = parseInt(searchParams.page) || 1;
  const [movieData, setMovieData] = useState<MovieResultsI | null>(null);
  const [seriesData, setSeriesData] = useState<SeriesResultsI | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movies = await MOVIES.getPopularMovies('ES', page);
        const series = await SERIES.getPopularSeries('ES', page);
        setMovieData(movies);
        setSeriesData(series);
      } catch (e) {
        setError('Hubo un error en la red por favor intenta recargando la página');
      }
    };

    fetchData();
  }, [page]);

  if (error) {
    return <section className="flex w-full h-full">{error}</section>;
  }

  return (
    <section className="flex w-full h-full">
      <div className="w-1/2 h-full p-3"><DynamicImageDisplay /></div>
      <div className="w-1/2">{movieData && seriesData ?
        <Display movieData={movieData.results} seriesData={seriesData.results} />
        :
        <Loader />}</div>
    </section>
  );
}
*/

export default async function HomePage({ searchParams = { page: '1' } }: { searchParams: { page: string } }) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const locale = 'ES'

  const movieData: MovieResultsI = await MOVIES.getPopularMovies(locale, page)
  const seriesData: SeriesResultsI = await SERIES.getPopularSeries(locale, page)


  if (!movieData || !seriesData) {
    return (
      <section className="flex w-full h-full">
        Hubo un error en la red por favor intenta recargando la pagina
      </section>
    )
  }

  return (
    <Suspense fallback={<Loading />}>
      <section className="flex w-full h-full">
        <div className="w-1/2 h-full p-3"><DynamicImageDisplay /></div>
        <div className="w-1/2">
          <Display movieData={movieData.results} seriesData={seriesData.results} />
        </div>
      </section>
    </Suspense>
  );
}
