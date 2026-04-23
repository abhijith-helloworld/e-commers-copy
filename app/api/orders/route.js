import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const { amount } = await req.json();

    // Use environment variables for secure production deploy.
    // If none exist, we will use a fallback mock so the NextJS server doesn't crash.
    const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_key';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'mock_secret';

    const options = {
      amount: amount * 100, // Convert to smallest currency unit (paise)
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    // Simulate functionality locally if user hasn't added Razorpay keys yet
    if (!process.env.RAZORPAY_KEY_ID) {
       console.log("Mocking Razorpay Order generation as no env keys are present.");
       return NextResponse.json({
         id: "order_mock_" + Math.random().toString(36).substring(7),
         amount: options.amount,
         currency: "INR"
       });
    }

    // Initialize Razorpay
    const instance = new Razorpay({ key_id, key_secret });
    
    // Create authentic order securely on backend
    const order = await instance.orders.create(options);
    return NextResponse.json(order);

  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
