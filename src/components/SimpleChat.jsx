import React, { useState } from 'react';
import { chatCompletion } from '../api/openrouter';

const SimpleChat = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSend = async () => {
        if (!input.trim()) return;

        setLoading(true);
        setError(null);
        setResponse('');

        try {
            const messages = [
                { role: "user", content: input }
            ];

            const data = await chatCompletion(messages);

            if (data.choices && data.choices[0]) {
                setResponse(data.choices[0].message.content);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Test OpenRouter API</h2>

            <div style={{ marginBottom: '10px' }}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Posez votre question ici..."
                    style={{ width: '100%', height: '100px', padding: '10px' }}
                />
            </div>

            <button
                onClick={handleSend}
                disabled={loading || !input}
                style={{ padding: '10px 20px', cursor: 'pointer' }}
            >
                {loading ? 'Envoi en cours...' : 'Envoyer'}
            </button>

            {error && (
                <div style={{ color: 'red', marginTop: '20px', padding: '10px', border: '1px solid red' }}>
                    <strong>Erreur:</strong> {error}
                </div>
            )}

            {response && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                    <strong>Réponse:</strong>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{response}</p>
                </div>
            )}
        </div>
    );
};

export default SimpleChat;
