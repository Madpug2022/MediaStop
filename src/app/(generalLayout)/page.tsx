import { MOVIES } from "@/api/movies/Movies-api";
import { SERIES } from "@/api/series/Series-api";
import Display from "@/components/display/Display";
import DynamicImageDisplay from "@/components/imageDisplay/DynamicDisplat";
import Loader from "@/components/ui/Loader";
import { use } from "react";

export default function HomePage({ searchParams }: { searchParams: { page: string } }) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const locale: string = 'ES'
  const movieData = use(MOVIES.getPopularMovies(locale, page))
  const seriesData = use(SERIES.getPopularSeries(locale, page))
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
