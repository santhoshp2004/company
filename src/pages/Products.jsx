import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, THEMES } from '../context/ThemeContext';

/* ── Product catalogue ── */
const CATALOGUE = {
  Business: [
    { name: 'Beta ERP', badge: 'ERP', icon: '🏭', color: 'from-blue-500 to-indigo-600',
      tagline: 'Enterprise Resource Planning',
      desc: 'Integrated inventory, accounting, procurement, finance, and operational management in one unified platform.',
      features: ['Inventory Management', 'Accounting Module', 'Procurement Tracking', 'Business Reports', 'Multi-branch Support', 'Dashboard Analytics'],
      stats: [{ v: '10,000+', l: 'Transactions' }, { v: '100%', l: 'Secure' }] },
    { name: 'Beta CRM', badge: 'CRM', icon: '🤝', color: 'from-cyan-500 to-blue-600',
      tagline: 'Customer Relationship Management',
      desc: 'Manage leads, sales pipelines, customer interactions, support tickets, and business growth metrics.',
      features: ['Lead Management', 'Sales Pipeline', 'Customer Support', 'Analytics Dashboard', 'Email Integration', 'Activity Tracking'],
      stats: [{ v: '500+', l: 'Businesses' }, { v: '95%', l: 'Retention' }] },
    { name: 'Beta Inventory', badge: 'INV', icon: '📦', color: 'from-amber-500 to-orange-600',
      tagline: 'Inventory Management System',
      desc: 'Real-time stock tracking, warehouse management, supplier orders and product lifecycle control.',
      features: ['Stock Tracking', 'Warehouse Management', 'Supplier Orders', 'Barcode Scanning', 'Low Stock Alerts', 'Audit Reports'],
      stats: [{ v: '50,000+', l: 'SKUs Managed' }, { v: '99.8%', l: 'Accuracy' }] },
    { name: 'Beta HRMS', badge: 'HR', icon: '👥', color: 'from-violet-500 to-purple-600',
      tagline: 'Human Resource Management',
      desc: 'Complete employee management — payroll, attendance, leave, performance evaluation, and onboarding.',
      features: ['Employee Directory', 'Attendance Tracking', 'Leave Management', 'Payroll Processing', 'Performance Reviews', 'Onboarding Workflows'],
      stats: [{ v: '1,000+', l: 'Employees' }, { v: '99.9%', l: 'Uptime' }] },
  ],
  Finance: [
    { name: 'Beta Accounts', badge: 'ACC', icon: '📊', color: 'from-emerald-500 to-teal-600',
      tagline: 'Accounting & Finance Platform',
      desc: 'Double-entry accounting, ledger management, profit & loss, balance sheet and GST reporting.',
      features: ['General Ledger', 'P&L Statements', 'Balance Sheet', 'GST Returns', 'Bank Reconciliation', 'Audit Trail'],
      stats: [{ v: '₹100Cr+', l: 'Processed' }, { v: '100%', l: 'Compliant' }] },
    { name: 'Beta Payroll', badge: 'PAY', icon: '💳', color: 'from-green-500 to-emerald-600',
      tagline: 'Payroll Processing System',
      desc: 'Automated salary processing, tax computation, payslip generation and statutory compliance.',
      features: ['Salary Computation', 'Tax Deductions', 'Payslip Generation', 'PF / ESI Filing', 'Bank Transfer', 'Form 16'],
      stats: [{ v: '5,000+', l: 'Employees Paid' }, { v: 'Zero', l: 'Errors' }] },
    { name: 'Beta Billing', badge: 'BIL', icon: '🧾', color: 'from-teal-500 to-cyan-600',
      tagline: 'GST Billing & Invoicing',
      desc: 'GST-compliant invoicing, payment tracking, credit notes and financial reconciliation tools.',
      features: ['GST Invoicing', 'E-Way Bills', 'Payment Tracking', 'Credit Notes', 'Customer Portal', 'Reports'],
      stats: [{ v: '2M+', l: 'Invoices' }, { v: 'GST', l: 'Compliant' }] },
    { name: 'Beta Audit', badge: 'AUD', icon: '🔍', color: 'from-slate-500 to-slate-700',
      tagline: 'Audit & Compliance Management',
      desc: 'Financial audit trails, compliance reporting, risk management and internal control tracking.',
      features: ['Audit Trails', 'Risk Reports', 'Internal Controls', 'Compliance Dashboard', 'Document Management', 'Workflow Approval'],
      stats: [{ v: '100%', l: 'Trail Coverage' }, { v: 'ISO', l: 'Aligned' }] },
  ],
  Education: [
    { name: 'Beta School ERP', badge: 'SCH', icon: '🏫', color: 'from-violet-500 to-indigo-600',
      tagline: 'School Administration System',
      desc: 'Complete school management — admissions, attendance, examinations, fees, and parent communication.',
      features: ['Student Management', 'Attendance Tracking', 'Exam Management', 'Fee Collection', 'Parent Portal', 'Report Cards'],
      stats: [{ v: '50+', l: 'Institutions' }, { v: '20,000+', l: 'Students' }] },
    { name: 'Beta LMS', badge: 'LMS', icon: '📚', color: 'from-purple-500 to-violet-600',
      tagline: 'Learning Management System',
      desc: 'Online learning platform with course management, assessments, progress tracking and certifications.',
      features: ['Course Builder', 'Video Lessons', 'Quizzes & Tests', 'Progress Tracking', 'Certificates', 'Discussion Forums'],
      stats: [{ v: '10,000+', l: 'Learners' }, { v: '500+', l: 'Courses' }] },
    { name: 'Beta Fee Manager', badge: 'FEE', icon: '🏦', color: 'from-indigo-500 to-blue-600',
      tagline: 'Fee Collection & Management',
      desc: 'Automated fee collection, receipts, payment reminders, and comprehensive financial reports for institutions.',
      features: ['Fee Structure Setup', 'Online Payments', 'Receipt Generation', 'Dues Tracking', 'Reminders', 'MIS Reports'],
      stats: [{ v: '₹10Cr+', l: 'Collected' }, { v: '98%', l: 'On-time Rate' }] },
    { name: 'Beta Parent Portal', badge: 'PAR', icon: '📱', color: 'from-pink-500 to-rose-600',
      tagline: 'Parent Engagement Platform',
      desc: 'Real-time parent–school communication, attendance alerts, fee notices and student progress tracking.',
      features: ['Attendance Alerts', 'Fee Notifications', 'Progress Reports', 'Circular Sharing', 'Chat Module', 'Event Calendar'],
      stats: [{ v: '15,000+', l: 'Parents' }, { v: '4.8★', l: 'Rating' }] },
  ],
  Healthcare: [
    { name: 'Beta HMS', badge: 'HMS', icon: '🏨', color: 'from-rose-500 to-red-600',
      tagline: 'Hospital Management System',
      desc: 'Comprehensive hospital management — patient records, appointments, billing, and department coordination.',
      features: ['Patient Records (EMR)', 'OPD / IPD Management', 'Appointment Scheduling', 'Billing & Insurance', 'Doctor Dashboard', 'Ward Management'],
      stats: [{ v: '20+', l: 'Hospitals' }, { v: '1L+', l: 'Patients' }] },
    { name: 'Beta Clinic', badge: 'CLI', icon: '💊', color: 'from-red-500 to-rose-600',
      tagline: 'Clinic Management Software',
      desc: 'Clinic scheduling, electronic prescriptions, patient history and teleconsultation support.',
      features: ['Appointment Booking', 'E-Prescriptions', 'Patient History', 'Teleconsultation', 'Lab Orders', 'Follow-up Reminders'],
      stats: [{ v: '200+', l: 'Clinics' }, { v: '50,000+', l: 'Consultations' }] },
    { name: 'Beta Lab', badge: 'LAB', icon: '🔬', color: 'from-orange-500 to-amber-600',
      tagline: 'Laboratory Information System',
      desc: 'Laboratory sample tracking, test result management, QC and automated report generation.',
      features: ['Sample Tracking', 'Test Catalogue', 'Result Entry', 'Quality Control', 'Report Generation', 'Home Collection'],
      stats: [{ v: '100+', l: 'Labs' }, { v: '500K+', l: 'Tests Processed' }] },
    { name: 'Beta Pharmacy', badge: 'PHA', icon: '💉', color: 'from-amber-500 to-yellow-600',
      tagline: 'Pharmacy Management System',
      desc: 'Medicine inventory, dispensing, expiry tracking, and supplier purchase order management.',
      features: ['Medicine Inventory', 'Dispensing Module', 'Expiry Tracking', 'Purchase Orders', 'GST Billing', 'Supplier Management'],
      stats: [{ v: '500+', l: 'Pharmacies' }, { v: '99%', l: 'Accuracy' }] },
  ],
};

