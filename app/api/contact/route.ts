
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "Semua field wajib diisi." }, { status: 400 });
    }

    console.log(`[Contact] ${name} <${email}>: ${message}`);
    return NextResponse.json({ success: true, message: "Pesan berhasil diterima! Terima kasih." });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Format data tidak valid." }, { status: 400 });
  }
}
