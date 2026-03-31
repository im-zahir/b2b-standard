"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import MaintenanceNotice from "./MaintenanceNotice";

export default function MaintenanceWrapper({ children }: { children: React.ReactNode }) {
  const [maintenance, setMaintenance] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    async function checkMaintenance() {
      // Don't show maintenance notice on admin routes
      if (pathname.startsWith("/admin")) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("system_settings")
        .select("value")
        .eq("key", "maintenance_mode")
        .single();
      
      if (data) {
        setMaintenance(data.value === true);
      }
      setLoading(false);
    }
    checkMaintenance();
  }, [pathname]);

  if (loading) return children;

  return (
    <>
      {maintenance ? <MaintenanceNotice /> : null}
      {children}
    </>
  );
}
