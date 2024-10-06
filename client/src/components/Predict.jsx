// 'use client';

// import { useState } from 'react';
// import Navbar from './Navbar';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function Predict() {
//   const [drugData, setDrugData] = useState({
//     Drug_Name: '',
//     disease: '',
//     Benefit_Assessment: '',
//     mortality: '',
//     morbidity: '',
//     quality_of_life: '',
//     Side_Effects: '',
//     Serious_Adverse_Events: '',
//     Total_Adverse_Events: '',
//     Adverse_Event_Discontinuation: '',
//     Combination_Therapy: '',
//   });

//   const [predictedCost, setPredictedCost] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setDrugData(prevData => ({ ...prevData, [name]: value }));
//   };

//   const handlePredict = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(drugData),
//       });
      
//       const data = await response.json();
//       if (response.ok) {
//         setPredictedCost(data.predicted_cost);
//       } else {
//         alert(data.error);
//       }
//     } catch (error) {
//       console.error('Error predicting drug price:', error);
//       alert('Failed to predict drug price.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <main className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto space-y-8">
//           <h1 className="text-3xl font-bold">Predict cost for New Drug</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {Object.keys(drugData).map((field) => (
//               <div key={field} className="space-y-2">
//                 <Label htmlFor={field}>{`Enter ${field.replace(/_/g, ' ')}`}</Label>
//                 <Input
//                   id={field}
//                   name={field}
//                   value={drugData[field]}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             ))}
//           </div>
//           <Button onClick={handlePredict} className="w-full" disabled={loading}>
//             {loading ? 'Predicting...' : 'Predict Cost'}
//           </Button>
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold">Predicted Cost for the New Drug</h2>
//             <Input value={predictedCost} readOnly />
//           </div>
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold">Comparative Drug Cost with the new drug</h2>
//             <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
//               <img
//                 src="/placeholder.svg"
//                 alt="Comparative Drug Cost Visualization"
//                 width={1200}
//                 height={675}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import Navbar from './Navbar';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function Predict() {
//   const [drugData, setDrugData] = useState({
//     Drug_Name: '',
//     disease: '',
//     Benefit_Assessment: '',
//     mortality: '',
//     morbidity: '',
//     quality_of_life: '',
//     Side_Effects: '',
//     Serious_Adverse_Events: '',
//     Total_Adverse_Events: '',
//     Adverse_Event_Discontinuation: '',
//     Combination_Therapy: '',
//   });

//   const [predictedCost, setPredictedCost] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setDrugData(prevData => ({ ...prevData, [name]: value }));
//   };

//   const handlePredict = async () => {
//     setLoading(true);

//     // Frontend validation for numeric fields
//     const numericFields = [
//       'mortality', 'morbidity', 'quality_of_life', 'Total_Adverse_Events', 'Adverse_Event_Discontinuation', 'Serious_Adverse_Events'
//     ];

//     for (let field of numericFields) {
//       if (isNaN(drugData[field])) {
//         alert(`${field.replace(/_/g, ' ')} must be a number`);
//         setLoading(false);
//         return;
//       }
//     }

//     try {
//       const response = await fetch('http://localhost:5000/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(drugData),
//       });
      
//       const data = await response.json();
//       if (response.ok) {
//         setPredictedCost(data.predicted_cost);
//       } else {
//         alert(data.error);
//       }
//     } catch (error) {
//       console.error('Error predicting drug price:', error);
//       alert('Failed to predict drug price.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <main className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto space-y-8">
//           <h1 className="text-3xl font-bold">Predict cost for New Drug</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {Object.keys(drugData).map((field) => (
//               <div key={field} className="space-y-2">
//                 <Label htmlFor={field}>{`Enter ${field.replace(/_/g, ' ')}`}</Label>
//                 <Input
//                   id={field}
//                   name={field}
//                   value={drugData[field]}
//                   onChange={handleInputChange}
//                   type={field === 'mortality' || field === 'morbidity' || field === 'quality_of_life' ||
//                         field === 'Total_Adverse_Events' || field === 'Adverse_Event_Discontinuation' ||
//                         field === 'Serious_Adverse_Events' ? 'number' : 'text'}  // Use 'number' type for numeric fields
//                 />
//               </div>
//             ))}
//           </div>
//           <Button onClick={handlePredict} className="w-full" disabled={loading}>
//             {loading ? 'Predicting...' : 'Predict Cost'}
//           </Button>
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold">Predicted Cost for the New Drug</h2>
//             <Input value={predictedCost} readOnly />
//           </div>
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold">Comparative Drug Cost with the new drug</h2>
//             <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
//               <img
//                 src="/placeholder.svg"
//                 alt="Comparative Drug Cost Visualization"
//                 width={1200}
//                 height={675}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Predict() {
  const [drugData, setDrugData] = useState({
    Drug_Name: '',
    disease: '',
    Benefit_Assessment: '',
    mortality: '',
    morbidity: '',
    quality_of_life: '',
    Side_Effects: '',
    Serious_Adverse_Events: '',
    Total_Adverse_Events: '',
    Adverse_Event_Discontinuation: '',
    Combination_Therapy: '',
  });

  const [predictedCost, setPredictedCost] = useState('');
  const [comparatorData, setComparatorData] = useState([]);  // Store comparator drug data for the chart
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDrugData(prevData => ({ ...prevData, [name]: value }));
  };

  const handlePredict = async () => {
    setLoading(true);

    // Frontend validation for numeric fields
    const numericFields = [
      'mortality', 'morbidity', 'quality_of_life', 'Total_Adverse_Events', 'Adverse_Event_Discontinuation', 'Serious_Adverse_Events'
    ];

    for (let field of numericFields) {
      if (isNaN(drugData[field])) {
        alert(`${field.replace(/_/g, ' ')} must be a number`);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch('http://184.72.153.100:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(drugData),
      });
      
      const data = await response.json();
      if (response.ok) {
        setPredictedCost(data.predicted_price);
        setComparatorData([
          ...data.comparator_prices.map((d) => ({ name: d.name, price: d.price })),
          { name: "Predicted New Drug", price: parseFloat(data.predicted_price.replace('₹', '').replace(',', '')) }
        ]);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error predicting drug price:', error);
      alert('Failed to predict drug price.');
    } finally {
      setLoading(false);
    }
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
                <Label htmlFor={field}>{`Enter ${field.replace(/_/g, ' ')}`}</Label>
                <Input
                  id={field}
                  name={field}
                  value={drugData[field]}
                  onChange={handleInputChange}
                  type={field === 'mortality' || field === 'morbidity' || field === 'quality_of_life' ||
                        field === 'Total_Adverse_Events' || field === 'Adverse_Event_Discontinuation' ||
                        field === 'Serious_Adverse_Events' ? 'number' : 'text'}  // Use 'number' type for numeric fields
                />
              </div>
            ))}
          </div>
          <Button onClick={handlePredict} className="w-full" disabled={loading}>
            {loading ? 'Predicting...' : 'Predict Cost'}
          </Button>

          {/* Display the predicted cost */}
          {predictedCost && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Predicted Cost for the New Drug</h2>
              <Input value={predictedCost} readOnly />
            </div>
          )}

          {/* Display the comparator drug prices chart */}
          {comparatorData.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Comparative Drug Costs</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparatorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="price" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
