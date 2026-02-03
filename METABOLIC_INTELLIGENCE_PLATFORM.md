# METABOLIC INTELLIGENCE PLATFORM (MIP)
## Revolutionary Evidence-Based Nutrition & Recovery Optimization System

---

## EXECUTIVE VISION

**The Problem**: Athletes and individuals optimizing body composition are flying blind. They track calories and macros, but have no idea if their nutrition is optimized for their current metabolic state. Recovery metrics from wearables are ignored. Research literature is inaccessible. Reverse dieting is guesswork. People either under-eat and destroy their metabolism or over-eat and gain unnecessary fat.

**The Solution**: A real-time metabolic intelligence system that integrates wearable biometrics (HRV, RHR, sleep, recovery) with evidence-based nutrition science to provide adaptive, research-backed recommendations. Every suggestion is cited from peer-reviewed literature. The system learns your metabolic adaptation patterns and guides optimal energy availability for your goals.

**Why It's Revolutionary**:
- First platform to dynamically adjust nutrition based on real-time recovery biomarkers
- Every recommendation backed by cited research (systematic reviews, meta-analyses, position stands)
- Specialized algorithms for reverse dieting and metabolic recovery post-deficit
- Predictive metabolic modeling using longitudinal biometric data
- Built for serious athletes, by someone who understands the game

---

## CORE FEATURE SET

### 1. BIOMETRIC INTEGRATION ENGINE
**Purpose**: Real-time metabolic state assessment via wearable data

**Integrations Required**:
- Garmin Connect API (primary - most comprehensive data)
- WHOOP API
- Oura Ring API
- Apple HealthKit (fallback/supplementary)

**Key Metrics Tracked**:
- Heart Rate Variability (HRV) - parasympathetic recovery indicator
- Resting Heart Rate (RHR) - metabolic/recovery state
- Sleep duration, quality, stages (REM, deep, light)
- Training load and recovery time
- Body battery / readiness scores
- Daily step count and NEAT estimation

**Adaptive Logic**:
```
IF HRV < baseline - 15ms AND RHR > baseline + 5 bpm
  → Metabolic stress detected
  → Increase caloric intake recommendation +5-10%
  → Flag potential under-recovery

IF sleep_quality < 70/100 for 3+ consecutive nights
  → Adjust carb timing (more pre-bed for sleep)
  → Consider stress/recovery interventions
  → Reduce training volume recommendation

IF HRV improving trend AND RHR decreasing trend
  → Metabolic adaptation positive
  → Safe to continue current deficit OR time to reverse diet
```

### 2. EVIDENCE-BASED RECOMMENDATION ENGINE
**Purpose**: All nutrition guidance backed by peer-reviewed research

**Research Database Structure**:
- MongoDB collection of 500+ key studies (systematic reviews, meta-analyses, RCTs)
- Fields: `study_doi`, `citation`, `key_finding`, `population`, `effect_size`, `quality_rating`
- Auto-updating via PubMed API for latest sports nutrition research
- Priority sources: ISSN position stands, ACSM guidelines, IOC consensus statements

**Citation System**:
Every recommendation displays:
```
"Increase protein to 2.0 g/kg for enhanced muscle retention during deficit"
📚 Source: Morton et al. (2018) - Systematic review of protein and resistance training
   Effect size: Higher protein (>1.6g/kg) reduced LBM loss by 0.4kg vs lower protein
   Quality: High (44 studies, n=1863)
   [View full study] [Read summary]
```

**Knowledge Domains**:
- Protein requirements by goal (muscle gain, maintenance, deficit)
- Carbohydrate needs by sport/training volume
- Fat intake thresholds for hormonal health
- Energy availability and RED-S prevention
- Reverse dieting protocols
- Metabolic adaptation and diet breaks
- Nutrient timing and meal frequency
- Supplement efficacy (creatine, caffeine, etc.)

### 3. ADAPTIVE NUTRITION CALCULATOR
**Purpose**: Dynamic macro targets based on biometrics and goals

**Input Variables**:
- Current weight, body composition (if available)
- Training frequency, type, duration
- Goal (performance, recomp, deficit, reverse diet)
- Wearable data (TDEE estimate, activity level)
- Current metabolic state (from biometric trends)

