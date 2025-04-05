"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { 
  bookAppointment, 
  getAvailableTimeSlots, 
  getDoctorsBySpecialty, 
  getAllSpecialties,
  AppointmentData
} from "@/lib/appointment";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface Option {
  value: string;
  label: string;
}

interface OptionsMessageProps {
  options: Option[];
  onSelect: (value: string) => void;
}

// Options component for interactive selection
function OptionsMessage({ options, onSelect }: OptionsMessageProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(option.value)}
          className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-3 py-1.5 rounded-md transition-colors"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// Booking state interface to track the appointment booking process
interface BookingState {
  isBooking: boolean;
  step: 'specialty' | 'doctor' | 'date' | 'time' | 'confirmation' | 'complete';
  specialty: string | null;
  doctor: string | null;
  doctorId: string | null;
  date: string | null;
  time: string | null;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! How can I help with your healthcare needs today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  // Initialize booking state
  const [bookingState, setBookingState] = useState<BookingState>({
    isBooking: false,
    step: 'specialty',
    specialty: null,
    doctor: null,
    doctorId: null,
    date: null,
    time: null
  });
  
  // State for dynamic data
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<{id: string, name: string}[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [specialtyOptions, setSpecialtyOptions] = useState<Option[]>([]);
  const [doctorOptions, setDoctorOptions] = useState<Option[]>([]);
  const [timeOptions, setTimeOptions] = useState<Option[]>([]);
  const [showOptions, setShowOptions] = useState<{
    type: 'specialty' | 'doctor' | 'time' | 'confirm' | null;
    options: Option[];
  }>({ type: null, options: [] });
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    if (isOpen) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus on input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Load specialties when starting the booking process
  const startBookingProcess = async () => {
    setIsLoading(true);
    
    try {
      const specialtiesList = await getAllSpecialties();
      setSpecialties(specialtiesList);
      
      const options = specialtiesList.map(s => ({ value: s, label: s }));
      setSpecialtyOptions(options);
      
      setBookingState({
        isBooking: true,
        step: 'specialty',
        specialty: null,
        doctor: null,
        doctorId: null,
        date: null,
        time: null
      });
      
      // Send a message to guide the user
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: "I'll help you book an appointment. Please select a medical specialty:",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
      setShowOptions({
        type: 'specialty',
        options: options
      });
    } catch (error) {
      const errorMessage: Message = {
        id: `bot-error-${Date.now()}`,
        content: "Sorry, I couldn't load the specialties. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle option selection
  const handleOptionSelect = (value: string) => {
    // Add user selection as a message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: value,
      isUser: true,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setShowOptions({ type: null, options: [] });
    
    // Process the selected option
    processBookingStep(value);
  };

  // Process the user's input based on the current booking step
  const processBookingStep = async (userInput: string) => {
    const input = userInput.trim();
    
    switch(bookingState.step) {
      case 'specialty':
        const specialty = specialties.find(s => 
          input.toLowerCase().includes(s.toLowerCase())
        );
        
        if (specialty) {
          setIsLoading(true);
          
          try {
            const doctorsList = await getDoctorsBySpecialty(specialty);
            setDoctors(doctorsList);
            setBookingState(prev => ({ ...prev, specialty, step: 'doctor' }));
            
            // Create doctor options
            const options = doctorsList.map(d => ({ value: d.name, label: d.name }));
            setDoctorOptions(options);
            
            // Send confirmation and next step
            const confirmMessage: Message = {
              id: `bot-confirm-${Date.now()}`,
              content: `Great, you've selected ${specialty}. Now please choose a doctor:`,
              isUser: false,
              timestamp: new Date()
            };
            
            setMessages(prev => [...prev, confirmMessage]);
            
            setShowOptions({
              type: 'doctor',
              options: options
            });
          } catch (error) {
            const errorMessage: Message = {
              id: `bot-error-${Date.now()}`,
              content: "Sorry, I couldn't load the doctors. Please try again later.",
              isUser: false,
              timestamp: new Date()
            };
            
            setMessages(prev => [...prev, errorMessage]);
          } finally {
            setIsLoading(false);
          }
        } else {
          // Send error message
          const errorMessage: Message = {
            id: `bot-error-${Date.now()}`,
            content: `I don't recognize that specialty. Please select from the options.`,
            isUser: false,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, errorMessage]);
          // Show options again
          setShowOptions({
            type: 'specialty',
            options: specialtyOptions
          });
        }
        break;
        
      case 'doctor':
        const doctor = doctors.find(d => 
          input.toLowerCase().includes(d.name.toLowerCase())
        );
        
        if (doctor) {
          setBookingState(prev => ({ 
            ...prev, 
            doctor: doctor.name,
            doctorId: doctor.id,
            step: 'date'
          }));
          
          // Send confirmation and next step
          const confirmMessage: Message = {
            id: `bot-confirm-${Date.now()}`,
            content: `You've selected ${doctor.name}. Please enter a preferred date (e.g., YYYY-MM-DD):`,
            isUser: false,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, confirmMessage]);
        } else {
          // Send error message
          const errorMessage: Message = {
            id: `bot-error-${Date.now()}`,
            content: `I don't recognize that doctor. Please select from the options.`,
            isUser: false,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, errorMessage]);
          // Show options again
          setShowOptions({
            type: 'doctor',
            options: doctorOptions
          });
        }
        break;
        
      case 'date':
        // Simple date validation - would be more robust in production
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (dateRegex.test(input)) {
          setIsLoading(true);
          
          try {
            if (!bookingState.doctorId) throw new Error("Missing doctor ID");
            
            const availableSlots = await getAvailableTimeSlots(bookingState.doctorId, input);
            setTimeSlots(availableSlots);
            
            // Create time options
            const options = availableSlots.map(t => ({ value: t, label: t }));
            setTimeOptions(options);
            
            setBookingState(prev => ({ ...prev, date: input, step: 'time' }));
            
            // Send confirmation and next step
            const confirmMessage: Message = {
              id: `bot-confirm-${Date.now()}`,
              content: `Date selected: ${input}. Please select a time slot:`,
              isUser: false,
              timestamp: new Date()
            };
            
            setMessages(prev => [...prev, confirmMessage]);
            
            setShowOptions({
              type: 'time',
              options: options
            });
          } catch (error) {
            const errorMessage: Message = {
              id: `bot-error-${Date.now()}`,
              content: "Sorry, I couldn't load the available time slots. Please try again later.",
              isUser: false,
              timestamp: new Date()
            };
            
            setMessages(prev => [...prev, errorMessage]);
          } finally {
            setIsLoading(false);
          }
        } else {
          // Send error message
          const errorMessage: Message = {
            id: `bot-error-${Date.now()}`,
            content: "Please enter a valid date in YYYY-MM-DD format (e.g., 2023-11-30)",
            isUser: false,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, errorMessage]);
        }
        break;
        
      case 'time':
        const timeSlot = timeSlots.find(t => 
          input.toLowerCase().includes(t.toLowerCase())
        );
        
        if (timeSlot) {
          setBookingState(prev => ({ ...prev, time: timeSlot, step: 'confirmation' }));
          
          // Send confirmation message
          const summaryMessage: Message = {
            id: `bot-summary-${Date.now()}`,
            content: `Here's your appointment summary:\n\nSpecialty: ${bookingState.specialty}\nDoctor: ${bookingState.doctor}\nDate: ${bookingState.date}\nTime: ${timeSlot}\n\nWould you like to confirm this appointment?`,
            isUser: false,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, summaryMessage]);
          
          setShowOptions({
            type: 'confirm',
            options: [
              { value: 'yes', label: 'Yes, confirm' },
              { value: 'no', label: 'No, cancel' }
            ]
          });
        } else {
          // Send error message
          const errorMessage: Message = {
            id: `bot-error-${Date.now()}`,
            content: `I don't recognize that time. Please select from the options.`,
            isUser: false,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, errorMessage]);
          // Show options again
          setShowOptions({
            type: 'time',
            options: timeOptions
          });
        }
        break;
        
