'use client'; // Wajib ditambahkan jika menggunakan Next.js App Router

import {
    Folder,
    LayoutGrid,
    MenuSquare,
    PanelLeftClose,
    PanelLeftOpen,
    Server,
    Settings,
    Trophy,
    Users
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(true);

    // Data menu untuk memudahkan render
    const menuItems = [
        { name: 'Systems', icon: Folder, active: false },
        { name: 'System Code', icon: LayoutGrid, active: false },
        { name: 'Properties', icon: Settings, active: false },
        { name: 'Menus', icon: MenuSquare, active: true },
        { name: 'API List', icon: Server, active: false },
        { name: 'Users & Group', icon: Users, active: false },
        { name: 'Competition', icon: Trophy, active: false },
    ];

    return (
        <div
            className={`relative h-screen bg-primary rounded-[32px] transition-all duration-300 ease-in-out overflow-hidden flex flex-col shadow-xl text-white ${isExpanded ? 'w-64' : 'w-20'
                }`}
        >
            {/* Header: Logo & Toggle Button */}
            <div className="flex items-center justify-between p-6">
                <div
                    className={`flex items-center gap-1 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'
                        }`}
                >
                    {/* Simulasi Logo Dot Grid */}
                    <div className='relative w-7 h-7'>
                        <Image
                            src={"/logo.png"}
                            className='object-cover w-full h-full'
                            alt='stk-glo'
                            fill
                        />
                    </div>
                    <div className="text-[8px] font-semibold leading-tight tracking-wide">
                        Solusi<br />Teknologi<br />Kreatif
                    </div>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`text-white hover:bg-white/20 p-2 rounded-lg transition-colors ${!isExpanded && 'mx-auto' // Memusatkan tombol saat diringkas
                        }`}
                >
                    {isExpanded ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-3 mt-4 space-y-1">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <a
                            key={index}
                            href="#"
                            className={`flex items-center gap-4 px-3 py-3 rounded-2xl transition-all duration-200 cursor-pointer ${item.active
                                ? 'bg-white text-primary font-semibold shadow-sm'
                                : 'text-white hover:bg-white/10'
                                } ${!isExpanded && 'justify-center'}`}
                            title={!isExpanded ? item.name : ""}
                        >
                            <Icon size={20} className={item.active ? 'text-primary' : 'text-white'} />

                            {/* Teks hanya muncul saat expanded */}
                            <span
                                className={`text-sm whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'
                                    }`}
                            >
                                {item.name}
                            </span>
                        </a>
                    );
                })}
            </nav>
        </div>
    );
}