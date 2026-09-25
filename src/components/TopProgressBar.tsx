interface TopProgressBarProps {
  progress: number;
}

/**
 * TopProgressBar: 2px electric orange bar indicating vertical scroll position.
 */
export function TopProgressBar({ progress }: TopProgressBarProps) {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-black/40 z-[70] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-[#FF5722] transition-all duration-75 ease-out shadow-[0_0_8px_#FF5722]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
