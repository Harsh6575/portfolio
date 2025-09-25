import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
    className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
    title,
    subtitle,
    align = 'center',
    className = ''
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
        >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                {title}
            </h2>
            {subtitle && (
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};