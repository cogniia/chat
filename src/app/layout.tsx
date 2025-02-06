import { Raleway } from "next/font/google";
import "./globals.css";
import ClientRoot from "@/components/clientRoot";
import { cn } from "@/lib/utils";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "Cogniia",
  description: "Sua ansiedade não precisa ser um problema",
  keywords: "cogniia, saude, ajuda"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          "min-h-screen w-full bg-white text-black flex",
          raleway.className,
          {
            "debug-screens": process.env.NODE_ENV === "development"
          }
        )}
      >
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
