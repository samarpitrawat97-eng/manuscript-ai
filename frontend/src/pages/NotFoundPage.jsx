import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="pt-32 px-6 pb-32">
            <div className="max-w-6xl mx-auto text-center">
                <p className="text-gold text-xs uppercase tracking-[0.35em] font-bold mb-6">
                    Error 404
                </p>

                <h1 className="text-7xl md:text-9xl font-serif mb-6">
                    Lost <span className="text-gold italic">manuscript.</span>
                </h1>

                <p className="max-w-2xl mx-auto text-white/40 text-lg mb-12">
                    The page you are looking for does not exist
                    or has been moved.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                    <button
                        onClick={() => navigate('/')}
                        className="px-10 py-4 bg-gold text-background font-black rounded-full text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(215,168,75,0.4)]"
                    >
                        Back Home
                    </button>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-10 py-4 bg-white/5 border border-white/10 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
