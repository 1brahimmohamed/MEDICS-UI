import { Activity, BarChart3, Home, Settings, Workflow } from "lucide-react"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "MEDICS",
  description:
    "MEDICS is a platform for Physiological Signal Analysis",
    mainNav: [
      {
        title: "Home",
        href: "/",
        icon: Home,
      },
      {
        title: "Overview",
        href: "/overview",
        icon: BarChart3,
      },
      {
        title: "Workspace",
        href: "/workspace",
        icon: Workflow,
      },
      {
        title: "Sensors",
        href: "/sensors",
        icon: Activity,
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings
      },
    ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}