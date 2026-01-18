import React, { useState } from 'react';
import {
    Sparkles,
    Send,
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
    Video,
    Brain,
    Copy,
    Target,
    Palette
} from 'lucide-react';
import { chatCompletion } from './api/openrouter';

function App() {
    const [prompt, setPrompt] = useState('');
    const [platform, setPlatform] = useState('Facebook Ads');
    const [tone, setTone] = useState('Créatif & Viral');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const generateContent = async () => {
        if (!prompt) return;
        setLoading(true);
        setResult('');

        try {
            const messages = [
                {
                    "role": "system",
                    "content": "Tu es l'expert marketing de JOFÉ Digital. Rédige du contenu PRO, humain et prêt à l'emploi. INTERDICTION : N'utilise jamais de symboles de mise en forme Markdown comme les étoiles (**) ou les dièses (#) dans le texte. Utilise des sauts de ligne clairs."
                },
                {
                    "role": "user",
                    "content": `Stratégie pour: "${prompt}". Canal: ${platform}. Ton: ${tone}.`
                }
            ];

            const data = await chatCompletion(messages);

            if (data.choices && data.choices[0]) {
                const cleanText = data.choices[0].message.content.replace(/\*\*/g, '');
                setResult(cleanText);
            }
        } catch (error) {
            setResult(`⚠️ Erreur : ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const getPlatformIcon = () => {
        if (platform.includes('Facebook')) return <Facebook size={18} color="#1877F2" />;
        if (platform.includes('Instagram')) return <Instagram size={18} color="#E4405F" />;
        if (platform.includes('LinkedIn')) return <Linkedin size={18} color="#0A66C2" />;
        if (platform.includes('Twitter')) return <Twitter size={18} color="#000000" />;
        if (platform.includes('TikTok')) return <Video size={18} color="#ff0050" />;
        return <Send size={18} color="#2563eb" />;
    };

    return (
        <div className="container">
            <div className="card">
                <div className="header">
                    <span className="badge">JOFÉ Digital</span>
                    <h1 className="title">AI </h1>
                    <p style={{ color: 'var(--text-dim)', fontSize: '1rem' }}>L'innovation au service de votre stratégie.</p>
                </div>

                <div className="input-group">
                    <label className="input-label"><Brain size={18} color="#2563eb" /> Objectif de la Campagne</label>
                    <textarea
                        placeholder="Décrivez votre produit ou service..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows="3"
                    />
                </div>

                <div className="grid-2">
                    <div className="input-group">
                        <label className="input-label">{getPlatformIcon()} Plateforme</label>
                        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                            <option>Facebook Ads</option>
                            <option>Instagram Business</option>
                            <option>LinkedIn Pulse</option>
                            <option>Twitter / X News</option>
                            <option>TikTok Script Video</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="input-label"><Palette size={18} color="#10b981" /> Style de Ton</label>
                        <select value={tone} onChange={(e) => setTone(e.target.value)}>
                            <option>Créatif & Viral</option>
                            <option>Professionnel & Expert</option>
                            <option>Célébration / Fêtes</option>
                            <option>Minimaliste / Direct</option>
                        </select>
                    </div>
                </div>

                <button
                    className="btn"
                    onClick={generateContent}
                    disabled={loading || !prompt}
                >
                    {loading ? (
                        "Analyse en cours..."
                    ) : (
                        <>Lancer l'Intelligence Artificielle <Sparkles size={18} /></>
                    )}
                </button>

                {result && (
                    <div className="result-container">
                        <button className="copy-btn" onClick={() => navigator.clipboard.writeText(result)}>
                            <Copy size={14} /> Copier
                        </button>
                        <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>{result}</div>
                    </div>
                )}
            </div>

            <footer>
                Powering By ILBOUDO Christian
            </footer>
        </div>
    );
}

export default App;
