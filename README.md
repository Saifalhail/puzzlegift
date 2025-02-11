# Magical Birthday Adventure - Interactive Web Experience

A magical interactive birthday adventure set in a mystical castle, featuring various puzzles and enchanting experiences. Built with React and styled with custom CSS animations.

## 🏰 Features

- Interactive puzzle-based storytelling
- Beautiful medieval-themed UI with custom animations
- Responsive design for all devices
- Ambient background music and sound effects
- Multiple themed rooms and challenges:
  - Castle Gate Puzzle
  - Royal Feast
  - Enchanted Map
  - Lady's Treasure Vault
  - Twilight Passage
  - Magical Carriage Workshop
  - And more!

## 🚀 Live Demo

Visit the live experience at: [https://Saifalhail.github.io/puzzlegift/](https://Saifalhail.github.io/puzzlegift/)

## 🛠️ Technologies Used

- React
- CSS3 with custom animations
- SVG graphics
- Web Audio API for sound effects
- CSS Grid and Flexbox for responsive layouts

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Saifalhail/puzzlegift.git
```

2. Navigate to the project directory:
```bash
cd puzzlegift
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

## 🌐 Deployment

This project is configured for GitHub Pages deployment. To deploy:

1. Update the `homepage` field in `package.json` with your GitHub Pages URL:
```json
{
  "homepage": "https://Saifalhail.github.io/puzzlegift"
}
```

2. Push your changes to GitHub:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

3. The GitHub Actions workflow will automatically build and deploy your site to GitHub Pages.

## 🔧 Development

To run the project locally:

```bash
npm start
```

To create a production build:

```bash
npm run build
```

## 📁 Project Structure

```
puzzlegift/
├── public/
│   ├── sounds/         # Audio files
│   └── index.html
├── src/
│   ├── components/     # React components
│   │   ├── puzzles/    # Puzzle components
│   │   ├── shared/     # Shared components
│   │   └── svg/        # SVG graphics
│   ├── themes/         # CSS themes
│   ├── utils/          # Utility functions
│   ├── App.js
│   └── index.js
└── package.json
```

## 🎨 Customization

- Theme colors can be modified in `src/themes/medieval.css`
- Sound effects can be replaced in the `public/sounds` directory
- SVG graphics can be customized in the `src/components/svg` directory

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Saifalhail/puzzlegift/issues).

## 🙏 Acknowledgments

- Medieval fonts from Google Fonts
- Sound effects from [source]
- Inspiration from classic adventure games
