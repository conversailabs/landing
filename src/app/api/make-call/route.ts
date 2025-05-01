import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { checkRateLimits, logCall } from '@/lib/callRateLimiter';

interface CallRequestBody {
  to_number: string;
  call_type?: 'default' |  'ai';  // Define possible call types
  override_agent_version?: string;
  metadata?: Record<string, any>;
  retell_llm_dynamic_variables?: Record<string, any>;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CallRequestBody;
    const {
      to_number,
      call_type = 'default',  // Default if not specified
      override_agent_version,
      metadata,
      retell_llm_dynamic_variables
    } = body;

    if (!to_number) {
      return errorResponse('Destination phone number is required.', 400, 'MISSING_PARAMETER');
    }
    
    // Get from number from environment variables
    const from_number = process.env.FROM_NUMBER;
    if (!from_number) {
      console.error('Missing FROM_NUMBER environment variable.');
      return errorResponse('Internal configuration error.', 500, 'CONFIG_ERROR');
    }
    
    // Select the appropriate agent ID based on call type
    let override_agent_id: string | undefined;
    
    switch (call_type) {
      case 'ai':
        override_agent_id = process.env.OVERRIDE_AGENT_ID_DEMO;
        break;
      case 'default':
      default:
        override_agent_id = process.env.OVERRIDE_AGENT_ID;
        break;
    }
    
    if (!override_agent_id) {
      console.error(`Missing agent ID environment variable for call type: ${call_type}`);
      return errorResponse('Internal configuration error.', 500, 'CONFIG_ERROR');
    }

    // Check rate limits
    const { allowed, reason } = await checkRateLimits(to_number);
    if (!allowed) {
      return errorResponse(`Rate limit exceeded: ${reason}`, 429, 'RATE_LIMIT_EXCEEDED');
    }

    // Get API key
    const RETELL_API_KEY = process.env.RETELL_API_KEY;
    if (!RETELL_API_KEY) {
      console.error('Missing RETELL_API_KEY environment variable.');
      return errorResponse('Internal configuration error.', 500, 'CONFIG_ERROR');
    }

    // Build payload
    const payload: Record<string, any> = {
      from_number,
      to_number,
      override_agent_id,
      ...(override_agent_version && { override_agent_version }),
      ...(metadata && { metadata }),
      ...(retell_llm_dynamic_variables && { retell_llm_dynamic_variables })
    };

    // Make call to Retell API
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
    
    // Log the call
    const name = metadata?.name || retell_llm_dynamic_variables?.name || null;
    await logCall(to_number, name);

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