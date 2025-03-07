'use client';

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ChevronDown,
  Upload,
  X
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { Textarea } from "@/components/ui/textarea";

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    condition: "",
    priority: "",
    image: "",
    notes: "",
    dimensions: "",
    weight: "",
    property_id: "",
  });

  const conditions = ["Excellent", "Good", "Fair", "Poor"];
  const priorities = ["High", "Medium", "Low"];
  const categories = [
    { id: "furniture", name: "Furniture", property_id: 1 },
    { id: "electronics", name: "Electronics", property_id: 2 },
    { id: "kitchen", name: "Kitchen", property_id: 3 },
    { id: "bedroom", name: "Bedroom", property_id: 4 },
    { id: "bathroom", name: "Bathroom", property_id: 5 },
    { id: "decor", name: "Decor", property_id: 6 },
  ];

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("/api/inventory");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setInventoryItems(data.inventory);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, []);

  const uploadImage = async (file) => {
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/upload", {
        method: "POST",
        body: uploadData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      return data.imgUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formData.image;

    try {
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const categoryData = categories.find((cat) => cat.id === formData.category);
      const submissionData = {
        item_name: formData.name,
        image: imageUrl,
        property_id: categoryData?.property_id || 1,
        condition: formData.condition,
        priority: formData.priority,
        notes: formData.notes,
        dimensions: formData.dimensions,
        weight: formData.weight,
      };

      const url = selectedItem
        ? `/api/inventory/${selectedItem.id}`
        : "/api/inventory";
      const method = selectedItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) throw new Error("Submission failed");

      const updatedItems = await fetch("/api/inventory").then((res) => res.json());
      setInventoryItems(updatedItems.inventory);

      resetForm();
      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      category:
        categories.find((cat) => cat.property_id === item.property_id)?.id || "",
      condition: item.condition,
      priority: item.priority,
      image: item.image,
      notes: item.notes,
      dimensions: item.dimensions,
      weight: item.weight,
      property_id: item.property_id,
    });
    setImagePreview(item.image);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (itemId) => {
    try {
      await fetch(`/api/inventory/${itemId}`, { method: "DELETE" });
      setInventoryItems((prev) => prev.filter((item) => item.id !== itemId));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      condition: "",
      priority: "",
      image: "",
      notes: "",
      dimensions: "",
      weight: "",
      property_id: "",
    });
    setImagePreview("");
    setSelectedFile(null);
    setSelectedItem(null);
  };

  const filteredItems = inventoryItems.filter(
    (item) =>
      (selectedCategory === "all" || item.category === selectedCategory) &&
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Custom Delete Modal
  const DeleteModal = ({ item }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Delete Item</h3>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete {item?.name}? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(item?.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  function ItemForm({ isEdit }) {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#0063ff] focus:border-transparent"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="condition">Condition</Label>
            <select
              id="condition"
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#0063ff] focus:border-transparent"
              required
            >
              <option value="">Select Condition</option>
              {conditions.map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="dimensions">Dimensions</Label>
            <Input
              id="dimensions"
              type="text"
              value={formData.dimensions}
              onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
              placeholder="L × W × H"
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="weight">Weight</Label>
            <Input
              id="weight"
              type="text"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="Enter weight"
              className="w-full"
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="priority">Priority</Label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#0063ff] focus:border-transparent"
              required
            >
              <option value="">Select Priority</option>
              {priorities.map((pri) => (
                <option key={pri} value={pri}>
                  {pri}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any additional notes"
              className="min-h-[100px]"
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="image">Item Image</Label>
            <div className="mt-2 border-2 border-dashed border-gray-200 rounded-xl p-4">
              <input
                type="file"
                id="image"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                {imagePreview ? (
                  <div className="relative w-full h-48">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              resetForm();
              isEdit ? setIsEditModalOpen(false) : setIsAddModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-[#0063ff] hover:bg-[#0055dd]">
            {isEdit ? "Save Changes" : "Add Item"}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-600 mt-1">Manage your items for the move</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0063ff] hover:bg-[#0055dd]">
              <Plus className="h-5 w-5 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
            </DialogHeader>
            <ItemForm isEdit={false} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0063ff] focus:border-transparent"
          />
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0063ff] focus:border-transparent appearance-none"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="group overflow-hidden border-none shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleEditItem(item)}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Edit className="h-5 w-5 text-gray-700" />
                </button>
                <button
                  onClick={() => {
                    setItemToDelete(item);
                    setIsDeleteModalOpen(true);
                  }}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Trash2 className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {item.category}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : item.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.priority}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Condition</span>
                  <span className="font-medium">{item.condition}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Dimensions</span>
                  <span className="font-medium">{item.dimensions}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Weight</span>
                  <span className="font-medium">{item.weight}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <ItemForm isEdit={true} />
        </DialogContent>
      </Dialog>

      {/* Custom Delete Modal */}
      {isDeleteModalOpen && <DeleteModal item={itemToDelete} />}
    </div>
  );
}