**Calculation Framework**:
```python
# Protein calculation (evidence-based ranges)
if goal == "deficit":
    protein_g_per_kg = 1.8 - 2.4  # Morton 2018, higher end for lean individuals
elif goal == "maintenance" or goal == "performance":
    protein_g_per_kg = 1.6 - 2.2  # ISSN position stand
elif goal == "bulk":
    protein_g_per_kg = 1.6 - 2.0

# Carbohydrate calculation (sport-specific)
if training_type == "strength/power":
    carb_g_per_kg = 4 - 6  # Adequate for powerlifting/strength sports
elif training_type == "mixed":
    carb_g_per_kg = 5 - 7
elif training_type == "endurance":
    carb_g_per_kg = 6 - 10

# Fat calculation (hormonal threshold)
fat_min_percent = 25  # ~20-25% minimum for testosterone support
fat_max_percent = 35

# Energy availability check (RED-S prevention)
lean_body_mass = weight_kg * (1 - body_fat_percent)
min_calories = lean_body_mass * 30  # 30 kcal/kg LBM minimum
if calculated_tdee - intake < min_calories:
    flag_warning("Energy availability below safe threshold")
```

**Adaptive Adjustment Logic**:
- If HRV declining + RHR increasing + weight stalling → increase calories 5-10%
- If sleep quality <70 for 3+ days → shift carbs to evening
- If training performance declining → assess energy availability
- If all biomarkers optimal + weight increasing as planned → no changes needed

### 4. INTELLIGENT REVERSE DIET PROTOCOL
**Purpose**: Specialized guidance for metabolic recovery post-deficit

**Why This Matters**:
- Most people end a cut and balloon up 10-20 lbs in 2 weeks
- Metabolic adaptation takes 4-6 months to fully recover
- Rushing reverse diet = unnecessary fat gain
- Going too slow = prolonged low energy availability

**Protocol Features**:
```
Phase 1: Stabilization (Weeks 1-2)
- Maintain deficit calories for 1-2 weeks
- Allow glycogen supercompensation (expect 3-5 lb water weight)
- Monitor HRV/RHR stability

Phase 2: Initial Raise (Weeks 3-6)
- Increase calories by 100-150 per week (primarily carbs)
- Target: +50-75g carbs per week
- Monitor: Weight should stabilize after initial water weight
- If weight increases >0.5 lb/week → slow rate of increase

Phase 3: Continued Progression (Weeks 6-12)
- Continue +100-150 calories per week
- Adjust based on biometric response
- Goal: Reach estimated maintenance by week 12

Phase 4: Metabolic Normalization (Weeks 12-24)
- Maintain at maintenance for 3-4 months minimum
- Allow full hormonal recovery (libido, energy, sleep normalize)
- HRV should exceed pre-diet baseline
- RHR should drop below pre-diet baseline
```

**Automation**:
- Weekly micro-adjustments suggested based on weight trends
- Biometric-driven pacing (faster if metrics great, slower if stressed)
- Comparison against research-predicted timelines
- Personalized based on depth/duration of previous deficit

### 5. RESEARCH LIBRARY & EDUCATION HUB
**Purpose**: Bridge the gap between research and practical application

**Features**:
- Searchable database of sports nutrition research
- "Explain Like I'm A Lifter" summaries of complex studies
- Topic deep-dives: protein synthesis, glycogen, hormones, supplements
- Myth-busting section backed by systematic reviews
- Monthly research digests (new studies analyzed and practical takeaways)

**Example Topics**:
- "Does meal timing matter for muscle growth?" (Schoenfeld 2018 review)
- "How much protein is too much?" (Antonio 2016 kidney safety)
- "Carb cycling: hype or helpful?" (Evidence mixed, probably unnecessary)
- "The metabolic adaptation timeline" (Trexler 2014 review)
- "RED-S: How to know if you're under-eating" (Mountjoy 2018 IOC consensus)

### 6. PREDICTIVE METABOLIC MODELING
**Purpose**: Machine learning to predict individual metabolic responses

**Data Collection** (longitudinal):
- Daily: Weight, calories, macros, wearable metrics
- Weekly: Progress photos, measurements, training performance
- Monthly: Body composition (if available)

**Predictive Outputs**:
- "Your TDEE is likely 2,950 kcal based on 8 weeks of data" (more accurate than Garmin/formulas)
- "Based on your metabolic adaptation pattern, reverse diet will take ~16 weeks"
- "Your HRV drops below baseline when calories <2,600 for >2 weeks"
- "Your RHR decreases by 2 bpm per 100g carb increase during reverse diet"

