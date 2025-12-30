import ScrollAnimation from '../components/ScrollAnimation';

export default function SkillsTechnologies() {
  const skills = [
    {
      category: "Web Technologies",
      items: ["HTML", "CSS", "JavaScript", "Next.js"],
      bg: "from-gray-900 to-green-700",
    },
    {
      category: "Programming",
      items: ["Python"],
      bg: "from-black to-gray-700",
    },
    {
      category: "Database",
      items: ["MongoDB", "PostgreSQL"],
      bg: "from-gray-800 to-green-600",
    },
    {
      category: "Specialties",
      items: ["Problem Solving", "System Optimization", "Troubleshooting"],
      bg: "from-gray-900 to-lime-600",
    },
  ];

  return (
    <ScrollAnimation animationType="fade-up">
      <section
        id="skills"
        className="bg-gradient-to-br from-black via-gray-800 to-green-700 text-white p-6 sm:p-8 lg:p-12 rounded-[32px] w-full shadow-2xl scroll-mt-24"
      >
        <ScrollAnimation animationType="fade-down" delay={100}>
          <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-12 drop-shadow-lg text-green-400">
            Skills & Technologies
          </h2>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skills.map((group, index) => (
            <ScrollAnimation
              key={index}
              animationType="scale-in"
              delay={index * 120}
            >
              <div
                className={`bg-gradient-to-br ${group.bg} text-white rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-300 hover:scale-[1.05] hover:ring-2 hover:ring-green-400 hover:shadow-[0_0_25px_rgba(57,255,20,0.4)]`}
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-green-200">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {group.items.map((skill, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-sm transition ${skill === "PostgreSQL"
                          ? "bg-[#39ff14]/20 text-[#39ff14] border border-[#39ff14]/50 hover:bg-[#39ff14]/30 hover:shadow-[0_0_15px_rgba(57,255,20,0.6)] hover:text-white"
                          : "bg-white/10 text-green-200 hover:bg-white/20 hover:text-white"
                        }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </section>
    </ScrollAnimation>
  );
}
