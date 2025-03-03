"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function BookMove() {
  const [quoteDetails, setQuoteDetails] = useState({ origin: "", destination: "", date: "", inventory: "" });
  const [trackingNumber, setTrackingNumber] = useState("");
  const [moveHistory, setMoveHistory] = useState([]);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [moverResponse, setMoverResponse] = useState(null);
  const [notification, setNotification] = useState("");
  const [inventoryList, setInventoryList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/moves")
      .then((res) => res.json())
      .then((data) => setMoveHistory(Array.isArray(data) ? data : [])) // Ensure array
      .catch((err) => console.error("Error fetching moves:", err));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/inventory")
      .then((res) => res.json())
      .then((data) => setInventoryList(Array.isArray(data) ? data : [])) // Ensure array
      .catch((err) => console.error("Error fetching inventory:", err));
  }, []);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  const sendPushNotification = (message) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Move Update", { body: message });
    }
  };

  const generateTrackingNumber = () => {
    return "TRK-" + Math.random().toString(36).slice(2, 9).toUpperCase();
  };

  const requestQuote = () => {
    fetch("http://127.0.0.1:5000/moves/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quoteDetails),
    })
      .then((res) => res.json())
      .then(() => {
        setNotification("Move booked! A notification has been sent.");
        sendPushNotification("Your move has been booked!");
      })
      .catch((err) => console.error("Error requesting quote:", err));
  };

  const trackMove = () => {
    fetch(`http://127.0.0.1:5000/moves/${trackingNumber}`)
      .then((res) => res.json())
      .then((data) => setTrackingInfo(data))
      .catch((err) => console.error("Error tracking move:", err));
  };

  const acceptMove = (moveId) => {
    const newTrackingNumber = generateTrackingNumber();
    fetch(`http://127.0.0.1:5000/moves/${moveId}/accept`, { method: "POST" })
      .then((res) => res.json())
      .then(() => {
        setTrackingNumber(newTrackingNumber);
        setMoverResponse("Move accepted! Tracking number generated.");
        setNotification(`Notification sent to customer. Tracking Number: ${newTrackingNumber}`);
        sendPushNotification(`Your move has been accepted! Tracking Number: ${newTrackingNumber}`);
      })
      .catch((err) => console.error("Error accepting move:", err));
  };

  const rejectMove = (moveId) => {
    fetch(`http://127.0.0.1:5000/moves/${moveId}/reject`, { method: "POST" })
      .then((res) => res.json())
      .then(() => {
        setMoverResponse("Move rejected!");
        setNotification("Notification sent to customer about rejection.");
        sendPushNotification("Your move has been rejected.");
      })
      .catch((err) => console.error("Error rejecting move:", err));
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <Card className="w-full max-w-3xl p-4 bg-white shadow-md rounded-lg">
        <Tabs defaultValue="quotes">
          <TabsList className="mb-4 flex gap-2 border-b">
            <TabsTrigger className="px-3 py-2 text-gray-700 hover:text-blue-500" value="quotes">Quotes</TabsTrigger>
            <TabsTrigger className="px-3 py-2 text-gray-700 hover:text-blue-500" value="move-history">Move History</TabsTrigger>
            <TabsTrigger className="px-3 py-2 text-gray-700 hover:text-blue-500" value="track-move">Track Move</TabsTrigger>
          </TabsList>

          <TabsContent value="quotes">
            <CardContent>
              <h2 className="text-lg font-semibold mb-3">Request a Quote</h2>
              <div className="grid gap-3">
                <Input placeholder="Origin Address" value={quoteDetails.origin} onChange={(e) => setQuoteDetails({ ...quoteDetails, origin: e.target.value })} />
                <Input placeholder="Destination Address" value={quoteDetails.destination} onChange={(e) => setQuoteDetails({ ...quoteDetails, destination: e.target.value })} />
                <Input type="date" value={quoteDetails.date} onChange={(e) => setQuoteDetails({ ...quoteDetails, date: e.target.value })} />
                <Select onValueChange={(value) => setQuoteDetails({ ...quoteDetails, inventory: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Inventory">{quoteDetails.inventory}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {inventoryList.map((item) => (
                      <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="bg-blue-500 text-white w-full" onClick={requestQuote}>Get Quotes</Button>
              </div>
              {notification && <p className="mt-3 text-green-500">{notification}</p>}
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