**Algorithms**:
- Bayesian TDEE estimation (more accurate than formulas after 4+ weeks data)
- Time-series forecasting for weight trends
- Anomaly detection (unexpected weight changes, biometric anomalies)
- Personalized metabolic adaptation curves

---

## TECHNICAL ARCHITECTURE

### FRONTEND
**Framework**: Next.js 14 (App Router)
- TypeScript throughout
- Tailwind CSS for styling
- shadcn/ui component library (clean, modern, accessible)
- Recharts for data visualization
- React Query for data fetching/caching

**Key Pages**:
1. **Dashboard** - Daily metrics snapshot, today's targets, biometric status
2. **Nutrition** - Macro targets, meal logging, food database
3. **Biometrics** - HRV/RHR trends, sleep analysis, recovery score
4. **Research Library** - Searchable studies, education hub
5. **Protocol Manager** - Reverse diet tracker, phase progression
6. **Progress** - Weight trends, body comp, photos, performance logs

### BACKEND
**Framework**: Node.js with Express (or FastAPI with Python if ML-heavy)

**Database**: 
- PostgreSQL (primary) - User data, nutrition logs, protocols
- MongoDB - Research papers, unstructured education content
- Redis - Caching for API calls, session management

**APIs/Integrations**:
- Garmin Connect API (OAuth2)
- WHOOP API
- Oura Ring API  
- USDA FoodData Central API (nutrition database)
- PubMed E-utilities API (research updates)
- OpenAI API (optional: AI explanations of studies)

**Key Services**:
```
/api/biometrics
  - GET /daily - Fetch latest wearable data
  - GET /trends - HRV, RHR trends over time
  - GET /recovery-score - Calculated metabolic state

/api/nutrition
  - POST /calculate-targets - Return optimized macros
  - POST /log-meal - Save meal entry
  - GET /recommendations - Adaptive suggestions based on biometrics

/api/research
  - GET /studies - Search research database
  - GET /study/:doi - Full study details with citation
  - GET /topic/:name - Curated topic deep-dive

/api/protocol
  - POST /reverse-diet/start - Initialize protocol
  - GET /reverse-diet/status - Current phase, progress
  - POST /reverse-diet/update - Weekly check-in adjustments

/api/ml
  - POST /predict-tdee - Bayesian TDEE estimate
  - POST /predict-timeline - Metabolic recovery timeline
  - GET /insights - Personalized patterns and insights
```

### MACHINE LEARNING (Phase 2)
**Framework**: Python (scikit-learn, PyTorch)
- Deployed as microservice (separate from main backend)
- Models retrained weekly with new user data (anonymized)

**Models**:
1. **TDEE Predictor** - Bayesian regression on weight/calorie data
2. **Metabolic State Classifier** - HRV/RHR patterns → recovery state
3. **Timeline Forecaster** - Predict reverse diet duration based on deficit history
4. **Anomaly Detector** - Flag unusual weight changes or biometric patterns

### INFRASTRUCTURE
**Hosting**: Vercel (frontend) + Railway/Render (backend) + Supabase (database)
- CI/CD via GitHub Actions
- Monitoring: Sentry (errors), PostHog (analytics)
- Authentication: Clerk or NextAuth.js
- Storage: AWS S3 (progress photos)

---

## DEVELOPMENT ROADMAP

### MVP (8-10 weeks)
**Goal**: Core functionality for single-user testing

**Scope**:
- User authentication and profile setup
- Garmin Connect integration (single wearable to start)
- Manual nutrition logging (macros only, not full meals)
- Basic biometric dashboard (HRV, RHR, sleep trends)
- Static macro calculator (evidence-based, but not yet adaptive)
- 50 core research papers in database with citation system
- Simple reverse diet calculator (not yet automated)

**Tech Stack**:
- Next.js 14 + TypeScript + Tailwind
- Supabase (PostgreSQL + Auth)
- Garmin Connect API
- Deployed to Vercel

### Phase 2: Intelligence Layer (6-8 weeks)
**Goal**: Adaptive recommendations + expanded integrations

**New Features**:
- Adaptive macro adjustments based on biometric trends
- Automated reverse diet protocol with weekly micro-adjustments
- WHOOP and Oura Ring integrations
- Expanded research library (200+ papers)
- Predictive TDEE estimation (Bayesian)
- Meal suggestions from macro targets
- Progress photo upload and timeline view

