"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUserData, UserData } from "@/lib/auth";
import DoctorComponent from "./component/page";

export default function DoctorDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUserData();
        if (!user) {
          router.push("/login");
          return;
        }
        
        if (user.role !== "doctor") {
          router.push("/dashboard");
          return;
        }
        
        setUserData(user);
      } catch (error) {
        console.error("Authentication error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading doctor dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
      <p className="mb-8">Welcome, Dr. {userData.displayName}!</p>
      
      <DoctorComponent userData={userData} />
    </div>
  );
}
