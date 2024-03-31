import Loader from '@/components/ui/Loader'

const loading = () => {
    return (
        <div className="flex items-center justify-center" data-testid="loader-testid">
            <Loader />
        </div>
    )
}

export default loading
