import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { checkRateLimits, logCall } from '@/lib/callRateLimiter';

export async function POST(req: NextRequest) {
  try {
    const {
      from_number,
      to_number,
      override_agent_id,
      override_agent_version,
      metadata
    } = await req.json();

    if (!to_number) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const { allowed, reason } = await checkRateLimits(to_number);
    if (!allowed) {
      return NextResponse.json({ error: { message: reason } }, { status: 429 });
    }

    const RETELL_API_KEY = process.env.RETELL_API_KEY;
    if (!RETELL_API_KEY) {
      return NextResponse.json({ error: 'Missing Retell API key' }, { status: 500 });
    }

    const retellResponse = await axios.post(
      'https://api.retellai.com/v2/create-phone-call',
      {
        from_number,
        to_number,
        ...(override_agent_id && { override_agent_id }),
        ...(override_agent_version && { override_agent_version }),
        ...(metadata && { metadata }),
      },
      {
        headers: {
          Authorization: `Bearer ${RETELL_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    await logCall(to_number);

    return NextResponse.json(retellResponse.data, { status: retellResponse.status });

  } catch (error: any) {
    console.error('Error making call:', error);

    const status = error.response?.status || 500;
    const message = error.response?.data || error.message || 'Unknown error';

    return NextResponse.json({ error: message }, { status });
  }
}