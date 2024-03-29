'use client'
import { Silkscreen } from 'next/font/google'
import { motion } from 'framer-motion';
import { TEXT_DISPLAY_CONTENT } from './config';

const silkscreen = Silkscreen(
    {
        weight: "400",
        subsets: ['latin'],
    }
)

const SubNavbar = () => {
    return (
        <div className="overflow-hidden -6 bg-black px-2 w-full flex justify-start items-center">
            <motion.span
                initial={{ x: '-100vw' }}
                animate={{ x: '100vw' }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                }}
                className={`whitespace-nowrap ${silkscreen.className} text-yellow-400 text-sm`}
            >
                {TEXT_DISPLAY_CONTENT}
            </motion.span>
        </div>
    )
}

export default SubNavbar
