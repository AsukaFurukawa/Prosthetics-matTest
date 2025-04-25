import React, { useState } from 'react';

const TestSimulation = ({ material, onRunTest }) => {
  const [testParams, setTestParams] = useState({
    stress: 10, // MPa
    temperature: 25, // °C
    cycles: 1000, // number of cycles
    humidity: 50, // % relative humidity
    wearTime: 12, // hours per day
    skinType: 'normal' // skin type for testing
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestParams({
      ...testParams,
      [name]: name === 'skinType' ? value : parseFloat(value)
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onRunTest(testParams);
  };
  
  return (
    <div>
      <h3>Selected Material: {material.name}</h3>
      <div className="material-properties">
        <div className="property-group">
          <h4>Mechanical Properties</h4>
          <p><strong>Type:</strong> {material.type}</p>
          <p><strong>Density:</strong> {material.density} g/cm³</p>
          <p><strong>Elasticity:</strong> {material.elasticity} MPa</p>
          <p><strong>Tensile Strength:</strong> {material.tensileStrength} MPa</p>
          <p><strong>Hardness:</strong> {material.hardness} Shore A</p>
        </div>
        
        <div className="property-group">
          <h4>Biocompatibility</h4>
          <p><strong>pH Compatibility:</strong> {material.pHCompatibility}</p>
          <p><strong>Cytotoxicity:</strong> {material.cytotoxicity}</p>
          <p><strong>Allergenic Potential:</strong> {material.allergenic}</p>
          <p><strong>Vapor Permeability:</strong> {material.vaporPermeability} g/m²/24h</p>
          <p><strong>Oxygen Permeability:</strong> {material.oxygenPermeability} cm³/m²/24h</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <h4>Test Parameters</h4>
        
        <div className="parameter-group">
          <h5>Mechanical Test Parameters</h5>
          <div className="parameter">
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
          
          <div className="parameter">
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
        </div>
        
        <div className="parameter-group">
          <h5>Environmental Parameters</h5>
          <div className="parameter">
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
          
          <div className="parameter">
            <label htmlFor="humidity">Relative Humidity (%):</label>
            <input
              type="range"
              id="humidity"
              name="humidity"
              min="20"
              max="90"
              step="1"
              value={testParams.humidity}
              onChange={handleChange}
            />
            <span>{testParams.humidity}%</span>
          </div>
        </div>
        
        <div className="parameter-group">
          <h5>Usage Parameters</h5>
          <div className="parameter">
            <label htmlFor="wearTime">Daily Wear Time (hours):</label>
            <input
              type="range"
              id="wearTime"
              name="wearTime"
              min="1"
              max="24"
              step="1"
              value={testParams.wearTime}
              onChange={handleChange}
            />
            <span>{testParams.wearTime} hours</span>
          </div>
          
          <div className="parameter">
            <label htmlFor="skinType">Test Skin Type:</label>
            <select
              id="skinType"
              name="skinType"
              value={testParams.skinType}
              onChange={handleChange}
            >
              <option value="dry">Dry Skin</option>
              <option value="normal">Normal Skin</option>
              <option value="oily">Oily Skin</option>
              <option value="sensitive">Sensitive Skin</option>
            </select>
          </div>
        </div>
        
        <button type="submit">Run Simulation</button>
      </form>
    </div>
  );
};

export default TestSimulation; 