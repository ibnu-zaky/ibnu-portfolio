
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(`[Pageview] ${body.path} | ref: ${body.referrer} | at: ${body.timestamp}`);
    return NextResponse.json({ tracked: true });
  } catch (error) {
    return NextResponse.json({ tracked: false }, { status: 400 });
  }
}
