import React, { useState } from 'react';
import ChatForm from './components/ChatForm';
import LandingPage from './components/LandingPage';
import './index.css';

function App() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Bloquer le scroll derrière la modale
    React.useEffect(() => {
        if (isChatOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isChatOpen]);

    return (
        <div className="app-main-wrapper">
            <LandingPage onStart={() => setIsChatOpen(true)} />

            {isChatOpen && (
                <div className="chat-overlay-modal">
                    <div className="modal-backdrop" onClick={() => setIsChatOpen(false)}></div>
                    <div className="modal-content-app">
                        <ChatForm onClose={() => setIsChatOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