### Phase 3: ML & Personalization (8-10 weeks)
**Goal**: Predictive modeling and deep personalization

**New Features**:
- Time-series forecasting for weight and biometric trends
- Personalized metabolic adaptation curves
- Anomaly detection and alerts
- "AI Coach" chat interface (GPT-4 + RAG on research database)
- Community features (anonymized data comparisons)
- Export reports (PDF summaries for coaches)

### Phase 4: Scale & Monetization (Ongoing)
**Features**:
- Team/coach accounts (coach can manage multiple athletes)
- Mobile apps (React Native)
- Advanced analytics dashboard
- Integration marketplace (MyFitnessPal, Cronometer, etc.)
- API for third-party developers

**Monetization**:
- Free tier: Basic tracking, 10 cited studies per month
- Pro ($15/mo): Unlimited research access, adaptive recommendations, all wearables
- Team ($50/mo): Coach + 5 athletes, shared protocols
- Enterprise: Custom integrations, white-label option

---

## UNIQUE VALUE PROPOSITIONS

### For Individual Athletes
- "Stop guessing if you're eating enough. Know."
- "Every recommendation backed by research you can actually read."
- "Reverse diet without gaining unnecessary fat."
- "Optimize recovery, not just training."

### For Coaches
- "Manage athlete nutrition with real-time biometric feedback."
- "Cite research when explaining protocols to clients."
- "Automated adjustments when you're not available."
- "Export reports for check-ins."

### For Researchers/Students
- "Bridge theory and practice in sports nutrition."
- "See how research translates to real-world application."
- "Contribute to anonymized dataset for future research."

---

## KEY DIFFERENTIATORS

1. **Evidence-Based Core**: Not generic advice. Every recommendation has a citation.
2. **Biometric Integration**: First platform to actually USE your wearable data for nutrition.
3. **Reverse Diet Specialization**: Only platform with automated, research-backed reverse diet protocols.
4. **Metabolic Intelligence**: Predictive, not reactive. Sees problems before you feel them.
5. **Built By An Athlete**: Designed by someone who lives this, not by outsiders.

---

## SUCCESS METRICS

### User Engagement
- Daily active users (DAU) / Monthly active users (MAU) ratio
- Time spent in research library (education engagement)
- Wearable sync compliance (% users syncing daily)
- Protocol completion rate (% finishing reverse diet)

### Outcomes
- Average TDEE accuracy vs formulas (goal: ±5% after 4 weeks)
- Reverse diet success rate (minimal fat gain, biometrics improve)
- User-reported satisfaction with recommendations
- Research citation usage (how often users click through to studies)

### Business
- Free → Pro conversion rate (goal: 15%+)
- Churn rate (goal: <5% monthly)
- Net Promoter Score (goal: 50+)
- Athlete/coach testimonials and case studies

---

## ETHICAL CONSIDERATIONS

### RED-S Prevention
- Hard minimum energy availability thresholds (30 kcal/kg LBM)
- Warnings when intake too low for too long
- Resources for identifying and treating RED-S
- Encourage professional help when indicated

### Data Privacy
- Full GDPR and CCPA compliance
- User owns their data, can export anytime
- Option to contribute anonymized data to research (opt-in)
- No selling data to third parties

### Research Accuracy
- Only peer-reviewed sources in database
- Quality ratings for all studies (risk of bias assessment)
- Update database when new systematic reviews supersede old studies
- Acknowledge limitations and areas of uncertainty

---

## IMPLEMENTATION PRIORITIES

### Immediate (Week 1-2)
1. Set up Next.js + TypeScript project
2. Design database schema (users, biometrics, nutrition_logs, research_papers)
3. Implement Garmin Connect OAuth flow
4. Build basic dashboard UI

### Short-term (Week 3-6)
1. Biometric data pipeline (fetch, store, visualize HRV/RHR/sleep)
2. Macro calculator with evidence-based ranges
3. Research database seeding (50 key papers with citations)
4. Manual nutrition logging system

### Medium-term (Week 7-12)
1. Adaptive recommendation engine (biometric → nutrition adjustments)
2. Reverse diet protocol automation
3. Research library interface (search, filter, read summaries)
4. Progress tracking (weight trends, photos)

### Long-term (Month 4+)
1. ML models for TDEE prediction and forecasting
2. Additional wearable integrations (WHOOP, Oura)
3. Mobile apps (React Native)
4. Community and team features

---

