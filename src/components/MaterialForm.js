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
    hardness: '',
    pHCompatibility: '',
    cytotoxicity: '',
    allergenic: 'low',
    vaporPermeability: '',
    oxygenPermeability: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial({
      ...material,
      [name]: name === 'name' || name === 'type' || name === 'allergenic' ? value : parseFloat(value)
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
      hardness: '',
      pHCompatibility: '',
      cytotoxicity: '',
      allergenic: 'low',
      vaporPermeability: '',
      oxygenPermeability: ''
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
          <option value="silicone">Silicone</option>
          <option value="hydrogel">Hydrogel</option>
          <option value="other">Other</option>
        </select>
      </div>

      <h4>Mechanical Properties</h4>
      
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

      <h4>Surface Properties</h4>
      
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
      
      <h4>Environmental Interaction</h4>
      
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

      <h4>Biocompatibility Properties</h4>
      
      <div>
        <label htmlFor="pHCompatibility">pH Compatibility (4-9):</label>
        <input
          type="number"
          id="pHCompatibility"
          name="pHCompatibility"
          min="4"
          max="9"
          step="0.1"
          value={material.pHCompatibility}
          onChange={handleChange}
          required
          title="Human skin pH ranges from 4.5-6.5, higher values may cause irritation"
        />
      </div>
      
      <div>
        <label htmlFor="cytotoxicity">Cytotoxicity Index (0-100):</label>
        <input
          type="number"
          id="cytotoxicity"
          name="cytotoxicity"
          min="0"
          max="100"
          step="0.1"
          value={material.cytotoxicity}
          onChange={handleChange}
          required
          title="Lower values indicate less cell toxicity. Values below 30 are generally considered safe."
        />
      </div>
      
      <div>
        <label htmlFor="allergenic">Allergenic Potential:</label>
        <select
          id="allergenic"
          name="allergenic"
          value={material.allergenic}
          onChange={handleChange}
          required
        >
          <option value="negligible">Negligible</option>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="vaporPermeability">Vapor Permeability (g/m²/24h):</label>
        <input
          type="number"
          id="vaporPermeability"
          name="vaporPermeability"
          min="0"
          step="0.1"
          value={material.vaporPermeability}
          onChange={handleChange}
          required
          title="Higher values allow more water vapor to pass through. Human skin needs >500 g/m²/24h."
        />
      </div>
      
      <div>
        <label htmlFor="oxygenPermeability">Oxygen Permeability (cm³/m²/24h):</label>
        <input
          type="number"
          id="oxygenPermeability"
          name="oxygenPermeability"
          min="0"
          step="0.1"
          value={material.oxygenPermeability}
          onChange={handleChange}
          required
          title="Higher values allow more oxygen to reach the skin."
        />
      </div>
      
      <button type="submit">Add Material</button>
    </form>
  );
};

export default MaterialForm; 