"use client"; // Convert to client component

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [imgSrc, setImgSrc] = useState("/hero-image.jpg");

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Healthcare Made <span className="text-primary">Simple</span> and <span className="text-primary">Accessible</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Connect with healthcare professionals, manage appointments, and access your medical records - all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/register" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Get Started
              </Link>
              <Link 
                href="#features" 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <Image 
              src={imgSrc}
              alt="Healthcare professionals" 
              width={600} 
              height={400} 
              className="rounded-lg shadow-lg"
              onError={() => setImgSrc("/next.svg")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
