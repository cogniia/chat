'use client';
import SideNavbar from "@/components/nav/SideNavbar";
import Cookies from 'js-cookie';

export default function ClientRoot({ children }: { children: React.ReactNode }) {
    const token = Cookies.get('token');

    return (
        <>
            {/* sidebar */}
            {token && <SideNavbar />}
            {/* main page */}
            <div className="w-full">{children}</div>
        </>
    );
}
