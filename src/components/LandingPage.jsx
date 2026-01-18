import React from 'react';
import { Brain, Sparkles, Megaphone, PenTool, Layout, ArrowRight, CheckCircle } from 'lucide-react';

export default function LandingPage({ onStart }) {
    return (
        <div className="landing-page">
            <nav className="landing-nav">
                <div className="nav-container">
                    <div className="nav-brand">
                        <Brain className="logo" size={28} />
                        <span>BrandBrain</span>
                    </div>
                    <div className="nav-links">
                        <a href="#features">Fonctionnalités</a>
                        <a href="#about">À propos</a>
                        <button className="nav-cta" onClick={onStart}>Essayer gratuitement</button>
                    </div>
                </div>
            </nav>

            <header className="hero">
                <div className="hero-content">
                    <div className="badge ripple">
                        <Sparkles size={14} /> <span>L'IA Marketing Révolutionnaire</span>
                    </div>
                    <h1>Propulsez votre <span>Marketing</span> avec l'IA Multimodale</h1>
                    <p>
                        Analysez vos documents, générez des visuels percutants et rédigez des campagnes
                        qui convertissent en quelques secondes. L'intelligence artificielle au service de votre marque.
                    </p>
                    <div className="hero-btns">
                        <button className="btn-primary" onClick={onStart}>
                            Démarrer l'Assistant <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="visual-card">
                        <div className="card-header">
                            <div className="dot"></div><div className="dot"></div><div className="dot"></div>
                        </div>
                        <div className="card-mockup">
                            <div className="mockup-line"></div>
                            <div className="mockup-line short"></div>
                            <div className="mockup-img"></div>
                        </div>
                    </div>
                </div>
            </header>

            <section id="features" className="features">
                <div className="section-header">
                    <h2>Une suite complète pour votre marque</h2>
                    <p>Tout ce dont vous avez besoin pour dominer votre marché digital.</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon"><Megaphone size={24} /></div>
                        <h3>Stratégie de Contenu</h3>
                        <p>L'IA analyse votre secteur et propose des angles d'attaque uniques.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><PenTool size={24} /></div>
                        <h3>Copywriting Persuasif</h3>
                        <p>Générez des messages captivants pour vos réseaux sociaux et emails.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><Layout size={24} /></div>
                        <h3>Design Multimodal</h3>
                        <p>Analysez vos visuels existants ou créez-en de nouveaux instantanément.</p>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="cta-container">
                    <h2>Prêt à transformer votre communication ?</h2>
                    <p>Rejoignez les créateurs qui utilisent BrandBrain pour gagner des heures de travail chaque jour.</p>
                    <button className="btn-large" onClick={onStart}>Lancer BrandBrain AI</button>
                    <div className="social-proof">
                        <div className="proof-item"><CheckCircle size={14} /> Sans carte bancaire</div>
                        <div className="proof-item"><CheckCircle size={14} /> Accès gratuit illimité</div>
                    </div>
                </div>
            </section>

            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <Brain size={20} /> BrandBrain
                    </div>
                    <p>© 2026 Conçu par ILBOUDO Christian - Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
}
