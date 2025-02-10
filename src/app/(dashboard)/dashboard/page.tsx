"use server";
import { PrayerForm } from "@/utils/PrayerForm";
import { createClient } from "@/utils/supabase/server";
import React from "react";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("masjids")
    .select("name, id")
    .eq("profile_id", user?.id)
    .order("created_at", { ascending: true })
    .single();
  return (
    <div className="pt-10 pb-5">
      <PrayerForm user={user} prayerData={data} />
    </div>
  );
}
