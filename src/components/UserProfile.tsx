import { User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export default function UserProfile() {
    const user = {
        name: 'Admin',
        isAdmin: true,
    };

    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                {user.isAdmin && (
                    <Badge variant="secondary" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Admin
                    </Badge>
                )}
                </div>
            </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

        </DropdownMenuContent>
        </DropdownMenu>
    );
}
