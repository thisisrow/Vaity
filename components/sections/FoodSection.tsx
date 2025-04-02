import { Card } from "@/components/ui/card";
import Image from "next/image";

const foodGuides = [
    {
        title: "Breakfast Options",
        image: "https://res.cloudinary.com/db1nsxnit/image/upload/v1743606734/2_hz6svz.jpg?q=80&w=2070&auto=format&fit=crop",
        items: ["Continental Breakfast", "American Breakfast", "Healthy Options", "Kids' Menu"],
    },
    {
        title: "Lunch Specials",
        image: "https://res.cloudinary.com/db1nsxnit/image/upload/v1743606734/2_hz6svz.jpg?q=80&w=2070&auto=format&fit=crop",
        items: ["Burgers & Sandwiches", "Pizza", "Salads", "Combo Meals"],
    },
    {
        title: "Snacks & Treats",
        image: "https://res.cloudinary.com/db1nsxnit/image/upload/v1743606734/2_hz6svz.jpg?q=80&w=2070&auto=format&fit=crop",
        items: ["Ice Cream", "Cotton Candy", "Popcorn", "Soft Drinks"],
    },
];

export function FoodSection() {
    return (
        <>
            <section className="text-center">
                <h2 className="text-3xl font-bold mb-8">Ultimate Guide to Food & Dining</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl">
                    {foodGuides.map((guide, index) => (
                        <Card key={index} className="relative overflow-hidden group h-80 ">
                            <div
                                className="absolute inset-0 bg-cover bg-center h-full scale-100 group-hover:scale-110 transition-transform"
                                style={{
                                    backgroundImage: `url(${guide.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            ></div>
                            <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-black bg-opacity-50 text-white flex flex-col">
                                <h3 className="font-semibold mb-2">{guide.title}</h3>
                                <ul className="space-y-2 text-sm">
                                    {guide.items.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 transition-opacity"></div>
                        </Card>
                    ))}
                </div>
            </section>
        </>
    );
}