## TECHNICAL IMPLEMENTATION GUIDE

### DATABASE SCHEMA

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Profile data
  date_of_birth DATE,
  sex VARCHAR(10),
  height_cm DECIMAL(5,2),
  goal VARCHAR(50), -- 'performance', 'deficit', 'reverse_diet', 'bulk'
  sport VARCHAR(50),
  training_frequency INT,
  
  -- Preferences
  protein_preference_g INT, -- User can override defaults
  fat_preference_g INT,
  wearable_type VARCHAR(50) -- 'garmin', 'whoop', 'oura'
);

-- Biometric data (from wearables)
CREATE TABLE biometrics (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  
  -- Core metrics
  hrv_ms DECIMAL(6,2),
  resting_hr_bpm INT,
  sleep_duration_hrs DECIMAL(4,2),
  sleep_quality_score INT, -- 0-100
  
  -- Sleep stages
  deep_sleep_hrs DECIMAL(4,2),
  rem_sleep_hrs DECIMAL(4,2),
  light_sleep_hrs DECIMAL(4,2),
  
  -- Activity
  steps INT,
  training_load INT,
  recovery_time_hrs INT,
  
  -- Composite scores
  readiness_score INT, -- 0-100 (calculated or from device)
  
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Nutrition logs
CREATE TABLE nutrition_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  
  calories INT,
  protein_g DECIMAL(6,2),
  carbs_g DECIMAL(6,2),
  fat_g DECIMAL(6,2),
  
  logged_at TIMESTAMP DEFAULT NOW()
);

-- Body weight logs
CREATE TABLE weight_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  weight_kg DECIMAL(6,2) NOT NULL,
  body_fat_percent DECIMAL(5,2), -- Optional
  
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Research papers database
CREATE TABLE research_papers (
  id UUID PRIMARY KEY,
  doi VARCHAR(255) UNIQUE,
  title TEXT NOT NULL,
  authors TEXT,
  journal VARCHAR(255),
  year INT,
  
  -- Content
  abstract TEXT,
  key_findings TEXT[],
  practical_takeaways TEXT[],
  
  -- Metadata
  study_type VARCHAR(50), -- 'meta_analysis', 'systematic_review', 'rct', etc.
  population VARCHAR(100), -- 'trained athletes', 'general population', etc.
  quality_rating INT, -- 1-5 stars
  
  -- Categorization
  topics VARCHAR(50)[], -- ['protein', 'muscle_gain', 'deficit']
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Macro targets (calculated and stored for history)
CREATE TABLE macro_targets (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  
  -- Targets
  calories INT,
  protein_g INT,
  carbs_g INT,
  fat_g INT,
  
  -- Metadata
  calculation_method VARCHAR(50), -- 'static', 'adaptive', 'manual'
  adjustment_reason TEXT, -- "HRV declining, increased calories"
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reverse diet protocols
CREATE TABLE reverse_diet_protocols (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  
  start_date DATE NOT NULL,
  end_date DATE,
  
  -- Initial state
  starting_calories INT,
  starting_weight_kg DECIMAL(6,2),
  
  -- Target state
  target_calories INT,
  
  -- Protocol parameters
  weekly_increase_kcal INT DEFAULT 100,
  
  -- Status
  current_phase VARCHAR(50), -- 'stabilization', 'initial_raise', etc.
  status VARCHAR(20), -- 'active', 'completed', 'paused'
  
  created_at TIMESTAMP DEFAULT NOW()
);
```

### EXAMPLE REACT COMPONENTS

#### Dashboard Component
```typescript
// app/dashboard/page.tsx
import { BiometricsCard } from '@/components/BiometricsCard'
import { MacroTargetsCard } from '@/components/MacroTargetsCard'
import { RecoveryScore } from '@/components/RecoveryScore'
import { ResearchHighlight } from '@/components/ResearchHighlight'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  const biometrics = await getBiometrics(user.id, 'today')
  const macros = await getMacroTargets(user.id, 'today')
  const recoveryScore = calculateRecoveryScore(biometrics)
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Today's Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RecoveryScore score={recoveryScore} biometrics={biometrics} />
        <MacroTargetsCard macros={macros} />
        <BiometricsCard data={biometrics} />
      </div>
      
      <ResearchHighlight topic="daily_tip" />
    </div>
  )
}
```

#### Adaptive Recommendation Engine
```typescript
// lib/recommendations.ts
import { Biometrics, MacroTargets, User } from '@/types'

