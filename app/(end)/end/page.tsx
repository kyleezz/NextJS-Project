import {MainNav} from "@/components/main-nav";
import {dashboardConfig} from "@/config/dashboard";
import {UserAccountNav} from "@/components/user-account-nav";
import {SiteFooter} from "@/components/site-footer";
import {getCurrentUser} from "@/lib/session";
import {notFound} from "next/navigation";
import HomeButton from "@/components/HomeButton";

interface ExamPageProps {
    params: { examId: string}
}

export default async function ExamPage( { params } : ExamPageProps) {
    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <MainNav items={dashboardConfig.mainNav}/>
                    <UserAccountNav
                        user={{
                            name: user.name,
                            image: user.image,
                            email: user.email,
                        }}
                    />
                </div>
            </header>
            <div className="container flex-1 gap-12 md:grid-cols-[200px_1fr]">
                {/*<aside className="hidden w-[200px] flex-col md:flex">*/}
                {/*    <DashboardNav items={dashboardConfig.sidebarNav} />*/}
                {/*</aside>*/}
                <main className="flex flex-col gap-4 align-center justify-center">
                    <p className={"text-center"}>
                        You've finished the exam.
                    </p>
                    <div className={"text-center"}>
                        <HomeButton />
                    </div>

                </main>
            </div>
            <SiteFooter className="border-t"/>
        </div>
    )
}