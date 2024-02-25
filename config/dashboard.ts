import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
    mainNav: [
        // {
        //     title: "Documentation",
        //     href: "/docs",
        // },
        // {
        //     title: "Support",
        //     href: "/support",
        //     disabled: true,
        // },
    ],
    sidebarNav: [
        {
            title: "Exams",
            href: "/dashboard",
            icon: "post",
        },
        {
            title: "View Exams",
            href: "/dashboard/view",
            icon: "gantt"
        },
        {
            title: "Settings",
            href: "/dashboard/settings",
            icon: "settings",
        },
    ],
}