export function calculateAdaptiveRecommendations(
  user: User,
  recentBiometrics: Biometrics[],
  currentMacros: MacroTargets
): {
  adjustedMacros: MacroTargets;
  reasoning: string;
  citations: string[];
} {
  // Calculate 7-day trends
  const avgHRV = average(recentBiometrics.map(b => b.hrv_ms))
  const avgRHR = average(recentBiometrics.map(b => b.resting_hr_bpm))
  const avgSleep = average(recentBiometrics.map(b => b.sleep_quality_score))
  
  // Get user's baseline (from 30 days ago when well-recovered)
  const baseline = await getUserBaseline(user.id)
  
  let calorieAdjustment = 0
  let reasoning = ""
  let citations: string[] = []
  
  // Scenario 1: Metabolic stress detected
  if (avgHRV < baseline.hrv - 15 && avgRHR > baseline.rhr + 5) {
    calorieAdjustment = +200 // Increase calories
    reasoning = "Biometric data suggests metabolic stress (HRV down, RHR up). Increasing calories to support recovery."
    citations = ["doi:10.1186/s12970-014-0031-2"] // Trexler 2014 metabolic adaptation
  }
  
  // Scenario 2: Poor sleep recovery
  else if (avgSleep < 70 && recentBiometrics.filter(b => b.sleep_quality_score < 70).length >= 3) {
    // Shift carbs to evening (same total calories)
    reasoning = "Sleep quality below optimal for 3+ days. Consider shifting more carbohydrates to dinner for improved sleep."
    citations = ["doi:10.3390/nu9030271"] // Carbs and sleep
  }
  
  // Scenario 3: Excellent recovery, can progress
  else if (avgHRV > baseline.hrv && avgRHR < baseline.rhr && user.goal === 'reverse_diet') {
    calorieAdjustment = +100 // Continue reverse diet progression
    reasoning = "Recovery metrics excellent. Continue progressing reverse diet with +100 kcal this week."
    citations = ["doi:10.1186/s12970-014-0031-2"] // Reverse diet protocols
  }
  
  return {
    adjustedMacros: applyCalorieAdjustment(currentMacros, calorieAdjustment),
    reasoning,
    citations
  }
}
```

#### Research Citation Component
```typescript
// components/ResearchCitation.tsx
import { ResearchPaper } from '@/types'

