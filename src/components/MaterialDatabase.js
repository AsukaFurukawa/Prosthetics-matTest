import React from 'react';

const MaterialDatabase = ({ materials, onSelectMaterial, selectedMaterial }) => {
  if (materials.length === 0) {
    return <p>No materials in database. Add a material to get started.</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Density (g/cm³)</th>
            <th>Elasticity (MPa)</th>
          </tr>
        </thead>
        <tbody>
          {materials.map(material => (
            <tr 
              key={material.id} 
              onClick={() => onSelectMaterial(material)}
              className={selectedMaterial && selectedMaterial.id === material.id ? 'selected-row' : ''}
            >
              <td>{material.name}</td>
              <td>{material.type}</td>
              <td>{material.density}</td>
              <td>{material.elasticity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialDatabase; 