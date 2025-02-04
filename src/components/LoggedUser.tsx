import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { signout } from "@/app/(dashboard)/login/actions";
import { LayoutDashboard, LogOut } from "lucide-react";

export default async function LoggedUser({ userName }: { userName: string }) {
  return (
    <div className="cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarFallback className="bg-black text-white">
              {userName}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <a href="/dashboard">
            <DropdownMenuItem>
              <LayoutDashboard />
              <span>Dashboard</span>
            </DropdownMenuItem>
          </a>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signout}>
            <LogOut />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
