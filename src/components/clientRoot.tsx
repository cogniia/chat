"use client";
import SideNavbar from "@/components/nav/SideNavbar";
import { useAuthStore } from "@/zustand-store/authStore";
import Cookies from "js-cookie";

export default function ClientRoot({
    children,
}: {
    children: React.ReactNode;
}) {
    const token = Cookies.get("token");
    const { user } = useAuthStore();

    return (
        <>
            {/* sidebar */}
            {token && user && <SideNavbar />}
            {/* main page */}
            <div className="w-full">{children}</div>
        </>
    );
}
