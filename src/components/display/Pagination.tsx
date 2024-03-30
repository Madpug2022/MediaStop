'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const Pagination = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const [page, setPage] = useState(searchParams.get('page') ?? 1);

    useEffect(() => {
        router.push(`?page=${page}`);
    }, [page, router]);

    const handlePrevPage = () => {
        setPage((currentPage) => Math.max(+currentPage - 1, 1));
    };

    const handleNextPage = () => {
        setPage((currentPage) => +currentPage + 1);
    };

    return (
        <div className='flex items-center gap-2'>
            <button onClick={handlePrevPage} className='text-fourth'>
                <IconChevronLeft />
            </button>
            <p>Pagina <span className='text-third font-bold'>{page}</span></p>
            <button onClick={handleNextPage} className='text-fourth'>
                <IconChevronRight />
            </button>
        </div>
    );
}

export default Pagination;
