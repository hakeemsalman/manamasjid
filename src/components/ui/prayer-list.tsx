import { Source_Sans_3 } from "next/font/google";
import React from "react";

const source3 = Source_Sans_3({ subsets: ["latin"] });

interface PrayerListProps {
  time: string;
  value: string;
}
const PrayerList: React.FC<PrayerListProps> = ({ time, value }) => {
  function formatTime(time: string) {
    if (!time) return "";

    // 🔹 Convert "22:21:00" to Date object
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds);

    // 🔹 Convert to user's preferred format
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Convert to 12-hour format
    });
  }

  return (
    <div
      className={`${source3} flex font-bold text-sm bg-white px-5 py-3 rounded-xl shadow-xl justify-between w-full `}
    >
      <span>{time.slice(0, 1).toUpperCase() + time.slice(1)}</span>
      <span>{formatTime(value)}</span>
    </div>
  );
};

export default PrayerList;
