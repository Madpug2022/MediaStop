/* eslint-disable */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import HomePage from '@/app/(generalLayout)/page';
import HomeLayout from '@/app/(generalLayout)/layout';
import * as MoviesApi from '@/api/movies/Movies-api';
import * as SeriesApi from '@/api/series/Series-api';
import { screen } from '@testing-library/react';
import { POPULAR_MOVIES_RESULT_MOCK } from './mocks/movies.mock';
import { POPULAR_SERIES_RESPONSE_MOCK } from './mocks/series.mock';
import Display from '@/components/display/Display';
import { MovieI, SeriesI } from '@/interfaces/media';

// Mock de los módulos de API y sus métodos
jest.mock('@/api/movies/Movies-api', () => ({
    MOVIES: {
        getPopularMovies: jest.fn(),
    },
}));
jest.mock('@/api/series/Series-api', () => ({
    SERIES: {
        getPopularSeries: jest.fn(),
    },
}));

jest.mock('next/navigation', () => {
    return {
        __esModule: true,
        useRouter: () => ({
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn()
        }),
        useSearchParams: () => ({
            get: () => { }
        })
    }
})

//Funcion helper para poder resolver el componente HomePage, que es async, por algun motivo este bug aun no se ha solucionado desde julio del 2023
async function resolvedComponent(Component: { ({ searchParams }: { searchParams: { page: string; }; }): Promise<React.JSX.Element>; (arg0: any): any; }, props: { searchParams: { page: string; }; }) {
    const ComponentResolved = await Component(props)
    return () => ComponentResolved
}

describe('HomePage', () => {

    describe('cuando la carga de datos es exitosa', () => {
        beforeEach(() => {
            (MoviesApi.MOVIES.getPopularMovies as jest.Mock).mockResolvedValue(POPULAR_MOVIES_RESULT_MOCK);
            (SeriesApi.SERIES.getPopularSeries as jest.Mock).mockResolvedValue(POPULAR_SERIES_RESPONSE_MOCK);
        });

        it('debería renderizar el componente Display cuando los datos están disponibles', async () => {
            const searchParams = { page: '1' };
            const HomePageResolved = await resolvedComponent(HomePage, { searchParams });
            render(
                <HomeLayout>
                    <HomePageResolved />
                </HomeLayout>);

            const displayComponent = await screen.findByTestId('display-component');
            expect(displayComponent).toBeInTheDocument();
        });

        it('debería renderizar el componente DynamicImageDisplay cuando los datos están disponibles', async () => {
            const searchParams = { page: '1' };
            const HomePageResolved = await resolvedComponent(HomePage, { searchParams });
            render(
                <HomeLayout>
                    <HomePageResolved />
                </HomeLayout>);

            const dynamicImageDisplayComponent = await screen.findByTestId('imageDisplay');
            expect(dynamicImageDisplayComponent).toBeInTheDocument();
        });

        test('debe cambiar de movies a series y mostrar el contenido correspondiente', () => {
            render(
                <HomeLayout>
                    <Display movieData={POPULAR_MOVIES_RESULT_MOCK.results} seriesData={POPULAR_SERIES_RESPONSE_MOCK.results} />
                </HomeLayout>
            );
            const seriesTab = screen.getByTestId('tab-series');
            fireEvent.click(seriesTab);

            const seriesTitles = screen.getAllByText(POPULAR_SERIES_RESPONSE_MOCK.results[0]!.name);
            expect(seriesTitles.length).toBeGreaterThan(0)

        });

    })
    describe('cuando la carga de datos es exitosa y se utiliza un param de pagina distinto al 1', () => {
        beforeEach(() => {
            (MoviesApi.MOVIES.getPopularMovies as jest.Mock).mockResolvedValue(POPULAR_MOVIES_RESULT_MOCK);
            (SeriesApi.SERIES.getPopularSeries as jest.Mock).mockResolvedValue(POPULAR_SERIES_RESPONSE_MOCK);
        });

        it('debería renderizar el componente Display cuando los datos están disponibles', async () => {
            const searchParams = { page: '3' };
            const HomePageResolved = await resolvedComponent(HomePage, { searchParams });
            render(
                <HomeLayout>
                    <HomePageResolved />
                </HomeLayout>);

            const displayComponent = await screen.findByTestId('display-component');
            expect(displayComponent).toBeInTheDocument();
        });


    })
    describe('cuando aun se estan cargando los datos', () => {
        it('muestra un loader mientras los datos están cargando', async () => {
            render(
                <HomeLayout>
                    <Display movieData={undefined as unknown as MovieI[]} seriesData={undefined as unknown as SeriesI[]} />
                </HomeLayout>);

            const loader = await screen.findByTestId('loader-testid');
            expect(loader).toBeInTheDocument();
        });
    })

    describe('cuando la carga de datos falla', () => {
        beforeEach(() => {
            (MoviesApi.MOVIES.getPopularMovies as jest.Mock).mockResolvedValue(undefined);
            (SeriesApi.SERIES.getPopularSeries as jest.Mock).mockResolvedValue(undefined);
        });

        it('debería renderizar el componente ErrorPage cuando los datos no están disponibles', async () => {
            const searchParams = { page: '1' };
            const HomePageResolved = await resolvedComponent(HomePage, { searchParams });
            render(
                <HomeLayout>
                    <HomePageResolved />
                </HomeLayout>);

            const errorPageComponent = await screen.findByText(/hubo un error en la red por favor intenta recargando la pagina/i);
            expect(errorPageComponent).toBeInTheDocument();
        });
    });

})
