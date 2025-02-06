import { IResponseMessageFromAI } from "@/services/types";
import { UserCircle } from "lucide-react";
import Image from "next/image";
import { cn, formatDate } from "@/lib/utils";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from "../ui/button";

interface IMessageBubble {
    messages: IResponseMessageFromAI[];
    onClick?: () => void;
    loading?: boolean
}

export default function MessageBubble(props: IMessageBubble) {

    return (
        <>
            {
                props.messages.map((response, index) => (
                    <>
                        {
                            index + 1 === 1 && (
                                <Button onClick={props.onClick} className="z-20" variant='outline' isLoading={props.loading}>Carregar mais</Button>
                            )
                        }
                        <div key={response.id} className={cn("flex flex-row gap-4 w-full", response.sender_type === 'Assistant' ? "justify-start" : "justify-end")}>
                            <div className={cn("p-2 mt-6 flex items-center justify-center rounded-full bg-beige-300 min-h-10 min-w-10 max-h-10 max-w-10", response.sender_type !== "Assistant" && 'hidden')}>
                                <Image src='/cogniia-short.svg' alt="icon" height={20} width={20} />
                            </div>
                            <div className={cn("flex flex-col rounded-2xl p-4 my-4", response.sender_type === 'Assistant' ? "bg-beige-300" : "bg-purple-50")}>
                                <Markdown remarkPlugins={[remarkGfm]} className="text-sm text-purple-700 ">{response?.text}</Markdown>
                                {
                                    response.created_at && (
                                        <span className="text-right text-xs text-purple-700 mt-1">{formatDate(new Date(response?.created_at ?? ''))}</span>
                                    )
                                }
                            </div>
                            <div className={cn("p-2 mt-6 h-10 w-10 flex items-center justify-center bg-purple-50 rounded-full", response.sender_type === "Assistant" && 'hidden')}>
                                <UserCircle size={25} className="text-purple-700" />
                            </div>
                        </div>
                    </>
                ))
            }
        </>
    )
}