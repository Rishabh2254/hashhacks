"use client";

import { useState } from "react";
import { UserData } from "@/lib/auth";

interface DoctorComponentProps {
  userData: UserData;
}

export default function DoctorComponent({ userData }: DoctorComponentProps) {
  const [activeTab, setActiveTab] = useState("appointments");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [timeError, setTimeError] = useState("");
  const [dateError, setDateError] = useState("");
  
  // Validate that end time is after start time
  const validateTimes = () => {
    if (!startTime || !endTime) {
      setTimeError("Both start and end times are required");
      return false;
    }
    
    if (startTime === endTime) {
      setTimeError("End time must be different from start time");
      return false;
    }
    
    if (startTime > endTime) {
      setTimeError("End time must be after start time");
      return false;
    }
    
    setTimeError("");
    return true;
  };

  // Validate date
  const validateDate = () => {
    if (!selectedDate) {
      setDateError("Date is required");
      return false;
    }
    
    const today = new Date().toISOString().split('T')[0];
    if (selectedDate < today) {
      setDateError("Date cannot be in the past");
      return false;
    }
    
    setDateError("");
    return true;
  };
  
  // Handle form submission
  const handleSubmitSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isTimeValid = validateTimes();
    const isDateValid = validateDate();
    
    if (!isTimeValid || !isDateValid) {
      return;
    }
    
    try {
      // Get form data
      const form = e.target as HTMLFormElement;
      const day = (form.querySelector('#day') as HTMLSelectElement).value;
      const status = (form.querySelector('#status') as HTMLSelectElement).value;
      
      const scheduleData = {
        doctorId: userData.uid,
        date: selectedDate,
        day,
        startTime,
        endTime,
        status
      };
      
      // Send data to API
      const response = await fetch('/api/doctor/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Success! Display success message or update UI
        alert('Schedule updated successfully!');
        
        // Reset form
        setSelectedDate('');
        setStartTime('');
        setEndTime('');
      } else {
        // Handle error
        alert(`Failed to update schedule: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating schedule:', error);
      alert('An error occurred while updating your schedule.');
    }
  };

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
            Upcoming Appointments
          </button>
          <button
            onClick={() => setActiveTab("patients")}
            className={`${
              activeTab === "patients"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            My Patients
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`${
              activeTab === "schedule"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            My Schedule
          </button>
        </nav>
      </div>

      {activeTab === "appointments" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                Today&apos;s Schedule
              </h3>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:p-6">
                <p className="text-gray-500 dark:text-gray-400">
                  You have no appointments scheduled for today.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "patients" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Patients</h2>
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <p className="text-gray-500 dark:text-gray-400">
                You don&apos;t have any patients assigned yet.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "schedule" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Schedule</h2>
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mb-4">
                Set Your Availability
              </h3>
              <form className="space-y-6" onSubmit={handleSubmitSchedule}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="day" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Day
                    </label>
                    <select
                      id="day"
                      name="day"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                    >
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                      <option>Sunday</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                    >
                      <option>Available</option>
                      <option>Unavailable</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  />
                  {dateError && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">{dateError}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Time
                    </label>
                    <input
                      type="time"
                      name="start-time"
                      id="start-time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Time
                    </label>
                    <input
                      type="time"
                      name="end-time"
                      id="end-time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                
                {timeError && (
                  <p className="text-sm text-red-600 dark:text-red-500">{timeError}</p>
                )}
                
                <div>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Update Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
