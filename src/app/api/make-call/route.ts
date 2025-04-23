import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { checkRateLimits, logCall } from '@/lib/callRateLimiter';

interface CallRequestBody {
  from_number?: string;
  to_number: string;
  override_agent_id?: string;
  override_agent_version?: string;
  metadata?: Record<string, any>;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CallRequestBody;
    const {
      from_number,
      to_number,
      override_agent_id,
      override_agent_version,
      metadata
    } = body;

    if (!to_number) {
      return errorResponse('Destination phone number is required.', 400);
    }

    const { allowed, reason } = await checkRateLimits(to_number);
    if (!allowed) {
      return errorResponse(`Rate limit exceeded: ${reason}`, 429, 'RATE_LIMIT_EXCEEDED');
    }

    const RETELL_API_KEY = process.env.RETELL_API_KEY;
    if (!RETELL_API_KEY) {
      console.error('Missing RETELL_API_KEY environment variable.');
      return errorResponse('Internal configuration error.', 500, 'CONFIG_ERROR');
    }

    const payload: Record<string, any> = {
      from_number,
      to_number,
      ...(override_agent_id && { override_agent_id }),
      ...(override_agent_version && { override_agent_version }),
      ...(metadata && { metadata }),
    };

    const response = await axios.post(
      'https://api.retellai.com/v2/create-phone-call',
      payload,
      {
        headers: {
          Authorization: `Bearer ${RETELL_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    await logCall(to_number);

    return NextResponse.json(response.data, { status: response.status });

  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || error.message || 'Unexpected error occurred';
    const code = error.response?.data?.error?.code || 'INTERNAL_SERVER_ERROR';

    console.error('Call creation error:', {
      message,
      code,
      status,
      stack: error.stack || 'No stack trace'
    });

    return errorResponse(message, status, code);
  }
}

function errorResponse(message: string, status: number = 500, code?: string, details?: any) {
  return NextResponse.json(
    {
      error: {
        message,
        ...(code && { code }),
        ...(details && { details })
      }
    },
    { status }
  );
}
