import { Card } from "@/components/ui/card";
import Image from "next/image";

const attractions = [
  {
    name: "Roller Coaster",
    description: "Experience the thrill of our signature roller coaster with multiple loops and drops.",
    image: "https://res.cloudinary.com/db1nsxnit/image/upload/v1737296762/samples/balloons.jpg?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Water Slides",
    description: "Cool off in our water park featuring various slides and pools.",
    image: "https://res.cloudinary.com/db1nsxnit/image/upload/v1737296762/samples/balloons.jpg?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Ferris Wheel",
    description: "Take in breathtaking views of the park from our giant Ferris wheel.",
    image: "https://res.cloudinary.com/db1nsxnit/image/upload/v1737296762/samples/balloons.jpg?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Kids Zone",
    description: "A safe and fun area designed specifically for our younger visitors.",
    image: "https://res.cloudinary.com/db1nsxnit/image/upload/v1737296762/samples/balloons.jpg?q=80&w=2070&auto=format&fit=crop",
  },
];

export function AttractionsGrid() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 mx-[5%]">Our Attractions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-[10%]">
        {attractions.map((attraction, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={attraction.image}
                alt={attraction.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{attraction.name}</h3>
              <p className="text-sm text-muted-foreground">{attraction.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
