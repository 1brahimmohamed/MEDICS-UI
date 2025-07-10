import { ThemeToggle } from "@/components/layout/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import MainNav from "./main-nav";

export function SiteHeader() {
  return (
    <div className="grid">
      <header className='sticky top-0 z-40 w-full border-b bg-background w-full px-14'>

          <div className="flex justify-between items-center w-full p-2">
              {/* Logo */}
            <div className="flex items-center gap-20">
              <div>
                <Link href="/">
                  <Image src="/images/logos/variant_beside_dark.png" alt="MEDICS" width={150} height={50} className="dark:hidden" />
                  <Image src="/images/logos/variant_beside_light.png" alt="MEDICS" width={150} height={50} className="hidden dark:block" />
                </Link>
              </div>
            
              {/* Nav */}
              <div>
                <MainNav />
              </div>
            </div>


            {/* Theme Toggle */}
            <div>
              <ThemeToggle />
            </div>

        </div>
      </header>
    </div>
  );
}
