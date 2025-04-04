"use client"; // Convert to client component

import Image from "next/image";
import { useState } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "HealthConnect has made it so much easier to manage my healthcare needs. I can book appointments and access my records whenever I need to.",
      author: "Sarah Johnson",
      role: "Patient",
      avatar: "/avatar1.jpg"
    },
    {
      quote: "As a healthcare provider, this platform has streamlined my practice and helped me connect with patients more efficiently.",
      author: "Dr. Michael Chen",
      role: "Cardiologist",
      avatar: "/avatar2.jpg"
    },
    {
      quote: "The appointment reminders have been a lifesaver. I never miss a check-up or medication refill now.",
      author: "Robert Thompson",
      role: "Patient",
      avatar: "/avatar3.jpg"
    }
  ];

  // Create a state object to track fallback images
  const [imgFallbacks, setImgFallbacks] = useState<{[key: number]: boolean}>({});

  const handleImageError = (index: number) => {
    setImgFallbacks(prev => ({
      ...prev,
      [index]: true
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Testimonials from patients and healthcare providers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image 
                    src={imgFallbacks[index] ? "https://via.placeholder.com/48" : testimonial.avatar}
                    alt={testimonial.author} 
                    width={48} 
                    height={48}
                    onError={() => handleImageError(index)}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {testimonial.author}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
