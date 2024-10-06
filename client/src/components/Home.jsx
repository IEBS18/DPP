import { Button } from "@/components/ui/button";
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import pic from '../assets/pic.webp'
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={pic}
              alt="Drug Price Predictor"
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">What can you do with Drug Price Predictor</h1>
            <p className="text-gray-600">
              Drug Predictor empowers data-driven decision making in the pharmaceutical market. 
              Designed for professionals in life sciences, pharmacy, and health economics, Drug Predictor 
              simplifies the complex landscape of drug data, helping you unlock insights for strategic impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/visualize">
              <Button className="w-full py-8 text-lg" variant="outline">
                Visualize Drug Data and Cost
                <span className="ml-2 text-2xl">→</span>
              </Button>
            </Link>
            <Link to="/predict">
              <Button className="w-full py-8 text-lg" variant="outline">
                Predict Drug Cost
                <span className="ml-2 text-2xl">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
