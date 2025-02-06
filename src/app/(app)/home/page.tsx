'use client'
import { AlertToastComponent } from "@/components/alert";
import { Icons } from "@/components/icons";
import MessageBubble from "@/components/message";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { removeIfWhitespace } from "@/lib/utils";
import { IResquestMessageHistory } from "@/services/types";
import { useAuthStore } from "@/zustand-store/authStore";
import { useChatStore } from "@/zustand-store/chatStore";
import { formatDate } from "date-fns";
import { ArrowUp, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Home = () => {
    const topRef = useRef<HTMLDivElement | null>(null)
    const endRef = useRef<HTMLDivElement | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter()
    const { user } = useAuthStore()
    const { error, getHistory, isLoading, lastMessage, messages, sendMessage, prompt, setPrompt } = useChatStore()

    const sugestionPromt1 = 'Quero falar sobre algo que aconteceu ou sobre meus sintomas de ansiedade'
    const sugestionPromt2 = 'Quero ajuda para enfrentar a ansiedade'

    const [isTopVisible, setIsTopVisible] = useState(true);

    const noMessages = messages.length === 0;

    const isDifferentDay = (() => {
        if (messages.length === 0) return false;

        const lastMessageDate = new Date(messages[messages.length - 1]?.created_at ?? '');
        const currentDate = new Date();

        return lastMessageDate.getDate() !== currentDate.getDate() ||
            lastMessageDate.getMonth() !== currentDate.getMonth() ||
            lastMessageDate.getFullYear() !== currentDate.getFullYear();
    })();

    const handleSendMessage = (customPrompt?: string) => {
        const sessionId = user?.sessionIds?.length === 0 ? '' : user?.sessionIds[0];
        const userIdExt = user?.id;
        const text = customPrompt ?? prompt
        sendMessage(sessionId, userIdExt, text, scrollToBottom);

        setTimeout(() => {
            scrollToBottom()
        }, 500)
    };

    const scrollToTop = () => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToBottom = () => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && prompt !== '') {
            handleSendMessage();
        }
    };

    function getHistoryTrigger() {
        if (user?.sessionIds && user.sessionIds.length > 0) {
            const request: IResquestMessageHistory = {
                session_id: user.sessionIds[0],
                take: 10,
                last_message_id: lastMessage?.id
            }
            getHistory(request, messages)
        }
    }

    useEffect(() => {
        textareaRef?.current?.focus();
    }, [])

    useEffect(() => {
        if (user?.sessionIds && user.sessionIds.length > 0 && messages.length === 0) {
            const request: IResquestMessageHistory = {
                session_id: user.sessionIds[0],
                take: 50
            }
            getHistory(request, messages)
        }
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (messages.length === 0) {
            router.refresh()
        }
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsTopVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (topRef.current) {
            observer.observe(topRef.current);
        }

        return () => {
            if (topRef.current) {
                observer.unobserve(topRef.current);
            }
        };
    }, []);

    return (
        <div className="w-full h-full flex flex-col px-7 pb-7 relative items-center gap-5 max-h-screen">
            <ScrollArea id='scrollArea' className="h-full pr-3 max-w-xl w-full">
                <div className="w-full h-20 z-10 absolute top-0 bg-gradient-to-b from-white via-white-opacity-30 to-white-opacity-70" />
                <div ref={topRef} />
                <div className="flex flex-col items-center justify-center max-w-xl pt-8">
                    {
                        !isTopVisible && (
                            <Button variant='outline' className="fixed top-10 z-20" onClick={scrollToTop}>
                                <ArrowUp />
                            </Button>
                        )
                    }
                    <MessageBubble messages={messages} onClick={getHistoryTrigger} loading={isLoading} />
                    {
                        isLoading && (
                            <div className="mt-3 flex items-center self-start gap-3">
                                <span className="text-grey-700 text-sm">Analisando... </span>
                                <Sparkles size={25} className="text-purple-300" />
                            </div>
                        )
                    }
                    {
                        error && (
                            <AlertToastComponent helperText={'Ocorreu um erro ao tentar enviar a mensagem, mas você pode tentar novamente.'} />
                        )
                    }
                </div>
                <div ref={endRef} />
            </ScrollArea>
            {
                noMessages || isDifferentDay && !isLoading ?
                    (
                        <div className="grid grid-cols-2 gap-3">
                            <div
                                className="flex flex-col rounded-2xl w-full p-4 border border-grey-300 cursor-pointer bg-purple-50"
                                onClick={() => handleSendMessage(sugestionPromt1)}
                            >
                                <h6 className="font-semibold text-purple-900">Quero falar sobre algo que aconteceu</h6>
                                <span className="text-grey-700">ou sobre meus sintomas de ansiedade</span>
                            </div>
                            <div
                                className="flex flex-col rounded-2xl w-full p-4 border border-grey-300 cursor-pointer bg-purple-50"
                                onClick={() => handleSendMessage(sugestionPromt2)}
                            >
                                <h6 className="font-semibold text-purple-900">Quero ajuda para enfrentar a ansiedade</h6>
                                <span className="text-grey-700"></span>
                            </div>
                        </div>
                    ) : null
            }
            <Textarea
                ref={textareaRef}
                value={prompt}
                onChange={(event) => setPrompt(removeIfWhitespace(event.target.value))}
                onSend={() => handleSendMessage()}
                disabled={isLoading}
                onKeyDown={handleKeyDown}
            />
            <a className="text-grey-700 text-sm">
                Usando a plataforma você concorda com nossos
                <b className="text-purple-400 hover:cursor-pointer">
                    <Link href={'/service-terms'}>
                        {' '}Termos
                    </Link>
                </b>
                {' '}e
                <b className="text-purple-400">
                    <Link href={'/privacy-terms'}>
                        {' '}Políticas
                    </Link>
                </b>.
            </a>
        </div>
    );
}

export default Home;
