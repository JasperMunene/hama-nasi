' use client'
export default function Inventory() {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Inventory</h2>
          <button className="text-blue-600 font-medium hover:underline">See all</button>
        </div>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border border-gray-200">Item</th>
              <th className="p-2 border border-gray-200">Category</th>
              <th className="p-2 border border-gray-200">Condition</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "Bed", category: "Furniture", condition: "New" },
              { item: "Dresser", category: "Furniture", condition: "New" },
              { item: "Dining Table", category: "Furniture", condition: "New" },
              { item: "Dining Chairs", category: "Furniture", condition: "Used" },
              { item: "Dining Chairs", category: "Furniture", condition: "Used" },
              { item: "TV", category: "Appliances", condition: "New" },
              { item: "Refrigerator", category: "Appliances", condition: "New" },
              { item: "Microwave", category: "Appliances", condition: "New" },
            ].map((row, index) => (
              <tr key={index} className="border border-gray-200">
                <td className="p-2 border border-gray-200 font-medium">{row.item}</td>
                <td className="p-2 border border-gray-200">{row.category}</td>
                <td className="p-2 border border-gray-200">{row.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
