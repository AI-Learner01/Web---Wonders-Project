import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check karein ki user ne pehle se choice save ki hai ya nahi
        const consent = localStorage.getItem('aura_cookie_consent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('aura_cookie_consent', 'accepted');
        setShowBanner(false);
    };

    const handleDecline = () => {
        localStorage.setItem('aura_cookie_consent', 'declined');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-50 bg-slate-900/95 backdrop-blur-md text-white p-5 rounded-2xl shadow-2xl border border-slate-800 transition-all duration-300">
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🍪</span>
                    <h4 className="font-semibold text-lg text-emerald-400">We value your privacy</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                    AuraAvenue uses cookies to enhance your browsing experience, serve personalized travel offers, and analyze site traffic.
                </p>
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={handleAccept}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-xs py-2 px-4 rounded-xl transition duration-200 shadow-md"
                    >
                        Accept All
                    </button>
                    <button
                        onClick={handleDecline}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs py-2 px-4 rounded-xl transition duration-200 border border-slate-700"
                    >
                        Essential Only
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;