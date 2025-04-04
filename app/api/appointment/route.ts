import { db } from "@/lib/firebase"; // Adjust path based on your project
import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, doctorId, time } = body;

    if (!patientId || !doctorId || !time) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "appointments"), {
      patientId,
      doctorId,
      time: new Date(time),
      status: "pending",
      createdAt: new Date()
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
