import { useRef, useState, type FormEvent } from 'react';
import { Loader2, Send } from 'lucide-react';
import { site } from '../data/site';

interface Values {
  name: string;
  email: string;
  subject: string;
  message: string;
}
type Errors = Partial<Record<keyof Values, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error' | 'mailto';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = 'Please enter your name.';
  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address, like name@example.com.';
  if (!v.subject.trim()) e.subject = 'Please add a subject.';
  if (!v.message.trim()) e.message = 'Please write a message.';
  else if (v.message.trim().length < 10) e.message = 'Your message is a bit short. Please write at least 10 characters.';
  return e;
}

const fields: { key: keyof Values; label: string; type: string; autoComplete: string }[] = [
  { key: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { key: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { key: 'subject', label: 'Subject', type: 'text', autoComplete: 'off' },
];

export function ContactForm() {
  const [values, setValues] = useState<Values>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMsg, setServerMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const hasEndpoint = Boolean(site.formEndpoint);
  const hasEmail = Boolean(site.email);
  const configured = hasEndpoint || hasEmail;

  const set = (k: keyof Values, val: string) => {
    setValues((s) => ({ ...s, [k]: val }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  const focusFirst = (errs: Errors) => {
    const first = (['name', 'email', 'subject', 'message'] as const).find((k) => errs[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const mailtoHref = () =>
    `mailto:${site.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(
      `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`,
    )}`;

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (status === 'sending') return;

    // Honeypot: real people never fill this hidden field.
    const trap = (formRef.current?.elements.namedItem('company') as HTMLInputElement | null)?.value;
    if (trap) return;

    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus('idle');
      focusFirst(errs);
      return;
    }

    if (hasEndpoint) {
      setStatus('sending');
      setServerMsg('');
      try {
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            subject: values.subject.trim(),
            message: values.message.trim(),
          }),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        setStatus('success');
        setValues({ name: '', email: '', subject: '', message: '' });
      } catch {
        setServerMsg(
          hasEmail
            ? 'Your message was not sent. Please try again, or use the email link instead.'
            : 'Your message was not sent. Please check your connection and try again.',
        );
        setStatus('error');
      }
      return;
    }

    if (hasEmail) {
      window.location.href = mailtoHref();
      setStatus('mailto');
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="form" aria-labelledby="form-title">
      <h3 id="form-title" className="form__title">
        Send a message
      </h3>

      {!configured && (
        <p className="form__notice" role="note">
          The contact form isn&apos;t connected yet, so messages can&apos;t be delivered from here. Please reach out via the
          links on this page.
        </p>
      )}

      {fields.map((f) => (
        <div className="form__row" key={f.key}>
          <label htmlFor={`cf-${f.key}`}>
            {f.label} <span aria-hidden="true">*</span>
            <span className="visually-hidden"> (required)</span>
          </label>
          <input
            id={`cf-${f.key}`}
            name={f.key}
            type={f.type}
            autoComplete={f.autoComplete}
            value={values[f.key]}
            onChange={(e) => set(f.key, e.target.value)}
            aria-required="true"
            aria-invalid={errors[f.key] ? 'true' : undefined}
            aria-describedby={errors[f.key] ? `cf-${f.key}-err` : undefined}
            disabled={!configured}
          />
          {errors[f.key] && (
            <p id={`cf-${f.key}-err`} className="form__error">
              {errors[f.key]}
            </p>
          )}
        </div>
      ))}

      <div className="form__row">
        <label htmlFor="cf-message">
          Message <span aria-hidden="true">*</span>
          <span className="visually-hidden"> (required)</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
          aria-required="true"
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'cf-message-err' : undefined}
          disabled={!configured}
        />
        {errors.message && (
          <p id="cf-message-err" className="form__error">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot spam trap (hidden from people and screen readers) */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn--accent form__submit" disabled={status === 'sending' || !configured}>
        {status === 'sending' ? (
          <>
            <Loader2 size={16} className="spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            {hasEndpoint ? 'Send message' : 'Open in email app'} <Send size={16} aria-hidden="true" />
          </>
        )}
      </button>

      <div className="form__status" aria-live="polite">
        {status === 'success' && <p className="form__ok">Thanks, your message was sent. I&apos;ll get back to you soon.</p>}
        {status === 'mailto' && (
          <p className="form__ok">
            Your email app should open with the message filled in. Nothing is sent until you press send there.
          </p>
        )}
        {status === 'error' && (
          <p className="form__error" role="alert">
            {serverMsg}
          </p>
        )}
      </div>
    </form>
  );
}
