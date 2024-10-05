// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import '../data/drug_names.json'

// export default function Visualize() {
//   const [drugName, setDrugName] = useState('')

//   return (
//     <div className="min-h-screen bg-white">
//       <header className="border-b">
//         <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
//           <div className="flex space-x-2">
//             <Button variant="ghost">Home</Button>
//             <Button variant="ghost">Visualize</Button>
//             <Button variant="ghost">Predict</Button>
//           </div>
//           <Button variant="ghost">Log Out</Button>
//         </nav>
//       </header>
//       <main className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto space-y-8">
//           <h1 className="text-3xl font-bold">Predict & Visualize Cost trend for Drug</h1>
//           <div className="flex items-center space-x-2">
//             <Input
//               type="text"
//               placeholder="Enter Drug Name"
//               value={drugName}
//               onChange={(e) => setDrugName(e.target.value)}
//               className="flex-grow"
//             />
//             <Button type="submit" className="shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-4 h-4"
//               >
//                 <circle cx="11" cy="11" r="8" />
//                 <path d="m21 21-4.3-4.3" />
//               </svg>
//               <span className="sr-only">Search</span>
//             </Button>
//           </div>
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold">Predicted Cost</h2>
//             <p className="text-sm text-gray-500">
//               Predicted cost for Drug {drugName || '[Drug Name]'} for 10 years from the latest patent date
//             </p>
//             <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
//               <Image
//                 src="/placeholder.svg"
//                 alt="Cost Trend Visualization"
//                 width={1200}
//                 height={675}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

"use client";

import { useState } from "react";
import Select from "react-select";
import drugNamesData from "@/data/drug_names.json"; // Adjust the path to your JSON file
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";

const drugOptions = drugNamesData.drug_names.map((drug) => ({
  label: drug,
  value: drug,
}));

export default function Visualize() {
  const [selectedDrug, setSelectedDrug] = useState(null);

  const handleDrugChange = (selectedOption) => {
    setSelectedDrug(selectedOption);
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
          </div>
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            {/* <Image
              src="/placeholder.svg"
              alt="Cost Trend Visualization"
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            /> */}

            <img
              src="/placeholder.svg"
              alt="Cost Trend Visualization"
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
