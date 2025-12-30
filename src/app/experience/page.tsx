import ScrollAnimation from '../components/ScrollAnimation';

export default function ExperienceSection() {
  const experiences = [
    {
      company: "Electrocus Solution",
      duration: "2 Months – Python Internship",
      skills: [
        "Python scripting",
        "Logic building",
        "Problem solving",
        "Algorithm design",
      ],
    },
    {
      company: "Technosys Services Pvt. Ltd",
      duration: "1 Month – Software Development",
      skills: ["Basic software development skills"],
    },
    {
      company: "NIELIT",
      duration: "2 Months – AI using Python",
      skills: ["Basic AI concepts", "Python usage"],
    },
  ];

  return (
    <ScrollAnimation animationType="fade-up">
      <section
        id="experience"
        className="bg-gradient-to-br from-black via-gray-800 to-green-700 text-white p-6 sm:p-8 lg:p-12 rounded-[32px] w-full shadow-2xl scroll-mt-24"
      >
        <ScrollAnimation animationType="fade-down" delay={100}>
          <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-12 drop-shadow-lg text-green-400">
            Experience
          </h2>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {experiences.map((exp, index) => (
            <ScrollAnimation
              key={index}
              animationType="scale-in"
              delay={index * 150}
            >
              <div className="bg-white/5 rounded-2xl p-5 sm:p-6 shadow-xl hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-300">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-300 mb-2 drop-shadow-md text-center sm:text-left">
                  {exp.company}
                </h3>
                <p className="text-white/80 text-sm sm:text-base md:text-lg mb-2 text-center sm:text-left">
                  {exp.duration}
                </p>
                <ul className="list-disc list-inside text-white/70 text-xs sm:text-sm md:text-base space-y-2">
                  {exp.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </section>
    </ScrollAnimation>
  );
}
