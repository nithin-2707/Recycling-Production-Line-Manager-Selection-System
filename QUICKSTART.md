# 🚀 Quick Start Guide

## Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

This will install:
- React & ReactDOM
- Vite (build tool)
- Mantine UI components
- Tabler Icons
- Faker.js (mock data generator)

### 2️⃣ Start Development Server
```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

### 3️⃣ Explore the Dashboard

#### Leaderboard Tab
- View top 10 candidates
- See detailed scores for each evaluation metric
- Gold/silver/bronze medals for top 3

#### Skill Heatmap Tab
- Visual comparison of top 20 candidates
- Color-coded performance indicators
- Interactive tooltips on hover

#### All Candidates Tab
- Comprehensive candidate cards
- Full profile information
- Skills and certifications
- "Share Candidate" functionality

---

## 🎯 Key Features to Test

### Search Functionality
Try searching for:
- Candidate names
- Email addresses
- Specific skills (e.g., "Crisis Management", "Sustainability")

### Filter by Category
Use the dropdown to filter:
- Exceptional (90-100)
- Excellent (85-89)
- Very Good (80-84)
- Good (75-79)

### Interactive Elements
- Hover over cards for elevation effects
- Hover over heatmap cells for detailed scores
- Click tabs to switch between views
- Use "Reset" button to clear filters

---

## 📊 Understanding the Data

### Candidate Generation
40 candidates are automatically generated with:
- Realistic names and contact info
- Random experience (2-25 years)
- Varied skill sets (4-8 skills each)
- Professional certifications (1-4 certs)
- AI evaluation scores (60-99%)

### Evaluation Scores
Each candidate is scored on:
- **Crisis Management** (35% weight)
- **Sustainability** (35% weight)
- **Team Motivation** (30% weight)

**Overall Score Formula:**
```
Overall = (Crisis × 0.35) + (Sustainability × 0.35) + (Team × 0.30)
```

---

## 🛠️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

To preview the production build:
```bash
npm run preview
```

---

## 📁 Project Files

### Essential Files
- `src/App.jsx` - Main application component
- `src/components/Dashboard.jsx` - Dashboard container
- `src/data/generateCandidates.js` - Mock data generator
- `AI_PROMPTS.md` - Comprehensive AI evaluation prompts
- `database/schema.sql` - MySQL database schema

### Configuration Files
- `package.json` - Dependencies and scripts
- `vite.config.js` - Vite configuration
- `index.html` - HTML entry point

---

## 🎨 Customization

### Change Color Palette
Edit the theme in `src/App.jsx`:
```javascript
const theme = {
  colors: {
    brand: [
      '#e0e1dd', // Alabaster Grey
      '#778da9', // Lavender Grey
      '#415a77', // Dusk Blue
      '#1b263b', // Prussian Blue
      '#0d1b2a', // Ink Black
      // ... more shades
    ],
  },
};
```

### Modify Number of Candidates
Edit `src/data/generateCandidates.js`:
```javascript
export const mockCandidates = generateCandidates(40); // Change 40 to desired number
```

### Adjust Scoring Weights
Edit evaluation criteria in `src/data/generateCandidates.js`:
```javascript
candidate.overallScore = parseFloat((
  (candidate.crisisManagement * 0.35 +    // Adjust weight
   candidate.sustainability * 0.35 +       // Adjust weight
   candidate.teamMotivation * 0.30)        // Adjust weight
).toFixed(1));
```

---

## 🔍 Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically try the next available port.

### Dependencies Installation Issues
Try:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Ensure you're using Node.js 18 or higher:
```bash
node --version
```

---

## 📚 Next Steps

1. ✅ Explore all three tabs (Leaderboard, Heatmap, Candidates)
2. ✅ Test search and filter functionality
3. ✅ Review the AI prompts in `AI_PROMPTS.md`
4. ✅ Examine the database schema in `database/schema.sql`
5. ✅ Check out the code structure and components
6. ✅ Build for production and test performance

---

## 💡 Pro Tips

- Use browser DevTools to inspect component structure
- Check Network tab to see mock data loading
- Resize browser window to test responsive design
- Right-click and "Inspect" to see CSS implementations
- Read code comments for implementation details

---

**Happy Exploring! 🎉**
