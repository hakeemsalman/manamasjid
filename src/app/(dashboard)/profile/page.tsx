"use server";
import UserForm from "@/components/user-form";
import { createClient } from "@/utils/supabase/server";
import React from "react";

export default async function page() {
  const supabase = await createClient();

  return (
    <div>
      <UserForm />
    </div>
  );
}
