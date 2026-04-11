import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { portfolioData } from '@/data';

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: 'rgba(0, 0, 0, 0.3)' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gray-400 uppercase tracking-widest text-sm mb-4">
            {portfolioData.contact.sectionSubtitle}
          </p>
          <h2 className="section-title text-5xl md:text-6xl mb-6">
            {portfolioData.contact.sectionTitle}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h3 className="font-display text-3xl md:text-4xl text-white mb-6">
              {portfolioData.contact.headline}
            </h3>
            <p className="text-gray-400 mb-12 leading-relaxed">
              {portfolioData.contact.description}
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-12">
              {portfolioData.contact.email && portfolioData.contact.email !== '#' && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg glass flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#DFB6B2]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <a
                      href={`mailto:${portfolioData.contact.email}`}
                      className="text-gray-300 hover:text-[#DFB6B2] transition-colors"
                    >
                      {portfolioData.contact.email}
                    </a>
                  </div>
                </div>
              )}

              {portfolioData.contact.phone && portfolioData.contact.phone !== '#' && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg glass flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#DFB6B2]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <a
                      href={`tel:${portfolioData.contact.phone}`}
                      className="text-gray-300 hover:text-[#DFB6B2] transition-colors"
                    >
                      {portfolioData.contact.phone}
                    </a>
                  </div>
                </div>
              )}

              {portfolioData.contact.location && portfolioData.contact.location !== '#' && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg glass flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#DFB6B2]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="text-gray-300">
                      {portfolioData.contact.location}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-300">
                {portfolioData.contact.availability}
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`relative transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {/* Glowing Blob Background */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#522B5B]/30 via-[#854F6C]/20 to-[#DFB6B2]/30 rounded-[2rem] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse" />
            
            <form 
              onSubmit={handleSubmit} 
              className="relative glass p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl overflow-hidden group"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.05)'
              }}
            >
              {/* Internal Accent Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#DFB6B2]/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#522B5B]/20 blur-[80px] rounded-full pointer-events-none" />

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h4 className="font-display text-2xl text-white mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-gray-400">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        {portfolioData.contact.formFields.name.label}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={portfolioData.contact.formFields.name.placeholder}
                        className="input-luxury w-full bg-white/5 border-white/10 focus:border-[#DFB6B2]/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        {portfolioData.contact.formFields.email.label}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={portfolioData.contact.formFields.email.placeholder}
                        className="input-luxury w-full bg-white/5 border-white/10 focus:border-[#DFB6B2]/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">
                      {portfolioData.contact.formFields.subject.label}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={portfolioData.contact.formFields.subject.placeholder}
                      className="input-luxury w-full bg-white/5 border-white/10 focus:border-[#DFB6B2]/50"
                      required
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm text-gray-400 mb-2">
                      {portfolioData.contact.formFields.message.label}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={portfolioData.contact.formFields.message.placeholder}
                      rows={5}
                      className="input-luxury w-full resize-none bg-white/5 border-white/10 focus:border-[#DFB6B2]/50"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-3 py-4 rounded-xl group/btn overflow-hidden relative"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {portfolioData.contact.submitButton}
                      <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#522B5B] to-[#854F6C] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
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
