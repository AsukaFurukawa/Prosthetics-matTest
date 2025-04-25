# Prosthetics Material Testing Platform

A simulation-based platform for testing and evaluating materials for use in prosthetics. This project aims to help researchers identify the best materials for creating lightweight, durable, and skin-friendly prosthetic solutions.

## Features

- **Material Database**: Add and manage different materials with their physical properties
- **Test Simulation**: Run various tests on selected materials to evaluate their performance
- **Performance Visualization**: View and interpret test results with interactive charts
- **Comprehensive Skin Compatibility Analysis**: Detailed assessment of how materials interact with human skin
- **Clinical Recommendations**: Get specific suggestions to improve material performance for prosthetic applications
- **Material Comparison**: Compare different materials to find the optimal choice for specific prosthetic applications

## Skin Compatibility Analysis

The platform provides comprehensive skin compatibility analysis including:

- pH compatibility with human skin
- Cytotoxicity assessment
- Allergenic potential evaluation
- Friction characteristics
- Breathability analysis
- Moisture management
- Temperature regulation
- Maceration risk assessment

Results are presented with detailed visualizations, clinical recommendations, and scientific context.

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/prosthetics-material-testing.git
cd prosthetics-material-testing
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm start
```

The application will open in your browser at `http://localhost:3000`.

## Project Structure

```
prosthetics-material-testing/
├── public/              # Static files
├── src/                 # Source code
│   ├── components/      # React components
│   │   ├── MaterialDatabase.js     # Material list and selection
│   │   ├── MaterialForm.js         # Form for adding new materials
│   │   ├── TestSimulation.js       # Test configuration and execution
│   │   ├── ResultsDisplay.js       # Test result visualization
│   │   └── SkinCompatibilityDetails.js # Detailed skin analysis
│   ├── App.js           # Main application component
│   ├── App.css          # Application styles
│   ├── index.js         # Entry point
│   └── index.css        # Global styles
└── package.json         # Project dependencies and scripts
```

## Roadmap

- **Phase 1**: Basic material property input and visualization ✅
- **Phase 2**: Enhanced skin compatibility simulation and analysis ✅
- **Phase 3**: 3D visualization and animations
- **Phase 4**: Machine learning integration for predictions
- **Phase 5**: Collaboration features

## Scientific Foundation

The skin compatibility calculations and analysis in this platform are based on biomedical research principles and industry standards:

- ISO 10993: Biological evaluation of medical devices
- ASTM F2407: Standard Specification for Surgical Gowns
- AATCC Test Method 195: Liquid Moisture Management Properties of Textile Fabrics

While the platform provides valuable insights, results should be validated with clinical testing for real-world applications.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- This project is inspired by the need for better material selection in prosthetics
- Thanks to researchers and engineers in the biomedical field for their insights 