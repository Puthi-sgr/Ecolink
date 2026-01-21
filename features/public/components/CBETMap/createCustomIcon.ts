import L from 'leaflet';

export const createCustomIcon = () =>
  L.divIcon({
    className: 'bg-transparent',
    html: `
      <style>
        @keyframes cbet-marker-blink {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.12); opacity: 0.75; }
        }
        @keyframes cbet-marker-ring {
          0% { transform: scale(0.8); opacity: 0.45; }
          70% { transform: scale(1.8); opacity: 0; }
          100% { opacity: 0; }
        }
      </style>
      <div class="relative group">
        <div style="position:absolute; inset:-6px; border-radius:9999px; border:2px solid rgba(5, 150, 105, 0.45); animation: cbet-marker-ring 1.8s ease-out infinite;"></div>
        <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-xl border-2 border-white transform transition-transform duration-300 group-hover:scale-110"
          style="animation: cbet-marker-blink 1.6s ease-in-out infinite;">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-black/20 rounded-full blur-[1px]"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
