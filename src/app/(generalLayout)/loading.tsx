import Loader from "@/components/ui/Loader"

const Loading = () => {
    return (
        <div className="flex items-center justify-center" data-testid="loader-testid">
            <Loader />
        </div>
    )
}

export default Loading