const CATEGORIES = Object.keys(CATALOGUE);

const CATEGORY_META = {
  Business:   { icon: '🏢', color: 'from-blue-500 to-indigo-600',   lightBg: 'bg-blue-50',    lightBorder: 'border-blue-200',    lightText: 'text-blue-700'    },
  Finance:    { icon: '💰', color: 'from-emerald-500 to-teal-600',  lightBg: 'bg-emerald-50', lightBorder: 'border-emerald-200', lightText: 'text-emerald-700' },
  Education:  { icon: '🎓', color: 'from-violet-500 to-purple-600', lightBg: 'bg-violet-50',  lightBorder: 'border-violet-200',  lightText: 'text-violet-700'  },
  Healthcare: { icon: '🏥', color: 'from-rose-500 to-red-600',      lightBg: 'bg-rose-50',    lightBorder: 'border-rose-200',    lightText: 'text-rose-700'    },
};

function getGrad(cls) {
  const m = {
    'from-blue-500 to-indigo-600':   '#3B82F6,#4F46E5',
    'from-cyan-500 to-blue-600':     '#06B6D4,#2563EB',
    'from-amber-500 to-orange-600':  '#F59E0B,#EA580C',
    'from-violet-500 to-purple-600': '#8B5CF6,#9333EA',
    'from-emerald-500 to-teal-600':  '#10B981,#0D9488',
    'from-green-500 to-emerald-600': '#22C55E,#059669',
    'from-teal-500 to-cyan-600':     '#14B8A6,#0891B2',
    'from-slate-500 to-slate-700':   '#64748B,#334155',
    'from-violet-500 to-indigo-600': '#8B5CF6,#4F46E5',
    'from-purple-500 to-violet-600': '#A855F7,#7C3AED',
    'from-indigo-500 to-blue-600':   '#6366F1,#2563EB',
    'from-pink-500 to-rose-600':     '#EC4899,#E11D48',
    'from-rose-500 to-red-600':      '#F43F5E,#DC2626',
    'from-red-500 to-rose-600':      '#EF4444,#E11D48',
    'from-orange-500 to-amber-600':  '#F97316,#D97706',
    'from-amber-500 to-yellow-600':  '#F59E0B,#CA8A04',
  };
  return m[cls] || '#3B82F6,#8B5CF6';
}

