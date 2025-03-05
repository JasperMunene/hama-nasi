'use client'
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";

const ItemType = { BOX: "box" };

const DraggableItem = ({ id, name, style }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.BOX,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      draggable
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-4 bg-yellow-400 text-black rounded shadow-lg cursor-grab flex items-center justify-center w-24 h-24"
      style={{ opacity: isDragging ? 0.5 : 1, ...style }}
    >
      {name}
    </motion.div>
  );
};

const DropZone = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.BOX,
    drop: (item) => {
      onDrop(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <motion.div
      ref={drop}
      className={`relative w-full h-64 flex items-center justify-center rounded-lg shadow-md overflow-hidden transition-all duration-300 border-4 border-dashed bg-blue-200 ${
        isOver ? "bg-green-200 scale-105" : "bg-blue-200"
      }`}
    >
      {/* Background Scene */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-green-200 flex items-end">
        <div className="w-full h-16 bg-green-500"></div> {/* Ground */}
      </div>
      
      {/* Truck Cab */}
      <div className="absolute bottom-4 left-2 w-28 h-28 bg-blue-500 rounded-lg flex flex-col items-center justify-center border border-gray-600">
        <div className="w-16 h-12 bg-white rounded-md mb-2"></div> {/* Windshield */}
        <div className="w-10 h-4 bg-yellow-300 rounded-sm"></div> {/* Headlights */}
      </div>
      
      {/* Truck Cargo Area with stronger shake animation */}
      <motion.div
        className="absolute bottom-0 left-28 w-72 h-44 bg-gray-500 rounded-lg flex items-center justify-center border border-gray-600"
        animate={isOver ? { x: [0, 5, -5, 5, -5, 0] } : { x: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <p className="text-lg font-semibold text-white">Drop Items in the Van</p>
      </motion.div>
      
      {/* Truck Wheels */}
      <div className="absolute bottom-[-10px] left-6 w-14 h-14 bg-black rounded-full border-4 border-gray-700"></div>
      <div className="absolute bottom-[-10px] left-40 w-14 h-14 bg-black rounded-full border-4 border-gray-700"></div>
    </motion.div>
  );
};

export default function MovingVanGame() {
  const [items, setItems] = useState([
    { id: 1, name: "📦 Box 1" },
    { id: 2, name: "📦 Box 2" },
    { id: 3, name: "🛋 Furniture" },
  ]);

  const handleDrop = (id) => {
    setItems((prev) => {
      const newItems = prev.filter((item) => item.id !== id);
      return [...newItems];
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 flex flex-col items-center space-y-6 bg-blue-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-700">Moving Van Game</h1>
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {items.map((item) => (
            <DraggableItem key={item.id} id={item.id} name={item.name} />
          ))}
        </motion.div>
        <DropZone onDrop={handleDrop} />
      </div>
    </DndProvider>
  );
}
