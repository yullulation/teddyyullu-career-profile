export default function HighlightCircle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`group/circle relative inline-block px-1 ${className ?? ""}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="pointer-events-none absolute -inset-x-2 -inset-y-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+1rem)] overflow-visible"
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
      >
        <ellipse
          cx="100"
          cy="50"
          rx="97"
          ry="45"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          className="opacity-0 [filter:drop-shadow(0_0_5px_#8fe0b7)_drop-shadow(0_0_10px_rgba(143,224,183,0.55))] transition-[stroke-dashoffset,opacity] duration-[700ms] ease-out group-hover/circle:opacity-90 group-hover/circle:[stroke-dashoffset:0]"
        />
      </svg>
    </span>
  );
}
