import { Heart, Briefcase, Zap, Shield, Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer-luxury">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <Link to="/" className="f-logo">
                            <div className="f-logo-box"><Briefcase size={20} /></div>
                            <span>RecruitHub</span>
                        </Link>
                        <p>The unified ecosystem for elite talent acquisition and enterprise scaling.</p>
                        <div className="social-links">
                            <a href="#"><Twitter size={18} /></a>
                            <a href="#"><Linkedin size={18} /></a>
                            <a href="#"><Github size={18} /></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <div className="link-col">
                            <h6>Marketplace</h6>
                            <Link to="/jobs">Active Roles</Link>
                            <Link to="/recruiters">Headhunters</Link>
                            <Link to="/submit-requirement">For Ventures</Link>
                        </div>
                        <div className="link-col">
                            <h6>Company</h6>
                            <a href="#">DNA & Story</a>
                            <a href="#">Security Protocol</a>
                            <a href="#">Partner Network</a>
                        </div>
                        <div className="link-col">
                            <h6>Support</h6>
                            <a href="#">Help Center</a>
                            <a href="#">API Docs</a>
                            <a href="#">Legacy Hub</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 RecruitHub Technologies. All system channels encrypted.</p>
                    <div className="made-with">
                        <span>Made with</span>
                        <Heart size={14} fill="var(--danger)" color="var(--danger)" />
                        <span>for the world's best recruiters</span>
                    </div>
                </div>
            </div>

            <style>{`
                .footer-luxury { 
                    background: white; 
                    border-top: 1px solid var(--gray-100); 
                    padding: 6rem 0 3rem; 
                    margin-top: auto; 
                }
                
                .footer-top { 
                    display: grid; 
                    grid-template-columns: 1.5fr 3fr; 
                    gap: 6rem; 
                    margin-bottom: 5rem; 
                }

                .footer-brand { max-width: 320px; }
                .f-logo { display: flex; align-items: center; gap: 12px; font-weight: 800; font-family: 'Outfit'; font-size: 1.5rem; color: var(--gray-900); margin-bottom: 2rem; }
                .f-logo-box { width: 36px; height: 36px; background: var(--primary); color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
                .footer-brand p { color: var(--gray-500); font-size: 0.95rem; line-height: 1.6; margin-bottom: 2rem; }
                
                .social-links { display: flex; gap: 1rem; }
                .social-links a { color: var(--gray-400); transition: var(--transition); }
                .social-links a:hover { color: var(--primary); transform: translateY(-3px); }

                .footer-links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
                .link-col h6 { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--gray-900); margin-bottom: 2rem; letter-spacing: 1px; }
                .link-col a { display: block; color: var(--gray-500); font-size: 0.95rem; margin-bottom: 12px; font-weight: 600; }
                .link-col a:hover { color: var(--primary); }

                .footer-bottom { 
                    padding-top: 3rem; 
                    border-top: 1px solid var(--gray-50); 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center;
                    color: var(--gray-400);
                    font-size: 14px;
                    font-weight: 600;
                }

                .made-with { display: flex; align-items: center; gap: 6px; }

                @media (max-width: 768px) {
                    .footer-top { grid-template-columns: 1fr; gap: 4rem; }
                    .footer-bottom { flex-direction: column; gap: 1.5rem; text-align: center; }
                }
            `}</style>
        </footer>
    );
}
