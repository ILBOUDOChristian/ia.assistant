import React, { useState } from 'react';
import ChatForm from './components/ChatForm';
import LandingPage from './components/LandingPage';
import './index.css';

function App() {
    const [view, setView] = useState('landing'); // 'landing' or 'chat'

    return (
        <div className="app-container">
            {view === 'landing' ? (
                <LandingPage onStart={() => setView('chat')} />
            ) : (
                <ChatForm />
            )}
        </div>
    );
}

export default App;
