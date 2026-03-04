import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: name, email, subject, message",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address",
        },
        { status: 400 }
      );
    }

    // Save contact to backend database
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone: phone || undefined,
        subject,
        message,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Failed to save contact to backend:", result.message);
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Failed to send message. Please try again later.",
        },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! Our team will get back to you soon.",
      data: result.data,
    });
  } catch (error) {
    console.error("[POST /api/contact] Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const isDev = process.env.NODE_ENV !== "production";

    return NextResponse.json(
      {
        success: false,
        message: isDev
          ? `An error occurred while processing your request: ${errorMessage}`
          : "An error occurred while processing your request",
      },
      { status: 500 }
    );
  }
}
