import React from 'react';
import { Brain, Sparkles, ArrowRight, X, Menu, MessageSquare, Settings, CheckCircle } from 'lucide-react';

export default function LandingPage({ onStart }) {
    const [modalConfig, setModalConfig] = React.useState({ show: false, title: "", content: null });
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const handleComingSoon = (e) => {
        e.preventDefault();
        setModalConfig({
            show: true,
            title: "Information",
            content: <p>Disponible bientôt ! 🚀</p>
        });
    };

    return (
        <div className="landing-page minimalist">
            {modalConfig.show && (
                <div className="info-modal-overlay" onClick={() => setModalConfig({ ...modalConfig, show: false })}>
                    <div className="info-modal" onClick={e => e.stopPropagation()}>
                        <div className="info-modal-header">
                            <span>{modalConfig.title}</span>
                            <button onClick={() => setModalConfig({ ...modalConfig, show: false })}><X size={18} /></button>
                        </div>
                        <div className="info-modal-body">
                            {modalConfig.content}
                        </div>
                    </div>
                </div>
            )}
            <nav className="landing-nav">
                <div className="nav-container">
                    <button className="mobile-menu-toggle left" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <Menu size={24} />
                    </button>
                    <div className="nav-brand">
                        <Brain className="logo" size={28} />
                        <span>BrandBrain</span>
                    </div>
                    <div className="nav-desktop-group desktop-only">
                        <div className="nav-links">
                            <a href="#features" onClick={handleComingSoon}>Fonctionnalités</a>
                            <a href="#pricing" onClick={handleComingSoon}>Tarifs</a>
                            <a href="#about" onClick={handleComingSoon}>À propos</a>
                            <a href="#contact" onClick={handleComingSoon}>Contact</a>
                        </div>
                        <div className="nav-auth">
                            <button className="btn-secondary" onClick={handleComingSoon}>Connexion</button>
                            <button className="btn-primary-small" onClick={handleComingSoon}>S'inscrire</button>
                        </div>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
                        <div className="mobile-menu" onClick={e => e.stopPropagation()}>
                            <div className="mobile-menu-header">
                                <span className="nav-brand-text">Menu</span>
                                <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
                            </div>
                            <div className="mobile-links">
                                <a href="#features" onClick={handleComingSoon}>Fonctionnalités</a>
                                <a href="#pricing" onClick={handleComingSoon}>Tarifs</a>
                                <a href="#about" onClick={handleComingSoon}>À propos</a>
                                <a href="#contact" onClick={handleComingSoon}>Contact</a>
                                <hr />
                                <button className="btn-secondary w-full" onClick={handleComingSoon}>Connexion</button>
                                <button className="btn-primary-small w-full" onClick={handleComingSoon}>S'inscrire</button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <header className="hero simple-hero">
                <div className="hero-content">
                    <div className="hero-top-cta">
                        <span className="cta-guide">Commencez ici 🚀</span>
                        <button className="btn-primary highlight pulse-animation" onClick={onStart}>
                            Démarrer l'Assistant IA <ArrowRight size={18} />
                        </button>
                    </div>

                    <div className="badge ripple">
                        <Sparkles size={14} /> <span>Assistant IA Disponible 24/7</span>
                    </div>

                    <h1 className="text-center">Votre <span>Assistant Marketing</span> Intelligent</h1>

                    <p className="hero-desc text-center">
                        Posez vos questions, analysez vos documents ou générez du contenu marketing en quelques secondes.
                        L'IA répond instantanément, un expert humain prend le relais si nécessaire.
                    </p>

                    <div className="steps-section">
                        <h2 className="steps-title">Comment ça marche ?</h2>
                        <div className="steps-grid">
                            <div className="step-item">
                                <div className="step-icon">
                                    <MessageSquare size={24} />
                                </div>
                                <h3>Posez votre question</h3>
                                <p>L'IA analyse instantanément et répond à vos besoins.</p>
                            </div>
                            <div className="step-item">
                                <div className="step-icon">
                                    <Settings size={24} />
                                </div>
                                <h3>IA spécialisée</h3>
                                <p>Générez des images ou des contenus personnalisés.</p>
                            </div>
                            <div className="step-item">
                                <div className="step-icon">
                                    <CheckCircle size={24} />
                                </div>
                                <h3>Support expert</h3>
                                <p>Un agent humain intervient pour les cas complexes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <footer className="minimalist-footer">
                <p>© 2026 Tous droits réservés</p>
            </footer>
        </div>
    );
}
