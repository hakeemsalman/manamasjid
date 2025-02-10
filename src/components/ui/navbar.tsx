import { createClient } from "@/utils/supabase/server";
import React from "react";
import LoggedUser from "../LoggedUser";
import { Button } from "./button";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ weight: ["500"], subsets: ["latin"] });

export default async function Navbar() {
  const supabase = await createClient();
  const getEmailName = (await supabase.auth.getUser()).data.user?.email
    ?.slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex justify-between items-center px-4 md:p-8 py-5">
      <Link href={"/"}>
        <div id="logo" className={`${poppins.className}`}>
          <span>Manamasjid</span>
          {/* <Image src={"/mosque-512.png"} width={20} height={20} alt="logo" /> */}
        </div>
      </Link>
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
