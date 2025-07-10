"use client";

import { siteConfig } from "@/config/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const MainNav = () => {
    const pathname = usePathname();

    return (
        <nav className="flex items-center space-x-2">
            {siteConfig.mainNav.map((item) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;
                
                return (
                    <div key={item.href} className="relative">
                        <Button
                            variant="ghost"
                            size="default"
                            asChild
                        >
                            <Link href={item.href} className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4" />
                                {item.title}
                            </Link>
                        </Button>
                        <div 
                            className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-in-out ${
                                isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                            }`} 
                        />
                    </div>
                );
            })}
        </nav>
    );
};

export default MainNav;