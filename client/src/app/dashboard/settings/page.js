'use client'
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import  Button  from "@/components/elements/button/Button";
import  Input  from "@/components/form/input/InputField";


export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    theme: "light",
    language: "English",
    privacy: "Public",
    password: "",
    bio: "",
    paymentMethod: "Credit Card",
  });

  const toggleNotification = () => {
    setSettings({ ...settings, notifications: !settings.notifications });
  };

  return (
    <div className="w-full p-6 bg-gray-100 flex justify-center items-center">
      <Card className="w-full max-w-lg bg-white shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Enable Notifications</span>
            
          </div>
          <div>
            <label className="block text-sm font-medium">Theme</label>
      
          </div>
          <div>
            <label className="block text-sm font-medium">Privacy</label>
          </div>
          <div>
            <label className="block text-sm font-medium">Change Password</label>
            <Input type="password" className="border rounded-lg p-2 w-full" placeholder="New Password" value={settings.password} onChange={(e) => setSettings({ ...settings, password: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium">Bio</label>
           
          </div>
          <div>
            <label className="block text-sm font-medium">Payment Method</label>
          </div>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full">
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
