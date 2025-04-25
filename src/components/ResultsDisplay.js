import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

const ResultsDisplay = ({ results, onToggleSkinDetails }) => {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Prepare data for summary chart
  const summaryChartData = {
    labels: ['Mechanical Performance', 'Skin Compatibility', 'Durability'],
    datasets: [
      {
        label: 'Overall Scores',
        data: [
          results.overallScores.mechPerformance,
          results.overallScores.skinCompatibility,
          results.overallScores.durability
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const summaryChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        title: {
          display: true,
          text: 'Score (0-10)'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: `${results.materialName} - Overall Performance`,
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Score: ${context.raw.toFixed(2)}/10`;
          }
        }
      }
    }
  };

  // Prepare data for detailed chart
  const detailedChartData = {
    labels: ['Deformation', 'Recovery Rate', 'Breaking Point', 'Friction', 'Moisture', 'Temperature Response', 'Wear Resistance', 'Fatigue Resistance'],
    datasets: [
      {
        label: 'Test Results (normalized)',
        data: [
          results.stressTest.maxDeformation / 10,
          results.stressTest.recoveryRate / 10,
          results.stressTest.breakingPoint / 100,
          results.skinCompatibility.frictionCoefficient,
          results.skinCompatibility.moistureRetention,
          results.skinCompatibility.temperatureResponse / 10,
          results.durabilityTest.wearResistance / 10,
          results.durabilityTest.fatigueResistance / 100
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
          'rgba(83, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const detailedChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 10
      }
    },
    plugins: {
      title: {
        display: true,
        text: `${results.materialName} - Detailed Performance Metrics`
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Value: ${context.raw.toFixed(2)}`;
          }
        }
      }
    }
  };

  return (
    <div>
      <h3>Results for {results.materialName}</h3>
      <p><strong>Test Date:</strong> {formatDate(results.timestamp)}</p>
      
      <div className="chart-container" style={{ position: 'relative', height: '250px', marginBottom: '30px' }}>
        <Bar data={summaryChartData} options={summaryChartOptions} />
      </div>
      
      <div className="chart-container" style={{ position: 'relative', height: '300px', marginBottom: '30px' }}>
        <Bar data={detailedChartData} options={detailedChartOptions} />
      </div>
      
      <div className="results-grid">
        <div className="card">
          <h4>Stress Test Results</h4>
          <p><strong>Max Deformation:</strong> {results.stressTest.maxDeformation.toFixed(2)}</p>
          <p><strong>Recovery Rate:</strong> {results.stressTest.recoveryRate.toFixed(2)}</p>
          <p><strong>Breaking Point:</strong> {results.stressTest.breakingPoint.toFixed(2)} MPa</p>
        </div>
        
        <div className="card">
          <h4>Skin Compatibility</h4>
          <p><strong>Friction Coefficient:</strong> {results.skinCompatibility.frictionCoefficient.toFixed(2)}</p>
          <p><strong>Moisture Retention:</strong> {results.skinCompatibility.moistureRetention.toFixed(2)}%</p>
          <p><strong>Temperature Response:</strong> {results.skinCompatibility.temperatureResponse.toFixed(2)} K</p>
          <p><strong>Overall Score:</strong> {results.overallScores.skinCompatibility.toFixed(2)}/10</p>
          <button 
            className="details-button"
            onClick={onToggleSkinDetails}
          >
            Show Detailed Skin Analysis
          </button>
        </div>
        
        <div className="card">
          <h4>Durability Test</h4>
          <p><strong>Wear Resistance:</strong> {results.durabilityTest.wearResistance.toFixed(2)}</p>
          <p><strong>Fatigue Resistance:</strong> {results.durabilityTest.fatigueResistance.toFixed(2)} cycles</p>
        </div>
      </div>
      
      <div className="interpretation">
        <h4>Result Interpretation</h4>
        <p>
          Based on the simulation, this material shows 
          {results.stressTest.recoveryRate > 5 ? ' excellent' : ' poor'} recovery rate and
          {results.skinCompatibility.frictionCoefficient < 0.5 ? ' good' : ' moderate'} skin compatibility.
          The durability tests indicate it would last approximately {Math.round(results.durabilityTest.fatigueResistance)} cycles before requiring replacement.
        </p>
        <p>
          {results.overallScores.skinCompatibility > 7 ? 
            'This material exhibits excellent biocompatibility characteristics, making it suitable for direct skin contact in prosthetic applications.' : 
            results.overallScores.skinCompatibility > 5 ?
            'This material shows acceptable skin compatibility but may benefit from surface treatments or coatings to enhance comfort for extended wear.' :
            'This material may cause skin irritation or discomfort with prolonged contact. Consider alternative materials or protective interfaces.'}
        </p>
        <p>
          <strong>Overall Assessment:</strong>{' '}
          {(results.overallScores.mechPerformance + results.overallScores.skinCompatibility + results.overallScores.durability) / 3 > 7 ? 
            'Highly recommended for prosthetic applications.' : 
            (results.overallScores.mechPerformance + results.overallScores.skinCompatibility + results.overallScores.durability) / 3 > 5 ?
            'Suitable for prosthetic applications with some limitations.' :
            'Not recommended for prosthetic applications without significant modifications.'}
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay; 