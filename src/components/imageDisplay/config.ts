import * as collection from "@/assets/images/ImageDisplay/index";

interface ImageColection {
    direction: "left" | "right" | "down";
    images: string[];
    style?: {
        gridColumnStart: string;
        gridRow: string;
    };
}

const preloadImages = Object.values(collection).map((item) => item.src);

const sliceImages = (start: number, end: number) => {
    return preloadImages.slice(start, end);
};

export const imageColection: ImageColection[] = [
    {
        direction: "left",
        style: {
            gridColumnStart: '1',
            gridRow: 'span 5',
        },
        images: sliceImages(0, 3),
    },
    {
        direction: "right",
        style: {
            gridColumnStart: '2',
            gridRow: 'span 2',
        },
        images: sliceImages(3, 6),
    },
    {
        direction: "down",
        style: {
            gridColumnStart: '2',
            gridRow: 'span 3',
        },
        images: sliceImages(6, 9),
    },
];
