import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Draft URL parameters are honored only inside the same-origin admin preview.
export function useAdminPreview() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    try {
      if (window.parent === window || window.parent.location.origin !== window.location.origin ||
          window.parent.location.pathname !== "/admin") return;
    } catch { return; }
    let active = true;
    let generation = 0;
    const verify = async () => {
      const current = ++generation;
      setAllowed(false);
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) return;
        const result = await supabase.rpc("has_role", { _user_id: data.user.id, _role: "admin" });
        if (active && current === generation) setAllowed(!result.error && result.data === true);
      } catch { /* Fail closed. */ }
    };
    void verify();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      generation++;
      setAllowed(false);
      // Do not call auth methods inside the auth callback.
      window.setTimeout(() => { if (active) void verify(); }, 0);
    });
    return () => { active = false; generation++; subscription.unsubscribe(); };
  }, []);
  return allowed;
}