import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'

export async function POST(req) {
  try {
    const { amount } = await req.json()

    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_key'
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'mock_secret'

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Math.random().toString(36).slice(2)}`,
    }

    // Mock local behavior if keys are missing so checkout UI can still be tested.
    if (!process.env.RAZORPAY_KEY_ID) {
      return NextResponse.json({
        id: `order_mock_${Math.random().toString(36).slice(2)}`,
        amount: options.amount,
        currency: options.currency,
      })
    }

    const instance = new Razorpay({ key_id: keyId, key_secret: keySecret })
    const order = await instance.orders.create(options)

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || 'Razorpay order creation failed.' },
      { status: 500 }
    )
  }
}
