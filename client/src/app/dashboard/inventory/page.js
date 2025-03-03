"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const API_URL = "http://127.0.0.1:5000/inventory";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", category: "", condition: "" });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error("API returned non-array data:", data);
          setItems([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching inventory:", err);
        setItems([]);
      });
  }, []);

  const addItem = () => {
    if (newItem.name && newItem.category && newItem.condition) {
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.id) {
            setItems([...items, data]);
            setNewItem({ name: "", category: "", condition: "" });
          }
        })
        .catch((err) => console.error("Error adding item:", err));
    }
  };

  const deleteItem = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setItems(items.filter((item) => item.id !== id));
        }
      })
      .catch((err) => console.error("Error deleting item:", err));
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
          <Select onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
            <SelectTrigger className="border rounded-lg p-2 w-40">
              {newItem.category || "Select Category"}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Furniture">Furniture</SelectItem>
              <SelectItem value="Appliances">Appliances</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setNewItem({ ...newItem, condition: value })}>
            <SelectTrigger className="border rounded-lg p-2 w-40">
              {newItem.condition || "Select Condition"}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Used">Used</SelectItem>
              <SelectItem value="Fragile">Fragile</SelectItem>
              <SelectItem value="Bulk">Bulk</SelectItem>
            </SelectContent>
          </Select>
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(items) && items.length > 0 ? (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.condition}</TableCell>
                  <TableCell>
                    <Button className="bg-red-500 text-white px-3 py-1 rounded-lg" onClick={() => deleteItem(item.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4" className="text-center">
                  No items found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}