'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import  Button  from '@/components/elements/button/Button';
import  Input  from '@/components/form/input/InputField';
import  Label  from '@/components/form/Label'
import { Edit, Trash2, Package, Upload, Plus } from 'lucide-react';
import { toast } from 'sonner';
import Spinner from '@/components/elements/Spinner';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newItem, setNewItem] = useState({ item_name: '', file: null });
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItem, setEditingItem] = useState({ item_name: '', image: '', file: null });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/inventory');
      const data = await res.json();
      setInventory(data.inventory || []);
    } catch (err) {
      toast.error('Error fetching inventory.');
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.imgUrl) {
        return data.imgUrl;
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      throw err;
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (newItem.file) {
        imageUrl = await uploadFile(newItem.file);
      }
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_name: newItem.item_name,
          image: imageUrl,
          property_id: 1
        })
      });
      if (res.ok) {
        setNewItem({ item_name: '', file: null });
        toast.success('Item added successfully');
        fetchInventory();
      } else {
        toast.error('Error adding inventory item.');
      }
    } catch (err) {
      toast.error('Error adding inventory item.');
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const res = await fetch(`/api/inventory/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('Item deleted successfully');
        fetchInventory();
      } else {
        toast.error('Error deleting inventory item.');
      }
    } catch (err) {
      toast.error('Error deleting inventory item.');
    }
  };

  const handleEditClick = (item) => {
    setEditingItemId(item.id);
    setEditingItem({ item_name: item.item_name, image: item.image, file: null });
  };

  const handleEditChange = (e) => {
    setEditingItem({
      ...editingItem,
      [e.target.name]: e.target.value
    });
  };

  const handleEditFileChange = (e) => {
    setEditingItem({
      ...editingItem,
      file: e.target.files[0]
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = editingItem.image;
      if (editingItem.file) {
        imageUrl = await uploadFile(editingItem.file);
      }
      const res = await fetch(`/api/inventory/${editingItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_name: editingItem.item_name,
          image: imageUrl,
          property_id: 1
        })
      });
      if (res.ok) {
        setEditingItemId(null);
        toast.success('Item updated successfully');
        fetchInventory();
      } else {
        toast.error('Error updating inventory item.');
      }
    } catch (err) {
      toast.error('Error updating inventory item.');
    }
  };

  if (loading) {
    return (
      <Spinner />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-2">Manage your items efficiently</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Item</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="item_name">Item Name</Label>
                <Input
                  id="item_name"
                  value={newItem.item_name}
                  onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
                  placeholder="Enter item name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Item Image</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="image"
                    type="file"
                    onChange={(e) => setNewItem({ ...newItem, file: e.target.files[0] })}
                    className="cursor-pointer"
                  />
                  <Upload className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <Button type="submit" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inventory.map(item => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {editingItemId === item.id ? (
                    <Input
                      name="item_name"
                      value={editingItem.item_name}
                      onChange={handleEditChange}
                      placeholder="Item Name"
                      required
                    />
                  ) : (
                    item.item_name
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingItemId === item.id ? (
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Change Image</Label>
                      <Input type="file" onChange={handleEditFileChange} />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm">Save</Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingItemId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    {item.image && (
                      <div className="relative aspect-video mb-4">
                        <img
                          src={item.image}
                          alt={item.item_name}
                          className="rounded-md object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(item)}
                        className="gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteItem(item.id)}
                        className="gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {inventory.length === 0 && (
          <Card className="mt-8">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <Package className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-xl font-medium text-gray-600">No items in inventory</p>
              <p className="text-gray-500 mt-2">Start by adding your first item</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InventoryPage;