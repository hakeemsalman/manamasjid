import { PrayerForm } from "@/utils/PrayerForm";
import { createClient } from "@/utils/supabase/server";
import React from "react";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="py-10">
      <PrayerForm user={user} />
    </div>
  );
}
