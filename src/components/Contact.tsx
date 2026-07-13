'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { profile, contactSubjects } from '@/data/portfolio';
import Magnetic from '@/components/ui/Magnetic';
import RevealText from '@/components/ui/RevealText';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

const INITIAL_FORM = { name: '', email: '', phone: '', subject: '', message: '' };

const inputClass =
  'w-full border-0 border-b hairline bg-transparent py-3 font-display text-base text-ink placeholder:text-muted/50 transition-colors duration-300 focus:border-accent focus:outline-none';

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('sent');
        setForm(INITIAL_FORM);
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(result.error || 'Transmission failed. Try again.');
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Transmission failed. Try again.');
    }
  };

  const contactRows = [
    { label: 'Phone', value: profile.phone, href: profile.phoneHref },
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    ...profile.socials.map((s) => ({ label: s.label, value: s.handle, href: s.href })),
  ];

  return (
    <section id="contact" className="px-6 py-28 md:px-12 md:py-44" aria-label="Contact">
      <p className="eyebrow mb-8">04 / TRANSMISSION</p>

      {/* Giant CTA */}
      <h2 className="font-display font-bold uppercase leading-[0.92] tracking-[-0.04em] text-ink">
        <RevealText className="text-[clamp(3rem,11vw,10rem)]">
          <>
            LET&apos;S{' '}
            <Magnetic className="align-baseline" strength={0.2}>
              <span className="text-accent">BUILD</span>
            </Magnetic>
          </>
        </RevealText>
      </h2>
      <p className="mt-4 font-serif text-2xl italic text-muted md:text-3xl">
        something worth shipping.
      </p>

      <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-24">
        {/* Contact channels */}
        <div>
          <dl>
            {contactRows.map((row, i) => (
              <motion.div
                key={row.label}
                className="border-t hairline py-5 last:border-b"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <dt className="eyebrow mb-1.5">{row.label}</dt>
                <dd>
                  <a
                    href={row.href}
                    target={row.href.startsWith('http') ? '_blank' : undefined}
                    rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="link-draw font-mono text-sm text-ink md:text-base"
                  >
                    {row.value}
                  </a>
                </dd>
              </motion.div>
            ))}
          </dl>

          <p className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-terminal">
            <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-terminal" />
            Available for freelance & full-time — response within 24h
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="eyebrow mb-2 block">
                Name <span className="text-accent">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={onChange}
                className={inputClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="eyebrow mb-2 block">
                Email <span className="text-accent">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={onChange}
                className={inputClass}
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-phone" className="eyebrow mb-2 block">
                Phone
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={onChange}
                className={inputClass}
                placeholder="+961 ..."
              />
            </div>
            <div>
              <label htmlFor="contact-subject" className="eyebrow mb-2 block">
                Subject
              </label>
              <select
                id="contact-subject"
                name="subject"
                value={form.subject}
                onChange={onChange}
                className={`${inputClass} appearance-none`}
              >
                <option value="" className="bg-bg-elevated">
                  Select a topic
                </option>
                {contactSubjects.map((s) => (
                  <option key={s} value={s} className="bg-bg-elevated">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="eyebrow mb-2 block">
              Message <span className="text-accent">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={onChange}
              className={`${inputClass} resize-none`}
              placeholder="What are we building?"
            />
          </div>

          {error && (
            <p role="alert" className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
              ✕ {error}
            </p>
          )}

          <Magnetic>
            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className={`border px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] transition-all duration-300 disabled:cursor-not-allowed ${
                status === 'sent'
                  ? 'border-terminal text-terminal'
                  : 'border-accent bg-accent text-bg hover:bg-transparent hover:text-accent disabled:opacity-60'
              }`}
            >
              {status === 'sending' && 'Transmitting...'}
              {status === 'sent' && '✓ Received — back to you within 24h'}
              {(status === 'idle' || status === 'error') && 'Send transmission →'}
            </button>
          </Magnetic>
        </form>
      </div>
    </section>
  );
}
