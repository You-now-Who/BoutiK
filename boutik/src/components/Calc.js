import React, { useState } from "react";

const Calc = () => {
  const [material, setMaterial] = useState("");
  const [productionProcess, setProductionProcess] = useState("");
  const [transportation, setTransportation] = useState("");
  const [endOfLifeOptions, setEndOfLifeOptions] = useState("");
  const [sustainabilityScore, setSustainabilityScore] = useState(0);

  const handleCalculate = () => {
    // Calculate the sustainability score based on the inputs
    const materialScore = material === "organic" ? 10 : 5;
    const productionProcessScore =
      productionProcess === "low-impact" ? 10 : 5;
    const transportationScore =
      transportation === "local" ? 10 : transportation === "regional" ? 8 : 5;
    const endOfLifeOptionsScore =
      endOfLifeOptions === "recyclable" ? 10 : endOfLifeOptions === "compostable" ? 8 : 5;
    const totalScore =
      (materialScore + productionProcessScore + transportationScore + endOfLifeOptionsScore) / 4;

    setSustainabilityScore(totalScore);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-xl font-bold mb-4">Sustainability Calculator</h2>
      <div className="flex flex-col w-full">
        <label className="text-sm font-medium mb-2">Material:</label>
        <select
          className="border border-gray-400 p-2 rounded-md mb-4"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="organic">Organic</option>
          <option value="conventional">Conventional</option>
        </select>
      </div>
      <div className="flex flex-col w-full">
        <label className="text-sm font-medium mb-2">Production Process:</label>
        <select
          className="border border-gray-400 p-2 rounded-md mb-4"
          value={productionProcess}
          onChange={(e) => setProductionProcess(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="low-impact">Low-impact</option>
          <option value="high-impact">High-impact</option>
        </select>
      </div>
      <div className="flex flex-col w-full">
        <label className="text-sm font-medium mb-2">Transportation:</label>
        <select
          className="border border-gray-400 p-2 rounded-md mb-4"
          value={transportation}
          onChange={(e) => setTransportation(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="local">Local</option>
          <option value="regional">Regional</option>
          <option value="international">International</option>
        </select>
      </div>
      <div className="flex flex-col w-full">
        <label className="text-sm font-medium mb-2">End-of-life options:</label>
        <select
          className="border border-gray-400 p-2 rounded-md mb-4"
          value={endOfLifeOptions}
          onChange={(e) => setEndOfLifeOptions(e.target.value)}
        >
            <option value="">Select an option</option>
            <option value="recyclable">Recyclable</option>
            <option value="compostable">Compostable</option>
            <option value="landfill">Landfill</option>
        </select>
        </div>
        <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={handleCalculate}
        >
            Calculate
        </button>
        <div className="mt-4">
            <h3 className="text-lg font-bold">Sustainability Score:</h3>
            <p>{sustainabilityScore}</p>
        </div>
    </div>
    );
};

export default Calc;