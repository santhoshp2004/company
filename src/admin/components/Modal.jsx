import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Reusable modal wrapper used by all admin CRUD forms.
 * Props: open, onClose, title, children, wide (boolean)
 */
export default function Modal({ open, onClose, title, children, wide = false }) {
  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* Escape to close */
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{ opacity: 0,   scale: 0.94, y: 20  }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[80] w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col ${wide ? 'max-w-2xl' : 'max-w-lg'}`}
            style={{ maxHeight: '90vh' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
              <h2 className="text-base font-bold text-slate-900">{title}</h2>
              <button onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 px-6 py-5">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
