// Neural Dispatch mark: three signals converge on a node and get dispatched forward.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 5.5 11 12M5 12h6M5 18.5 11 12M11 12h8M16 9l3 3-3 3" />
      <circle cx="4.5" cy="5" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="12" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="19" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="11.5" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
