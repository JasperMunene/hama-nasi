'use client'
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Inventory() {
  const [items, setItems] = useState([
    { id: 1, name: "Bed", category: "Furniture", condition: "New" },
    { id: 2, name: "Dresser", category: "Furniture", condition: "New" },
    { id: 3, name: "Dining Table", category: "Furniture", condition: "New" },
    { id: 4, name: "Dining Chairs", category: "Furniture", condition: "Used" },
    { id: 5, name: "TV", category: "Appliances", condition: "New" },
    { id: 6, name: "Refrigerator", category: "Appliances", condition: "New" },
    { id: 7, name: "Microwave", category: "Appliances", condition: "New" },
  ]);

  const [newItem, setNewItem] = useState({ name: "", category: "", condition: "" });

  const addItem = () => {
    if (newItem.name && newItem.category && newItem.condition) {
      setItems([...items, { id: items.length + 1, ...newItem }]);
      setNewItem({ name: "", category: "", condition: "" });
    }
  };

  return (
    <div className="w-full p-6 bg-gray-100">
      <Card className="w-full bg-white shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Inventory</h2>
        <div className="mb-4 flex gap-2">
          <Input
            className="border rounded-lg p-2"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <Input
            className="border rounded-lg p-2"
            placeholder="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          />
          <Input
            className="border rounded-lg p-2"
            placeholder="Condition"
            value={newItem.condition}
            onChange={(e) => setNewItem({ ...newItem, condition: e.target.value })}
          />
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={addItem}>
            Add Item
          </Button>
        </div>
        <Table className="w-full border rounded-lg">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Condition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.condition}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
