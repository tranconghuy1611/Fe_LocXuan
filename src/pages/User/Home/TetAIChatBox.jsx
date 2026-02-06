import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TetAIService from "../../../services/tetAI.service";
import { Bot, X,Sparkles,  Send } from "lucide-react";

// Component hiệu ứng AI gõ từng chữ
function TypingText({ text, speed = 15, onDone }) {

    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let index = 0;
        setDisplayed("");

        const interval = setInterval(() => {
            index++;
            setDisplayed(text.slice(0, index));

            if (index >= text.length) {
                clearInterval(interval);
                onDone && onDone(); // báo đã gõ xong
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);


    return <span>{displayed}</span>;
}

export default function TetAIChatBox() {
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const handleSend = async () => {
        if (!question.trim()) return;

        const userMessage = {
            role: "user",
            content: question,
        };

        setMessages((prev) => [...prev, userMessage]);
        setQuestion("");
        setLoading(true);

        try {
            const res = await TetAIService.ask(question);

            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    content: res.data,
                    isTyping: true,
                },
            ]);

        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    content:
                        err.response?.data?.message ||
                        "AI đang bận, thử lại sau nhé 🌸",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            {!open && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-xl flex items-center justify-center"
                >
                    <Bot size={24} />
                </motion.button>
            )}

            {/* Chat Box */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        className="fixed bottom-6 right-6 w-[340px] h-[480px] bg-white rounded-2xl shadow-2xl border border-red-100 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center justify-center gap-2 font-semibold w-full">
                               <Sparkles/> Trợ lý AI<Sparkles/>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="hover:bg-white/20 rounded-full p-1 transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-red-50 to-white">
                            {messages.length === 0 && (
                                <p className="text-sm text-gray-400 text-center mt-16">
                                    Tôi sẵn sàng giải đáp mọi câu hỏi của bạn về ngày Tết.
                                </p>
                            )}

                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] shadow-sm ${msg.role === "user"
                                            ? "bg-red-500 text-white rounded-br-sm"
                                            : "bg-white border border-gray-200 rounded-bl-sm"
                                            }`}
                                    >
                                        {msg.role === "ai" ? (
                                            msg.isTyping ? (
                                                <TypingText
                                                    text={msg.content}
                                                    onDone={() => {
                                                        setMessages((prev) =>
                                                            prev.map((m, i) =>
                                                                i === index ? { ...m, isTyping: false } : m
                                                            )
                                                        );
                                                    }}
                                                />
                                            ) : (
                                                msg.content
                                            )
                                        ) : (
                                            msg.content
                                        )}

                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="flex items-center gap-2 text-gray-400 text-xs">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
                                    </div>
                                    AI đang trả lời...
                                </div>
                            )}

                            <div ref={chatEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t bg-white p-2 flex items-center gap-2">
                            <input
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Hỏi về ngày Tết..."
                                className="flex-1 px-3 py-2 rounded-lg bg-gray-100 focus:bg-white focus:ring-2 focus:ring-red-400 outline-none text-sm"
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                className="w-9 h-9 rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
