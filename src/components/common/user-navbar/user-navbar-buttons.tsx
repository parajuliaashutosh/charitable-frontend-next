"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  ChevronDown,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react";

const UserNavbarButtons = ({
  notificationNumber = 3,
  fullName = "User",
  email = "",
}) => {
  return (
    <div className="flex items-center gap-4">
      {/* Search Button (Mobile) */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden hover:bg-secondary text-muted-foreground hover:text-secondary-foreground"
      >
        <Search className="h-5 w-5" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="relative hover:bg-secondary text-muted-foreground hover:text-secondary-foreground"
          >
            <Bell className="h-5 w-5" />
            {notificationNumber > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
              >
                {notificationNumber}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-80 bg-popover border-border"
        >
          <DropdownMenuLabel className="text-popover-foreground">
            Notifications
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border" />
          <div className="space-y-2 p-2">
            <div className="flex items-start gap-3 p-2 hover:bg-secondary rounded-md cursor-pointer">
              <div className="w-2 h-2 bg-info rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-popover-foreground">
                  Mock Notification
                </p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2 hover:bg-secondary rounded-md cursor-pointer">
              <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-popover-foreground">
                  In progress of building notification
                </p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2 hover:bg-secondary rounded-md cursor-pointer">
              <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-popover-foreground">
                  Server maintenance
                </p>
                <p className="text-xs text-muted-foreground">3 hours ago</p>
              </div>
            </div>
          </div>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem className="text-center justify-center cursor-pointer text-primary hover:bg-secondary">
            View all notifications
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 h-auto p-2 hover:bg-secondary text-foreground"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={"/"} alt="User" />
              <AvatarFallback className="bg-primary text-primary-foreground uppercase">
                {fullName}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-foreground">{fullName}</p>
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-popover border-border"
        >
          <DropdownMenuLabel className="text-popover-foreground">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem
            className="text-popover-foreground hover:bg-secondary cursor-pointer"
            onClick={() => console.log("Go to profile")}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-popover-foreground hover:bg-secondary cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="md:hidden text-popover-foreground hover:bg-secondary cursor-pointer"
            onClick={() => console.log("Toggle theme")}
          >
            {"dark" === "dark" ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            <span>Toggle theme</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem className="text-destructive hover:bg-secondary cursor-pointer focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserNavbarButtons;
