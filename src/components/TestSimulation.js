import React, { useState } from 'react';

const TestSimulation = ({ material, onRunTest }) => {
  const [testParams, setTestParams] = useState({
    stress: 10, // MPa
    temperature: 25, // °C
    cycles: 1000 // number of cycles
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestParams({
      ...testParams,
      [name]: parseFloat(value)
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onRunTest(testParams);
  };
  
  return (
    <div>
      <h3>Selected Material: {material.name}</h3>
      <div>
        <p><strong>Type:</strong> {material.type}</p>
        <p><strong>Density:</strong> {material.density} g/cm³</p>
        <p><strong>Elasticity:</strong> {material.elasticity} MPa</p>
        <p><strong>Tensile Strength:</strong> {material.tensileStrength} MPa</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <h4>Test Parameters</h4>
        
        <div>
          <label htmlFor="stress">Applied Stress (MPa):</label>
          <input
            type="range"
            id="stress"
            name="stress"
            min="1"
            max="50"
            step="1"
            value={testParams.stress}
            onChange={handleChange}
          />
          <span>{testParams.stress} MPa</span>
        </div>
        
        <div>
          <label htmlFor="temperature">Temperature (°C):</label>
          <input
            type="range"
            id="temperature"
            name="temperature"
            min="0"
            max="60"
            step="1"
            value={testParams.temperature}
            onChange={handleChange}
          />
          <span>{testParams.temperature} °C</span>
        </div>
        
        <div>
          <label htmlFor="cycles">Test Cycles:</label>
          <input
            type="range"
            id="cycles"
            name="cycles"
            min="100"
            max="10000"
            step="100"
            value={testParams.cycles}
            onChange={handleChange}
          />
          <span>{testParams.cycles} cycles</span>
        </div>
        
        <button type="submit">Run Simulation</button>
      </form>
    </div>
  );
};

export default TestSimulation; 