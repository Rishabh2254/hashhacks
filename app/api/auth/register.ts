import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/auth";
import { UserRole } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password, displayName, role, gender, phoneNumber } = await request.json();
    
    // Validation
    if (!email || !password || !displayName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Additional validation for patients
    if (role === "patient" && (!gender || !phoneNumber)) {
      return NextResponse.json(
        { error: "Gender and phone number are required for patients" },
        { status: 400 }
      );
    }
    
    // Create additional data object for patient information
    const additionalData: Record<string, any> = {};
    if (role === "patient") {
      additionalData.gender = gender;
      additionalData.phoneNumber = phoneNumber;
    }
    
    // Register the user
    const userData = await registerUser(
      email, 
      password, 
      displayName, 
      (role as UserRole) || "patient",
      additionalData
    );
    
    // Return success
    return NextResponse.json({ success: true, user: userData }, { status: 201 });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}
