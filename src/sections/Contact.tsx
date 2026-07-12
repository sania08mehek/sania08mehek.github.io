import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { portfolioData } from '@/data';

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactItems = [
    { icon: Mail, label: 'Email', value: portfolioData.contact.email, href: `mailto:${portfolioData.contact.email}` },
    { icon: Phone, label: 'Phone', value: portfolioData.contact.phone, href: `tel:${portfolioData.contact.phone}` },
    { icon: MapPin, label: 'Location', value: portfolioData.contact.location, href: undefined },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-36 overflow-hidden">
      <div className="container-xl relative z-10">
        {/* Header */}
        <div
          className="text-center mb-20 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{ width: '2.5rem', height: '1.5px', background: '#8B0D1A' }} />
            <span className="label-text">{portfolioData.contact.sectionSubtitle}</span>
            <div style={{ width: '2.5rem', height: '1.5px', background: '#8B0D1A' }} />
          </div>
          <h2
            className="font-display font-bold"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#F5F2ED', lineHeight: '1.1' }}
          >
            {portfolioData.contact.sectionTitle}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT — Info */}
          <div
            className="transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
              transitionDelay: '200ms',
            }}
          >
            <h3
              className="font-display font-bold text-3xl md:text-4xl mb-5"
              style={{ color: '#F5F2ED' }}
            >
              {portfolioData.contact.headline}
            </h3>
            <p
              className="leading-relaxed mb-12 text-base"
              style={{ color: 'rgba(200, 196, 191, 0.7)' }}
            >
              {portfolioData.contact.description}
            </p>

            {/* Contact items */}
            <div className="space-y-5 mb-12">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                value && value !== '#' && (
                  <div
                    key={label}
                    className="flex items-center gap-5 p-4 rounded-xl transition-all duration-300 group"
                    style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,13,26,0.3)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)'}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'rgba(139, 13, 26, 0.12)',
                        border: '1px solid rgba(139, 13, 26, 0.2)',
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: '#C01830' }} />
                    </div>
                    <div>
                      <p
                        className="font-syne text-xs font-semibold uppercase tracking-wider mb-1"
                        style={{ color: 'rgba(133, 127, 120, 0.7)' }}
                      >
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-medium transition-colors duration-300"
                          style={{ color: 'rgba(245, 242, 237, 0.85)' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C01830'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245, 242, 237, 0.85)'}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium" style={{ color: 'rgba(245, 242, 237, 0.85)' }}>{value}</p>
                      )}
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* Availability */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
              style={{
                background: 'rgba(22, 22, 22, 0.8)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="availability-dot" />
              <span className="font-syne font-semibold text-sm" style={{ color: '#F5F2ED' }}>
                {portfolioData.contact.availability}
              </span>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div
            className="transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
              transitionDelay: '400ms',
            }}
          >
            {/* Outer glow blob */}
            <div
              className="absolute -inset-8 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(139, 13, 26, 0.12), transparent 70%)',
                filter: 'blur(40px)',
                borderRadius: '2rem',
              }}
            />
            <form
              onSubmit={handleSubmit}
              className="relative glass-card p-8 md:p-10"
              style={{
                background: 'rgba(16, 16, 16, 0.9)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle className="w-16 h-16 mb-4" style={{ color: '#22c55e' }} />
                  <h4 className="font-display font-bold text-2xl mb-2" style={{ color: '#F5F2ED' }}>
                    Message Sent!
                  </h4>
                  <p style={{ color: 'rgba(200, 196, 191, 0.7)' }}>
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    {[
                      { field: 'name', label: portfolioData.contact.formFields.name.label, placeholder: portfolioData.contact.formFields.name.placeholder, type: 'text' },
                      { field: 'email', label: portfolioData.contact.formFields.email.label, placeholder: portfolioData.contact.formFields.email.placeholder, type: 'email' },
                    ].map(({ field, label, placeholder, type }) => (
                      <div key={field}>
                        <label
                          className="block font-syne font-semibold text-xs uppercase tracking-wider mb-2"
                          style={{ color: focused === field ? '#C01830' : 'rgba(133, 127, 120, 0.8)' }}
                        >
                          {label}
                        </label>
                        <input
                          type={type}
                          name={field}
                          value={formData[field as keyof typeof formData]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          className="input-field"
                          required
                          onFocus={() => setFocused(field)}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mb-5">
                    <label
                      className="block font-syne font-semibold text-xs uppercase tracking-wider mb-2"
                      style={{ color: focused === 'subject' ? '#C01830' : 'rgba(133, 127, 120, 0.8)' }}
                    >
                      {portfolioData.contact.formFields.subject.label}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={portfolioData.contact.formFields.subject.placeholder}
                      className="input-field"
                      required
                      onFocus={() => setFocused('subject')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  <div className="mb-8">
                    <label
                      className="block font-syne font-semibold text-xs uppercase tracking-wider mb-2"
                      style={{ color: focused === 'message' ? '#C01830' : 'rgba(133, 127, 120, 0.8)' }}
                    >
                      {portfolioData.contact.formFields.message.label}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={portfolioData.contact.formFields.message.placeholder}
                      rows={5}
                      className="input-field resize-none"
                      required
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-crimson w-full justify-center text-sm py-4"
                  >
                    <span className="flex items-center gap-2">
                      {portfolioData.contact.submitButton}
                      <Send className="w-4 h-4" />
                    </span>
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
