import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';


@Injectable()
export class OtpService {
  private otpStorage: Record<string, { otp: string; expiry: number }> = {};

  generateOtp(): string {
    const otp = crypto.randomBytes(3).toString('hex'); 
    return otp;
  }

  storeOtp(email: string, otp: string): void {
    const expiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    this.otpStorage[email] = { otp, expiry };
  }

  verifyOtp(email: string, otp: string): boolean {
    const storedOtp = this.otpStorage[email];

    if (!storedOtp) return false;


    if (Date.now() > storedOtp.expiry) {
      delete this.otpStorage[email]; 
      return false;
    }

    if (storedOtp.otp === otp) {
      delete this.otpStorage[email]; 
      return true;
    }

    return false;
  }
}

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {


    const EMAIL_USER = 'itcsbd2022@gmail.com';
    //const EMAIL_PASSWORD = 'AIzaSyB2QQF46uKm85eNYYBlyf5LWhkvxc56a1A';
    const EMAIL_PASSWORD = 'qzvm zwnn bqwd oicn';
    this.transporter = nodemailer.createTransport({
      //service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587, // or 465 for SSL
      secure: false, // true for 465, false for other ports
      auth: {
        //user: 'itcsbd2022@gmail.com', // Your email address
        //pass: 'AIzaSyB2QQF46uKm85eNYYBlyf5LWhkvxc56a1A', // Your email password or app-specific password
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });
  }

  async sendOtp(email: string, otp: string): Promise<void> {
    const EMAIL_USER = 'itcsbd2022@gmail.com';
    const mailOptions = {
      from: EMAIL_USER,
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
