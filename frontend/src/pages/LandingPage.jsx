import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 70 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const internetMilestones = [
  {
    year: "1969",
    title: "ARPANET",
    description: "First network connection established between UCLA and Stanford"
  },
  {
    year: "1983",
    title: "TCP/IP",
    description: "Internet protocol suite became the standard for network communications"
  },
  {
    year: "1989",
    title: "World Wide Web",
    description: "Tim Berners-Lee proposes the concept of hyperlinked information system"
  },

  {
    year: "1993",
    title: "Mosaic Browser",
    description: "First popular web browser making the internet accessible to all"
  },
  {
    year: "2004",
    title: "Web 2.0",
    description: "Rise of social media and user-generated content"
  },
  {
    year: "2010s",
    title: "Mobile Internet",
    description: "Smartphones revolutionize how we access and use the web"
  },
  {
    year: "2020s",
    title: "Web 3.0",
    description: "Emergence of decentralized applications and AI-powered experiences"
  }
];

const LandingPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
const navigate = useNavigate(); // Assuming you have react-router-dom set u
  useEffect(() => {
    // Set up interval to change the active milestone every 4 seconds
    const milestoneInterval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % internetMilestones.length);
    }, 4000);

    // Clean up interval on component unmount
    return () => clearInterval(milestoneInterval);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, [])
  

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <motion.div
        className="container mx-auto px-4 py-3 text-center"
        initial="hidden"
        animate="visible"
        variants={timelineVariants}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6"
          variants={itemVariants}
        >
          The Net Never Sleeps
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-16 max-w-3xl mx-auto text-gray-300"
          variants={itemVariants}
        >
          Experience the <span className="text-blue-400">Digital Evolution</span> from Start to Future
        </motion.p>

        <motion.div 
          className="relative w-full max-w-6xl mx-auto my-12"
          variants={itemVariants}
        >
          {/* Timeline Line */}
          <div className="absolute left-0 right-0 h-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-900 via-blue-400 to-blue-900"></div>
          
          {/* Timeline Nodes */}
          <div className="flex justify-between relative">
            {internetMilestones.map((milestone, index) => (
              <motion.div 
                key={index}
                className="relative flex flex-col items-center"
                initial={{ opacity: 0.5 }}
                animate={{ 
                  opacity: index === activeIndex ? 1 : 0.5,
                  scale: index === activeIndex ? 1.2 : 1
                }}
                transition={{ duration: 0.5 }}
              >
                <div 
                  className={`w-6 h-6 rounded-full ${index === activeIndex ? 'bg-blue-400' : 'bg-gray-600'} 
                              border-4 ${index === activeIndex ? 'border-blue-300' : 'border-gray-700'} z-10`}
                ></div>
                
                {/* Year label */}
                <div className={`absolute -bottom-10 text-sm font-medium 
                                ${index === activeIndex ? 'text-blue-400' : 'text-gray-400'}`}>
                  {milestone.year}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Highlighted Milestone */}
        <motion.div 
          className="mt-20 mb-12 p-8 rounded-lg bg-opacity-10 bg-blue-900 backdrop-blur-sm border border-blue-800"
          variants={itemVariants}
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-400">
            {internetMilestones[activeIndex].title}
            <span className="ml-3 text-xl text-gray-400">{internetMilestones[activeIndex].year}</span>
          </h2>
          <p className="text-xl text-gray-300">{internetMilestones[activeIndex].description}</p>
        </motion.div>

        {/* Static message that replaces the flipping box */}
        <motion.div
          className="w-full max-w-3xl mx-auto my-5 p-6 rounded-lg bg-opacity-20 bg-blue-900 backdrop-blur-sm border border-blue-400 shadow-2xl"
          variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl font-medium">
            From military networks to <span className="text-blue-400">global connectivity</span> — 
            Witness the evolution that <span className="text-blue-400">changed humanity</span>
          </h2>
        </motion.div>
        <motion.button
          className=" px-8 py-4 mt-2 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors duration-300"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          onClick={()=>navigate("/timeline")}
          // whileTap={{ scale: 0.95 }}
        >
          Explore the Timeline
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LandingPage;