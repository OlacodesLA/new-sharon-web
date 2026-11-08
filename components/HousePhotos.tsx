import { Reveal } from "./Reveal";

const photos = [
  {
    src: "/images/home-sanctuary.jpg",
    alt: "The congregation seated inside Sharon Parish",
    className: "aspect-video",
    span: "md:col-span-7",
  },
  {
    src: "/images/home-gathering.jpg",
    alt: "The congregation gathered outside Sharon Parish",
    className: "aspect-[4/5] object-[center_40%] md:aspect-auto md:h-full",
    span: "md:col-span-5",
  },
];

export function HousePhotos() {
  return (
    <section aria-label="The house gathered" className="fluid-container">
      <div className="grid items-stretch gap-4 md:grid-cols-12">
        {photos.map((photo, index) => (
          <Reveal key={photo.src} delay={index * 0.08} className={photo.span}>
            <div className="h-full overflow-hidden rounded-1_5xl bg-charcoal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                className={`w-full object-cover ${photo.className}`}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
