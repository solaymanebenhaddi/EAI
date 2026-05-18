export function HorizonLight() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Soft ambient light from top */}
      <div className="absolute inset-0 bg-gradient-to-b from-eai-brass-pale/10 via-transparent to-transparent" />
      {/* Subtle warm glow from right */}
      <div className="absolute inset-0 bg-gradient-to-l from-eai-sand/5 via-transparent to-transparent" />
    </div>
  );
}
