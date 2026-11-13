import { CalendarDays, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { profile } from '../data/profile';
import ChapterHeading from '../components/ui/ChapterHeading';
import { Reveal } from '../components/ui/Reveal';
import { GitHubIcon, LinkedInIcon } from '../components/icons';

const waNumber = profile.social.phone.replace(/[^0-9]/g, '');

const Row = ({ icon: Icon, label, children }) => (
    <div className="group flex items-center gap-5">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/10 bg-slate-900 text-primary shadow-lg transition-all duration-300 group-hover:bg-primary group-hover:text-slate-950">
            <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0">
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-slate-500">{label}</p>
            {children}
        </div>
    </div>
);

const linkCls = 'break-words text-lg font-bold text-white transition-colors hover:text-primary';
const pill = 'flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-lg transition-all hover:-translate-y-1';
const field = 'w-full rounded-xl border border-white/10 bg-slate-950 px-5 py-4 text-white transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary';

const Contact = () => {
    const send = (e, method) => {
        const form = e.currentTarget.closest('form');
        if (!form.reportValidity()) return;
        const name = form.elements.name.value;
        const email = form.elements.email.value;
        const message = form.elements.message.value;
        const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
        if (method === 'whatsapp') {
            window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
        } else {
            window.location.href = `mailto:${profile.social.email}?subject=${encodeURIComponent(`Portfolio contact from ${name}`)}&body=${encodeURIComponent(text)}`;
        }
    };

    return (
        <section id="contact" className="relative py-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.07),transparent_65%)]" aria-hidden="true" />
            <div className="container relative mx-auto px-6">
                <ChapterHeading
                    number="06"
                    kicker="Get in touch"
                    title="Let's build something"
                    accent="extraordinary."
                    intro="Open to new opportunities. Whether it's a question, a project idea, or just to connect, reach out and I'll get back to you as soon as possible."
                />

                <div className="grid items-stretch gap-8 lg:grid-cols-2">
                    <Reveal className="min-w-0 h-full">
                      <div className="h-full rounded-3xl border border-white/10 bg-slate-950/75 p-6 shadow-2xl backdrop-blur-xl sm:p-8 md:p-10">
                        <h3 className="mb-8 text-2xl font-bold text-white">Contact details</h3>
                        <div className="mb-10 space-y-7">
                            <Row icon={Mail} label="Email"><a href={`mailto:${profile.social.email}`} className={linkCls}>{profile.social.email}</a></Row>
                            <Row icon={Phone} label="Phone / WhatsApp"><a href={`tel:${profile.social.phone}`} className={linkCls}>{profile.social.phone}</a></Row>
                            <Row icon={MapPin} label="Location"><p className="text-lg font-bold text-white">{profile.location}</p></Row>
                        </div>
                        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-slate-500">Connect</p>
                        <div className="flex flex-wrap gap-3">
                            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className={`${pill} border-[#0077b5]/20 bg-[#0077b5]/10 text-[#38a8e0] hover:bg-[#0077b5] hover:text-white`}><LinkedInIcon /> LinkedIn</a>
                            <a href={profile.social.github} target="_blank" rel="noreferrer" className={`${pill} border-slate-700 bg-slate-800/50 text-white hover:bg-white hover:text-slate-900`}><GitHubIcon /> GitHub</a>
                            <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer" className={`${pill} border-[#25D366]/20 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white`}><MessageCircle className="h-4 w-4" /> WhatsApp</a>
                            <a href={profile.social.topmate} target="_blank" rel="noreferrer" className={`${pill} border-[#ff5a5f]/20 bg-[#ff5a5f]/10 text-[#ff5a5f] hover:bg-[#ff5a5f] hover:text-white`}><CalendarDays className="h-4 w-4" /> Topmate</a>
                        </div>
                      </div>
                    </Reveal>

                    <Reveal delay={0.15} className="min-w-0 h-full">
                        <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/75 p-6 shadow-2xl backdrop-blur-xl sm:p-8 md:p-10">
                            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/20 blur-[50px]" aria-hidden="true" />
                            <h3 className="relative mb-8 text-2xl font-bold text-white">Send a message</h3>
                            <form className="relative space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid gap-6 md:grid-cols-2 [&>*]:min-w-0">
                                    <label className="block space-y-2">
                                        <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">Your name</span>
                                        <input name="name" type="text" className={field} placeholder="Your name" required />
                                    </label>
                                    <label className="block space-y-2">
                                        <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">Your email</span>
                                        <input name="email" type="email" className={field} placeholder="you@example.com" required />
                                    </label>
                                </div>
                                <label className="block space-y-2">
                                    <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">Message</span>
                                    <textarea name="message" rows="6" className={`${field} resize-none`} placeholder="Type your message here..." required />
                                </label>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <button type="button" onClick={(e) => send(e, 'email')} className="rounded-xl bg-primary py-4 text-xs font-bold uppercase tracking-widest text-slate-950 shadow-lg shadow-primary/25 transition-all hover:-translate-y-1 hover:bg-white">Send via email</button>
                                    <button type="button" onClick={(e) => send(e, 'whatsapp')} className="rounded-xl bg-[#25D366] py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-[#25D366]/25 transition-all hover:-translate-y-1 hover:bg-white hover:text-[#25D366]">Send via WhatsApp</button>
                                </div>
                            </form>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Contact;
