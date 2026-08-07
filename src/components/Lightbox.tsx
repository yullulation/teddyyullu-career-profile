"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export type LightboxItem = {
  src: string;
  title: string;
  category: string;
  width: number;
  height: number;
};

export default function Lightbox({
  item,
  onClose,
}: {
  item: LightboxItem | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-6 py-10 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-full max-w-4xl flex-col items-center"
          >
            <div className="relative max-h-[78vh] w-full overflow-hidden rounded-md">
              <Image
                src={item.src}
                alt={item.title}
                width={item.width}
                height={item.height}
                className="max-h-[78vh] w-auto rounded-md object-contain"
                priority
              />
            </div>
            <div className="mt-5 flex w-full items-baseline justify-between">
              <span className="font-sans text-lg font-medium text-white">{item.title}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                {item.category}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-10 right-0 text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-gold-soft"
            >
              Close ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
