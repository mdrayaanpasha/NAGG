import React from "react";
import { ArrowUpRight } from "lucide-react";

const Navbar: React.FC = () => {
return (
<nav className="fixed top-0 text-black left-0 w-full flex items-center justify-between px-6 py-4 backdrop-blur-lg bg-white/20 shadow-lg border border-white/10 rounded-md  mx-auto">
 {/* Title - Left Aligned */}
 <h1 className="text-2xl font-bold text-gray-900 tracking-wide" onClick={e=>window.location.href="/"}>NAGG</h1> {/* Changed text-white to text-gray-900 for better contrast */}

{/* Latest News Button - Right Aligned, Hidden on Mobile */}
<a href="/news" className="hidden md:flex items-center gap-2 bg-white/20 hover:bg-white/30 px-5 py-2 rounded-xl border border-white/20 shadow-md text-gray-900 font-medium transition-all">

Latest News <ArrowUpRight size={20} />
 </a>
 </nav>
 );
};

export default Navbar;