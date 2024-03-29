import dynamic from "next/dynamic";

const ImageDisplay = dynamic(() => import("@/components/imageDisplay/DynamicDisplat"), { ssr: false });

export default function HomePage() {
  return (
    <section className="flex w-full h-full">
      <div className="w-full h-full p-3"><ImageDisplay /></div>
      <div className="w-full">hi</div>
    </section>
  );
}
