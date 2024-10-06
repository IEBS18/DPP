// "use client";

// import { useState } from "react";
// import Select from "react-select";
// import drugNamesData from "@/data/drug_names.json"; // Adjust the path to your JSON file
// import Navbar from "./Navbar";
// import { Button } from "@/components/ui/button"; // Import Button from ShadCN

// const drugOptions = drugNamesData.drug_names.map((drug) => ({
//   label: drug,
//   value: drug,
// }));

// export default function Visualize() {
//   const [selectedDrug, setSelectedDrug] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [visualizationResult, setVisualizationResult] = useState('');

//   const handleDrugChange = (selectedOption) => {
//     setSelectedDrug(selectedOption);
//   };

//   const handleVisualize = async () => {
//     if (!selectedDrug) {
//       alert("Please select a drug to visualize!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/visualize', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ drug_name: selectedDrug.value }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setVisualizationResult(`Visualization for ${selectedDrug.label} completed successfully.`);
//       } else {
//         alert(data.error);
//       }
//     } catch (error) {
//       console.error('Error visualizing drug:', error);
//       alert('Failed to visualize drug.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <main className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto space-y-8">
//           <h1 className="text-3xl font-bold">
//             Predict & Visualize Cost trend for Drug
//           </h1>
//           <div className="space-y-4">
//             <Select
//               options={drugOptions}
//               value={selectedDrug}
//               onChange={handleDrugChange}
//               placeholder="Select a Drug"
//               className="flex-grow"
//             />
//             <p className="text-sm text-gray-500">
//               Predicted cost for Drug {selectedDrug?.label || "[Drug Name]"} for
//               10 years from the latest patent date
//             </p>

//             {/* Visualize Button */}
//             <Button onClick={handleVisualize} className="w-full py-4 text-lg" disabled={loading}>
//               {loading ? 'Visualizing...' : 'Visualize'}
//             </Button>

//             {visualizationResult && (
//               <p className="mt-4 text-green-600">{visualizationResult}</p>
//             )}
//           </div>
//           <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
//             <img
//               src="/placeholder.svg"
//               alt="Cost Trend Visualization"
//               width={1200}
//               height={675}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import Select from "react-select";
// import drugNamesData from "@/data/drug_names.json"; // Adjust the path to your JSON file
// import Navbar from "./Navbar";
// import { Button } from "@/components/ui/button"; // Import Button from ShadCN

// const drugOptions = drugNamesData.drug_names.map((drug) => ({
//   label: drug,
//   value: drug,
// }));

// export default function Visualize() {
//   const [selectedDrug, setSelectedDrug] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [visualizationResult, setVisualizationResult] = useState('');
//   const [imageSrc, setImageSrc] = useState(null);  // State to hold the image

//   const handleDrugChange = (selectedOption) => {
//     setSelectedDrug(selectedOption);
//   };

//   const handleVisualize = async () => {
//     if (!selectedDrug) {
//       alert("Please select a drug to visualize!");
//       return;
//     }

//     setLoading(true);
//     setImageSrc(null);  // Clear the previous image
//     try {
//       const response = await fetch('http://localhost:5000/visualize', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ drug_name: selectedDrug.value }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setVisualizationResult(`Visualization for ${selectedDrug.label} completed successfully.`);
//         setImageSrc(`data:image/png;base64,${data.image}`);  // Set the image from the base64 string
//       } else {
//         alert(data.error);
//       }
//     } catch (error) {
//       console.error('Error visualizing drug:', error);
//       alert('Failed to visualize drug.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <main className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto space-y-8">
//           <h1 className="text-3xl font-bold">
//             Predict & Visualize Cost trend for Drug
//           </h1>
//           <div className="space-y-4">
//             <Select
//               options={drugOptions}
//               value={selectedDrug}
//               onChange={handleDrugChange}
//               placeholder="Select a Drug"
//               className="flex-grow"
//             />
//             <p className="text-sm text-gray-500">
//               Predicted cost for Drug {selectedDrug?.label || "[Drug Name]"} for
//               10 years from the latest patent date
//             </p>

