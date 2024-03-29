import DynamicImage from "./DynamicImage";
import { imageColection } from "./config";

const DynamicImageDisplay = () => {
    return (
        <aside className="w-full h-full min-h-[80vh] max-h-[80vh] flex flex-col gap-2">
            <div className="w-full h-full grid grid-cols-2 grid-rows-5 gap-2 overflow-hidden object-center">
                {imageColection.map((image, index) => (
                    <DynamicImage
                        key={index}
                        direction={image.direction}
                        className={image.style}
                        images={image.images}
                    />
                ))}
            </div>
        </aside>
    );
};

export default DynamicImageDisplay;
