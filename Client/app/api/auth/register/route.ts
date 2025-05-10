import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import crypto from "crypto";
import prisma from "@/lib/prisma"; // Import the singleton instance
import { sendVerificationEmail } from "@/lib/utils/mail";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, password } = body;

    // Validate input
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create user
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        verificationToken, // Match the schema field name
        provider: "local",
        emailVerified: false,
      },
    });

    // Send verification email
    const emailSent = await sendVerificationEmail(email, verificationToken);

    if (!emailSent) {
      // Optionally delete the user if email fails
      await prisma.user.delete({ where: { id: user.id } });
      return NextResponse.json(
        { success: false, error: "Failed to send verification email" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "deal_dash_sample_secret_key",
      { expiresIn: "1d" }
    );

    const cookie = serialize("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    const response = NextResponse.json({
      success: true,
      data: userWithoutPassword,
      message: "Registration successful",
    });

    response.headers.set("Set-Cookie", cookie);
    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
