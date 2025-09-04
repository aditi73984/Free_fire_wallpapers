import React from 'react'


export default function Modal({ image, onClose }) {
return (
<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
<div className="bg-white rounded shadow-lg max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
<div className="p-4 flex items-center justify-between">
<div className="font-semibold">{image.title}</div>
<div className="flex gap-2">
<a href={image.src} download className="px-3 py-1 border rounded">Download</a>
<button onClick={onClose} className="px-3 py-1 border rounded">Close</button>
</div>
</div>
<div className="p-4">
<img src={image.src} alt={image.title} className="w-full h-auto" />
</div>
</div>
</div>
)
}