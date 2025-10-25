# Interactive Periodic Table

A beautiful, interactive periodic table built with React and Tailwind CSS. Explore chemical elements with stunning visual effects, detailed information, and smooth interactions.


## Features

- **Stunning Visual Design** - Gradient backgrounds, particle animations, and smooth transitions
- **Smart Search** - Search elements by name, symbol, or atomic number
- **Category Filtering** - Filter elements by chemical categories (metals, nonmetals, noble gases, etc.)
- **Keyboard Navigation** - Navigate through elements using arrow keys
- **Responsive Design** - Works perfectly on desktop and mobile devices
- **Detailed Information** - Comprehensive element data including atomic mass, electron configuration, density, and more
- **Interactive Tooltips** - Hover over elements for quick information
- **Detailed Modals** - Click elements for in-depth information in beautiful modals
- **Color-Coded Categories** - Each element category has distinct gradient colors

## Live Demo

[[Live demo link]](https://interactive-periodic-tablee.netlify.app/)

## Screenshots

<img width="674" height="527" alt="periodic-table" src="https://github.com/user-attachments/assets/e2964ca7-7481-491f-aaaa-3d757a2489dc" />


## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dandokku/periodic-table.git
   cd periodic-table
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Project Structure

```
interactive-periodic-table/  
├── src/
│   ├── components/
│   │   └── InteractivePeriodicTable.jsx
│   ├── constants/
│   │   └── elements.js
│   ├── App.jsx
│   └── main.jsx
├── public/
└── package.json
```

## Key Files

- **`InteractivePeriodicTable.jsx`** - Main component with all interactive functionality
- **`elements.js`** - Comprehensive dataset of 100 chemical elements with properties:
  - Atomic number, symbol, name
  - Atomic mass, group, period, category
  - Electron configuration, density
  - Color-coded categories

## How to Use

### Navigation
- **Mouse**: Hover over elements for tooltips, click for detailed information
- **Keyboard**: Use arrow keys to navigate between elements
- **Search**: Use the search bar to find specific elements
- **Filter**: Use the category dropdown to filter by element type

### Features
1. **Search Elements**: Type in the search bar to find elements by name, symbol, or atomic number
2. **Category Filter**: Select a specific category from the dropdown
3. **Reset Filters**: Click the reset button to clear all filters
4. **Element Details**: Click any element to view comprehensive information in a modal
5. **Keyboard Shortcuts**: Use arrow keys for quick navigation

## Element Categories

- 🔴 **Alkali Metals** - Reactive metals
- 🟠 **Alkaline Earth Metals** - Moderately reactive metals
- 🔵 **Transition Metals** - Typical metallic elements
- 🟢 **Metalloids** - Properties of both metals and nonmetals
- 🟣 **Halogens** - Highly reactive nonmetals
- 🟡 **Noble Gases** - Inert, nonreactive gases
- ⚪ **Nonmetals** - Poor conductors of heat and electricity
- 🟤 **Post-Transition Metals** - Soft, poor metals
- 🎀 **Lanthanides** - Rare earth elements
- 💖 **Actinides** - Radioactive elements

## Technologies Used

- **Reactjs** - Frontend framework
- **Tailwind CSS** - Styling and animations

## Data Source

The element data includes comprehensive information for the first 100 elements:
- Atomic properties (number, mass, configuration)
- Physical properties (density, category)
- Position in periodic table (group, period)
- Chemical classification

## Future Enhancements

- [ ] Add element history and discovery facts
- [ ] Include isotope information
- [ ] Add 3D atomic structure visualizations
- [ ] Implement element comparison feature
- [ ] Add quiz mode for learning
- [ ] Include real-world applications of each element
- [ ] Add dark/light theme toggle

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Author
**Daniel Jesuloba Ajide**

- GitHub: [@dandokku](https://github.com/dandokku)
- LinkedIn: [Daniel Ajide](https://www.linkedin.com/in/daniel-ajide-243b42260/)
- Portfolio: [My Portfolio](https://danielajide.netlify.app/)

## Acknowledgments

- Periodic table data sourced from IUPAC standards
- Inspiration from various chemistry educational resources
- Icons from Heroicons
- Built with create-react-app

## Support

If you have any questions or run into issues, please open an issue on GitHub or contact me at jesulobadaniel1@gmail.com.

---

⭐ Star this repo if you found it helpful!
