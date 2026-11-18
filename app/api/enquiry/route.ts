import { NextResponse } from 'next/server';
import { z } from 'zod';

const enquirySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address').max(254),
  company: z.string().max(150).optional(),
  service: z.string().max(100).optional(),
  project: z.string().min(1, 'Project details are required').max(3000)
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = enquirySchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid enquiry payload', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, company, service, project } = result.data;

    // Log the enquiry for production or connect to Resend / SendGrid / Webhook
    console.log('[OIKIA Enquiry Received]:', {
      name,
      email,
      company: company || 'N/A',
      service: service || 'General Enquiry',
      project,
      receivedAt: new Date().toISOString()
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry received. The OIKIA team will be in touch shortly.'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling enquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error processing enquiry' },
      { status: 500 }
    );
  }
}
