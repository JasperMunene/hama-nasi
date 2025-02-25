'use client'
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    theme: "light",
    language: "English",
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
            <Switch checked={settings.notifications} onCheckedChange={toggleNotification} />
          </div>
          <div>
            <label className="block text-sm font-medium">Theme</label>
            <Select onValueChange={(value) => setSettings({ ...settings, theme: value })}>
              <SelectTrigger className="border rounded-lg p-2 w-full">{settings.theme}</SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">Language</label>
            <Select onValueChange={(value) => setSettings({ ...settings, language: value })}>
              <SelectTrigger className="border rounded-lg p-2 w-full">{settings.language}</SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full">
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
