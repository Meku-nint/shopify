"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation} from "@fortawesome/free-solid-svg-icons";
type SocialLink = {
  name: string;
  username: string;
  icon: string;
  url: string;
  color: string;
};

export default function Footer() {
  const year = new Date().getFullYear();
  const [isEditing, setIsEditing] = useState(false);
const handleSeeRoute = () => {
    const destLat = 8.998964123447454;
  
    const destLng =38.78718387232911;
        const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}&travelmode=driving`;

    if (!navigator.geolocation) {
      window.open(fallbackUrl, "_blank");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destLat},${destLng}&travelmode=driving`;
        
        window.open(mapUrl, "_blank");
      },
      (error) => {
        console.error("Geolocation error:", error);
        window.open(fallbackUrl, "_blank");
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      name: "Telegram",
      username: "@royalsmart",
      icon: "fa-brands fa-telegram",
      url: "https://t.me/royalsmart",
      color: "hover:text-blue-400",
    },
    {
      name: "Phone",
      username: "+1234567890",
      icon: "fa-solid fa-phone",
      url: "tel:+1234567890",
      color: "hover:text-green-400",
    },
    {
      name: "Email",
      username: "royalsmart.com",
      icon: "fa-solid fa-envelope",
      url: "mailto:support@royalsmart.com",
      color: "hover:text-red-400",
    },
    {
      name: "TikTok",
      username: "@royalsmart",
      icon: "fa-brands fa-tiktok",
      url: "https://www.tiktok.com/@royalsmart",
      color: "hover:text-pink-400",
    },
    {
      name: "Instagram",
      username: "@royalsmart",
      icon: "fa-brands fa-instagram",
      url: "https://www.instagram.com/royalsmart",
      color: "hover:text-purple-400",
    },
  ]);
  
  return (
    <footer className="w-full bg-black border-slate-700/50 text-slate-200">
      <div className="mx-auto max-w-4xl px-6 pt-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            
            <h3 className="text-2xl font-light bg-gradient-to-r pt-6 from-white to-slate-300 bg-clip-text text-transparent">
              Royal Smart Computer
            </h3>
          </div>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Connect with us through your favorite platform.
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
          <button
              onClick={() => {
                handleSeeRoute();
              }}
              className="text-sm font-medium bg-slate-800/30 cursor-pointer rounded-2xl p-4 text-center border border-slate-700/50 transition-all duration-300 hover:bg-slate-700/50 hover:scale-105 hover:shadow-lg hover:text-slate-300 text-slate-300 group-hover:text-white transition-colors "
            >
              <p className=" text-xl text-slate-300 group-hover:scale-110 transition-transform duration-300"><FontAwesomeIcon icon={faLocation} className="p-4 bg-gray-800 rounded-2xl" /></p>
              Bole, alemnesh plaza
            </button>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-slate-800/30 rounded-2xl p-4 text-center border border-slate-700/50 transition-all duration-300 hover:bg-slate-700/50 hover:scale-105 hover:shadow-lg ${link.color}`}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-700/50 group-hover:bg-slate-600/50 transition-all duration-300">
                  <i
                    className={`${link.icon} text-xl text-slate-300 group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">
                  {link.name}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-slate-200 transition">
                  {link.username}
                </span>
              </div>
            </a>
          ))}
        </div>
        <div className="border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between pt-6 -pb-2 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-copyright text-xs" />
              <span className="text-gray-400 mb-2 text-center font-mono ">{year} Royal Smart Computer. All rights reserved.</span>
            </div>


          </div>
        </div>
      </div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </footer>
  );
}
