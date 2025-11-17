import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { Search } from "lucide-react";
import UserNavbarButtons from "./user-navbar-buttons";

const UserNavbar = async () => {
  const notifications = 3;

  const session = await auth();

  const fullName = session?.user?.email?.split("@")[0] || "User";
  const email = session?.user?.email;

  return (
    <>
      <nav className="h-14 bg-card border-b border-border px-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          {/* <Button
            variant="ghost"
            size="sm"
            className="lg:hidden hover:bg-secondary text-muted-foreground hover:text-secondary-foreground"
          >
            <Menu className="h-5 w-5" />
          </Button> */}

          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                Give Hope
              </span>
            </div>
            {/* <span className="font-semibold text-foreground hidden sm:block">
              Dashboard
            </span> */}
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary"
            showErrorPadding={false}
          />
        </div>

        {/* Right Section */}
        <UserNavbarButtons
          notificationNumber={notifications}
          fullName={fullName}
          email={email}
        />
      </nav>
    </>
  );
};

export default UserNavbar;
