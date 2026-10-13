import { BetaBanner } from '@/components/beta-banner';
import { Faq } from '@/components/faq';
import { Features } from '@/components/features';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { HowItWorks } from '@/components/how-it-works';
import { Navbar } from '@/components/navbar';
import { Sponsors } from '@/components/sponsors';
import { WhySelfHost } from '@/components/why-self-host';

const stack = ['Laravel', 'Next.js', 'nginx', 'PHP 8.0–8.5', 'MySQL 8.4', 'Redis', 'Node 20–24', 'PM2', 'Supervisor', 'Cloudflare', 'GitHub', 'Telegram'];

export default function Home() {
    return (
        <>
            <BetaBanner />
            <Navbar />
            <main>
                <Hero />

                <section aria-label="Works with" className="border-t border-line py-10">
                    <div className="container-page">
                        <p className="text-center text-[13px] text-faint">Works with the tools you already use</p>
                        <ul className="mt-5 flex flex-wrap justify-center gap-2">
                            {stack.map((name) => (
                                <li key={name} className="rounded-full border border-line bg-white/[0.02] px-3.5 py-1.5 text-sm text-dim">
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <Features />
                <HowItWorks />
                <WhySelfHost />
                <Sponsors />
                <Faq />
            </main>
            <Footer />
        </>
    );
}
