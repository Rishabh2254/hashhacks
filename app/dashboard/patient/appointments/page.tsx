"use client";

import { useEffect, useState } from "react";
import { getPatientAppointments, AppointmentData } from "@/lib/appointment";
import { Calendar, Clock, User, Tag, CheckCircle, XCircle, MessageSquare } from "lucide-react";

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const data = await getPatientAppointments();
        setAppointments(data);
      } catch (err: any) {
        setError(err.message || "Failed to load appointments");
      } finally {
        setLoading(false);
      }
    }
    
    fetchAppointments();
  }, []);

  // Sort appointments by date & time
  const sortedAppointments = [...appointments].sort((a, b) => {
    // Compare dates first
    const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    if (dateComparison !== 0) return dateComparison;
    
    // If dates are the same, compare times
    return a.time.localeCompare(b.time);
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Appointments</h1>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md p-4 text-red-700 dark:text-red-300">
          {error}
        </div>
      ) : sortedAppointments.length === 0 ? (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center">
          <div className="mx-auto w-16 h-16 mb-4 text-blue-500 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
            <Calendar size={28} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Appointments Yet</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You don't have any scheduled appointments. Use the chatbot or book an appointment to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedAppointments.map((appointment) => (
            <div 
              key={appointment.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border-l-4 
                ${appointment.status === 'completed' ? 'border-green-500' : 
                  appointment.status === 'cancelled' ? 'border-red-500' : 'border-blue-500'} 
                overflow-hidden transition-all hover:shadow-lg`}
            >
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {appointment.source === 'chatbot' ? (
                        <div className="bg-primary/10 p-2 rounded-md">
                          <MessageSquare size={20} className="text-primary" />
                        </div>
                      ) : (
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
                          <Calendar size={20} className="text-blue-500 dark:text-blue-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {appointment.specialty}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Dr. {appointment.doctorName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : 
                        appointment.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 
                        'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}
                    >
                      {appointment.status === 'scheduled' ? (
                        <>
                          <Clock size={12} className="mr-1" />
                          Scheduled
                        </>
                      ) : appointment.status === 'completed' ? (
                        <>
                          <CheckCircle size={12} className="mr-1" />
                          Completed
                        </>
                      ) : (
                        <>
                          <XCircle size={12} className="mr-1" />
                          Cancelled
                        </>
                      )}
                    </span>
                    {appointment.source === 'chatbot' && (
                      <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20">
                        <MessageSquare size={10} className="mr-1" />
                        Chatbot
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {new Date(appointment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{appointment.time}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end space-x-2">
                  {appointment.status === 'scheduled' && (
                    <>
                      <button 
                        className="px-3 py-1.5 text-xs bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        Reschedule
                      </button>
                      <button 
                        className="px-3 py-1.5 text-xs bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 rounded hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
