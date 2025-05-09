"use client";
import { CustomSidebar } from "@/components/custom/CustomSidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Utility function to capitalize the first letter
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current path
  const pathSegments = pathname.split("/").filter((segment) => segment); // Split and filter path segments

  // Generate breadcrumb data dynamically
  const breadcrumbData = {
    link: `/${pathSegments[0]}/home`,
    label: pathSegments.length > 0 ? capitalize(pathSegments[0]) : "Doctor",
    page: pathSegments.length > 1 ? capitalize(pathSegments[pathSegments.length - 1]) : "Dashboard",
  };

  return (
    <main>
      <CustomSidebar breadcrumbData={breadcrumbData}>
        {children}
      </CustomSidebar>
    </main>
  );
}