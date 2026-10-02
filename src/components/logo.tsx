import Image from "next/image";
import { cn } from "@/lib/utils";
import logoLight from "../../public/logo-light.png";
import logoDark from "../../public/logo-dark.png";

// Navy "Dispatch" for light mode, white "Dispatch" for dark mode.
export function Logo({ className }: { className?: string }) {
  return (
    <>
      <Image src={logoLight} alt="Neural Dispatch" priority className={cn("w-auto dark:hidden", className)} />
      <Image src={logoDark} alt="Neural Dispatch" priority className={cn("w-auto hidden dark:block", className)} />
    </>
  );
}
