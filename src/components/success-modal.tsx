import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 id="success-modal-title" className="text-2xl font-bold mb-4">
          Yeay!
        </h2>
        <p className="mb-6">Pesanmu terkirim. Semoga sampai di dia yaaa</p>
        <Link
            href="https://www.instagram.com/stories/thepdfway/3511672612546304368?utm_source=ig_story_item_share&igsh=dHZ6MWtpdDV5MTVw"
            className="inline-flex items-center justify-center px-4 py-2 mb-8 text-sm md:text-base font-medium text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-full hover:border-gray-400"
          >
            <span>saran/masukan/fitur baru</span>
            <ArrowUpRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
          </Link >
        <Button className="w-full bg-gray-800 text-white hover:bg-gray-900">
          <Link href={'/'} className="w-full h-full">Tutup</Link>
        </Button>
      </div>
    </div>
  );
};
