"use client";

import Link from "next/link";
import Image from "next/image";

export default function MainPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-800 dark:text-blue-200 text-sm font-medium mb-4">
                Trusted by 10,000+ healthcare professionals
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                Healthcare Made <span className="text-primary">Simple</span> and <span className="text-primary">Accessible</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Connect with healthcare professionals, manage appointments, and access your medical records - all in one secure platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/register" 
                  className="px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center"
                >
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link 
                  href="/login" 
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-primary border border-primary font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center"
                >
                  Sign In
                </Link>
              </div>
              
              <div className="mt-10 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 overflow-hidden bg-gray-200">
                      <Image 
                        src={`https://randomuser.me/api/portraits/men/${i+10}.jpg`} 
                        alt="User" 
                        width={32} 
                        height={32} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-white">500+</span> healthcare providers joined this month
                </div>
              </div>
            </div>
            
            <div className="relative h-[400px] md:h-[500px]">
              <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-2xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary rounded-2xl transform -rotate-3 overflow-hidden">
                <Image 
                  src="/assets/healthcare-hero.jpg" 
                  alt="Healthcare professionals" 
                  fill
                  quality={90}
                  className="mix-blend-overlay opacity-40 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-xl max-w-xs">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Medical Excellence</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Trusted by professionals</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      "HealthConnect has transformed how I interact with my patients."
                    </p>
                    <div className="mt-4 flex items-center">
                      <Image 
                        src="https://randomuser.me/api/portraits/women/44.jpg" 
                        alt="Dr. Sarah" 
                        width={24} 
                        height={24} 
                        className="rounded-full mr-2" 
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Dr. Sarah Johnson, Cardiologist</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trusted by brands */}
          <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">
              TRUSTED BY LEADING HEALTHCARE INSTITUTIONS
            </p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {["Mayo Clinic", "Cleveland Clinic", "Johns Hopkins", "Mass General", "UCSF Medical"].map((brand) => (
                <span key={brand} className="text-gray-400 dark:text-gray-500 font-semibold text-lg">{brand}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium mb-4">
              Comprehensive Healthcare Platform
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Features designed for patients and healthcare providers</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-16">
              Everything you need to manage your healthcare journey in one secure, accessible platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 - For Patients */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
              <div className="h-14 w-14 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Easy Appointment Booking
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">
                Schedule appointments with your preferred healthcare providers in just a few clicks. Receive instant confirmations.
              </p>
              <Link 
                href="#" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm"
              >
                Learn more 
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Feature 2 - For Both */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
              <div className="h-14 w-14 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Medical Records Access
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">
                Securely access and manage medical history and test results anytime. Share records with authorized professionals.
              </p>
              <Link 
                href="#" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm"
              >
                Learn more 
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Feature 3 - For Doctors */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
              <div className="h-14 w-14 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Appointment Reminders
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">
                Get timely reminders for appointments and medication schedules. Reduce no-shows and improve care compliance.
              </p>
              <Link 
                href="#" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm"
              >
                Learn more 
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            {/* Feature 4 - For Doctors */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
              <div className="h-14 w-14 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Practice Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">
                Streamline your medical practice with integrated scheduling, patient records, and communication tools.
              </p>
              <Link 
                href="#" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm"
              >
                Learn more 
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            {/* Feature 5 - For Patients */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
              <div className="h-14 w-14 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Secure Messaging
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">
                Communicate directly with your healthcare providers in a secure, HIPAA-compliant environment.
              </p>
              <Link 
                href="#" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm"
              >
                Learn more 
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            {/* Feature 6 - For Both */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
              <div className="h-14 w-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Data Security & Privacy
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">
                Bank-level encryption and strict privacy controls ensure your medical data remains secure and confidential.
              </p>
              <Link 
                href="#" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm"
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

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium mb-4">
              Why Choose HealthConnect
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Healthcare technology you can trust</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We partner with leading healthcare providers to deliver a robust platform built on standards of excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">HIPAA Compliant</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fully compliant with healthcare privacy and security regulations
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Customizable</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tailored solutions for hospitals, clinics, and private practices
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fast & Reliable</h3>
              <p className="text-gray-600 dark:text-gray-300">
                99.9% uptime with fast, responsive performance
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dedicated technical support for healthcare providers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              HealthConnect is trusted by thousands of patients and healthcare providers across the country
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 - Patient */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 relative">
              <div className="absolute -top-4 left-8">
                <div className="inline-flex h-8 w-8 rounded-full bg-primary text-white items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
              </div>
              <div className="h-16 flex items-center">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="mt-4">
                <p className="text-gray-600 dark:text-gray-300 text-lg font-medium italic">
                  "HealthConnect has made it so much easier to manage my healthcare needs. I can book appointments and access my records whenever I need to."
                </p>
              </blockquote>
              <div className="mt-8 flex items-center">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image 
                    src="https://randomuser.me/api/portraits/women/33.jpg" 
                    alt="Sarah Johnson" 
                    width={48}
                    height={48}
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
            </div>

            {/* Testimonial 2 - Doctor */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 relative">
              <div className="absolute -top-4 left-8">
                <div className="inline-flex h-8 w-8 rounded-full bg-primary text-white items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
              </div>
              <div className="h-16 flex items-center">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="mt-4">
                <p className="text-gray-600 dark:text-gray-300 text-lg font-medium italic">
                  "As a healthcare provider, this platform has streamlined my practice and helped me connect with patients more efficiently."
                </p>
              </blockquote>
              <div className="mt-8 flex items-center">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image 
                    src="https://randomuser.me/api/portraits/men/56.jpg" 
                    alt="Dr. Michael Chen" 
                    width={48}
                    height={48}
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
            </div>

            {/* Testimonial 3 - Patient */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 relative">
              <div className="absolute -top-4 left-8">
                <div className="inline-flex h-8 w-8 rounded-full bg-primary text-white items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
              </div>
              <div className="h-16 flex items-center">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="mt-4">
                <p className="text-gray-600 dark:text-gray-300 text-lg font-medium italic">
                  "The appointment reminders have been a lifesaver. I never miss a check-up or medication refill now."
                </p>
              </blockquote>
              <div className="mt-8 flex items-center">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image 
                    src="https://randomuser.me/api/portraits/men/42.jpg" 
                    alt="Robert Thompson" 
                    width={48}
                    height={48}
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
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10k+</div>
              <p className="text-primary-foreground">Patients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1.5k+</div>
              <p className="text-primary-foreground">Doctors</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">250+</div>
              <p className="text-primary-foreground">Healthcare Facilities</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <p className="text-primary-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 blur-xl"></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Ready to transform your healthcare experience?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground mb-10">
              Join thousands of healthcare professionals and patients who are already managing their healthcare journey with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all"
              >
                Create Your Account
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-all"
              >
                Sign In
              </Link>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/80">
              No credit card required. Free plan available for patients.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}