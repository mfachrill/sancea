import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function AdminReturnLink() {
  const [userId, setUserId] = useState<string | null>(null);
  const [adminId, setAdminId] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    let authChanged = false;
    void supabase.auth.getSession().then(({ data, error }) => {
      if (active && !authChanged && !error) setUserId(data.session?.user.id ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      authChanged = true;
      setUserId(session?.user.id ?? null);
      if (!session) setAdminId(null);
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);
  useEffect(() => {
    let active = true;
    if (userId) {
      void supabase.rpc("has_role", { _user_id: userId, _role: "admin" }).then(({ data, error }) => {
        if (active) setAdminId(!error && data ? userId : null);
      });
    }
    return () => { active = false; };
  }, [userId]);
  const fromAdmin = new URLSearchParams(window.location.search).get("from") === "admin";
  if (!fromAdmin || !userId || adminId !== userId) return null;
  return <Link to="/admin" aria-label="Kembali ke admin" title="Kembali ke admin" className="fixed left-4 top-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white shadow-sm backdrop-blur-md transition hover:bg-black/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><ArrowLeft size={21} aria-hidden="true" /></Link>;
}