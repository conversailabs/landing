import { supabaseAdmin } from './supabaseAdmin';

const DAILY_LIMIT = 100;
const USER_LIMIT = 3;

export async function checkRateLimits(to_number: string) {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const [globalRes, userRes] = await Promise.all([
    supabaseAdmin
      .from('call_logs')
      .select('id', { count: 'exact', head: true })
      .gte('timestamp', since),

    supabaseAdmin
      .from('call_logs')
      .select('id', { count: 'exact', head: true })
      .eq('to_number', to_number)
      .gte('timestamp', since)
  ]);

  if (globalRes.count !== null && globalRes.count >= DAILY_LIMIT) {
    return { allowed: false, reason: 'Daily limit of 100 calls reached' };
  }

  if (userRes.count !== null && userRes.count >= USER_LIMIT) {
    return { allowed: false, reason: 'This number has received 3 calls in the last 24 hours' };
  }

  return { allowed: true };
}

export async function logCall(to_number: string) {
  await supabaseAdmin.from('call_logs').insert({ to_number });
}