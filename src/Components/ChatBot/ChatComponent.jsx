import { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import ChatService from './ChatService';
import useService from '../../hooks/useService';
import { firstValueFrom } from 'rxjs';
import { toast } from 'react-toastify';

export function ChatComponent() {
    const [chatLog, setChatLog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]); // [{role: 'user', content: '...'}, ...]

    const scrollRef = useRef(null);
    const chatService = useService(ChatService);
    // Function to scroll to bottom
    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Trigger scroll every time chatLog changes
    useEffect(() => {
        scrollToBottom();
    }, [chatLog]);

    const clearChat = () => {
        // 1. Reset the UI log
        setChatLog([]);
        // 2. If you are using a separate history state for the backend, reset that too
        setMessages([]);
    };
    const chatMutation = useMutation({
        mutationFn: async (userInput) => {
            setChatLog(prev => [...prev, { role: 'user', text: userInput }]);
            // 2. Add an empty AI message placeholder that we will fill
            setChatLog(prev => [...prev, { role: 'assistant', text: "" }]);
            setLoading(true);
            // 1. Prepare history to send to backend
            const currentHistory = [...messages];
            /////////
            const response = await firstValueFrom(chatService.sendChatRequest({
                message: userInput,
                history: currentHistory
            }));
            if (response.status === 429) {
                toast.error("Slow down! You've sent too many messages. Please wait a minute.");
                return;
            }
            console.log(response);
            if (!response.body) throw new Error("No response body");

            let fullAiResponse = "";
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split("\n\n");

                lines.forEach(line => {
                    if (line.startsWith("data: ")) {
                        try {
                            const data = JSON.parse(line.replace("data: ", ""));
                            const text = data.text || "";
                            fullAiResponse += text;
                            // setChatLog((prev) => prev + text);
                            // 3. Update ONLY the last message (the AI's placeholder)
                            setChatLog(prev => {
                                const updated = [...prev];
                                const lastIndex = updated.length - 1;
                                updated[lastIndex].text += text;
                                return updated;
                            });
                            // setChatLog((prev) => prev + data.text);
                        } catch (e) {
                            console.error("Error parsing chunk", e);
                        }
                    }
                });

            }
            // setChatLog((prev) => prev + "\n");
            // 2. After stream finishes, save both to history
            setMessages(prev => [
                ...prev,
                { role: "user", content: userInput },
                { role: "assistant", content: fullAiResponse }
            ]);
        },
        onError: (e) => {
            toast.dismiss();
            toast.error(e.message);
        },
        onSettled: () => {
            setLoading(false);
        }

    });
    ///////////
    //   const response = await fetch("http://localhost:8000/chat/stream", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ message: userInput }),
    //   });


    return (
        <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
            {/* Chat Window */}
            <div className="flex-1 overflow-y-auto border p-4 rounded-lg bg-gray-50 mb-4">
                <div className="chat-bubble">
                    {/* {chatLog || (chatMutation.isPending && "Thinking...")} */}
                    {chatLog.map((chat, index) => (
                        <div
                            key={index}
                            className={`d-flex mb-3 ${chat.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                        >
                            <div
                                className={`p-3 rounded shadow-sm ${chat.role === 'user'
                                    ? 'bg-primary text-white ms-5' // User: Blue, Margin-left to keep it right
                                    : 'bg-light text-dark me-5'    // AI: Grey, Margin-right to keep it left
                                    }`}
                                style={{
                                    whiteSpace: 'pre-wrap',
                                    maxWidth: '75%',
                                    borderRadius: chat.role === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0'
                                }}
                            >
                                {chat.text}
                            </div>
                        </div>
                    ))}
                    <div className="card-footer 1bg-light text-dark d-flex justify-content-end align-items-center">
                        {/* <span>Business Assistant</span> */}
                        {/* Clear Button as an outline for a cleaner look */}
                        <button
                            className="btn btn-light btn-outline-secondary btn-sm"
                            onClick={clearChat}
                        >
                            Clear Chat
                        </button>
                    </div>
                </div>

                {/* The Anchor for Autoscroll */}
                <div ref={scrollRef} />
            </div>

            {/* Input Section */}
            <div className="flex 1gap-2">
                <input
                    type="text"
                    className="flex-1 border p-2 rounded"
                    placeholder="Ask anything..."
                    onKeyDown={(e) => e.key === 'Enter' && chatMutation.mutate(e.target.value)}
                />
                <button
                    className="mx-2 bg-primary text-white px-4 py-2 rounded hover:bg-muted disabled:bg-muted"
                    onClick={(e) => chatMutation.mutate(e.target.previousSibling.value)}
                    disabled={chatMutation.isPending}
                >
                    Send
                </button>
            </div>
        </div>
    );
}