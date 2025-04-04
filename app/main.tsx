import Link from "next/link";
import Image from "next/image";

// This is a server component that wraps all the main content
export default function MainPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900">
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
            <div className="hidden md:block relative h-[400px]">
              {/* Using a placeholder image instead of client-side error handling */}
              <img
                src="/next.svg"
                alt="Healthcare professionals"
                className="rounded-lg shadow-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
              Everything you need to manage your healthcare in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Easy Appointment Booking
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Schedule appointments with your preferred healthcare providers in just a few clicks.
              </p>
              <Link 
                href="#" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              >
                Learn more 
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Medical Records Access
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Securely access and manage your medical history and test results anytime.
              </p>
              <Link 
                href="#" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              >
                Learn more 
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Find Specialists
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Browse through profiles of healthcare specialists to find the right one for your needs.
              </p>
              <Link 
                href="#" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              >
                Learn more 
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Reminders & Notifications
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Get timely reminders for appointments and medication schedules.
              </p>
              <Link 
                href="#" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              >
                Learn more 
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Using static HTML instead of client components */}
      <section className="bg-white dark:bg-gray-900 py-16">
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
            {/* Testimonial 1 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img 
                    src="https://via.placeholder.com/48" 
                    alt="Sarah Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Sarah Johnson
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Patient
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "HealthConnect has made it so much easier to manage my healthcare needs. I can book appointments and access my records whenever I need to."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img 
                    src="https://via.placeholder.com/48" 
                    alt="Dr. Michael Chen" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Dr. Michael Chen
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Cardiologist
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "As a healthcare provider, this platform has streamlined my practice and helped me connect with patients more efficiently."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img 
                    src="https://via.placeholder.com/48" 
                    alt="Robert Thompson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Robert Thompson
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Patient
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "The appointment reminders have been a lifesaver. I never miss a check-up or medication refill now."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to take control of your healthcare?
            </h2>
            <p className="mt-4 text-lg leading-6 text-primary-foreground">
              Join thousands of users who are already managing their healthcare journey with ease.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 shadow"
              >
                Sign up for free
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-foreground/20 hover:bg-primary-foreground/30"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
