import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import React from "react";
import LoggedUser from "../LoggedUser";
import { Button } from "./button";
import { redirect } from "next/navigation";

export default async function Navbar() {
  const supabase = await createClient();
  const getEmailName = (await supabase.auth.getUser()).data.user?.email
    ?.slice(0, 2)
    .toUpperCase();
  console.log(getEmailName);
  return (
    <div className="flex justify-between px-4 md:p-8 py-5">
      <div id="logo">
        <Image src={"/mosque-512.png"} width={20} height={20} alt="logo" />
      </div>
      {getEmailName ? (
        <LoggedUser userName={getEmailName} />
      ) : (
        <a href="/login">
          <Button>Login</Button>
        </a>
      )}
    </div>
  );
}
