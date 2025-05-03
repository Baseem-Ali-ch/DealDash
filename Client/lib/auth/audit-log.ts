interface LoginAttempt {
  timestamp: string
  email: string
  ipAddress: string
  userAgent: string
  success: boolean
  failureReason?: string
}

// In a real app, this would be stored in a database
const auditLog: LoginAttempt[] = []

export function logLoginAttempt(
  email: string,
  ipAddress: string,
  userAgent: string,
  success: boolean,
  failureReason?: string,
): void {
  const attempt: LoginAttempt = {
    timestamp: new Date().toISOString(),
    email,
    ipAddress,
    userAgent,
    success,
    failureReason,
  }

  auditLog.push(attempt)

  // In a real app, save to database
  console.log("Login attempt logged:", attempt)
}

export function getRecentLoginAttempts(email: string, limit = 10): LoginAttempt[] {
  return auditLog
    .filter((attempt) => attempt.email === email)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
}
