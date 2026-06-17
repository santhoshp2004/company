import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useTheme, THEMES } from '../context/ThemeContext';

const footerLinks = {
  Product:  [{ label:'All Products', to:'/products' },{ label:'Pricing', to:'/products' },{ label:'Changelog', to:'/support' },{ label:'Roadmap', to:'/support' }],
  Company:  [{ label:'About Us', to:'/about' },{ label:'Careers', to:'/careers' },{ label:'Partners', to:'/partners' },{ label:'Brand', to:'/brand' }],
  Support:  [{ label:'Help Center', to:'/support' },{ label:'Documentation', to:'/support' },{ label:'Community', to:'/support' },{ label:'Status', to:'/support' }],
  Legal:    [{ label:'Privacy Policy', to:'/support' },{ label:'Terms of Service', to:'/support' },{ label:'Security', to:'/support' },{ label:'Cookies', to:'/support' }],
};

const socials = [
  { name:'Twitter',  href:'#', d:'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
  { name:'GitHub',   href:'#', d:'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
  { name:'LinkedIn', href:'#', d:'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
];

export default function Footer() {
  const { theme } = useTheme();
  const isLight   = theme === THEMES.VISION;

  const bg        = isLight ? 'bg-white border-t border-slate-200'             : 'bg-dark-900 border-t border-white/8';
  const headingCls= isLight ? 'text-slate-800 font-semibold'                   : 'text-white font-semibold';
  const linkCls   = isLight ? 'text-slate-500 hover:text-blue-600'             : 'text-gray-400 hover:text-white';
  const muteColor = isLight ? 'text-slate-400'                                 : 'text-gray-500';
  const socialCls = isLight ? 'bg-slate-50 border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50'
                             : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20';

  return (
    <footer className={`relative overflow-hidden ${bg} transition-all duration-500`}>
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full blur-3xl pointer-events-none"
        style={{ background: isLight ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.08)' }}/>

      <div className="section-container py-14 relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className={`text-sm leading-relaxed max-w-xs ${muteColor}`}>
              Building digital products for modern businesses. USEMETA delivers software solutions, cloud services, and enterprise platforms — founded by Santhosh.
            </p>
            <div className="space-y-1">
              <a href="mailto:santhoshp232004@gmail.com" className={`flex items-center gap-2 text-xs transition-colors ${isLight?'text-slate-400 hover:text-blue-600':'text-gray-500 hover:text-gray-300'}`}>
                <span>📧</span> santhoshp232004@gmail.com
              </a>
              <a href="tel:9976017966" className={`flex items-center gap-2 text-xs transition-colors ${isLight?'text-slate-400 hover:text-blue-600':'text-gray-500 hover:text-gray-300'}`}>
                <span>📞</span> +91 9976017966
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              {socials.map(({ name, href, d }) => (
                <a key={name} href={href} aria-label={name}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${socialCls}`}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={d} fillRule="evenodd" clipRule="evenodd"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className={`text-sm mb-4 ${headingCls}`}>{group}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className={`text-sm transition-colors duration-200 ${linkCls}`}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className={`mt-10 pt-6 border-t ${isLight ? 'border-slate-100' : 'border-white/8'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <p className={`text-xs ${muteColor}`}>
            © 2026 USEMETA. All Rights Reserved. Founded by Santhosh.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/>
            <span className={`text-xs ${muteColor}`}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
