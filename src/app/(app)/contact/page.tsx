import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
    return (
        <section className="relative h-full flex flex-col items-center p-4 pt-16">
            <div className="max-w-4xl w-full flex flex-col gap-36">
                <Label className="text-3xl text-purple-700  font-bold">Entre em contato</Label>
                <div className="flex flex-wrap gap-9 items-center sm:flex-nowrap sm:flex-row">
                    <Image src='/contact.png' alt="contact-illustration" width={517} height={515} style={{ objectFit: 'cover' }} />
                    <div className="relative flex flex-col gap-6">
                        <Link href={''} target="_blank" className="flex gap-4 items-center">
                            <Icons.linkedin className="h-10 w-10" />
                            <span className="text-grey-700 text-xl">
                                Siga-nos no Linkedin
                            </span>
                        </Link>
                        <Link href={'https://www.instagram.com/cogniia/'} target="_blank" className="flex gap-4 items-center">
                            <Icons.instagram className="h-10 w-10" />
                            <span className="text-grey-700 text-xl">
                                Conecte-se conosco no Instagram
                            </span>
                        </Link>
                        <Link href={''} target="_blank" className="flex gap-4 items-center">
                            <Icons.youtube className="h-10 w-10" />
                            <span className="text-grey-700 text-xl">
                                Assista nosso conteúdo no Youtube
                            </span>
                        </Link>
                        <Link href={'https://wa.me/554184138805'} target="_blank" className="flex gap-4 items-center">
                            <Icons.whatsapp className="h-10 w-10" />
                            <span className="text-grey-700 text-xl">
                                Entre em contato pelo Whatsapp
                            </span>
                        </Link>
                        <Link href={'https://cogniia-landingpage.vercel.app/'} target="_blank" className="flex gap-4 items-center">
                            <Icons.link className="h-10 w-10" />
                            <span className="text-grey-700 text-xl">
                                Acesse nosso Blog
                            </span>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}