//             {/* Visualize Button */}
//             <Button onClick={handleVisualize} className="w-full py-4 text-lg" disabled={loading}>
//               {loading ? 'Visualizing...' : 'Visualize'}
//             </Button>

//             {visualizationResult && (
//               <p className="mt-4 text-green-600">{visualizationResult}</p>
//             )}

//             {/* Display the image if available */}
//             {imageSrc && (
//               <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
//                 <img
//                   src={imageSrc}
//                   alt="Cost Trend Visualization"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Select from "react-select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import drugNamesData from "@/data/drug_names.json"; // Adjust the path to your JSON file
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button"; // Import Button from ShadCN

const drugOptions = drugNamesData.drug_names.map((drug) => ({
  label: drug,
  value: drug,
}));

export default function Visualize() {
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [loading, setLoading] = useState(false);
  const [historicalData, setHistoricalData] = useState([]);
  const [projectedData, setProjectedData] = useState([]);
  const [patentExpiryYear, setPatentExpiryYear] = useState(null);
  const [graphUrl, setGraphUrl] = useState('');

  const handleDrugChange = (selectedOption) => {
    setSelectedDrug(selectedOption);
  };

  const handleVisualize = async () => {
    if (!selectedDrug) {
      alert("Please select a drug to visualize!");
      return;
    }

    setLoading(true);
    setHistoricalData([]); // Clear previous data
    setProjectedData([]);
    setPatentExpiryYear(null);

    try {
      const response = await fetch("http://44.202.59.255:5000/visualize", {
      // const response = await fetch("http://localhost:5000/visualize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ drug_name: selectedDrug.value }),
      });

      const blob = await response.blob(); // Get the response as a blob

      if (response.ok) {
        // setHistoricalData(data.data.historical_data);
        // setProjectedData(data.data.projected_data);
        // setPatentExpiryYear(data.data.patent_expiry_year);
        const imageUrl = URL.createObjectURL(blob); // Create a URL for the image blob
        setGraphUrl(imageUrl);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error visualizing drug:", error);
      alert("Failed to visualize drug.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold">
            Predict & Visualize Cost trend for Drug
          </h1>
          <div className="space-y-4">
            <Select
              options={drugOptions}
              value={selectedDrug}
              onChange={handleDrugChange}
              placeholder="Select a Drug"
              className="flex-grow"
            />
            <p className="text-sm text-gray-500">
              Predicted cost for Drug {selectedDrug?.label || "[Drug Name]"} for
              10 years from the latest patent date
            </p>

            {/* Visualize Button */}
            <Button
              onClick={handleVisualize}
              className="w-full py-4 text-lg"
              disabled={loading}
            >
              {loading ? "Visualizing..." : "Visualize"}
            </Button>
            {graphUrl && (
              <div>
                {/* <h3>Graph for {drugName}:</h3> */}
                <img src={graphUrl} alt={`Graph for ${selectedDrug}`} />
              </div>
            )}
            {/* Display the chart if data is available */}
            {/* {(historicalData.length > 0 || projectedData.length > 0) && (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {/* Historical Data */}
            {/* <Line
                    type="monotone"
                    data={historicalData}
                    dataKey="cost"
                    stroke="#1f77b4" // Darker blue color
                    strokeWidth={3} // Increase the width for a bolder line
                    name="Historical Costs"
                    activeDot={{ r: 8 }}
                  /> */}
            {/* Projected Data */}
            {/* <Line
                    type="monotone"
                    data={projectedData}
                    dataKey="cost"
                    stroke="#ff7f0e" // Darker orange color
                    strokeWidth={3} // Increase the width for a bolder line
                    strokeDasharray="5 5"
                    name="Projected Costs"
                  />
                </LineChart>
              </ResponsiveContainer>
            )} */}
          </div>
        </div>
      </main>
    </div>
  );
}
