'use client';

import styles from '@/app/ui/loading.module.css';

export default function Loading() {
    return (
        <div className="mt-4 flex items-center justify-center">
            <div className={`${styles.spin} w-6 h-6 border-4 border-gray-200 border-t-blue-500 rounded-full`}>
            </div>
        </div>
    );
}