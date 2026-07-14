// ============================================================================
// Delivery & Pincode utilities
// ----------------------------------------------------------------------------
// Pure, framework-agnostic helpers so the estimate logic stays modular and can
// be swapped for a real backend API later (see getDeliveryEstimate note).
// ============================================================================

export interface DeliveryEstimate {
  zone: string
  days: string
  message: string
}

// Static informational timelines shown in the Shipping & Returns summary.
export const DELIVERY_ZONES = {
  north: { zone: 'Punjab & nearby North India', days: '3–5 business days' },
  southWest: { zone: 'South & West India', days: '6–7 business days' },
  restOfIndia: { zone: 'Rest of India', days: '6–7 business days' },
  international: {
    zone: 'International',
    days: 'around 10+ business days depending on shipping delays'
  }
} as const

export interface PincodeValidation {
  valid: boolean
  error?: string
}

/**
 * Validate an Indian pincode.
 * Accepts numbers only, exactly 6 digits. Rejects letters, symbols, spaces
 * and emojis, returning a specific message for each failure case.
 */
export function validatePincode(raw: string): PincodeValidation {
  if (!raw || raw.length === 0) {
    return { valid: false, error: 'Please enter your 6-digit pincode.' }
  }
  if (/\s/.test(raw)) {
    return { valid: false, error: 'Spaces are not allowed. Enter 6 digits only.' }
  }
  if (!/^[0-9]+$/.test(raw)) {
    return { valid: false, error: 'Only numbers are allowed — no letters, symbols or emojis.' }
  }
  if (raw.length !== 6) {
    return { valid: false, error: 'Pincode must be exactly 6 digits.' }
  }
  return { valid: true }
}

/**
 * Map a valid 6-digit Indian pincode to a delivery estimate.
 *
 * NOTE: This is intentionally a pure function keyed off the pincode prefix so
 * it can be replaced with a backend serviceability/ETA lookup without touching
 * the UI. International estimates are handled by the backend (country context)
 * and surfaced statically in the Shipping & Returns copy for now.
 */
export function getDeliveryEstimate(pincode: string): DeliveryEstimate {
  const first = pincode.charAt(0)

  // North India — Delhi, Punjab, Haryana, HP, J&K, Chandigarh, UP, Uttarakhand
  if (first === '1' || first === '2') {
    const z = DELIVERY_ZONES.north
    return { ...z, message: `Delivery to ${z.zone}: ${z.days}.` }
  }

  // South & West India — Rajasthan, Gujarat, Maharashtra, MP, Karnataka, TN, Kerala…
  if (first === '3' || first === '4' || first === '5' || first === '6') {
    const z = DELIVERY_ZONES.southWest
    return { ...z, message: `Delivery to ${z.zone}: ${z.days}.` }
  }

  // East & remaining Indian regions (7, 8, 9, 0)
  const z = DELIVERY_ZONES.restOfIndia
  return { ...z, message: `Delivery to ${z.zone}: ${z.days}.` }
}
