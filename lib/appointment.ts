/**
 * Appointment service for handling appointment-related operations
 */
import { getAuth } from "firebase/auth";

// Appointment interface
export interface AppointmentData {
  id?: string;
  patientId?: string;
  patientName?: string;
  doctorId?: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status?: 'scheduled' | 'completed' | 'cancelled';
  createdAt?: string;
  source?: 'chatbot' | 'form' | 'dashboard';
}

/**
 * Book an appointment through the API
 */
export async function bookAppointment(appointmentData: AppointmentData): Promise<{ success: boolean, message: string, appointmentId?: string }> {
  try {
    // Get current user
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error("You must be logged in to book an appointment");
    }
    
    // Generate a random appointment ID for demo purposes
    const appointmentId = `APT${Math.floor(Math.random() * 10000)}`;
    
    // Prepare appointment data
    const appointment: AppointmentData = {
      ...appointmentData,
      id: appointmentId,
      patientId: user.uid,
      patientName: user.displayName || user.email || 'Patient',
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      source: 'chatbot'
    };
    
    // In a real application, this would call your backend API
    // For now, we'll save to localStorage for demonstration
    const existingAppointments = JSON.parse(localStorage.getItem('patientAppointments') || '{}');
    
    // Initialize user appointments array if it doesn't exist
    if (!existingAppointments[user.uid]) {
      existingAppointments[user.uid] = [];
    }
    
    // Add new appointment
    existingAppointments[user.uid].push(appointment);
    
    // Save to localStorage
    localStorage.setItem('patientAppointments', JSON.stringify(existingAppointments));
    
    // Mock successful response
    return {
      success: true,
      message: "Appointment booked successfully",
      appointmentId
    };
  } catch (error: any) {
    console.error("Error booking appointment:", error);
    return {
      success: false,
      message: error.message || "Failed to book appointment. Please try again later."
    };
  }
}

/**
 * Get all appointments for the current patient
 */
export async function getPatientAppointments(): Promise<AppointmentData[]> {
  try {
    // Get current user
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error("You must be logged in to view appointments");
    }
    
    // In a real application, this would call your backend API
    // For now, we'll fetch from localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('patientAppointments') || '{}');
    
    // Return user appointments or empty array
    return existingAppointments[user.uid] || [];
  } catch (error) {
    console.error("Error getting appointments:", error);
    return [];
  }
}

/**
 * Get available time slots for a doctor on a specific date
 */
export async function getAvailableTimeSlots(doctorId: string, date: string): Promise<string[]> {
  try {
    // In a real application, this would call your backend API
    // For now, we'll return mock time slots
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock time slots
    return ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];
  } catch (error) {
    console.error("Error getting time slots:", error);
    return [];
  }
}

/**
 * Get available doctors by specialty
 */
export async function getDoctorsBySpecialty(specialty: string): Promise<{ id: string, name: string }[]> {
  try {
    // In a real application, this would call your backend API
    // For now, we'll return mock doctors
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock doctors data
    const mockDoctors = {
      'Cardiology': [
        { id: 'doc1', name: 'Dr. Smith' },
        { id: 'doc2', name: 'Dr. Johnson' }
      ],
      'Dermatology': [
        { id: 'doc3', name: 'Dr. Williams' },
        { id: 'doc4', name: 'Dr. Davis' }
      ],
      'Neurology': [
        { id: 'doc5', name: 'Dr. Brown' },
        { id: 'doc6', name: 'Dr. Miller' }
      ],
      'Orthopedics': [
        { id: 'doc7', name: 'Dr. Wilson' },
        { id: 'doc8', name: 'Dr. Moore' }
      ],
      'Pediatrics': [
        { id: 'doc9', name: 'Dr. Taylor' },
        { id: 'doc10', name: 'Dr. Anderson' }
      ],
      'Psychiatry': [
        { id: 'doc11', name: 'Dr. Thomas' },
        { id: 'doc12', name: 'Dr. Jackson' }
      ]
    };
    
    return mockDoctors[specialty as keyof typeof mockDoctors] || [];
  } catch (error) {
    console.error("Error getting doctors:", error);
    return [];
  }
}

/**
 * Get all available specialties
 */
export async function getAllSpecialties(): Promise<string[]> {
  try {
    // In a real application, this would call your backend API
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock specialties
    return ['Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Psychiatry'];
  } catch (error) {
    console.error("Error getting specialties:", error);
    return [];
  }
}
