'use client'
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function BookMove() {
  const [quoteDetails, setQuoteDetails] = useState({ origin: "", destination: "", date: "", inventory: "" });
  const [trackingNumber, setTrackingNumber] = useState("");

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <Card className="w-full h-full p-6 bg-white shadow-lg rounded-none">
        <Tabs defaultValue="quotes">
          <TabsList className="mb-4 flex gap-2 border-b">
            <TabsTrigger className="px-4 py-2 text-gray-700 hover:text-blue-500" value="quotes">Quotes</TabsTrigger>
            <TabsTrigger className="px-4 py-2 text-gray-700 hover:text-blue-500" value="move-history">Move History</TabsTrigger>
            <TabsTrigger className="px-4 py-2 text-gray-700 hover:text-blue-500" value="track-move">Track Move</TabsTrigger>
          </TabsList>

          
          <TabsContent value="quotes">
            <CardContent>
              <h2 className="text-xl font-semibold mb-3">Request a Quote</h2>
              <div className="grid gap-3">
                <Input className="border rounded-lg p-2" placeholder="Origin Address" value={quoteDetails.origin} onChange={(e) => setQuoteDetails({ ...quoteDetails, origin: e.target.value })} />
                <Input className="border rounded-lg p-2" placeholder="Destination Address" value={quoteDetails.destination} onChange={(e) => setQuoteDetails({ ...quoteDetails, destination: e.target.value })} />
                <Input className="border rounded-lg p-2" type="date" value={quoteDetails.date} onChange={(e) => setQuoteDetails({ ...quoteDetails, date: e.target.value })} />
                <Textarea className="border rounded-lg p-2" placeholder="List your inventory" value={quoteDetails.inventory} onChange={(e) => setQuoteDetails({ ...quoteDetails, inventory: e.target.value })} />
                <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Get Quotes</Button>
              </div>
            </CardContent>
          </TabsContent>

        
          <TabsContent value="move-history">
            <CardContent>
              <h2 className="text-xl font-semibold mb-3">Move History</h2>
              <Table className="w-full border rounded-lg">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="p-2">Date</TableHead>
                    <TableHead className="p-2">From</TableHead>
                    <TableHead className="p-2">To</TableHead>
                    <TableHead className="p-2">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="p-2">Feb 15, 2025</TableCell>
                    <TableCell className="p-2">New York, NY</TableCell>
                    <TableCell className="p-2">Los Angeles, CA</TableCell>
                    <TableCell className="p-2 text-green-500">Completed</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </TabsContent>

          
          <TabsContent value="track-move">
            <CardContent>
              <h2 className="text-xl font-semibold mb-3">Track Your Move</h2>
              <div className="flex gap-3">
                <Input className="border rounded-lg p-2" placeholder="Enter Tracking Number" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} />
                <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Track</Button>
              </div>
              <p className="mt-3 text-gray-500">Tracking updates will appear here.</p>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