const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.35 } }),
};

export default function Products() {
  const { theme } = useTheme();
  const isLight = theme === THEMES.VISION;
  const [activeCategory,  setActiveCategory]  = useState('Business');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const catMeta  = CATEGORY_META[activeCategory] || CATEGORY_META.Business;
  const products = CATALOGUE[activeCategory]     || [];

  /* colour tokens */
  const pageBg     = isLight ? 'bg-slate-50'    : 'bg-[#07071a]';
  const sidebarBg  = isLight ? 'bg-white border-r border-slate-200' : 'bg-[#0c0c22] border-r border-white/8';
  const headingCls = isLight ? 'text-slate-900'  : 'text-white';
  const subCls     = isLight ? 'text-slate-500'  : 'text-gray-400';
  const cardBase   = isLight
    ? 'bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50'
    : 'bg-white/5 border border-white/8 hover:border-blue-500/40 hover:bg-white/8';

  return (
    <div className={`min-h-screen ${pageBg} pt-[80px]`}>
      {/* Page header */}
      <div className={`border-b px-6 py-5 ${isLight ? 'bg-white border-slate-200' : 'bg-[#0c0c22] border-white/8'}`}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-500 mb-1">Product Suite</p>
          <h1 className={`text-2xl font-black ${headingCls}`}>Beta Softnet Products</h1>
          <p className={`text-sm mt-1 ${subCls}`}>Purpose-built software for every industry vertical.</p>
        </div>
      </div>

      {/* Table layout: sidebar + content */}
      <div className="max-w-7xl mx-auto flex" style={{ minHeight: 'calc(100vh - 145px)' }}>

        {/* Fixed-width category sidebar */}
        <aside
          className={`w-56 flex-shrink-0 sticky top-[80px] self-start ${sidebarBg}`}
          style={{ height: 'calc(100vh - 145px)', overflowY: 'auto' }}
        >
          <div className="py-4">
            <p className={`px-5 py-2 text-[10px] font-bold tracking-[0.3em] uppercase ${isLight ? 'text-slate-400' : 'text-gray-600'}`}>
              Categories
            </p>
            {CATEGORIES.map(catKey => {
              const meta     = CATEGORY_META[catKey];
              const isActive = activeCategory === catKey;
              return (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => { setActiveCategory(catKey); setSelectedProduct(null); }}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition-all duration-150 text-left border-r-2 ${
                    isActive
                      ? isLight
                        ? `${meta.lightBg} ${meta.lightText} border-blue-500`
                        : 'bg-blue-500/12 text-blue-300 border-blue-400'
                      : isLight
                        ? 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white border-transparent'
                  }`}
                >
                  <span className="text-lg">{meta.icon}</span>
                  {catKey}
                  {isActive && (
                    <svg className="w-3.5 h-3.5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            {!selectedProduct ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22 }}
              >
                {/* Category heading */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `linear-gradient(135deg,${getGrad(catMeta.color)})` }}
                  >
                    {catMeta.icon}
                  </div>
                  <div>
                    <h2 className={`text-xl font-black ${headingCls}`}>{activeCategory} Solutions</h2>
                    <p className={`text-xs ${subCls}`}>{products.length} products available</p>
                  </div>
                </div>

                {/* Product grid */}
                {products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {products.map((prod, i) => (
                      <motion.div key={prod.name} custom={i} variants={fadeUp} initial="hidden" animate="visible">
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(prod)}
                          className={`w-full text-left group rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 ${cardBase}`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div
                              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                              style={{ background: `linear-gradient(135deg,${getGrad(prod.color)})` }}
                            >
                              {prod.icon}
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-lg tracking-wider ${isLight ? 'bg-slate-100 text-slate-500' : 'bg-white/10 text-gray-400'}`}>
                              {prod.badge}
                            </span>
                          </div>

                          <h3 className={`text-base font-bold mb-0.5 group-hover:text-blue-500 transition-colors ${headingCls}`}>{prod.name}</h3>
                          <p className="text-xs font-semibold text-blue-500 mb-2">{prod.tagline}</p>
                          <p className={`text-xs leading-relaxed mb-3 ${subCls}`}>{prod.desc}</p>

                          <div className="flex gap-2">
                            {prod.stats.map(s => (
                              <div key={s.l} className={`flex-1 rounded-xl p-2 text-center ${isLight ? 'bg-slate-50 border border-slate-100' : 'bg-white/5 border border-white/8'}`}>
                                <p className="text-sm font-black text-blue-500">{s.v}</p>
                                <p className={`text-[10px] ${subCls}`}>{s.l}</p>
                              </div>
                            ))}
                          </div>

                          <p className="mt-3 text-xs font-semibold flex items-center gap-1 text-blue-500 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0">
                            View details
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </p>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-4xl mb-3">📭</p>
                    <p className={`text-sm ${subCls}`}>No products in this category yet.</p>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Product detail */
              <motion.div
                key="detail"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.22 }}
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className={`flex items-center gap-2 text-sm font-medium mb-6 transition-colors ${isLight ? 'text-slate-500 hover:text-blue-600' : 'text-gray-500 hover:text-white'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to {activeCategory}
                </button>

                <div className={`rounded-3xl border p-7 ${isLight ? 'bg-white border-slate-200' : 'bg-white/5 border-white/8'}`}>
                  <div className="flex items-start gap-5 mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                      style={{ background: `linear-gradient(135deg,${getGrad(selectedProduct.color)})` }}
                    >
                      {selectedProduct.icon}
                    </div>
                    <div>
                      <h2 className={`text-2xl font-black mb-0.5 ${headingCls}`}>{selectedProduct.name}</h2>
                      <p className="text-sm font-semibold text-blue-500">{selectedProduct.tagline}</p>
                      <span className={`inline-block mt-2 text-[10px] font-bold px-2 py-1 rounded-lg tracking-wider ${isLight ? 'bg-slate-100 text-slate-500' : 'bg-white/10 text-gray-400'}`}>
                        {selectedProduct.badge}
                      </span>
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed mb-6 ${subCls}`}>{selectedProduct.desc}</p>

                  <h3 className={`text-sm font-bold mb-3 ${headingCls}`}>Key Features</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {(selectedProduct.features || []).map(f => (
                      <div key={f} className={`flex items-center gap-2 p-3 rounded-xl ${isLight ? 'bg-slate-50 border border-slate-100' : 'bg-white/4 border border-white/8'}`}>
                        <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className={`text-xs font-medium ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {(selectedProduct.stats || []).map(s => (
                      <div key={s.l} className={`min-w-[110px] rounded-2xl p-4 text-center ${isLight ? 'bg-blue-50 border border-blue-100' : 'bg-blue-500/10 border border-blue-500/20'}`}>
                        <p className="text-2xl font-black text-blue-500">{s.v}</p>
                        <p className={`text-xs mt-0.5 ${subCls}`}>{s.l}</p>
                      </div>
                    ))}
                    <div className="flex items-center">
                      <Link
                        to="/support"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                        style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', boxShadow: '0 4px 14px rgba(59,130,246,0.3)' }}
                      >
                        Request Demo
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
