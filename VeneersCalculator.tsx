"use client";

import React, { useState, useMemo } from "react";
import { Smile, MapPin, ExternalLink } from "lucide-react";

/**
 * Veneers Cost Calculator (Standalone Widget)
 * 
 * This component estimates the cost of porcelain or composite veneers:
 * - Material Selection (Porcelain vs Composite)
 * - Quantity of Teeth (1 to 20+)
 * - Geographic Regional Modifiers
 * 
 * Powered by FixmysmileAI (https://fixmysmile.ai)
 */
export default function VeneersCalculator() {
  const [zipCode, setZipCode] = useState("");
  const [count, setCount] = useState("6");
  const [material, setMaterial] = useState("porcelain");

  const BASE_PRICES = {
    composite: 600,
    porcelain: 1500,
  };

  const costs = useMemo(() => {
    let base = BASE_PRICES[material as keyof typeof BASE_PRICES] || 0;
    
    // Geo Modifier
    let geoMod = 1.0;
    if (zipCode.startsWith("9") || zipCode.startsWith("1")) geoMod = 1.25;
    if (zipCode.startsWith("3") || zipCode.startsWith("7")) geoMod = 0.9;

    const pricePerTooth = Math.round(base * geoMod);
    const total = pricePerTooth * parseInt(count);

    return {
      pricePerTooth,
      total,
      monthly: Math.round(total / 36) // Simple 36-month financing estimate
    };
  }, [material, count, zipCode]);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden font-sans text-gray-900 my-8">
      {/* Header */}
      <div className="bg-purple-600 p-6 text-white text-center">
        <div className="flex justify-center mb-2">
           <Smile className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold">Veneers Cost Estimator</h2>
        <p className="text-purple-100 text-xs mt-1 uppercase tracking-widest font-semibold">2025 Market Data</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Zip Code</label>
                <input 
                  type="text" 
                  placeholder="90210" 
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                  maxLength={5}
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g,''))}
                />
             </div>
             <div>
                <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Material</label>
                <select 
                  className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none cursor-pointer hover:bg-white transition-colors"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                >
                    <option value="composite">Composite Resin</option>
                    <option value="porcelain">Porcelain</option>
                </select>
             </div>
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-end">
                <label className="text-xs font-bold text-gray-400 uppercase">Number of Teeth</label>
                <span className="text-lg font-black text-purple-600">{count}</span>
             </div>
             <input 
               type="range" 
               min="1" 
               max="20" 
               value={count} 
               onChange={(e) => setCount(e.target.value)}
               className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
             />
             <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
                <span>1 Tooth</span>
                <span>Full Smile (20)</span>
             </div>
          </div>

          <div className="bg-gray-900 text-white rounded-2xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full"></div>
             
             <div className="flex justify-between items-center mb-6">
                <div>
                   <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-1">Total Est. Cost</p>
                   <div className="text-2xl font-black">
                      ${costs.total.toLocaleString()}
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-1">Per Month</p>
                   <div className="text-2xl font-black text-white leading-none">
                      ${costs.monthly}
                   </div>
                </div>
             </div>
             
             <a 
               href="https://fixmysmile.ai/cost-of-veneers-calculator?utm_source=github&utm_medium=open-source"
               target="_blank"
               rel="noopener noreferrer"
               className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform active:scale-95 text-sm"
             >
                Get Free Consultation <ExternalLink className="w-4 h-4" />
             </a>
          </div>

          <div className="text-center pt-2">
            <p className="text-[10px] text-gray-400">
              Tool provided by <a href="https://fixmysmile.ai" className="text-purple-600 font-bold hover:underline" target="_blank" rel="noopener">FixmysmileAI</a>
            </p>
          </div>
      </div>
    </div>
  );
}
