'use client'

import { useState } from 'react';
import Navbar from './Navbar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function Predict() {
  const [drugData, setDrugData] = useState({
    drugName: '',
    diseaseName: '',
    therapyType: '',
    benefitAssessment: '',
    mortalityRate: '',
    morbidityRate: '',
    qualityOfLifeRate: '',
    sideEffects: '',
    seriousAdverseEvents: '',
    adverseEventsRate: '',
    adverseDiscontinuationRate: '',
  });

  const [predictedCost, setPredictedCost] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDrugData(prevData => ({ ...prevData, [name]: value }));
  };

  const handlePredict = () => {
    // Simulated prediction (can be replaced with an API call)
    setPredictedCost('$ 123456789');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold">Predict cost for New Drug</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(drugData).map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>{`Enter ${field.replace(/([A-Z])/g, ' $1')}`}</Label>
                <Input
                  id={field}
                  name={field}
                  value={drugData[field]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
          <Button onClick={handlePredict} className="w-full">Predict Cost</Button>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Predicted Cost for the New Drug</h2>
            <Input value={predictedCost} readOnly />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Comparative Drug Cost with the new drug</h2>
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Comparative Drug Cost Visualization"
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
