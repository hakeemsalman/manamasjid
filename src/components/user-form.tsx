"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { z } from "zod";
import { User } from "@supabase/supabase-js";

type PrayerTimeField =
  | "name"
  | "address"
  | "city"
  | "state"
  | "country"
  | "owner_name"
  | "email"
  | "phone";

const prayerTimeFields: PrayerTimeField[] = [
  "name",
  "address",
  "city",
  "state",
  "country",
  "owner_name",
  "email",
  "phone",
];

const prayerTimesSchema = z.object({
  name: z
    .string()
    .min(6, {
      message: "Please type at least 6 masjid name",
    })
    .max(25, {
      message: "Please type not more than 25 characters",
    }),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string().optional(),
  phone: z.string(),
  owner_name: z.string(),
  email: z.string(),
});

export default function UserForm({ user }: { user: User | null }) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<z.infer<typeof prayerTimesSchema>>({
    resolver: zodResolver(prayerTimesSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      owner_name: "",
      email: "",
    },
  });

  useEffect(() => {
    async function getMasjidDetails() {
      try {
        const { data, error } = await supabase
          .from("masjids")
          .select("*")
          .eq("profile_id", user?.id);

        if (error) throw error;

        if (data && data.length > 0) {
          // Update form values with fetched data
          form.setValue("name", data[0].name || "");
          form.setValue("address", data[0].address || "");
          form.setValue("city", data[0].city || "");
          form.setValue("country", data[0].country || "");
          form.setValue("email", data[0].email || "");
          form.setValue("owner_name", data[0].owner_name || "");
          form.setValue("phone", data[0].phone || "");
          form.setValue("state", data[0].state || "");
        }
      } catch (err) {
        console.error("Error fetching masjid details:", err);
      }
    }

    getMasjidDetails();
  }, [form, user, supabase]);
  async function onSubmit(values: z.infer<typeof prayerTimesSchema>) {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("masjids")
        .upsert({ ...values, profile_id: user?.id });
      if (error) throw error;
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {prayerTimeFields.map((item, index) => (
              <FormField
                key={index}
                control={form.control}
                name={item}
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>
                      {item === "name"
                        ? "Masjid Name"
                        : item
                            ?.split("_")
                            .map(
                              (i) => i.slice(0, 1).toUpperCase() + i.slice(1)
                            )
                            .join(" ")}
                    </FormLabel>
                    <FormControl>
                      <Input name="name" value={value} onChange={onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button className="mt-10 w-full" type="submit">
              Update
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
