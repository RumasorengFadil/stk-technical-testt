import Sidebar from '@/components/sidebar';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex bg-gray-50 h-screen">
            {/* Sidebar Component */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-scroll">
                {children}
            </main>
        </div>
    );
}