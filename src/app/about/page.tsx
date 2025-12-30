// import Image from "next/image";

// const aboutItems = [
//   {
//     title: "Frontend UI",
//     summary:
//       "Crafting intuitive and visually stunning interfaces using React, Tailwind CSS, and modern design principles. Focused on responsive, user-friendly experiences.",
//     image: "/FEUI.jpg", // Replace with your actual image path
//   },
//   {
//     title: "Backend Development",
//     summary:
//       "Building scalable and secure server-side applications with Node.js, Express, and databases. Ensuring performance and clean architecture.",
//     image: "/BE.png",
//   },
//   {
//     title: "AI Agent",
//     summary:
//       "Creating intelligent systems using machine learning and AI tools. Automating tasks, analyzing data, and enhancing decision-making.",
//     image: "/AIAGENT.jpg",
//   },
// ];

// export default function AboutSection() {
//   return (
//     <section
//       id="about"
//       className="bg-gradient-to-br from-indigo-600 via-pink-500 to-yellow-400 text-white p-6 md:p-16 rounded-[40px] m-4 shadow-2xl"
//     >
//       <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-12 drop-shadow-lg">
//         About
//       </h2>

//       <div className="flex flex-col gap-10">
//         {aboutItems.map((item, index) => (
//           <div
//             key={index}
//             className="flex flex-col md:flex-row items-center md:items-start bg-white/10 rounded-3xl p-6 md:p-8 shadow-xl"
//           >
//             {/* Image */}
//             <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
//               <Image
//                 src={item.image}
//                 alt={item.title}
//                 width={300}
//                 height={200}
//                 className="rounded-xl shadow-lg object-cover"
//               />
//             </div>

//             {/* Text */}
//             <div className="md:w-1/2 md:pl-8 text-center md:text-left">
//               <h3 className="text-2xl md:text-3xl font-bold text-yellow-200 mb-2 drop-shadow-md">
//                 {item.title}
//               </h3>
//               <p className="text-white/90 text-base md:text-lg leading-relaxed font-inter">
//                 {item.summary}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


import Image from "next/image";
import ScrollAnimation from '../components/ScrollAnimation';

const aboutItems = [
  {
    title: "Frontend UI",
    summary:
      "Crafting intuitive and visually stunning interfaces using React, Tailwind CSS, and modern design principles. Leveraging Next.js to ensure top-tier performance, SEO optimization, and rapid load times. Focused on delivering responsive, user-friendly experiences that prioritize accessibility.",
    image: "/FEUI.jpg",
  },
  {
    title: "Backend Development",
    summary:
      "Building scalable, secure, and performant server-side applications using Node.js, Express, and modern database solutions. Focused on clean architecture and maintainable code to ensure long-term reliability and speed. Expertise includes designing and implementing robust RESTful and GraphQL APIs for efficient data delivery.",
    image: "/BE.png",
  },
  {
    title: "AI Agent",
    summary:
      "Machine Learning & AI Creating intelligent, data-driven systems that specialize in predictive analysis and insight extraction. I leverage ML algorithms, AI tools, and n8n to automate complex tasks, build high-reliability data pipelines, and power smarter operational workflows.",
    image: "/AIAGENT.jpg",
  },
];

export default function AboutSection() {
  return (
    <ScrollAnimation animationType="fade-up">
      <section
        id="about"
        className="bg-gradient-to-br from-black via-gray-800 to-green-700 text-white p-6 sm:p-8 lg:p-12 rounded-[32px] w-full shadow-2xl scroll-mt-24"
      >
        <ScrollAnimation animationType="fade-down" delay={100}>
          <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-12 drop-shadow-lg text-green-400">
            About
          </h2>
        </ScrollAnimation>

        <div className="flex flex-col gap-10">
          {aboutItems.map((item, index) => (
            <ScrollAnimation
              key={index}
              animationType={index % 2 === 0 ? "fade-left" : "fade-right"}
              delay={index * 150}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start bg-white/5 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-300">
                {/* Image */}
                <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="rounded-xl shadow-lg object-cover"
                  />
                </div>

                {/* Text */}
                <div className="md:w-1/2 md:pl-8 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-green-300 mb-2 drop-shadow-md">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-base md:text-lg leading-relaxed font-inter">
                    {item.summary}
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </section>
    </ScrollAnimation>
  );
}
