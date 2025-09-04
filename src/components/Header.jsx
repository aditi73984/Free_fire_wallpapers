import React from "react";

export default function Header({ searchQuery, setSearchQuery }) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-yellow-400 rounded-md flex items-center justify-center">
  <img 
    src="/svg.svg"   
    alt="Logo" 
    className="w-6 h-6"
  />
</div>
          <div>
            <div className="font-bold">Free fire SnapWalls</div>
            <div className="text-xs text-gray-500">BattleZone HD</div>
          </div>
        </div>

        {/* Live Search box */}
        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search wallpapers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // ✅ live update
            className="border rounded px-3 py-1 text-sm"
          />
        </div>
      </div>
    </header>
  );
}
