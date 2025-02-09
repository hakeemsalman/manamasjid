import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const masjidId = searchParams.get("masjid_id");

  if (!masjidId) {
    return NextResponse.json({ error: "Missing masjid_id" }, { status: 400 });
  }

  const supabase = await createClient();
  const {data, error} = await supabase.from("prayer_times").select("*").eq("masjid_id",masjidId).order("created_at",{ascending: false}).limit(1)
  if(error) return NextResponse.json({ error: "Server error: "+error.message }, { status: 400 })
  return NextResponse.json({data});
}
