// import React, { useState, useEffect } from "react";
// import placeholder1 from "../assets/placeholder1.jpg";
// import placeholder2 from "../assets/placeholder2.webp";
// import placeholder3 from "../assets/placeholder3.webp";
// import placeholder4 from "../assets/placeholder4.webp";
// import placeholder5 from "../assets/placeholder5.webp";
// import placeholder6 from "../assets/placeholder6.webp";
// import placeholder7 from "../assets/placeholder7.jpg";
// import placeholder8 from "../assets/placeholder8.jpg";
// import placeholder9 from "../assets/placeholder9.jpg";


// const API_URL = import.meta.env.VITE_API_URL + "/api/wallpapers";

// export default function Gallery({ searchQuery }) {
//   const [wallpapers, setWallpapers] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(6);

//   // Load from backend
//   useEffect(() => {
//     fetch(API_URL)
//       .then((res) => res.json())
//       .then((data) => setWallpapers(data))
//       .catch((err) => console.error("Fetch failed:", err));
//   }, []);

//   // Upload to Cloudinary & save to DB
//   const handleUpload = async (e) => {
//     const files = Array.from(e.target.files);

//     for (const file of files) {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", "Free_fire"); // your Cloudinary preset

//       try {
//         // Upload to Cloudinary
//         const res = await fetch(
//           "https://api.cloudinary.com/v1_1/dgvetidc8/image/upload", // replace cloud name
//           {
//             method: "POST",
//             body: formData,
//           }
//         );
//         const data = await res.json();

//         if (data.secure_url) {
//           const newImage = {
//             title: file.name.split(".")[0],
//             src: data.secure_url,
//           };

//           // Save to backend
//           const saveRes = await fetch(API_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(newImage),
//           });
//           const saved = await saveRes.json();

//           setWallpapers((prev) => [saved, ...prev]);
//         }
//       } catch (err) {
//         console.error("Upload failed:", err);
//       }
//     }
//   };

//   const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

//   const handleDownload = (url, title) => {
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `${title}.jpg`;
//     link.click();
//   };

//   const filtered = wallpapers.filter((wall) =>
//     wall.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const sortedWallpapers =
//     searchQuery.trim() === ""
//       ? wallpapers
//       : [...filtered, ...wallpapers.filter((w) => !filtered.includes(w))];

//   return (
//     <div className="p-6">
//       {/* Upload Button */}
//       <div className="mb-4">
//         <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
//           Upload Images
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleUpload}
//             className="hidden"
//           />
//         </label>
//       </div>

//       {/* Gallery Grid */}
//       {sortedWallpapers.length === 0 ? (
//         <p className="text-center text-gray-500">No wallpapers found</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {sortedWallpapers.slice(0, visibleCount).map((wall, index) => (
//             <div
//               key={index}
//               className="relative group overflow-hidden rounded-xl shadow-lg"
//             >
//               <img
//                 src={wall.src}
//                 alt={wall.title}
//                 className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
//               />
//               <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
//                 {wall.title}
//               </div>
//               <button
//                 onClick={() => handleDownload(wall.src, wall.title)}
//                 className="absolute bottom-2 right-2 px-3 py-1 bg-black/60 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity"
//               >
//                 Download
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Load More */}
//       {visibleCount < sortedWallpapers.length && (
//         <div className="flex justify-center mt-6">
//           <button
//             onClick={handleLoadMore}
//             className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
//           >
//             Load More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import placeholder1 from "../assets/placeholder1.jpg";
import placeholder2 from "../assets/placeholder2.webp";
import placeholder3 from "../assets/placeholder3.webp";
import placeholder4 from "../assets/placeholder4.webp";
import placeholder5 from "../assets/placeholder5.webp";
import placeholder6 from "../assets/placeholder6.webp";
import placeholder7 from "../assets/placeholder7.jpg";
import placeholder8 from "../assets/placeholder8.jpg";
import placeholder9 from "../assets/placeholder9.jpg";

const API_URL = import.meta.env.VITE_API_URL + "/api/wallpapers";

const placeholders = [
  placeholder1,
  placeholder2,
  placeholder3,
  placeholder4,
  placeholder5,
  placeholder6,
  placeholder7,
  placeholder8,
  placeholder9,
];

export default function Gallery({ searchQuery }) {
  const [wallpapers, setWallpapers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  // Load from backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setWallpapers(data))
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  // Upload to Cloudinary & save to DB
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Free_fire");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dgvetidc8/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();

        if (data.secure_url) {
          const newImage = {
            title: file.name.split(".")[0],
            src: data.secure_url,
          };

          const saveRes = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newImage),
          });
          const saved = await saveRes.json();

          setWallpapers((prev) => [saved, ...prev]);
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

  const handleDownload = (url, title) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.jpg`;
    link.click();
  };

  const filtered = wallpapers.filter((wall) =>
    wall.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {sortedWallpapers.length === 0 ? (
        <p className="text-center text-gray-500">No wallpapers found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedWallpapers.slice(0, visibleCount).map((wall, index) => {
            const fallbackImage =
              placeholders[index % placeholders.length];

            const imageSrc = wall.src || fallbackImage;

            return (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-lg"
              >
                <img
                  src={imageSrc}
                  alt={wall.title}
                  onError={(e) => {
                    e.target.src = fallbackImage;
                  }}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />

                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {wall.title || "Free Fire Wallpaper"}
                </div>

                {wall.src && (
                  <button
                    onClick={() => handleDownload(wall.src, wall.title)}
                    className="absolute bottom-2 right-2 px-3 py-1 bg-black/60 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Download
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

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
