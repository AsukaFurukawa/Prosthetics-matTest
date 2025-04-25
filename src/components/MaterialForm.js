import React, { useState } from 'react';

const MaterialForm = ({ onAddMaterial }) => {
  const [material, setMaterial] = useState({
    name: '',
    type: 'polymer',
    density: '',
    elasticity: '',
    tensileStrength: '',
    surfaceRoughness: '',
    waterAbsorption: '',
    thermalConductivity: '',
    hardness: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial({
      ...material,
      [name]: name === 'name' || name === 'type' ? value : parseFloat(value)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMaterial(material);
    // Reset form
    setMaterial({
      name: '',
      type: 'polymer',
      density: '',
      elasticity: '',
      tensileStrength: '',
      surfaceRoughness: '',
      waterAbsorption: '',
      thermalConductivity: '',
      hardness: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Material Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={material.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="type">Material Type:</label>
        <select
          id="type"
          name="type"
          value={material.type}
          onChange={handleChange}
          required
        >
          <option value="polymer">Polymer</option>
          <option value="metal">Metal</option>
          <option value="composite">Composite</option>
          <option value="ceramic">Ceramic</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="density">Density (g/cm³):</label>
        <input
          type="number"
          id="density"
          name="density"
          min="0"
          step="0.01"
          value={material.density}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="elasticity">Elasticity (MPa):</label>
        <input
          type="number"
          id="elasticity"
          name="elasticity"
          min="0"
          step="0.1"
          value={material.elasticity}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="tensileStrength">Tensile Strength (MPa):</label>
        <input
          type="number"
          id="tensileStrength"
          name="tensileStrength"
          min="0"
          step="0.1"
          value={material.tensileStrength}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="surfaceRoughness">Surface Roughness (μm):</label>
        <input
          type="number"
          id="surfaceRoughness"
          name="surfaceRoughness"
          min="0"
          step="0.01"
          value={material.surfaceRoughness}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="waterAbsorption">Water Absorption (%):</label>
        <input
          type="number"
          id="waterAbsorption"
          name="waterAbsorption"
          min="0"
          max="100"
          step="0.01"
          value={material.waterAbsorption}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="thermalConductivity">Thermal Conductivity (W/mK):</label>
        <input
          type="number"
          id="thermalConductivity"
          name="thermalConductivity"
          min="0"
          step="0.01"
          value={material.thermalConductivity}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="hardness">Hardness (Shore A):</label>
        <input
          type="number"
          id="hardness"
          name="hardness"
          min="0"
          max="100"
          step="0.1"
          value={material.hardness}
          onChange={handleChange}
          required
        />
      </div>
      
      <button type="submit">Add Material</button>
    </form>
  );
};

export default MaterialForm; 