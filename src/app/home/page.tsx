import Image from 'next/image';
import ScrollAnimation from '../components/ScrollAnimation';

export default function HomeSection() {
  return (
    <ScrollAnimation animationType="zoom-out">
      <section
        id="home"
        className="bg-gradient-to-br from-black via-gray-800 to-green-700 text-white p-6 sm:p-8 lg:p-12 rounded-[32px] w-full shadow-2xl scroll-mt-24 mt-0"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-14">
          {/* Profile Image: shown first on mobile */}
          <div className="order-1 md:order-2 w-full md:w-1/2 flex justify-center">
            <div className="relative w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72">
              <Image
                src="/Profileimg.jpg"
                alt="Profile image of Ahmad Ushay"
                fill
                className="rounded-[20%] sm:rounded-full object-cover border-4 border-green-400 shadow-2xl transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Heading and Summary: shown second on mobile */}
          <div className="order-2 md:order-1 w-full md:w-1/2 text-center md:text-left font-inter">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg break-words leading-tight">
              Hi, I&apos;m{" "}
              <span className="text-green-400 font-pacifico text-5xl md:text-6xl transition-transform duration-300 hover:scale-105">
                Ahmad Ushay
              </span>
            </h1>
            <p className="text-base md:text-xl text-white/80 leading-relaxed mt-4 break-words px-1 sm:px-0">
              As a Programmer Analyst, I specialize in bridging the gap between business needs and technical solutions. With a strong foundation in software development, data analysis, and system optimization, I design and implement scalable applications that drive efficiency and innovation. My passion lies in transforming complex requirements into clean, functional code while collaborating across teams to deliver impactful results.
            </p>
          </div>
        </div>
      </section>
    </ScrollAnimation>
  );
}
