'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function BackButton({ href = '/' }: { href?: string }) {
  return (
    <Link href={href}>
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant hover:bg-primary-container hover:text-primary transition-colors"
      >
        <span>→</span>
        <span className="text-sm">رجوع</span>
      </motion.div>
    </Link>
  );
}
