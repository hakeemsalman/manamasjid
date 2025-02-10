"use server";
import UserForm from "@/components/user-form";
import { createClient } from "@/utils/supabase/server";
import React from "react";

export default async function page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="pt-10 pb-20">
      <UserForm user={user} />
    </div>
  );
}
