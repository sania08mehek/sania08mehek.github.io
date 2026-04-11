import { portfolioData } from '@/data';



export function Footer() {


  return (
    <footer className="relative py-20 overflow-hidden" style={{ borderTop: '1px solid rgba(150, 150, 150, 0.15)' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
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
