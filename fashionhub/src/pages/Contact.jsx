import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Clock, Mail, MapPin, Send } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Reveal from '../components/Reveal';

const EMPTY = { name: '', email: '', subject: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name (at least 2 characters).';
  if (!v.email.trim()) e.email = 'Email is required.';
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.subject.trim().length < 3) e.subject = 'Please add a subject (at least 3 characters).';
  if (v.message.trim().length < 10) e.message = 'Your message should be at least 10 characters.';
  return e;
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
      {children}
      <AnimatePresence>
        {error && <motion.p id={`${id}-error`} role="alert" initial={{ opacity: 0, y: -6, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1.5 text-sm text-red-600">{error}</motion.p>}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);

  const change = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (touched[e.target.name]) setErrors(validate(next));
  };
  const blur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate(values));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(found).length === 0) {
      setSent(true);
      setValues(EMPTY);
      setTouched({});
    }
  };

  const props = (name) => ({
    id: name, name, value: values[name], onChange: change, onBlur: blur,
    'aria-invalid': Boolean(touched[name] && errors[name]),
    'aria-describedby': touched[name] && errors[name] ? `${name}-error` : undefined,
    className: `field ${touched[name] && errors[name] ? 'field-error' : ''}`,
  });
  const err = (n) => (touched[n] ? errors[n] : '');

  return (
    <>
      <PageHeader eyebrow="Contact" title="We’d love to hear from you" subtitle="Questions about an order, a style or a collaboration? Send us a message." />
      <section className="section container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="space-y-4">
          {[[Mail, 'Email', 'hello@fashionhub.example'], [Clock, 'Support hours', 'Mon – Fri, 9am – 6pm'], [MapPin, 'Studio', '12 Style Street, Fashion District']].map(([Icon, t, d]) => (
            <div key={t} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sand text-clay"><Icon size={20} /></span>
              <div><p className="text-xs font-semibold uppercase tracking-widest text-ink/50">{t}</p><p className="font-medium">{d}</p></div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-white p-6 shadow-card sm:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.8, rotateX: -30 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }} style={{ transformPerspective: 800 }} className="py-10 text-center" role="status">
                  <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 14 }} className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 size={42} />
                  </motion.span>
                  <h2 className="text-3xl font-semibold">Message sent!</h2>
                  <p className="mx-auto mt-3 max-w-sm text-ink/65">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <Button onClick={() => setSent(false)} variant="outline" className="mt-7">Send another message</Button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="space-y-5">
                  <h2 className="text-2xl font-semibold">Send us a message</h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Name" error={err('name')}><input type="text" autoComplete="name" placeholder="Your name" {...props('name')} /></Field>
                    <Field id="email" label="Email" error={err('email')}><input type="email" autoComplete="email" placeholder="you@example.com" {...props('email')} /></Field>
                  </div>
                  <Field id="subject" label="Subject" error={err('subject')}><input type="text" placeholder="How can we help?" {...props('subject')} /></Field>
                  <Field id="message" label="Message" error={err('message')}><textarea rows={5} placeholder="Write your message…" {...props('message')} /></Field>
                  <Button type="submit" className="w-full !py-4 sm:w-auto sm:!px-10"><Send size={16} /> Send Message</Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </section>
    </>
  );
}
