import React from 'react';

const SkinCompatibilityDetails = ({ results, material }) => {
  // Helper function to get color based on score (0-10)
  // Red (poor) to Yellow (moderate) to Green (good)
  const getScoreColor = (score, inverse = false) => {
    const adjustedScore = inverse ? 10 - score : score;
    if (adjustedScore >= 8) return '#4caf50'; // Good - Green
    if (adjustedScore >= 5) return '#ff9800'; // Moderate - Orange
    return '#f44336'; // Poor - Red
  };
  
  // Helper function to interpret scores with text
  const interpretScore = (score, inverse = false) => {
    const adjustedScore = inverse ? 10 - score : score;
    if (adjustedScore >= 8) return 'Excellent';
    if (adjustedScore >= 6) return 'Good';
    if (adjustedScore >= 4) return 'Moderate';
    if (adjustedScore >= 2) return 'Poor';
    return 'Very Poor';
  };
  
  // Clinical recommendations based on results
  const generateRecommendations = () => {
    const recommendations = [];
    
    // pH compatibility recommendation
    if (results.pHCompatibilityScore < 6) {
      recommendations.push('Consider pH buffering coatings to improve skin compatibility.');
    }
    
    // Friction recommendations
    if (results.frictionCoefficient > 0.5) {
      recommendations.push('High friction detected. Consider surface treatments or lubricants to reduce friction against skin.');
    }
    
    // Moisture recommendations
    if (results.moistureRetention > 5) {
      recommendations.push('High moisture retention may lead to skin maceration. Consider more breathable material options or adding ventilation.');
    }
    
    // Cytotoxicity recommendations
    if (results.cytotoxicityRisk > 3) {
      recommendations.push('Elevated cytotoxicity risk. Consider biocompatible coatings or alternative materials with lower cytotoxicity.');
    }
    
    // Allergenic potential recommendations
    if (results.allergenicRisk > 5) {
      recommendations.push('Significant allergenic potential. Consider hypoallergenic materials or barrier layers between material and skin.');
    }
    
    // Breathability recommendations
    if (results.breathabilityScore < 5) {
      recommendations.push('Poor breathability. Consider perforations, mesh structures, or more vapor-permeable materials to improve air and moisture exchange.');
    }
    
    if (results.maceration > 6) {
      recommendations.push('High risk of skin maceration with prolonged use. Recommend limited continuous wear time or improved moisture management.');
    }
    
    // If everything looks good
    if (recommendations.length === 0) {
      recommendations.push('Material shows excellent skin compatibility characteristics. No specific modifications needed.');
    }
    
    return recommendations;
  };
  
  const recommendations = generateRecommendations();

  return (
    <div className="skin-compatibility-details">
      <h3>Detailed Skin Compatibility Analysis</h3>
      
      <div className="biocompatibility-scores">
        <div className="score-grid">
          <div className="score-item">
            <h4>pH Compatibility</h4>
            <div 
              className="score-indicator" 
              style={{ backgroundColor: getScoreColor(results.pHCompatibilityScore) }}
            >
              {results.pHCompatibilityScore.toFixed(1)}/10
            </div>
            <p>Material pH: {material.pHCompatibility} (ideal human skin pH: 4.5-6.5)</p>
            <p><strong>Assessment:</strong> {interpretScore(results.pHCompatibilityScore)}</p>
          </div>
          
          <div className="score-item">
            <h4>Cytotoxicity Risk</h4>
            <div 
              className="score-indicator" 
              style={{ backgroundColor: getScoreColor(results.cytotoxicityRisk, true) }}
            >
              {results.cytotoxicityRisk.toFixed(1)}/10
            </div>
            <p>Based on cytotoxicity index of {material.cytotoxicity}</p>
            <p><strong>Assessment:</strong> {interpretScore(results.cytotoxicityRisk, true)} risk level</p>
          </div>
          
          <div className="score-item">
            <h4>Allergenic Potential</h4>
            <div 
              className="score-indicator" 
              style={{ backgroundColor: getScoreColor(results.allergenicRisk, true) }}
            >
              {results.allergenicRisk.toFixed(1)}/10
            </div>
            <p>Category: {material.allergenic}</p>
            <p><strong>Assessment:</strong> {interpretScore(results.allergenicRisk, true)} allergenic risk</p>
          </div>
          
          <div className="score-item">
            <h4>Friction Properties</h4>
            <div 
              className="score-indicator" 
              style={{ backgroundColor: getScoreColor(10 - results.frictionCoefficient * 5) }}
            >
              {results.frictionCoefficient.toFixed(2)}
            </div>
            <p>Based on surface roughness of {material.surfaceRoughness} μm</p>
            <p><strong>Assessment:</strong> {results.frictionCoefficient < 0.4 ? 'Low' : (results.frictionCoefficient < 0.7 ? 'Moderate' : 'High')} friction against skin</p>
          </div>
        </div>
        
        <div className="score-grid">
          <div className="score-item">
            <h4>Breathability Score</h4>
            <div 
              className="score-indicator" 
              style={{ backgroundColor: getScoreColor(results.breathabilityScore) }}
            >
              {results.breathabilityScore.toFixed(1)}/10
            </div>
            <p>Vapor: {material.vaporPermeability} g/m²/24h | Oxygen: {material.oxygenPermeability} cm³/m²/24h</p>
            <p><strong>Assessment:</strong> {interpretScore(results.breathabilityScore)}</p>
          </div>
          
          <div className="score-item">
            <h4>Moisture Management</h4>
            <div 
              className="score-indicator" 
              style={{ backgroundColor: getScoreColor(10 - results.moistureRetention / 2) }}
            >
              {results.moistureRetention.toFixed(1)}%
            </div>
            <p>Water absorption: {material.waterAbsorption}%</p>
            <p><strong>Assessment:</strong> {results.moistureRetention < 3 ? 'Low' : (results.moistureRetention < 7 ? 'Moderate' : 'High')} moisture retention</p>
          </div>
          
          <div className="score-item">
            <h4>Temperature Regulation</h4>
            <div 
              className="score-indicator" 
              style={{ backgroundColor: getScoreColor(10 - Math.abs(results.temperatureResponse - 30) / 3) }}
            >
              {results.temperatureResponse.toFixed(1)} K
            </div>
            <p>Thermal conductivity: {material.thermalConductivity} W/mK</p>
            <p><strong>Assessment:</strong> {Math.abs(results.temperatureResponse - 30) < 10 ? 'Good' : 'Poor'} thermal comfort</p>
          </div>
          
          <div className="score-item">
            <h4>Maceration Risk</h4>
            <div 
              className="score-indicator" 
              style={{ backgroundColor: getScoreColor(10 - results.maceration) }}
            >
              {results.maceration.toFixed(1)}/10
            </div>
            <p>Based on breathability and wear time</p>
            <p><strong>Assessment:</strong> {results.maceration < 3 ? 'Low' : (results.maceration < 6 ? 'Moderate' : 'High')} risk of skin maceration</p>
          </div>
        </div>
      </div>
      
      <div className="clinical-recommendations">
        <h4>Clinical Recommendations</h4>
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
      
      <div className="methodology">
        <h4>Methodology Notes</h4>
        <p>This analysis applies standardized biocompatibility assessment protocols adapted from ISO 10993 (Biological evaluation of medical devices) and custom skin-material interaction models. All evaluations are approximations based on material properties and should be validated with clinical testing.</p>
      </div>
    </div>
  );
};

export default SkinCompatibilityDetails; 