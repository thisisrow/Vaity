'use client';

import Link from "next/link";
import { Home, Map, UtensilsCrossed, Camera } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden">
      <div className="container h-full mx-auto">
        <div className="grid h-full grid-cols-5">
          <Link
            href="/"
            className={cn(
              "inline-flex flex-col items-center justify-center px-5",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>

          <Link
            href="/attractions"
            className={cn(
              "inline-flex flex-col items-center justify-center px-5",
              pathname === "/attractions" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Map className="w-5 h-5" />
            <span className="text-xs">Map</span>
          </Link>

          <Link
            href="#"
            className="inline-flex flex-col items-center justify-center px-5"
          >
            <div className="relative -top-5">
              <div className="absolute inset-0 rounded-full bg-primary flex items-center justify-center p-4">
                <span className="text-xs font-medium text-primary-foreground whitespace-nowrap">
                  Book Now
                </span>
              </div>
            </div>
          </Link>

          <Link
            href="/food"
            className={cn(
              "inline-flex flex-col items-center justify-center px-5",
              pathname === "/food" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <UtensilsCrossed className="w-5 h-5" />
            <span className="text-xs">Food</span>
          </Link>

          <Link
            href="/social"
            className={cn(
              "inline-flex flex-col items-center justify-center px-5",
              pathname === "/social" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Camera className="w-5 h-5" />
            <span className="text-xs">Social</span>
          </Link>
        </div>
      </div>
    </div>
  );
}