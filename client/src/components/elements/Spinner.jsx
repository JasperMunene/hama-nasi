import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="relative">
        {/* Outer spinning ring */}
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-transparent border-t-[#0063ff] border-r-[#0063ff]/70 border-b-[#0063ff]/40"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
        
       
        {/* Center logo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#0000C7] rounded-md flex items-center justify-center shadow-md">
          <span className="text-white text-xl font-bold">H</span>
        </div>
        
        {/* Pulsing effect behind everything */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#0063ff]/10 rounded-full -z-10"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.2, 0.7]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Loading text */}
      <motion.p 
        className="absolute mt-32 text-[#001a4d] font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Spinner;