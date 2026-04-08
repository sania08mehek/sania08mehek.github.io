import { Mail } from 'lucide-react';
import { portfolioData } from '@/data';



export function Footer() {


  return (
    <footer className="relative py-20 overflow-hidden" style={{ borderTop: '1px solid rgba(150, 150, 150, 0.15)' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Top — CTA Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div className="text-center md:text-left">
            <h3 className="font-display text-3xl gradient-text mb-2">Let's Work Together</h3>
            <p className="text-gray-400 text-sm">Open for freelance opportunities and collaborations</p>
          </div>

          <div className="flex gap-6">
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="flex items-center gap-2 px-6 py-3 rounded-full hover:border-[#DFB6B2] hover:text-[#DFB6B2] transition-all text-sm text-gray-300"
              style={{ border: '1px solid rgba(150, 150, 150, 0.3)' }}
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500" style={{ borderTop: '1px solid rgba(150, 150, 150, 0.1)' }}>
          <p>{portfolioData.footer.copyright}</p>
          <div className="flex gap-6">
            {portfolioData.footer.socials
              .filter(social => social.href && social.href !== '#' && social.href !== '')
              .map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {social.label}
                </a>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
