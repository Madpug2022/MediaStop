import LoaderImg from '@/assets/logos/mediastop-high-resolution-logo-transparent.png'
import Image from 'next/image'
const Loader = () => {
    return (
        <div className="flex items-center justify-center">
            <Image src={LoaderImg} alt="Loader" width={60} height={60} className='animate-ping' />
        </div>
    )
}

export default Loader
