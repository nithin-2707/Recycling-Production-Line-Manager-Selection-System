# Recycling Production Line Manager Selection System

A premium, professional dashboard for ranking and evaluating candidates for recycling production line manager positions using AI-powered assessments.

![Dashboard Preview](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![Mantine](https://img.shields.io/badge/Mantine-7.4-339AF0?logo=mantine)

## 🌟 Features

- **Interactive Leaderboard**: Top 10 candidates with detailed scoring metrics
- **Skill Heatmap**: Visual representation of candidate competencies across key areas
- **Candidate Cards**: Detailed profile cards with comprehensive information
- **Advanced Filtering**: Search and filter candidates by multiple criteria
- **Real-time Statistics**: Dashboard metrics and performance indicators
- **Premium UI Design**: Premium UI Design: Solid, minimal surfaces with a custom color palette
- **Responsive Design**: Optimized for all screen sizes

## 🎨 Design Philosophy
This dashboard uses a refined, industrial-inspired color palette built around deep blue and neutral tones to create a professional, modern, and readable interface.

- **Ink Black** (#0d1b2a) – Primary background for depth and strong contrast.
- **Prussian Blue** (#1b263b) – Secondary surfaces such as cards and side panels.
- **Dusk Blue** (#415a77) – Interactive elements and key UI highlights.
- **Lavender Grey** (#778da9) – Accent color for subtle emphasis and secondary text.
- **Alabaster Grey** (#e0e1dd) – Main light tone for backgrounds and readable text.

## 📋 Project Structure

```
recycling-manager-dashboard/
├── database/
│   ├── schema.sql              # MySQL database schema with triggers
│   └── sample_data.sql         # Sample data for 40 candidates
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx       # Main dashboard container
│   │   ├── Leaderboard.jsx     # Top 10 candidates table
│   │   ├── SkillHeatmap.jsx    # Visual skill comparison
│   │   ├── CandidateCards.jsx  # Detailed candidate cards
│   │   └── StatsCard.jsx       # Statistics display component
│   ├── data/
│   │   └── generateCandidates.js  # Faker.js candidate generator
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles and animations
├── AI_PROMPTS.md              # Comprehensive AI evaluation prompts
├── package.json               # Project dependencies
├── vite.config.js            # Vite configuration
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Extract the project folder**
   ```bash
   cd recycling-manager-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Build for Production

```bash
npm run build
npm run preview
```

## 📊 Database Setup (Optional)

The dashboard uses mock data by default, but you can set up a MySQL database:

### 1. Create Database

```bash
mysql -u root -p
CREATE DATABASE recycling_selection;
USE recycling_selection;
```

### 2. Import Schema

```bash
mysql -u root -p recycling_selection < database/schema.sql
```

### 3. Import Sample Data

```bash
mysql -u root -p recycling_selection < database/sample_data.sql
```

### Database Features

- **Auto-updating rankings** with triggers
- **Computed overall scores** based on weighted evaluation criteria
- **Stored procedures** for efficient data retrieval
- **Indexed fields** for optimal query performance
- **Foreign key constraints** ensuring data integrity

## 🤖 AI Evaluation System

The system uses three comprehensive prompts to evaluate candidates:

### 1. Crisis Management (35% weight)
Assesses ability to handle emergencies, equipment failures, and operational disruptions.

### 2. Sustainability Knowledge (35% weight)
Evaluates environmental expertise, regulatory compliance, and circular economy understanding.

### 3. Team Motivation & Leadership (30% weight)
Measures leadership skills, communication abilities, and team development focus.

See `AI_PROMPTS.md` for complete prompt details and evaluation rubrics.

## 🎯 Evaluation Criteria

### Scoring Formula
```
Overall Score = (Crisis Management × 0.35) + (Sustainability × 0.35) + (Team Motivation × 0.30)
```

### Rating Categories
- **90-100**: Exceptional Candidate - Strong Hire
- **85-89**: Excellent Candidate - Priority Interview
- **80-84**: Very Good Candidate - Standard Process
- **75-79**: Good Candidate - Further Assessment
- **70-74**: Acceptable Candidate - Development Plan
- **Below 70**: Not Recommended

## 🎨 Component Documentation

### Dashboard Component
Main container managing state and filters. Includes:
- Search functionality
- Category filtering
- Tab navigation
- Statistics calculation

### Leaderboard Component
Displays top 10 candidates with:
- Rank indicators (gold/silver/bronze medals for top 3)
- Progress bars for each evaluation metric
- Category badges
- Hover effects for enhanced UX

### SkillHeatmap Component
Visual heatmap showing:
- Top 20 candidates
- Color-coded score cells
- Interactive tooltips
- Legend for score ranges

### CandidateCards Component
Detailed profile cards featuring:
- Contact information
- Score breakdowns
- Skills and certifications
- "Share Candidate" functionality
- Responsive grid layout

### StatsCard Component
Reusable metric display with:
- Icon support
- Animated hover effects
- Gradient backgrounds
- Optional subtitles

## 🔧 Technology Stack

### Frontend
- **React 18.2** - UI library
- **Vite 5.0** - Build tool and dev server
- **Mantine UI 7.4** - Component library
- **Tabler Icons** - Icon set

### Data Generation
- **Faker.js 8.3** - Realistic mock data generation

### Styling
- **CSS Modules** - Scoped styling
- **Custom CSS Variables** - Theme management
- **Glassmorphism** - Modern UI effects
- **CSS Animations** - Smooth transitions

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎭 User Experience Features

### Accessibility
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Color contrast compliance

### Performance
- Component lazy loading
- Memoized calculations
- Optimized re-renders
- Efficient filtering algorithms

## 🧪 Testing the Application

### Sample Use Cases

1. **View Top Performers**
   - Navigate to Leaderboard tab
   - See top 10 candidates ranked by overall score

2. **Search for Specific Skills**
   - Use search bar to filter by skill name
   - Results update in real-time

3. **Compare Candidate Strengths**
   - Switch to Skill Heatmap tab
   - Visual comparison of top 20 candidates

4. **Review Detailed Profiles**
   - Go to All Candidates tab
   - Click through candidate cards
   - View complete skill sets and certifications

5. **Filter by Performance**
   - Use category dropdown
   - Filter by score ranges (Exceptional, Excellent, etc.)

## 📈 Future Enhancements

Potential features for v2.0:
- Real AI integration (Claude API, OpenAI)
- Backend API with database connection
- User authentication and roles
- Interview scheduling system
- Document upload for candidate resumes
- PDF report generation
- Email notification system
- Candidate comparison view
- Historical tracking and analytics

## 🤝 Contributing

This is an assignment submission project, but suggestions for improvements are welcome.

## 📄 Assignment Completion Checklist

- ✅ MySQL-compatible database schema with triggers
- ✅ 40 realistic candidate profiles using Faker.js
- ✅ 3 comprehensive AI evaluation prompts
- ✅ React + Vite dashboard implementation
- ✅ Mantine UI component integration
- ✅ Leaderboard with top 10 candidates
- ✅ Skill heatmap visualization
- ✅ Detailed candidate cards
- ✅ Custom color palette implementation
- ✅ Professional, premium design
- ✅ Responsive layout
- ✅ Search and filter functionality
- ✅ Complete documentation

## 📞 Support

For questions or issues:
1. Check the code comments for implementation details
2. Review `AI_PROMPTS.md` for evaluation methodology
3. Inspect `database/schema.sql` for database structure

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Mantine UI Components](https://mantine.dev/core/introduction/)
- [Faker.js Documentation](https://fakerjs.dev/guide/)

## 📝 License

This project is created as an assignment submission. All rights reserved.

---

**Built with ❤️ for G CP Assignment**

*Premium Dashboard for Recycling Production Line Manager Selection*
