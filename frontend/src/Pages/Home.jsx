import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  Heart,
  Users,
  MapPin,
  Star,
  Globe,
  Navigation,
  Phone,
} from "lucide-react";
import { HelpingHand } from "lucide-react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const top = element.offsetTop;
    const start = window.scrollY;
    const distance = top - start;
    const duration = 1000; // milliseconds (1 second)
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      window.scrollTo(0, start + distance * easeInOutQuad(progress));
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    requestAnimationFrame(animation);
  };

  return (
    <div className="min-h-screen  text-gray-900 overflow-x-hidden bg-gradient-to-br from-pink-200 via-rose-100 to-pink-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center  py-20">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-rose-300 rounded-full opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <motion.div
              className="relative w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44"
              animate={{ rotate: 360 }}
              transition={{
                duration: 60,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {/* Outer circles */}
              <div className="absolute inset-0 border-2 border-pink-200 rounded-full opacity-60"></div>
              <div className="absolute inset-3 border border-pink-300 rounded-full opacity-40"></div>
              <div className="absolute inset-6 border border-rose-200 rounded-full opacity-30"></div>

              {/* Network icons */}
              {[
                {
                  icon: AlertTriangle,
                  angle: 0,
                  radius: 50,
                  color: "text-red-400",
                },
                { icon: Heart, angle: 60, radius: 40, color: "text-green-400" },
                {
                  icon: Shield,
                  angle: 120,
                  radius: 55,
                  color: "text-blue-400",
                },
                {
                  icon: Phone,
                  angle: 180,
                  radius: 45,
                  color: "text-purple-400",
                },
                {
                  icon: Navigation,
                  angle: 240,
                  radius: 52,
                  color: "text-orange-400",
                },
                {
                  icon: MapPin,
                  angle: 300,
                  radius: 42,
                  color: "text-teal-400",
                },
              ].map((item, index) => {
                const x = Math.cos((item.angle * Math.PI) / 180) * item.radius;
                const y = Math.sin((item.angle * Math.PI) / 180) * item.radius;
                return (
                  <motion.div
                    key={index}
                    className={`absolute w-6 h-6 ${item.color} flex items-center justify-center`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.3,
                    }}
                    whileHover={{ scale: 1.5, opacity: 1 }}
                  >
                    <item.icon className="w-4 h-4" />
                  </motion.div>
                );
              })}

              {/* Central globe */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full flex items-center justify-center shadow-lg"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(244, 114, 182, 0.3)",
                      "0 0 40px rgba(244, 114, 182, 0.6)",
                      "0 0 20px rgba(244, 114, 182, 0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Globe className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="block text-balance">SentryAid</span>
          </motion.h1>

          <motion.h2
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-gray-800 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="text-balance">
              Your Safety, Our Priority – Connect, Alert, and Respond in
              Real-Time
            </span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl mb-10 text-gray-600 max-w-4xl mx-auto text-balance leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Join a community-driven emergency response system with verified
            volunteers ready to assist whenever you need help. Fast alerts,
            real-time chat, and community heatmaps – SentryAid keeps your
            community safer.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.button
              className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-lg text-lg min-w-48 transition-colors duration-200"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(244, 114, 182, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => scrollToSection("how-it-works")}
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 ">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Admin",
                description:
                  "Manage user and volunteer accounts, approve requests, and oversee emergency broadcasts.",
                buttonText: "Admin Login",
                color: "blue",
                delay: 0,
                path: "/adminLogin",
              },
              {
                icon: Heart,
                title: "Volunteer",
                description:
                  "Respond to SOS alerts, manage availability, and assist users during emergencies.",
                buttonText: "Volunteer Login",
                color: "green",
                delay: 0.2,
                path: "/volunteerLogin",
              },
              {
                icon: AlertTriangle,
                title: "User",
                description:
                  "Send SOS alerts, communicate securely with volunteers, and stay informed.",
                buttonText: "User Login",
                color: "red",
                delay: 0.4,
                path: "/usersLogin",
              },
            ].map((role) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: role.delay }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative z-10"
                >
                  <div className="p-8 bg-white rounded-xl shadow-lg border border-pink-200 hover:border-rose-300 transition-all duration-300 h-full flex flex-col">
                    <motion.div
                      className={`
                        w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto
                        ${
                          role.color === "red"
                            ? "bg-gradient-to-br from-red-500 to-red-600"
                            : role.color === "blue"
                            ? "bg-gradient-to-br from-blue-500 to-blue-600"
                            : "bg-gradient-to-br from-green-500 to-green-600"
                        }
                      `}
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">
                      {role.title}
                    </h3>
                    <p className="text-gray-600 text-center text-pretty mb-8 flex-grow">
                      {role.description}
                    </p>

                    <motion.button
                      className={`
                        w-full px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition-all duration-300
                        ${
                          role.color === "blue"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : role.color === "red"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-green-600 hover:bg-green-700"
                        }
                      `}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(role.path)}
                    >
                      {role.buttonText}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Risk Map Section */}
      <section className="py-20 px-4 ">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Live Risk Map
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Real-time monitoring of emergency situations and safe zones across
            your community.
          </motion.p>

          <motion.div
            className="relative w-full max-w-4xl mx-auto h-96 rounded-2xl bg-gradient-to-br from-white to-pink-50 border border-pink-200 overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Abstract Globe/Map */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-rose-100/50">
              {/* Radar Sweep */}
              <div className="absolute top-1/2 left-1/2 w-64 h-64 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-full h-full border-2 border-green-500/50 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent transform -translate-x-1/2 -translate-y-1/2 origin-left radar-sweep"></div>
              </div>

              {/* Heat Zones */}
              {[
                { color: "red", size: "w-8 h-8", position: "top-1/4 left-1/3" },
                {
                  color: "red",
                  size: "w-6 h-6",
                  position: "top-1/2 right-1/4",
                },
                {
                  color: "green",
                  size: "w-10 h-10",
                  position: "bottom-1/3 left-1/2",
                },
                {
                  color: "green",
                  size: "w-7 h-7",
                  position: "top-2/3 left-1/4",
                },
              ].map((zone, index) => (
                <motion.div
                  key={index}
                  className={`
                    absolute ${zone.position} ${zone.size} rounded-full
                    ${
                      zone.color === "red" ? "bg-red-500/70" : "bg-green-500/70"
                    }
                  `}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                />
              ))}

              {/* Grid Lines */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-px bg-gray-400"
                    style={{ top: `${(i + 1) * 12.5}%` }}
                  />
                ))}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-full w-px bg-gray-400"
                    style={{ left: `${(i + 1) * 12.5}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full pulse-glow-red"></div>
                <span className="text-sm text-gray-700">High Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full pulse-glow-green"></div>
                <span className="text-sm text-gray-700">Safe Zone</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 ">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Community Heroes
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Emergency Volunteer",
                content:
                  "Thanks to SentryAid, I can provide immediate assistance during emergencies. The platform makes helping others seamless and efficient.",
                avatar:
                  "https://tse1.explicit.bing.net/th/id/OIP.wElTk2tpbD0LGcgvXAfVVQHaF9?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3",
              },
              {
                name: "Marcus Rodriguez",
                role: "Community Admin",
                content:
                  "Managing emergency responses has never been easier. The dashboard gives us complete visibility and control.",
                avatar:
                  "https://wallpapers.com/images/hd/professional-profile-pictures-1350-x-1080-sizz773bu8k11plw.jpg",
              },
              {
                name: "Emily Watson",
                role: "Rescued User",
                content:
                  "When I was being followed and felt unsafe, SentryAid instantly alerted nearby volunteers and helped me get to safety. It truly saved me from a dangerous situation.",
                avatar:
                  "https://st4.depositphotos.com/1006137/19992/i/450/depositphotos_199923454-stock-photo-beautiful-brunette-woman-profile-picture.jpg",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="flex"
              >
                <div className="p-6 bg-white/80 backdrop-blur-sm border-pink-200 hover:border-rose-300 transition-all duration-300 shadow-lg flex flex-col h-full w-full">
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full ring-2 ring-rose-300"
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full pulse-glow-green"></div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic text-pretty flex-grow">
                    "{testimonial.content}"
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gradient-to-r from-rose-100 to-pink-100 border-t border-pink-200 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="flex items-center mb-6 md:mb-0"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div className="flex items-center justify-center mr-3 heartbeat">
                <img className="w-40" src="../logo.png" alt="" />
              </motion.div>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
              {["About", "Features", "Community", "Support", "Privacy"].map(
                (link) => (
                  <motion.a
                    key={link}
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300 relative group"
                    whileHover={{ y: -2 }}
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-400 group-hover:w-full transition-all duration-300"></span>
                  </motion.a>
                )
              )}
            </div>

            <div className="flex gap-4">
              {[MapPin, Users, Shield].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="w-10 h-10 bg-white/80 rounded-lg flex items-center justify-center cursor-pointer hover:bg-rose-100 transition-colors duration-300 border border-pink-200"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5 text-gray-600 hover:text-gray-900 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="text-center mt-8 pt-8 border-t border-pink-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600">
              SentryAid © 2025 – Together, We Respond Faster.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
