import React, { useState, useEffect } from "react";

// Default Wallpapers (keep some initial ones)
const initialWallpapers = [
  { title: "Free Fire Warrior", src: "/wallpapers/wall1.jpg" },
  { title: "Fire Squad", src: "/wallpapers/wall2.jpg" },
  { title: "Night Battle", src: "/wallpapers/wall3.jpg" },
  { title: "Epic Clash", src: "/wallpapers/wall4.jpg" },
  { title: "Victory Pose", src: "/wallpapers/wall5.jpg" },
  { title: "Team Fight", src: "/wallpapers/wall6.jpg" },
  { title: "Hero Mode", src: "/wallpapers/wall7.jpg" },
  { title: "Survivor", src: "/wallpapers/wall8.jpg" },
  { title: "Skull Mask", src: "/wallpapers/wall9.jpg" },
  { title: "Flame Warrior", src: "/wallpapers/wall10.jpg" },
];

export default function Gallery({ searchQuery }) {
  const [wallpapers, setWallpapers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  // Load wallpapers from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("wallpapers");
    if (saved) {
      setWallpapers(JSON.parse(saved));
    } else {
      setWallpapers(initialWallpapers);
    }
  }, []);

  // Save wallpapers to localStorage whenever they change
  useEffect(() => {
    if (wallpapers.length > 0) {
      localStorage.setItem("wallpapers", JSON.stringify(wallpapers));
    }
  }, [wallpapers]);

  // Upload to Cloudinary
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Free_fire"); // replace with your preset

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dgvetidc8/image/upload", // replace with your cloud name
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();

        if (data.secure_url) {
          const newImage = {
            title: file.name.split(".")[0],
            src: data.secure_url, // Cloudinary URL
          };
          setWallpapers((prev) => [newImage, ...prev]);
        }
      } catch (err) {
        console.error("Cloudinary upload failed:", err);
      }
    }
  };

  // Load more wallpapers
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // Download image
  const handleDownload = (url, title) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.jpg`;
    link.click();
  };

  // Filter wallpapers
  const filtered = wallpapers.filter((wall) =>
    wall.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show matches first, then rest
  const sortedWallpapers =
    searchQuery.trim() === ""
      ? wallpapers
      : [...filtered, ...wallpapers.filter((w) => !filtered.includes(w))];

  return (
    <div className="p-6">
      {/* Upload Button */}
      <div className="mb-4">
        <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Upload Images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedWallpapers.slice(0, visibleCount).map((wall, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow-lg"
          >
            <img
              src={wall.src}
              alt={wall.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {wall.title}
            </div>
            <button
              onClick={() => handleDownload(wall.src, wall.title)}
              className="absolute bottom-2 right-2 px-3 py-1 bg-black/60 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Download
            </button>
          </div>
        ))}

        {/* Show "No results" if search has no matches */}
        {filtered.length === 0 && searchQuery.trim() !== "" && (
          <div className="col-span-full text-center text-gray-500 text-lg mt-6">
            No wallpapers found for "{searchQuery}"
          </div>
        )}
      </div>

      {/* Load More */}
      {visibleCount < sortedWallpapers.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
