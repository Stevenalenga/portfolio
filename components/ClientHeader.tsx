"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "@/components/ui/header";

export default function ClientHeader() {
  const pathname = usePathname();
  const isBlogRoute = pathname?.startsWith("/blog");

  return !isBlogRoute ? <SiteHeader /> : null;
}
