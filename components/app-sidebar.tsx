import { Activity, AlertTriangle, BarChart3, Heart, Home, Settings, TrendingUp, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Health Metrics",
    url: "/metrics",
    icon: Activity,
  },
  {
    title: "Anomaly Alerts",
    url: "/alerts",
    icon: AlertTriangle,
  },
  {
    title: "Recommendations",
    url: "/recommendations",
    icon: TrendingUp,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-2">
          <Heart className="h-6 w-6 text-red-500" />
          <div>
            <h2 className="text-lg font-semibold">HealthGuard AI</h2>
            <p className="text-xs text-muted-foreground">Smart Health Monitoring</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <div className="p-2 text-xs text-muted-foreground">
          <p>SDG 3: Good Health and Well-being</p>
          <p>Powered by AI & ML</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
