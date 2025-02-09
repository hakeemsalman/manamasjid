"use client";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import MasjidSelector from "./masjid-selector";
import PrayerList from "./ui/prayer-list";

export default function PrayerCard({
  masjidList,
}: {
  masjidList:
    | {
        label: string;
        value: string;
      }[]
    | undefined;
}) {
  const [prayerData, setPrayerData] = useState<any[]>([]);
  const [updatedDate, setUpdatedDate] = useState<string>("");

  async function getModifiedData(data: any) {
    console.log("modifying data", data);
    return data.map((item: any) => {
      return [
        { time: "fajr", value: item.fajr },
        { time: "zohar", value: item.zohar },
        { time: "asr", value: item.asr },
        { time: "maghrib", value: item.maghrib },
        { time: "isha", value: item.isha },
        { time: "maghrib waqf", value: item.maghrib_waqf },
      ];
    });
  }

  const handleChange = async (e: string) => {
    try {
      const { data } = await fetch(`/api/prayer-times?masjid_id=${e}`).then(
        (res) => res.json()
      );
      const [modifiedData] = await getModifiedData(data);
      setUpdatedDate(new Date(data[0].created_at).toDateString());
      console.log("prayer-card", modifiedData);
      setPrayerData(modifiedData);
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <Label>Please Select Masjid</Label>
      <MasjidSelector items={masjidList} change={handleChange} />
      <div className="flex flex-col w-full gap-5 px-3 py-10">
        {prayerData.map((item, index) => (
          <PrayerList key={index} time={item.time} value={item.value} />
        ))}
      </div>
      {updatedDate && (
        <span className="px-5">Last updated: {updatedDate} </span>
      )}
    </>
  );
}
