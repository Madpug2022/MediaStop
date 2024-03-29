'use client'
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideIn } from "./motions";
import { cn } from "@/helpers/TailwindMerger";

const DynamicImage = React.memo(
    ({
        className,
        images,
        direction,
    }: {
        className: any;
        images: string[];
        direction: "left" | "right" | "down";
    }) => {
        const [index, setIndex] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 7000);

            return () => clearInterval(interval);
        }, [images.length]);

        return (
            <div
                className={cn('w-full h-full overflow-hidden flex items-center justify-center')}
                style={className}
            >
                <AnimatePresence mode="wait" presenceAffectsLayout={false}>
                    <motion.img
                        key={images[index]}
                        className="w-full h-full object-cover rounded-2xl shadow-md overflow-hidden"
                        src={images[index]}
                        alt={`Image ${index}`}
                        variants={slideIn(direction, "tween", 0.5, 1)}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                    />
                </AnimatePresence>
            </div>
        );
    }
);

DynamicImage.displayName = "DynamicImage";

export default DynamicImage;
