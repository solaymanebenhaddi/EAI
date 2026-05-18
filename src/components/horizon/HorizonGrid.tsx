export function HorizonGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
      {/* Vertical lines */}
      <div className="absolute left-[16.66%] top-0 w-px h-full bg-eai-charcoal" />
      <div className="absolute left-[33.33%] top-0 w-px h-full bg-eai-charcoal" />
      <div className="absolute left-[50%] top-0 w-px h-full bg-eai-charcoal" />
      <div className="absolute left-[66.66%] top-0 w-px h-full bg-eai-charcoal" />
      <div className="absolute left-[83.33%] top-0 w-px h-full bg-eai-charcoal" />
      {/* Horizontal lines */}
      <div className="absolute top-[25%] left-0 w-full h-px bg-eai-charcoal" />
      <div className="absolute top-[50%] left-0 w-full h-px bg-eai-charcoal" />
      <div className="absolute top-[75%] left-0 w-full h-px bg-eai-charcoal" />
    </div>
  );
}
