/** @format */

"use client";

import Link from "next/link";
import { File, FileText, LogOut, LucideIcon, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { usePathname } from "next/navigation";
import { Separator } from "./separator";
import { HTMLAttributeAnchorTarget } from "react";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    href: string;
    target?: HTMLAttributeAnchorTarget
  }[];
  logout?: () => void
}

export function Nav({ links, isCollapsed, logout }: NavProps) {
  const pathName = usePathname();
  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col flex-1 max-w-64 w-full gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-4 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    target={link.target}
                    className={cn("size-11 self-center items-center flex justify-center rounded-full hover:bg-purple-50", link.href === pathName && "bg-purple-50")}
                  >
                    <link.icon className={cn("h-5 w-5 text-grey-700 hover:text-purple-700", link.href === pathName && "text-purple-700 ")} />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={link.href}
                target={link.target}
                className={cn("flex gap-2 items-center p-2 rounded-lg hover:bg-purple-50", link.href === pathName && "bg-purple-50")}
              >
                <link.icon className={cn("h-5 w-5 text-grey-700 hover:text-purple-700", link.href === pathName && "text-purple-700 ")} />
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "text-[16px] text-grey-700",
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            )
          )}
          <Separator />
          {
            isCollapsed ? (
              <>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href='/service-terms'
                      className={cn("size-11 self-center items-center flex justify-center rounded-full hover:bg-purple-50", '/service-terms' === pathName && "bg-purple-50")}
                    >
                      <FileText className={cn("h-5 w-5 text-grey-700 hover:text-purple-700", '/service-terms' === pathName && "text-purple-700 ")} />
                      <span className="sr-only">Termos de serviço</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                  >
                    Termos de serviço
                  </TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href='/privacy-terms'
                      className={cn("size-11 self-center items-center flex justify-center rounded-full hover:bg-purple-50", '/privacy-terms' === pathName && "bg-purple-50")}
                    >
                      <ShieldCheck className={cn("h-5 w-5 text-grey-700 hover:text-purple-700", '/privacy-terms' === pathName && "text-purple-700 ")} />
                      <span className="sr-only">Políticas de privacidade</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                  >
                    Políticas de privacidade
                  </TooltipContent>
                </Tooltip>
              </>
            ) : (
              <>
                <Link
                  href='/service-terms'
                  className={cn("flex gap-2 items-center p-2 rounded-lg hover:bg-purple-50", '/service-terms' === pathName && "bg-purple-50")}
                >
                  <FileText className={cn("h-5 w-5 text-grey-700 hover:text-purple-700", '/service-terms' === pathName && "text-purple-700 ")} />
                  Termos de serviço
                </Link>
                <Link
                  href='/privacy-terms'
                  className={cn("flex gap-2 items-center p-2 rounded-lg hover:bg-purple-50", '/privacy-terms' === pathName && "bg-purple-50")}
                >
                  <ShieldCheck className={cn("h-5 w-5 text-grey-700 hover:text-purple-700", '/privacy-terms' === pathName && "text-purple-700 ")} />
                  Políticas de privacidade
                </Link>
              </>
            )
          }
        </nav>
        <div className="flex-1" />
        <nav className="grid gap-4 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {
            isCollapsed ? (
              <Tooltip key={'exit'} delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    onClick={logout}
                    className={cn("size-11 self-center items-center flex justify-center rounded-full hover:bg-purple-50")}
                  >
                    <LogOut className={cn("h-5 w-5 text-grey-700 hover:text-purple-700")} />
                    <span className="sr-only">Sair</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  Sair
                </TooltipContent>
              </Tooltip>
            ) : (
              <button
                key={'exitCollapsed'}
                className={cn("flex flex-row items-center gap-2 p-2 rounded-lg hover:bg-purple-50")}
                onClick={logout}
              >
                <LogOut className={cn("h-5 w-5 text-grey-700 hover:text-purple-700")} />
                Sair
              </button>
            )
          }
        </nav>
      </div>
    </TooltipProvider>
  );
}
