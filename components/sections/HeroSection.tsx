import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-[100vh] rounded-lg overflow-hidden ">
      <Image
        src="https://res.cloudinary.com/db1nsxnit/image/upload/v1743604141/resortanimated_lbpjbq.gif?q=80&w=2070&auto=format&fit=crop"
        alt="Theme Park"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/30">
        <div className="container h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold m-6">Welcome to Adventure Park</h1>
            <p className="text-xl m-8">
              Experience thrilling rides, delicious food, and unforgettable moments.
            </p>
            <Link href="/booking">
              <Button size="lg" className="m-4">
                Book Tickets
              </Button>
            </Link>
            <Link href="/attractions">
              <Button size="lg" className="m-4">
                View Attractions
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}