      case 'confirmation':
        if (input.toLowerCase() === 'yes' || input.toLowerCase() === 'y') {
          setIsLoading(true);
          
          try {
            // Call API to book appointment
            const appointmentData: AppointmentData = {
              doctorName: bookingState.doctor || "",
              specialty: bookingState.specialty || "",
              date: bookingState.date || "",
              time: bookingState.time || ""
            };
            
            const result = await bookAppointment(appointmentData);
            
            if (result.success) {
              // Complete booking process
              setBookingState(prev => ({ ...prev, step: 'complete' }));
              
              // Send success message
              const successMessage: Message = {
                id: `bot-success-${Date.now()}`,
                content: `Great! Your appointment with ${bookingState.doctor} has been booked for ${bookingState.date} at ${bookingState.time}. Appointment ID: ${result.appointmentId}\n\nYou will receive a confirmation email shortly. Is there anything else I can help you with?`,
                isUser: false,
                timestamp: new Date()
              };
              
              setMessages(prev => [...prev, successMessage]);
              
              // Reset booking state after a delay
              setTimeout(() => {
                setBookingState({
                  isBooking: false,
                  step: 'specialty',
                  specialty: null,
                  doctor: null,
                  doctorId: null,
                  date: null,
                  time: null
                });
              }, 2000);
            } else {
              throw new Error(result.message);
            }
          } catch (error: any) {
            // Send error message
            const errorMessage: Message = {
              id: `bot-error-${Date.now()}`,
              content: `I'm sorry, there was a problem booking your appointment: ${error.message || "Unknown error"}. Please try again later.`,
              isUser: false,
              timestamp: new Date()
            };
            
            setMessages(prev => [...prev, errorMessage]);
          } finally {
            setIsLoading(false);
          }
        } else if (input.toLowerCase() === 'no' || input.toLowerCase() === 'n') {
          // Cancel booking
          setBookingState({
            isBooking: false,
            step: 'specialty',
            specialty: null,
            doctor: null,
            doctorId: null,
            date: null,
            time: null
          });
          
          // Send cancellation message
          const cancelMessage: Message = {
            id: `bot-cancel-${Date.now()}`,
            content: "I've canceled this appointment booking. Is there anything else I can help you with?",
            isUser: false,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, cancelMessage]);
        } else {
          // Send error message
          const errorMessage: Message = {
            id: `bot-error-${Date.now()}`,
            content: "Please answer with 'yes' or 'no' to confirm the appointment.",
            isUser: false,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, errorMessage]);
          // Show confirmation options again
          setShowOptions({
            type: 'confirm',
            options: [
              { value: 'yes', label: 'Yes, confirm' },
              { value: 'no', label: 'No, cancel' }
            ]
          });
        }
        break;
        
      default:
        break;
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message to chat
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");

    // Check if we're in booking mode
    if (bookingState.isBooking) {
      processBookingStep(userInput);
      return;
    }

    // Check if the user wants to book an appointment
    if (userInput.toLowerCase().includes("book") && 
        (userInput.toLowerCase().includes("appointment") || 
         userInput.toLowerCase().includes("doctor"))) {
      startBookingProcess();
      return;
    }

    // Regular chat flow - generate response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: generateResponse(userInput),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  // Simple response generator based on keywords
  const generateResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("appointment") || lowerQuery.includes("book")) {
      return "Would you like to book an appointment with a doctor? Simply type 'book appointment' and I'll guide you through the process.";
    } else if (lowerQuery.includes("doctor") || lowerQuery.includes("specialist")) {
      return "We have various specialists available. You can book an appointment with a specialist by typing 'book appointment'. What kind of specialist are you looking for?";
    } else if (lowerQuery.includes("record") || lowerQuery.includes("medical history")) {
      return "Your medical records can be found in the 'Medical Records' tab. Is there something specific you're looking for?";
    } else if (lowerQuery.includes("prescription") || lowerQuery.includes("medicine")) {
      return "You can view your prescriptions in the 'Medical Records' section. Would you like me to help you find something specific?";
    } else if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
      return "Hello! How can I assist with your healthcare needs today? You can book an appointment by typing 'book appointment'.";
    } else {
      return "Thank you for your message. How else can I help you with your healthcare needs today? Remember, you can book an appointment by typing 'book appointment'.";
    }
  };

  // Allow external components to open the chatbot
  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
        // Optional: Automatically start booking flow
        startBookingProcess();
      }, 100);
    };
    
    window.addEventListener('openChatbot', handleOpenChatbot);
    
    return () => {
      window.removeEventListener('openChatbot', handleOpenChatbot);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out">
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white">
                <MessageSquare size={16} />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">HealthConnect Assistant</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Book appointments instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs opacity-70 block mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Show option buttons */}
            {showOptions.type && (
              <div className="flex justify-start">
                <div className="max-w-[80%]">
                  <OptionsMessage 
                    options={showOptions.options} 
                    onSelect={handleOptionSelect} 
                  />
                </div>
              </div>
            )}
            
            <div ref={messageEndRef} />
          </div>
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="px-4 py-2 text-center">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Processing...</p>
            </div>
          )}
          
          {/* Quick action buttons - displayed when not in booking flow */}
          {!bookingState.isBooking && !isLoading && (
            <div className="px-4 pt-2 flex flex-wrap gap-2">
              <button 
                onClick={() => {
                  startBookingProcess();
                }}
                className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
              >
                <span className="flex items-center">
                  <Calendar size={12} className="mr-1" />
                  Book Appointment
                </span>
              </button>
            </div>
          )}
          
          {/* Input area */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={bookingState.isBooking ? `Enter your ${bookingState.step}...` : "Type your message..."}
                disabled={isLoading}
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="ml-2 bg-primary text-white rounded-full p-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white rounded-full p-3 shadow-lg hover:bg-primary/90 transition-transform duration-300 ease-in-out transform hover:scale-110"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageSquare size={24} />
        )}
      </button>
    </div>
  );
}
