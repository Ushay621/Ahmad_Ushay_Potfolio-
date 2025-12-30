import ScrollAnimation from '../components/ScrollAnimation';

export default function PortfolioServices() {
  const services = [
    {
      title: "UI/UX Design",
      description:
        "Crafting intuitive and visually engaging user interfaces for web and mobile platforms.",
      tags: ["Design", "User Experience"],
      bg: "from-green-600 to-emerald-400",
    },
    {
      title: "Frontend Development",
      description:
        "Building responsive and dynamic web applications using React, Next.js, and Tailwind CSS.",
      tags: ["React", "Next.js", "Tailwind"],
      bg: "from-gray-700 to-green-500",
    },
    {
      title: "Backend Development",
      description:
        "Creating secure and performant server-side applications using Node.js. Focused on efficient deployment.",
      tags: ["Node.js", "Express", "API"],
      bg: "from-black to-green-700",
    },
    {
      title: "AI Integration",
      description:
        "Embedding intelligent features using Python and AI models for smarter applications.",
      tags: ["Python", "AI", "Automation"],
      bg: "from-gray-800 to-lime-500",
    },
    {
      title: "Full Stack Solutions",
      description:
        "Delivering end-to-end web solutions from UI to database with seamless and scalable integration.",
      tags: ["Full Stack", "MongoDB", "Deployment"],
      bg: "from-green-700 to-gray-600",
    },
  ];

  return (
    <ScrollAnimation animationType="fade-up">
      <section
        id="services"
        className="bg-gradient-to-br from-black via-gray-800 to-green-700 text-white p-6 sm:p-8 lg:p-12 rounded-[32px] w-full shadow-2xl scroll-mt-24"
      >
        <ScrollAnimation animationType="fade-down" delay={100}>
          <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-12 drop-shadow-lg text-green-400">
            Services
          </h2>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <ScrollAnimation
              key={index}
              animationType="scale-in"
              delay={index * 100}
            >
              <div
                className={`bg-gradient-to-br ${service.bg} text-white rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)]`}
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-green-100">
                  {service.title}
                </h3>
                <p className="text-white/80 text-sm sm:text-base mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-white/10 px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-green-200"
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
