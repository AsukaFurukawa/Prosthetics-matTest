import React, { useState } from 'react';
import MaterialDatabase from './components/MaterialDatabase';
import MaterialForm from './components/MaterialForm';
import TestSimulation from './components/TestSimulation';
import ResultsDisplay from './components/ResultsDisplay';
import SkinCompatibilityDetails from './components/SkinCompatibilityDetails';
import './App.css';

function App() {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [showSkinDetails, setShowSkinDetails] = useState(false);

  const addMaterial = (material) => {
    setMaterials([...materials, { ...material, id: Date.now() }]);
  };

  const runTest = (testParams) => {
    if (!selectedMaterial) return;
    
    // Enhanced simulation logic for prototype
    const results = {
      materialId: selectedMaterial.id,
      materialName: selectedMaterial.name,
      timestamp: new Date().toISOString(),
      stressTest: {
        maxDeformation: calculateDeformation(selectedMaterial, testParams.stress),
        recoveryRate: calculateRecovery(selectedMaterial, testParams.stress),
        breakingPoint: calculateBreakingPoint(selectedMaterial)
      },
      skinCompatibility: {
        frictionCoefficient: calculateFriction(selectedMaterial),
        moistureRetention: calculateMoisture(selectedMaterial),
        temperatureResponse: calculateTemperature(selectedMaterial, testParams.temperature),
        
        // New skin compatibility metrics
        pHCompatibilityScore: calculatePHCompatibility(selectedMaterial),
        cytotoxicityRisk: calculateCytotoxicity(selectedMaterial),
        allergenicRisk: calculateAllergenicRisk(selectedMaterial),
        breathabilityScore: calculateBreathability(selectedMaterial, testParams.humidity),
        maceration: calculateMaceration(selectedMaterial, testParams.wearTime)
      },
      durabilityTest: {
        wearResistance: calculateWear(selectedMaterial, testParams.cycles),
        fatigueResistance: calculateFatigue(selectedMaterial, testParams.cycles)
      },
      overallScores: {
        mechPerformance: 0, // Will be calculated below
        skinCompatibility: 0, // Will be calculated below
        durability: 0 // Will be calculated below
      }
    };
    
    // Calculate overall scores
    results.overallScores.mechPerformance = (
      results.stressTest.recoveryRate / 10 + 
      (results.stressTest.breakingPoint / 100) * 0.6 + 
      (10 - results.stressTest.maxDeformation / 5) * 0.4
    ) / 2;
    
    results.overallScores.skinCompatibility = (
      (10 - Math.min(results.skinCompatibility.frictionCoefficient * 10, 10)) * 0.15 + 
      (10 - Math.min(results.skinCompatibility.moistureRetention / 2, 10)) * 0.1 +
      (10 - Math.min(Math.abs(results.skinCompatibility.temperatureResponse - 30) / 3, 10)) * 0.15 +
      results.skinCompatibility.pHCompatibilityScore * 0.2 +
      (10 - results.skinCompatibility.cytotoxicityRisk) * 0.15 +
      (10 - results.skinCompatibility.allergenicRisk) * 0.15 +
      results.skinCompatibility.breathabilityScore * 0.1
    );
    
    results.overallScores.durability = (
      results.durabilityTest.wearResistance / 10 +
      results.durabilityTest.fatigueResistance / 100
    ) / 2;
    
    setTestResults(results);
  };

  // Mechanical property calculations
  const calculateDeformation = (material, stress) => {
    return (material.elasticity * stress) / (material.density * 10);
  };
  
  const calculateRecovery = (material, stress) => {
    return material.elasticity / (stress * 0.8);
  };
  
  const calculateBreakingPoint = (material) => {
    return material.tensileStrength * 0.9;
  };
  
  // Original skin compatibility calculations
  const calculateFriction = (material) => {
    // Improved to consider hardness and surface roughness
    return (material.surfaceRoughness * 0.5) + (material.hardness * 0.003);
  };
  
  const calculateMoisture = (material) => {
    return material.waterAbsorption * 1.2;
  };
  
  const calculateTemperature = (material, temperature) => {
    return material.thermalConductivity * temperature * 0.5;
  };
  
  // New skin compatibility calculations
  const calculatePHCompatibility = (material) => {
    // Ideal pH for skin is 5.5, scoring decreases as it moves away
    const optimalPH = 5.5;
    const deviation = Math.abs(material.pHCompatibility - optimalPH);
    // Score from 0-10 with 10 being perfect
    return Math.max(0, 10 - (deviation * 2));
  };
  
  const calculateCytotoxicity = (material) => {
    // Convert cytotoxicity index to a risk score (0-10)
    // Higher value means higher risk
    return material.cytotoxicity / 10;
  };
  
  const calculateAllergenicRisk = (material) => {
    // Convert allergenic potential to a numerical risk score (0-10)
    switch(material.allergenic) {
      case 'negligible': return 0;
      case 'low': return 2.5;
      case 'moderate': return 6;
      case 'high': return 10;
      default: return 5;
    }
  };
  
  const calculateBreathability = (material, humidity) => {
    // Calculate breathability score (0-10) based on vapor and oxygen permeability
    // Adjust for ambient humidity
    const humidityFactor = humidity / 50; // normalize to a 0-2 range for 0-100% humidity
    const vaporScore = Math.min(material.vaporPermeability / 100, 10) * humidityFactor;
    const oxygenScore = Math.min(material.oxygenPermeability / 100, 10);
    
    return (vaporScore * 0.6) + (oxygenScore * 0.4);
  };
  
  const calculateMaceration = (material, wearTime) => {
    // Calculate skin maceration risk based on vapor permeability and wear time
    // Higher value means higher risk
    const baseRisk = (10 - Math.min(material.vaporPermeability / 100, 10)) * 0.7;
    const timeMultiplier = Math.min(wearTime / 8, 3); // normalize with diminishing returns above 8h
    
    return baseRisk * timeMultiplier;
  };
  
  // Durability calculations
  const calculateWear = (material, cycles) => {
    return material.hardness / (cycles * 0.01);
  };
  
  const calculateFatigue = (material, cycles) => {
    return material.tensileStrength / (cycles * 0.005);
  };

  const toggleSkinDetails = () => {
    setShowSkinDetails(!showSkinDetails);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Prosthetics Material Testing Platform</h1>
      </header>
      <div className="container">
        <div className="grid">
          <div className="card">
            <h2>Material Database</h2>
            <MaterialDatabase 
              materials={materials} 
              onSelectMaterial={setSelectedMaterial} 
              selectedMaterial={selectedMaterial}
            />
          </div>
          <div className="card">
            <h2>Add New Material</h2>
            <MaterialForm onAddMaterial={addMaterial} />
          </div>
        </div>
        
        {selectedMaterial && (
          <div className="card">
            <h2>Test Simulation</h2>
            <TestSimulation 
              material={selectedMaterial} 
              onRunTest={runTest} 
            />
          </div>
        )}
        
        {testResults && (
          <div className="card">
            <h2>Test Results</h2>
            <ResultsDisplay 
              results={testResults}
              onToggleSkinDetails={toggleSkinDetails} 
            />
            
            {showSkinDetails && (
              <SkinCompatibilityDetails 
                results={testResults.skinCompatibility} 
                material={selectedMaterial}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 