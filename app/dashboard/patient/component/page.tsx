"use client";

import { useState } from "react";
import { UserData } from "@/lib/auth";
import Chatbot from "@/app/components/Chatbot";

interface PatientComponentProps {
  userData: UserData;
}

export default function PatientComponent({ userData }: PatientComponentProps) {
  const [activeTab, setActiveTab] = useState("appointments");
  
  return (
    <div>
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`${
              activeTab === "appointments"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            My Appointments
          </button>
          <button
            onClick={() => setActiveTab("medical-records")}
            className={`${
              activeTab === "medical-records"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Medical Records
          </button>
          <button
            onClick={() => setActiveTab("book-appointment")}
            className={`${
              activeTab === "book-appointment"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Book Appointment
          </button>
        </nav>
      </div>

      {activeTab === "appointments" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <p className="text-gray-500 dark:text-gray-400">
                You don't have any upcoming appointments.
              </p>
              <button
                onClick={() => setActiveTab("book-appointment")}
                className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium"
              >
                Book an appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "medical-records" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Medical Records</h2>
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <p className="text-gray-500 dark:text-gray-400">
                Your medical records will appear here.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "book-appointment" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <form className="space-y-6">
                <div>
                  <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select Doctor
                  </label>
                  <select
                    id="doctor"
                    name="doctor"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                  >
                    <option>Dr. Smith (Cardiologist)</option>
                    <option>Dr. Johnson (Dermatologist)</option>
                    <option>Dr. Williams (Neurologist)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Time
                  </label>
                  <select
                    id="time"
                    name="time"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                  >
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>1:00 PM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reason for Visit
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Please describe your symptoms or reason for the appointment"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Add the Chatbot component */}
      <Chatbot />
    </div>
  );
}
