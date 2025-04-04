import dynamic from "next/dynamic";
import Features from "./feature";
import CTA from "./CTA";

// Dynamically import client components
const Hero = dynamic(() => import("./Hero"), { ssr: true });
const Testimonials = dynamic(() => import("./Testimonials"), { ssr: true });

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  );
}
