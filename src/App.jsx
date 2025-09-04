import React, { useState } from "react";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import Modal from "./components/Modal";

export default function App() {
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-slate-100">
      <Header setSearchQuery={setSearchQuery} />

      <main className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4 text-center ">🔥 Battle Arena Wallpapers</h1>
        {/* ✅ Pass setSearchQuery as prop */}
        <Gallery
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelect={setSelected}
        />
      </main>

      {selected && (
        <Modal image={selected} onClose={() => setSelected(null)} />
      )}

      <footer className="text-center text-sm text-gray-500 p-6">
 <span className="inline-flex items-center gap-2">
    <span></span> Made with ❤️ for Free Fire fans <span></span> 
    <span></span> Download & Enjoy your favorite wallpapers!</span>  
    </footer>
    </div>
  );
}
