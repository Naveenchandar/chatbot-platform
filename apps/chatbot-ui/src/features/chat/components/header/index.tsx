import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../../../../components/ui/sidebar";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUsername } from "../../../../utils";

export const Header = () => {

    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.removeItem('username');
        navigate('/')
    }

    const username = getUsername();
    return (
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full justify-between">
            <div>
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
            <div className="flex gap-2 items-center">
                <Avatar>
                    <AvatarFallback className="text-sm bg-[#e8e8e8]">{username?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="cursor-pointer" onClick={onLogout} title="Logout">
                    <LogOut size={16} />
                </span>
            </div>
        </header>
    );
}
