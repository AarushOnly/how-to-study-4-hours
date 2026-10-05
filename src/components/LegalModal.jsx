import React from 'react';
import { X, ShieldCheck, FileText, Mail } from 'lucide-react';
import { SUPPORT_EMAIL, BRAND_INFO } from '../config';

export default function LegalModal({ modalType, onClose }) {
  if (!modalType) return null;

  const content = {
    privacy: {
      title: "Privacy Policy",
      icon: ShieldCheck,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            At <strong>{BRAND_INFO.name}</strong>, we respect your privacy. We collect minimal customer information strictly necessary to process your digital purchase and deliver access to the ebook.
          </p>
          <h4 className="font-bold text-white text-sm">Information We Collect</h4>
          <p>
            When purchasing, our payment processing partners securely process your name, email address, and transaction status. We do not store or process your debit/credit card or banking details on our servers.
          </p>
          <h4 className="font-bold text-white text-sm">Use of Information</h4>
          <p>
            Your email is used solely to deliver your digital download receipt, provide order customer support, and send critical updates related to your purchase. We do not sell or rent your personal information to third parties.
          </p>
          <h4 className="font-bold text-white text-sm">Contact Regarding Privacy</h4>
          <p>
            If you have questions regarding your data, contact our support team at <code className="text-amber-400 bg-slate-950 px-2 py-0.5 rounded">{SUPPORT_EMAIL}</code>.
          </p>
        </div>
      )
    },
    terms: {
      title: "Terms of Service",
      icon: FileText,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            By accessing this website and purchasing <em>"{BRAND_INFO.bookTitle}"</em>, you agree to these Terms of Service.
          </p>
          <h4 className="font-bold text-white text-sm">Digital Delivery & License</h4>
          <p>
            Upon successful payment, you receive personal, non-transferable digital access to download the PDF guide and field tools. As stated in the manual, you are free to share key takeaways with friends, study library peers, and classmates to help them conquer distractions.
          </p>
          <h4 className="font-bold text-white text-sm">Educational Disclaimer</h4>
          <p>
            The methods in this manual represent productivity systems, environmental management practices, and cognitive focus techniques. They do not constitute academic counseling, medical advice, or guarantees of exam ranks, AIR percentiles, or admissions.
          </p>
          <h4 className="font-bold text-white text-sm">Support Inquiries</h4>
          <p>
            For delivery questions or technical assistance, reach out directly to <code className="text-amber-400 bg-slate-950 px-2 py-0.5 rounded">{SUPPORT_EMAIL}</code>.
          </p>
        </div>
      )
    },
    contact: {
      title: "Contact & Student Support",
      icon: Mail,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Need help with your order or have a question about implementing the study systems?
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs uppercase font-mono tracking-wider text-slate-400">Official Support Desk:</div>
            <div className="text-base font-bold text-amber-400 select-all">
              {SUPPORT_EMAIL}
            </div>
            <p className="text-xs text-slate-400">
              Response time: typically within 24–48 hours for digital delivery queries.
            </p>
          </div>
          <p className="text-xs text-slate-400">
            {BRAND_INFO.name} • {BRAND_INFO.series}
          </p>
        </div>
      )
    },
    returns: {
      title: "No-Return & No-Refund Policy",
      icon: ShieldCheck,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
            <h4 className="font-bold text-amber-400 text-sm mb-1">
              Strict Policy: All Digital Sales Are Final
            </h4>
            <p className="text-xs leading-relaxed">
              Due to the immediate digital nature and unrecoverable transfer of the 43-page PDF ebook, bonuses, and printable templates, all purchases are non-refundable and non-returnable.
            </p>
          </div>
          <h4 className="font-bold text-white text-sm">Why We Enforce This Policy</h4>
          <p>
            Digital files cannot be "returned" once downloaded and saved. To ensure complete transparency, we provide full table of contents, detailed chapter breakdowns, and sample interior page previews on the sales page before you decide to purchase.
          </p>
          <h4 className="font-bold text-white text-sm">Direct Support Guarantee</h4>
          <p>
            If you experience technical issues downloading your PDF or need help accessing the files, message <strong>@deepfocusacademy</strong> or email <code className="text-amber-400 bg-slate-950 px-2 py-0.5 rounded">{SUPPORT_EMAIL}</code>. We guarantee a response within 24 hours to ensure you receive your complete file access.
          </p>
        </div>
      )
    }
  };

  const current = content[modalType];
  if (!current) return null;
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative max-w-lg w-full bg-slate-900 rounded-2xl border border-slate-700 p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {current.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto pr-1">
          {current.body}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
