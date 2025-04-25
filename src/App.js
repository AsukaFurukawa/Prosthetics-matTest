import React, { useState } from 'react';
import MaterialDatabase from './components/MaterialDatabase';
import MaterialForm from './components/MaterialForm';
import TestSimulation from './components/TestSimulation';
import ResultsDisplay from './components/ResultsDisplay';
import './App.css';

function App() {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [testResults, setTestResults] = useState(null);

  const addMaterial = (material) => {
    setMaterials([...materials, { ...material, id: Date.now() }]);
  };

  const runTest = (testParams) => {
    if (!selectedMaterial) return;
    
    // Simplified simulation logic for prototype
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
        temperatureResponse: calculateTemperature(selectedMaterial, testParams.temperature)
      },
      durabilityTest: {
        wearResistance: calculateWear(selectedMaterial, testParams.cycles),
        fatigueResistance: calculateFatigue(selectedMaterial, testParams.cycles)
      }
    };
    
    setTestResults(results);
  };

  // Simplified calculation functions
  const calculateDeformation = (material, stress) => {
    return (material.elasticity * stress) / (material.density * 10);
  };
  
  const calculateRecovery = (material, stress) => {
    return material.elasticity / (stress * 0.8);
  };
  
  const calculateBreakingPoint = (material) => {
    return material.tensileStrength * 0.9;
  };
  
  const calculateFriction = (material) => {
    return material.surfaceRoughness * 0.7;
  };
  
  const calculateMoisture = (material) => {
    return material.waterAbsorption * 1.2;
  };
  
  const calculateTemperature = (material, temperature) => {
    return material.thermalConductivity * temperature * 0.5;
  };
  
  const calculateWear = (material, cycles) => {
    return material.hardness / (cycles * 0.01);
  };
  
  const calculateFatigue = (material, cycles) => {
    return material.tensileStrength / (cycles * 0.005);
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
            <ResultsDisplay results={testResults} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 