import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OtpService {
  private otpStorage: Record<string, { otp: string; expiry: number }> = {};

  // Generate OTP
  generateOtp(): string {
    const otp = crypto.randomBytes(3).toString('hex'); // Generate a 6-digit OTP
    return otp;
  }

  // Store OTP with expiration time (e.g., 10 minutes)
  storeOtp(email: string, otp: string): void {
    const expiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    this.otpStorage[email] = { otp, expiry };
  }

  // Verify OTP
  verifyOtp(email: string, otp: string): boolean {
    const storedOtp = this.otpStorage[email];

    if (!storedOtp) return false;

    // Check if OTP is expired
    if (Date.now() > storedOtp.expiry) {
      delete this.otpStorage[email]; // Remove expired OTP
      return false;
    }

    // Check if OTP matches
    if (storedOtp.otp === otp) {
      delete this.otpStorage[email]; // OTP used, remove from storage
      return true;
    }

    return false;
  }
}

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Setup Nodemailer transport (e.g., using Gmail)
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'itcsbd2022@gmail.com', // Your email address
        pass: 'AIzaSyB2QQF46uKm85eNYYBlyf5LWhkvxc56a1A', // Your email password or app-specific password
      },
    });
  }

  // Send OTP via email
  async sendOtp(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP for resetting your password is: ${otp}. It will expire in 10 minutes.`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new Error('Failed to send OTP.');
    }
  }
}
