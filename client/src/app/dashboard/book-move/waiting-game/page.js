'use client'
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";

const ItemType = { BOX: "box" };

const DraggableItem = ({ id, name }) => {
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
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-4 bg-yellow-400 text-black rounded shadow-lg cursor-grab flex items-center justify-center w-24 h-24"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {name}
    </motion.div>
  );
};

const DropZone = ({ onDrop, level, isComplete }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.BOX,
    drop: (item) => onDrop(item.id),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  return (
    <motion.div
      ref={drop}
      className={`relative w-full h-64 flex items-center justify-center rounded-lg shadow-md overflow-hidden transition-all duration-300 border-4 border-dashed bg-blue-200 ${
        isOver ? "bg-green-200 scale-105" : "bg-blue-200"
      }`}
    >
      <motion.div
        className="absolute flex items-end justify-center"
        animate={isComplete ? { x: 400, opacity: 0 } : { x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="relative bg-gray-500 rounded-lg border-4 border-gray-700 flex flex-col justify-end items-center"
          initial={{ width: 320, height: 160 }}
          animate={{ width: Math.max(100, 320 - level * 40), height: Math.max(50, 160 - level * 20) }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-12 bg-white rounded-t-md flex items-center justify-center">
            <p className="text-lg font-semibold text-gray-800">Moving Van</p>
          </div>
        </motion.div>
        <div className="absolute bottom-[-10px] left-6 w-12 h-12 bg-black rounded-full border-4 border-gray-700"></div>
        <div className="absolute bottom-[-10px] right-6 w-12 h-12 bg-black rounded-full border-4 border-gray-700"></div>
      </motion.div>
    </motion.div>
  );
};

export default function MovingVanGame() {
  const [items, setItems] = useState([
    { id: 1, name: "📦 Box 1" },
    { id: 2, name: "📦 Box 2" },
    { id: 3, name: "🛋 Furniture" },
  ]);
  const [level, setLevel] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleDrop = (id) => {
    setItems((prev) => {
      const newItems = prev.filter((item) => item.id !== id);
      if (newItems.length === 0) {
        setIsComplete(true);
      }
      return newItems;
    });
  };

  const handleNextLevel = () => {
    setLevel((prev) => prev + 1);
    setItems([
      { id: 1, name: "📦 Box 1" },
      { id: 2, name: "📦 Box 2" },
      { id: 3, name: "🛋 Furniture" },
    ]);
    setIsComplete(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 flex flex-col items-center space-y-6 bg-blue-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-700">Moving Van Game - Level {level + 1}</h1>
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
        <DropZone onDrop={handleDrop} level={level} isComplete={isComplete} />
        {isComplete && (
          <button
            onClick={handleNextLevel}
            className="px-6 py-3 bg-green-500 text-white font-bold rounded shadow-lg hover:bg-green-600 transition-all"
          >
            Next Level
          </button>
        )}
      </div>
    </DndProvider>
  );
}
