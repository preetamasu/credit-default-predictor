export function normalizePrediction(p) {
  if (!p) return p
  return {
    ...p,
    applicationId: p.applicationId ?? p.application_Id ?? null,
  }
}

export function normalizeCustomer(c) {
  if (!c) return c
  return {
    ...c,
    id: c.id ?? c.customerId ?? c.customer_id ?? null,
    createdAt: c.createdAt ?? c.created_at ?? null,
  }
}

export function normalizeApplication(a) {
  if (!a) return a
  return {
    ...a,
    id: a.id ?? a.applicationId ?? a.application_id ?? null,
    customerId: a.customerId ?? a.customer_id ?? a.customer ?? null,
    createdAt: a.createdAt ?? a.created_at ?? null,
  }
}
