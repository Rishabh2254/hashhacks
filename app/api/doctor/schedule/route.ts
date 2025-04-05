import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const { doctorId, date, day, startTime, endTime, status } = await request.json();
    
    // Validate required fields
    if (!doctorId || !date || !day || !startTime || !endTime || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Validate that start time and end time are different
    if (startTime === endTime) {
      return NextResponse.json(
        { error: "Start time and end time cannot be the same" },
        { status: 400 }
      );
    }
    
    // Validate that end time is after start time
    if (startTime > endTime) {
      return NextResponse.json(
        { error: "End time must be after start time" },
        { status: 400 }
      );
    }
    
    // Check for existing schedules for this date
    const schedulesRef = collection(db, "doctorSchedules");
    const q = query(
      schedulesRef, 
      where("doctorId", "==", doctorId),
      where("date", "==", date)
    );
    
    const existingSchedules = await getDocs(q);
    
    // If there's an existing schedule, delete it (update operation)
    if (!existingSchedules.empty) {
      const batch = existingSchedules.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(batch);
    }
    
    // Create new schedule
    const newSchedule = {
      doctorId,
      date,
      day,
      startTime,
      endTime,
      status,
      createdAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, "doctorSchedules"), newSchedule);
    
    return NextResponse.json(
      { 
        success: true, 
        scheduleId: docRef.id,
        message: "Schedule updated successfully" 
      }, 
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating schedule:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update schedule" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const doctorId = url.searchParams.get('doctorId');
    
    if (!doctorId) {
      return NextResponse.json(
        { error: "Missing doctorId parameter" },
        { status: 400 }
      );
    }
    
    const schedulesRef = collection(db, "doctorSchedules");
    const q = query(
      schedulesRef, 
      where("doctorId", "==", doctorId)
    );
    
    const schedules = await getDocs(q);
    
    const scheduleData = schedules.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json(scheduleData, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching schedules:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch schedules" },
      { status: 500 }
    );
  }
}
