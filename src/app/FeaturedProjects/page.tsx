import ScrollAnimation from '../components/ScrollAnimation';

export default function FeaturedProjects() {
  const projects = [
    {
      name: "Home Pizza Website",
      description: "A simple UI-based product showcase for pizza.",
      tags: ["Frontend", "Responsive"],
      bg: "from-gray-900 to-green-700",
    },
    {
      name: "Online Coaching Website",
      description: "Responsive platform for online learning and coaching.",
      tags: ["Frontend", "Responsive"],
      bg: "from-black to-gray-700",
    },
    {
      name: "Medi Voice Agent",
      description:
        "Voice-enabled AI assistant built with Node.js, Next.js, and APIs.",
      tags: ["Node.js", "Next.js", "API"],
      bg: "from-gray-800 to-green-600",
    },
    {
      name: "E-commerce Website",
      description:
        "Full-stack e-commerce platform using Node.js and Next.js.",
      tags: ["Full Stack"],
      bg: "from-gray-900 to-lime-600",
    },
  ];

  return (
    <ScrollAnimation animationType="fade-up">
      <section
        id="projects"
        className="bg-gradient-to-br from-black via-gray-800 to-green-700 text-white p-6 sm:p-8 lg:p-12 rounded-[32px] w-full shadow-2xl scroll-mt-24"
      >
        {/* Section Title */}
        <ScrollAnimation animationType="fade-down" delay={100}>
          <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-12 drop-shadow-lg text-green-400">
            Featured Projects
          </h2>
        </ScrollAnimation>

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <ScrollAnimation
              key={index}
              animationType="scale-in"
              delay={index * 100}
            >
              <div
                className={`bg-gradient-to-br ${project.bg} text-white rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-300 hover:scale-[1.05] hover:ring-2 hover:ring-green-400 hover:shadow-[0_0_25px_rgba(57,255,20,0.4)]`}
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-green-200">
                  {project.name}
                </h3>
                <p className="text-white/80 text-sm sm:text-base md:text-base mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-white/10 text-green-200 px-3 py-1 rounded-full text-xs sm:text-sm font-medium hover:bg-white/20 hover:text-white transition"
                    >
                      {tag}
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
