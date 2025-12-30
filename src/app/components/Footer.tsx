import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-green-800 text-white py-5 px-6 mt-4 rounded-t-[32px] shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Branding */}
        <p className="text-sm md:text-base text-white/70 font-inter text-center md:text-left">
          © {new Date().getFullYear()} Ahmad Ushay. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/ahmad-ushay"
            target=""
            rel="noopener noreferrer"
            className="hover:text-green-400 transition duration-300"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/Ushay621"
            target=""
            rel="noopener noreferrer"
            className="hover:text-green-400 transition duration-300"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://x.com/Ushay621"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition duration-300"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition duration-300"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