export function ResearchCitation({ doi }: { doi: string }) {
  const paper = await getResearchPaper(doi)
  
  return (
    <div className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-semibold text-sm">{paper.title}</p>
          <p className="text-xs text-gray-600 mt-1">
            {paper.authors} ({paper.year}) - {paper.journal}
          </p>
          <div className="flex gap-2 mt-2">
            <span className="text-xs bg-blue-100 px-2 py-1 rounded">
              {paper.study_type}
            </span>
            <span className="text-xs bg-green-100 px-2 py-1 rounded">
              Quality: {paper.quality_rating}/5 ⭐
            </span>
          </div>
        </div>
      </div>
      
      <details className="mt-3">
        <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
          View key findings
        </summary>
        <ul className="mt-2 space-y-1 text-sm text-gray-700">
          {paper.key_findings.map((finding, i) => (
            <li key={i}>• {finding}</li>
          ))}
        </ul>
      </details>
      
      <a 
        href={`https://doi.org/${paper.doi}`}
        target="_blank"
        className="text-xs text-blue-600 hover:underline mt-2 inline-block"
      >
        Read full study →
      </a>
    </div>
  )
}
```

---

## CORE RESEARCH PAPERS TO SEED DATABASE

### Protein & Muscle
1. Morton RW et al. (2018) - "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults" - BJSM
2. Antonio J et al. (2016) - "The effects of consuming a high protein diet on kidney function in resistance-trained men and women" - JISSN
3. Schoenfeld BJ et al. (2018) - "How much protein can the body use in a single meal for muscle-building?" - JISSN

### Energy Availability & RED-S
4. Mountjoy M et al. (2018) - "IOC consensus statement on relative energy deficiency in sport (RED-S): 2018 update" - BJSM
5. Loucks AB et al. (2011) - "Energy availability in athletes" - J Sports Sci
6. Logue DM et al. (2020) - "Low energy availability in athletes: a review of prevalence, dietary patterns, physiological health, and sports performance" - Sports Med

### Metabolic Adaptation
7. Trexler ET et al. (2014) - "Metabolic adaptation to weight loss: implications for the athlete" - JISSN
8. Müller MJ et al. (2016) - "Metabolic adaptation to caloric restriction and subsequent refeeding: the Minnesota Starvation Experiment revisited" - Am J Clin Nutr
9. Dulloo AG et al. (2012) - "Adaptive thermogenesis in resistance to obesity therapies" - Proc Nutr Soc

### Carbohydrates & Performance
10. Thomas DT et al. (2016) - "ACSM Position Stand: Nutrition and Athletic Performance" - Med Sci Sports Exerc
11. Burke LM et al. (2011) - "Carbohydrates for training and competition" - J Sports Sci
12. Kerksick CM et al. (2017) - "ISSN exercise & sports nutrition review update: research & recommendations" - JISSN

### Fat & Hormones
13. Volek JS et al. (2021) - "Testosterone and cortisol in relationship to dietary nutrients and resistance exercise" - J Appl Physiol
14. Hamalainen E et al. (1984) - "Diet and serum sex hormones in healthy men" - J Steroid Biochem

### Recovery & Sleep
15. Fullagar HH et al. (2015) - "Sleep and athletic performance: the effects of sleep loss on exercise performance" - Sports Med
16. Afaghi A et al. (2007) - "High-glycemic-index carbohydrate meals shorten sleep onset" - Am J Clin Nutr

---

## NEXT STEPS FOR AI AGENT

### Setup (Day 1-2)
1. Initialize Next.js 14 project with TypeScript: `npx create-next-app@latest metabolic-intelligence --typescript --tailwind --app`
2. Set up GitHub repository with CI/CD (GitHub Actions)
3. Create Supabase project (database + auth)
4. Install core dependencies:
   ```bash
   npm install @supabase/supabase-js
   npm install @tanstack/react-query
   npm install recharts
   npm install date-fns
   npm install shadcn/ui
   ```
5. Set up environment variables (.env.local)

### Database Setup (Day 3)
1. Run SQL schema from above in Supabase SQL editor
2. Create sample seed data (1 test user, 7 days of biometrics, 10 research papers)
3. Set up Row Level Security policies in Supabase

### Garmin Integration (Day 4-5)
1. Register app at Garmin Connect Developer Portal
2. Implement OAuth2 flow in Next.js API routes
3. Create background job to fetch daily biometric data
4. Store biometrics in database (HRV, RHR, sleep)

### MVP Features (Week 2-3)
1. Build dashboard showing today's biometrics
2. Create simple macro calculator (static, evidence-based ranges)
3. Manual nutrition logging interface
4. Weight tracking with trend chart
5. Research library page (search, filter, view papers with citations)

### Deploy MVP (End Week 3)
1. Deploy to Vercel (frontend)
2. Supabase handles backend (database + auth)
3. Test with single user (you) for 2 weeks
4. Iterate based on real-world usage

### Iterate Toward Phase 2
1. Add adaptive recommendations based on biometric trends
2. Build reverse diet protocol automation
3. Expand research database to 100+ papers
4. Add WHOOP and Oura integrations

---

## FINAL NOTES

This platform is built to solve YOUR problem: navigating the gap between research literature and practical implementation, optimizing metabolic health during reverse dieting, and making data-driven decisions about nutrition based on recovery state. 

Every feature is designed around evidence-based principles you already live by. This isn't some generic fitness app - it's a metabolic intelligence system for serious athletes who want to optimize performance and body composition without destroying their health in the process.

The moat is the research integration + biometric intelligence. No one else is doing this. Most apps are just calorie trackers with pretty UI. This is a decision-support system backed by peer-reviewed literature that adapts to your individual metabolic response patterns.

Ship the MVP fast (8-10 weeks), validate with real users (yourself + competitive athletes), iterate based on feedback, then scale. The market is massive: every athlete who cares about performance nutrition, every coach who wants better tools, every researcher who wants to see theory meet practice.

Build it. Deploy it. Help people optimize.

Let's fucking go. 🔥

---

**Project Name**: Metabolic Intelligence Platform (MIP)  
**Tagline**: "Evidence-Based Nutrition, Powered by Your Biometrics"  
**Target Launch**: MVP in 10 weeks, Phase 2 in 6 months  
**Primary Use Case**: Competitive athletes reverse dieting and optimizing metabolic health  
**Competitive Advantage**: Research citations + biometric integration + adaptive intelligence

---
