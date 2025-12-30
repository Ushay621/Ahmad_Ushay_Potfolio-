import { GraduationCap, CalendarDays, Download } from "lucide-react";
import ScrollAnimation from '../components/ScrollAnimation';

export default function ResumeSection() {
  const certificates = [
    {
      name: "Python",
      org: "Electrocus Solution",
      date: "Aug 2022",
      color: "from-gray-900 to-green-700",
    },
    {
      name: "Copilot",
      org: "LinkedIn Learning",
      date: "April 2023",
      color: "from-black to-gray-700",
    },
    {
      name: "Software Development Training",
      org: "Technosys Services",
      date: "Aug 2024",
      color: "from-gray-800 to-green-600",
    },
    {
      name: "AI",
      org: "NIELIT",
      date: "Aug 2025",
      color: "from-gray-900 to-lime-600",
    },
  ];

  return (
    <ScrollAnimation animationType="fade-up">
      <section
        id="resume"
        className="bg-gradient-to-br from-black via-gray-800 to-green-700 text-white p-6 sm:p-8 lg:p-12 rounded-[32px] w-full shadow-2xl scroll-mt-24"
      >
        {/* Page Title */}
        <ScrollAnimation animationType="fade-down" delay={100}>
          <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-12 drop-shadow-lg text-green-400">
            Resume
          </h2>
        </ScrollAnimation>

        {/* Download Button */}
        <ScrollAnimation animationType="scale-in" delay={200}>
          <div className="flex justify-center mb-10">
            <a
              href="/Ushay_Resume.pdf"
              download
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-full shadow-md transition-all duration-300 text-sm sm:text-base hover:shadow-[0_0_20px_rgba(57,255,20,0.5)] hover:scale-105"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </div>
        </ScrollAnimation>

        {/* Education Section */}
        <ScrollAnimation animationType="fade-left" delay={300}>
          <div className="bg-white/5 rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl mb-12 hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-300">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-green-300" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-300 drop-shadow-md">
                  Education
                </h3>
              </div>
              <div className="md:pl-6 text-white/80 text-sm sm:text-base md:text-lg leading-relaxed font-inter">
                <p>
                  <span className="font-semibold">Degree:</span> Bachelor of Technology
                </p>
                <p>
                  <span className="font-semibold">Institute:</span> AKTU / Lucknow Institute of Technology
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-green-200" />
                  <span>2021 – 2025</span>
                </p>
                <p>
                  <span className="font-semibold">CGPA:</span> 7.6
                </p>
                <p>
                  <span className="font-semibold">Location:</span> Lucknow
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Certificates Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {certificates.map((cert, index) => (
            <ScrollAnimation
              key={index}
              animationType="scale-in"
              delay={400 + index * 100}
            >
              <div
                className={`bg-gradient-to-br ${cert.color} text-white rounded-2xl p-5 sm:p-6 shadow-xl hover:scale-[1.03] transition-all duration-300 hover:shadow-[0_0_25px_rgba(57,255,20,0.4)]`}
              >
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-green-200">
                  {cert.name}
                </h4>
                <p className="text-white/90 text-sm sm:text-base md:text-lg">{cert.org}</p>
                <p className="text-white/70 text-xs sm:text-sm mt-1">{cert.date}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </section>
    </ScrollAnimation>
  );
}
