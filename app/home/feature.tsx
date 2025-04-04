import { ArrowRight, Calendar, FileText, Users, Clock } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Easy Appointment Booking",
      description: "Schedule appointments with your preferred healthcare providers in just a few clicks."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Medical Records Access",
      description: "Securely access and manage your medical history and test results anytime."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Find Specialists",
      description: "Browse through profiles of healthcare specialists to find the right one for your needs."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Reminders & Notifications",
      description: "Get timely reminders for appointments and medication schedules."
    }
  ];

  return (
    <div id="features" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Features</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Everything you need to manage your healthcare in one place
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {feature.description}
              </p>
              <a 
                href="#" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
