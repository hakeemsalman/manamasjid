"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@supabase/supabase-js";
import { createClient } from "./supabase/client";

type PrayerTimeField = "fajr" | "zohar" | "asr" | "maghrib" | "isha";

const prayerTimeFields: PrayerTimeField[] = [
  "fajr",
  "zohar",
  "asr",
  "maghrib",
  "isha",
];
const prayerTimesSchema = z.object({
  masjid_id: z.string().uuid(), // Masjid ID is a UUID and read-only
  fajr: z.string().regex(/^\d{2}:\d{2}$/, "Fajr must be in HH:MM format"),
  zohar: z.string().regex(/^\d{2}:\d{2}$/, "Dhuhr must be in HH:MM format"),
  asr: z.string().regex(/^\d{2}:\d{2}$/, "Asr must be in HH:MM format"),
  maghrib: z.string().regex(/^\d{2}:\d{2}$/, "Maghrib must be in HH:MM format"),
  isha: z.string().regex(/^\d{2}:\d{2}$/, "Isha must be in HH:MM format"),
  maghrib_waqf: z.number().optional(),
});

export function PrayerForm({ user }: { user: User | null }) {
  const supabase = createClient();
  // 1. Define your form.
  const form = useForm<z.infer<typeof prayerTimesSchema>>({
    resolver: zodResolver(prayerTimesSchema),
    defaultValues: {
      masjid_id: user?.id,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof prayerTimesSchema>) {
    console.log(values);
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="masjid_id"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Masjid Id</FormLabel>
                  <FormControl>
                    <Input
                      name={user?.id}
                      value={user?.id.slice(0, 8).toUpperCase()}
                      onChange={onChange}
                      disabled
                    />
                  </FormControl>
                  <FormDescription>This is your Masjid Id.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {prayerTimeFields.map((element, index) => (
              <FormField
                key={index}
                control={form.control}
                name={element}
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>
                      {element[0].toUpperCase() + element.slice(1)}
                    </FormLabel>
                    <FormControl>
                      <Input
                        onChange={onChange}
                        type="time"
                        placeholder="12:20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <FormField
              control={form.control}
              name="maghrib_waqf"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Maghrib Waqf</FormLabel>
                  <FormControl>
                    <Input
                      onChange={(e) => onChange(Number(e.target.value))}
                      type="number"
                      placeholder="5 min"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-10 w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
