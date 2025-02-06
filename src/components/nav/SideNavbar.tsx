/** @format */
"use client";

import { useState } from "react";

type Props = {};

import {
  ChevronRight,
  ChevronLeft,
  Home,
  UserCircle,
  Megaphone,
  Sparkles
} from "lucide-react";

import { useWindowWidth } from "@react-hook/window-size";
import { Button } from "../ui/button";
import { Nav } from "../ui/nav";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { logout } from "@/services/authService";
import { useRouter } from "next/navigation";
import { AlertDialogComponent } from "../alertComponent";

export default function SideNavbar({ }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter()

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  function handleLogout() {
    logout();
    router.refresh()
  }

  return (
    <div className={cn(
      "relative min-w-[80px] max-w-64 shadow-md px-4 py-8 gap-8 flex flex-col bg-grey-200 transition-all duration-300 ease-in-out",
      !isCollapsed && "md:w-full"
    )}>
      {
        isCollapsed ?
          <Image src="/cogniia-short.svg" width={32} height={32} className="self-center" alt="logo" />
          :
          <Image src="/cogniia.svg" width={123} height={36} alt="logo" />
      }
      {!mobileWidth && (

        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className="rounded-full p-2 size-8 shadow-lg absolute right-[-15px] top-16 z-10"
        >
          {
            isCollapsed ?
              <ChevronRight className="transition-transform duration-300 ease-in-out" />
              :
              <ChevronLeft className="transition-transform duration-300 ease-in-out" />
          }
        </Button>

      )}
      <Nav
        logout={() => setShowAlert(true)}
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Home",
            href: "/",
            icon: Home,
            variant: "default"
          },
          {
            title: "Seu perfil",
            href: "/profile",
            icon: UserCircle,
            variant: "ghost"
          },
          {
            title: "Entre em contato",
            href: "/contact",
            icon: Megaphone,
            variant: "ghost"
          },
          {
            title: "Deixe seu feedback",
            href: "https://docs.google.com/forms/d/e/1FAIpQLScdNAlCPJ0RqOpx8_y1G4PUy2vvNkZSNLfcEtZBx5hoIYVKzQ/viewform?usp=sf_link",
            icon: Sparkles,
            variant: "ghost",
            target: '_blank'
          }
        ]}
      />
      <AlertDialogComponent
        show={showAlert}
        title={"Deseja realmente sair?"}
        cancelText={"Sair"}
        actionText="Cancelar"
        icon={false}
        onCancel={handleLogout}
        onAction={() => setShowAlert(false)}
      />
    </div>
  );
}
