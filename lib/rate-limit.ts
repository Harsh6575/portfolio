const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const requests = new Map<string, { count: number; resetAt: number }>();
let lastSweep = Date.now();

function sweepExpired(now: number) {
  if (now - lastSweep < WINDOW_MS) {
    return;
  }

  for (const [identifier, entry] of requests) {
    if (now > entry.resetAt) {
      requests.delete(identifier);
    }
  }

  lastSweep = now;
}

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  sweepExpired(now);

  const entry = requests.get(identifier);

  if (!entry || now > entry.resetAt) {
    requests.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}
