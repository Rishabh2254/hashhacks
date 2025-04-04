import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { doctorId } = body;

  if (!doctorId) {
    return NextResponse.json({ error: "Missing doctorId" }, { status: 400 });
  }

  const q = query(collection(db, "appointments"), where("doctorId", "==", doctorId));
  const snapshot = await getDocs(q);
  const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return NextResponse.json(appointments);
}
