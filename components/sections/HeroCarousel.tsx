import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

const carouselImages = [
  "https://res.cloudinary.com/db1nsxnit/image/upload/v1737296762/samples/balloons.jpg?q=80&w=2070&auto=format&fit=crop",
  "https://res.cloudinary.com/db1nsxnit/image/upload/v1737296762/samples/balloons.jpg?q=80&w=2070&auto=format&fit=crop",
  "https://res.cloudinary.com/db1nsxnit/image/upload/v1737296762/samples/balloons.jpg?q=80&w=2070&auto=format&fit=crop",
];

export function HeroCarousel() {
  return (
    <div className="max-w-full overflow-hidden">
      <Carousel className="w-full">
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`Carousel image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
