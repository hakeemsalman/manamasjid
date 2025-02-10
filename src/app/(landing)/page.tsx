import PrayerCard from "@/components/prayer-card";

import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  async function getModifiedData(
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    data: any[]
  ): Promise<{ label: string; value: string }[]> {
    return data.map((items) => ({
      label: items.name,
      value: items.id,
    }));
  }

  async function getMasjidNames() {
    try {
      const { data, error } = await supabase.from("masjids").select("*");
      if (error) throw error;
      return await getModifiedData(data || []);
    } catch (error) {
      throw error;
    }
  }

  const names = await getMasjidNames();

  return (
    <div className="flex flex-col items-center w-full gap-5 px-3 py-10">
      <div className="w-full md:max-w-sm">
        <PrayerCard masjidList={names} />
      </div>
    </div>
  );
}
