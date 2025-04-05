'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/auth';
import { validateEmail, validatePassword } from '@/lib/utils';

// Define the UserRole type
type UserRole = 'patient' | 'doctor' | 'admin';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'patient', // Default role
    department: '', // Field for doctor's department
    location: '',   // New field for admin's location
    pincode: '',    // New field for admin's pincode
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const router = useRouter();

  // List of medical departments
  const departments = [
    'Cardiology',
    'Dermatology',
    'Endocrinology',
    'Gastroenterology',
    'General Medicine',
    'Neurology',
    'Obstetrics & Gynecology',
    'Oncology',
    'Ophthalmology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Pulmonology',
    'Radiology',
    'Urology'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear the error for this field when the user starts typing again
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Validate department if the role is doctor
    if (formData.role === 'doctor' && !formData.department) {
      newErrors.department = 'Please select a department';
    }
    
    // Validate location and pincode if the role is admin
    if (formData.role === 'admin') {
      if (!formData.location.trim()) {
        newErrors.location = 'Location is required';
      }
      if (!formData.pincode.trim()) {
        newErrors.pincode = 'Pincode is required';
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = 'Pincode must be 6 digits';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    
    if (!validate()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Additional user data based on the role
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        role: formData.role,
        ...(formData.role === 'doctor' && { department: formData.department }),
        ...(formData.role === 'admin' && { 
          location: formData.location,
          pincode: formData.pincode 
        }),
      };
      
      try {
        const result = await registerUser(
          formData.email,
          formData.password,
          formData.role as UserRole,
          undefined,
          userData
        );
        
        // If we get here without an error, registration was successful
        // Redirect to the appropriate dashboard based on role
        const dashboardPath = 
          formData.role === 'admin' ? '/dashboard/admin' : 
          formData.role === 'doctor' ? '/dashboard/doctor' : 
          '/dashboard/patient';
              
        router.push(dashboardPath);
      } catch (error: any) {
        setServerError(error.message || 'Registration failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setServerError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-8">
          <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Join HealthConnect</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create your account to access personalized healthcare services
          </p>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <button 
              onClick={() => setFormData({...formData, role: 'patient'})}
              className={`flex flex-col items-center px-4 py-2 rounded-lg border-2 transition-all ${formData.role === 'patient' ? 'border-primary bg-primary/10' : 'border-gray-200 dark:border-gray-700 hover:border-primary'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${formData.role === 'patient' ? 'text-primary' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className={`text-sm font-medium mt-1 ${formData.role === 'patient' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>Patient</span>
            </button>
            <button 
              onClick={() => setFormData({...formData, role: 'doctor'})}
              className={`flex flex-col items-center px-4 py-2 rounded-lg border-2 transition-all ${formData.role === 'doctor' ? 'border-primary bg-primary/10' : 'border-gray-200 dark:border-gray-700 hover:border-primary'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${formData.role === 'doctor' ? 'text-primary' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className={`text-sm font-medium mt-1 ${formData.role === 'doctor' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>Doctor</span>
            </button>
            <button 
              onClick={() => setFormData({...formData, role: 'admin'})}
              className={`flex flex-col items-center px-4 py-2 rounded-lg border-2 transition-all ${formData.role === 'admin' ? 'border-primary bg-primary/10' : 'border-gray-200 dark:border-gray-700 hover:border-primary'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${formData.role === 'admin' ? 'text-primary' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className={`text-sm font-medium mt-1 ${formData.role === 'admin' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>Hospital</span>
            </button>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-primary/90 font-medium">
              Sign in
            </Link>
          </p>
        </div>
        
        {serverError && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 rounded-md mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-200">{serverError}</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800 mb-6">
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">
              {formData.role === 'patient' ? 'Patient Registration' : 
               formData.role === 'doctor' ? 'Doctor Registration' : 'Hospital Registration'}
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              {formData.role === 'patient' ? 'Create your patient account to book appointments and access medical records.' : 
               formData.role === 'doctor' ? 'Register as a healthcare provider to manage appointments and patient care.' : 
               'Register your hospital or clinic to join our healthcare network.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${
                    errors.firstName ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${
                    errors.lastName ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className={`pl-10 block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
            )}
          </div>
          
          {/* Department selection for doctors */}
          {formData.role === 'doctor' && (
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Medical Specialty
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`pl-10 block w-full px-3 py-2 border ${
                    errors.department ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
                >
                  <option value="">Select your specialty</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              {errors.department && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.department}</p>
              )}
            </div>
          )}
          
          {/* Location and Pincode for Hospital/Clinic admins */}
          {formData.role === 'admin' && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Hospital/Clinic Location
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Full address"
                    className={`pl-10 block w-full px-3 py-2 border ${
                      errors.location ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Pincode
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    maxLength={6}
                    className={`pl-10 block w-full px-3 py-2 border ${
                      errors.pincode ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
                  />
                </div>
                {errors.pincode && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.pincode}</p>
                )}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className={`pl-10 block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>
          
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className={`pl-10 block w-full px-3 py-2 border ${
                    errors.confirmPassword ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="mt-2">
            <div className="flex items-center">
              <input 
                id="terms" 
                name="terms" 
                type="checkbox" 
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                I agree to the <a href="#" className="text-primary hover:text-primary/90">Terms of Service</a> and <a href="#" className="text-primary hover:text-primary/90">Privacy Policy</a>
              </label>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Create Account
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}