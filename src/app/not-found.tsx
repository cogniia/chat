import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="relative h-full flex flex-col items-center justify-center p-4 gap-20">
            <div className="mx-auto flex w-full flex-col justify-center items-center space-y-6 sm:w-[410px]">
                <Image src='/cogniia.svg' width={180} height={54} alt={"logo-long"} />
            </div>
            <Label className="text-3xl text-purple-700  font-bold">Ops, acho que nos perdemos.</Label>
            <Link href="/">
                <Button>
                    Retornar para a plataforma
                </Button>
            </Link>
        </div>
    );
}
