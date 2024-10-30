// components/ClientSpeedInsights.js
"use client"; // Makes sure this component is client-only

import { SpeedInsights } from '@vercel/speed-insights/next';

export default function ClientSpeedInsights() {
  return (
    <SpeedInsights /> // No need to wrap around children here since it returns null
  );
}
