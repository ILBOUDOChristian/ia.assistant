import React, { useState, useRef, useEffect } from "react";
import {
    Send,
    Loader2,
    Brain,
    Copy,
    Paperclip,
    X,
    FileText,
    Plus,
    Menu,
    RefreshCw,
    User,
    Bot,
    Sparkles
} from "lucide-react";
import { chatCompletionStream } from "../api/openrouter"; // Version: 1.0.6 - Multimodal Fix (Gemini Flash)

export default function ChatForm() {
    const [chats, setChats] = useState(() => {
        const saved = localStorage.getItem("brandbrain_chats_v3");
        return saved ? JSON.parse(saved) : [{ id: "1", title: "Nouvelle Discussion", messages: [] }];
    });
    const [activeId, setActiveId] = useState(() => chats[0]?.id || "1");
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [streamingContent, setStreamingContent] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const activeChat = chats.find(c => c.id === activeId) || chats[0];
    const messages = activeChat.messages;

    // Sauvegarde auto
    useEffect(() => {
        localStorage.setItem("brandbrain_chats_v3", JSON.stringify(chats));
    }, [chats]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFiles(prev => [...prev, {
                    name: file.name,
                    type: file.type,
                    data: reader.result,
                    preview: file.type.startsWith("image/") ? reader.result : null
                }]);
            };
            reader.readAsDataURL(file);
        });
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // On pourrait ajouter un petit état toast ici si besoin
    };

    const startNewChat = () => {
        const newId = Date.now().toString();
        const newChat = { id: newId, title: "Nouvelle Discussion", messages: [] };
        setChats([newChat, ...chats]);
        setActiveId(newId);
        setSidebarOpen(false);
    };

    const deleteChat = (e, id) => {
        e.stopPropagation();
        const filtered = chats.filter(c => c.id !== id);
        if (filtered.length === 0) {
            const reset = [{ id: Date.now().toString(), title: "Nouvelle Discussion", messages: [] }];
            setChats(reset);
            setActiveId(reset[0].id);
        } else {
            setChats(filtered);
            if (activeId === id) setActiveId(filtered[0].id);
        }
    };

    const updateActiveMessages = (newMsgs) => {
        setChats(prev => prev.map(c => {
            if (c.id === activeId) {
                // Créer un titre basé sur le premier message
                let title = c.title;
                if (c.messages.length === 0 && newMsgs.length > 0) {
                    title = newMsgs[0].content.substring(0, 30) || "Discussion Image";
                }
                return { ...c, messages: newMsgs, title };
            }
            return c;
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedPrompt = prompt.trim();
        if (!trimmedPrompt && !selectedFiles.length) return;

        const newUserMessage = {
            role: "user",
            content: trimmedPrompt,
            files: selectedFiles.map(f => ({ name: f.name, type: f.type, data: f.data, preview: f.preview })),
            timestamp: new Date().toISOString()
        };

        const currentMsgs = [...messages, newUserMessage];
        updateActiveMessages(currentMsgs);
        setPrompt("");
        setLoading(true);
        setStreamingContent("");

        try {
            const isImageIntent = (trimmedPrompt.toLowerCase().includes("image") ||
                trimmedPrompt.toLowerCase().includes("dessin") ||
                trimmedPrompt.toLowerCase().includes("photo")) && selectedFiles.length === 0;

            if (isImageIntent) {
                const promptGenMessages = [
                    { role: "system", content: "Create an image prompt in English. Output ONLY the prompt." },
                    { role: "user", content: trimmedPrompt }
                ];
                let imgPrompt = "";
                await chatCompletionStream(promptGenMessages, (chunk) => { imgPrompt += chunk; });

                const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imgPrompt)}?width=1024&height=1024&seed=${Math.random()}&nologo=true`;

                updateActiveMessages([...currentMsgs, {
                    role: "assistant",
                    content: "Voici votre illustration marketing :",
                    image: imageUrl,
                    timestamp: new Date().toISOString()
                }]);
            } else {
                const apiContent = [{ type: "text", text: trimmedPrompt }];
                selectedFiles.forEach(file => {
                    if (file.type.startsWith("image/")) {
                        apiContent.push({ type: "image_url", image_url: { url: file.data } });
                    } else if (file.type === "application/pdf") {
                        // Vision models can often handle PDF as data URIs in openrouter
                        apiContent.push({ type: "image_url", image_url: { url: file.data } });
                    }
                });

                const apiMessages = [
                    { role: "system", content: "Tu es BrandBrain AI. Réponds en texte brut sans markdown ni étoiles. Aide au marketing." },
                    ...messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
                    { role: "user", content: apiContent }
                ];

                let fullText = "";
                await chatCompletionStream(apiMessages, (chunk) => {
                    fullText += chunk;
                    setStreamingContent(fullText);
                });

                updateActiveMessages([...currentMsgs, {
                    role: "assistant",
                    content: fullText,
                    timestamp: new Date().toISOString()
                }]);
            }
        } catch (err) {
            updateActiveMessages([...currentMsgs, { role: "assistant", content: "Désolé, une erreur est survenue." }]);
        } finally {
            setLoading(false);
            setStreamingContent("");
            setSelectedFiles([]);
        }
    };

    return (
        <div className={`chat-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
            {/* Sidebar Overlay (Mobile) */}
            <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>

            {/* Sidebar History */}
            <aside className="chat-sidebar">
                <button onClick={startNewChat} className="sidebar-new-btn">
                    <Plus size={16} /> Nouvelle discussion
                </button>
                <div className="history-list">
                    {chats.map(c => (
                        <div
                            key={c.id}
                            className={`history-item ${activeId === c.id ? 'active' : ''}`}
                            onClick={() => { setActiveId(c.id); setSidebarOpen(false); }}
                        >
                            <FileText size={14} />
                            <span>{c.title}</span>
                            <button onClick={(e) => deleteChat(e, c.id)} className="delete-btn">
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="sidebar-footer">
                    ILBOUDO Christian 2026
                </div>
            </aside>

            <div className="chat-main">
                <header className="chat-header-v2">
                    <div className="brand">
                        <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <Brain className="logo" size={24} />
                        <h1>BrandBrain</h1>
                    </div>
                    <button className="refresh-btn" onClick={() => window.location.reload()} title="Actualiser">
                        <RefreshCw size={18} />
                    </button>
                </header>

                {/* Chat Feed */}
                <main className="chat-feed">
                    {messages.length === 0 && !loading && (
                        <div className="empty-state">
                            <Sparkles size={48} className="icon" />
                            <h2>Comment puis-je vous aider ?</h2>
                            <p>Analysez des fichiers, créez des images ou rédigez vos campagnes.</p>
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <div key={idx} className={`message-row ${msg.role}`}>
                            <div className="avatar">
                                {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div className="message-bubble">
                                {msg.content && <p>{msg.content}</p>}
                                {msg.role === "assistant" && msg.content && !msg.image && (
                                    <button
                                        className="msg-copy-btn"
                                        onClick={() => copyToClipboard(msg.content)}
                                        title="Copier le texte"
                                    >
                                        <Copy size={12} />
                                    </button>
                                )}
                                {msg.image && (
                                    <div className="msg-image">
                                        <img src={msg.image} alt="Generated" />
                                        <a href={msg.image} target="_blank" rel="noreferrer">Télécharger</a>
                                    </div>
                                )}
                                {msg.files?.length > 0 && (
                                    <div className="msg-visuals">
                                        {msg.files.map((f, i) => (
                                            <div key={i} className="visual-preview">
                                                {f.preview ? (
                                                    <img src={f.data} alt="uploaded" className="uploaded-thumb" />
                                                ) : (
                                                    <div className="file-box"><FileText size={20} /><span>{f.name}</span></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {streamingContent && (
                        <div className="message-row assistant">
                            <div className="avatar"><Bot size={16} /></div>
                            <div className="message-bubble">
                                <p>{streamingContent}</p>
                                <span className="cursor">|</span>
                                <button
                                    className="msg-copy-btn"
                                    onClick={() => copyToClipboard(streamingContent)}
                                    title="Copier le texte"
                                >
                                    <Copy size={12} />
                                </button>
                            </div>
                        </div>
                    )}

                    {loading && !streamingContent && (
                        <div className="message-row assistant">
                            <div className="avatar"><Bot size={16} /></div>
                            <div className="message-bubble loading">
                                <Loader2 className="spin" size={20} />
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </main>

                {/* Input Footer */}
                <footer className="chat-input-area">
                    <form onSubmit={handleSubmit} className="input-wrap">
                        {selectedFiles.length > 0 && (
                            <div className="previews">
                                {selectedFiles.map((file, i) => (
                                    <div key={i} className="preview-chip">
                                        {file.name}
                                        <X size={14} onClick={() => setSelectedFiles(p => p.filter((_, idx) => idx !== i))} className="cursor-pointer" />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="input-row">
                            <button type="button" onClick={() => fileInputRef.current.click()} className="attach-btn">
                                <Paperclip size={20} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                multiple
                                className="hidden"
                            />
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Écrivez votre message..."
                                rows={1}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                            />
                            <button type="submit" className="send-btn" disabled={loading || (!prompt && !selectedFiles.length)}>
                                {loading ? <Loader2 className="spin" size={20} /> : <Send size={20} />}
                            </button>
                        </div>
                    </form>
                </footer>
            </div>
        </div>
    );
}
