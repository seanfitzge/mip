# Manual Health Metrics System

## Overview

This system allows users to manually input daily health metrics that would typically come from wearable devices (WHOOP, Garmin, Oura Ring, etc.). The data is stored in the `biometrics` table and used throughout the platform for personalized recommendations, intervention triggers, and tracking progress over time.

## Core Metrics (Required)

### 1. **Overnight HRV (Heart Rate Variability)**
- **Field**: `hrv_rmssd_ms`
- **Unit**: milliseconds (ms)
- **Typical Range**: 20-100ms (highly individual)
- **What it measures**: Parasympathetic nervous system activity and recovery status
- **Where to find it**:
  - WHOOP: Recovery screen → HRV
  - Garmin: Morning Report → HRV Status
  - Oura Ring: Readiness tab → HRV
  - Apple Watch: Health app → Heart → Heart Rate Variability

**Evidence-based use**:
- HRV declines of ≥7.5% from personal baseline indicate incomplete recovery (Plews et al., 2013)
- Used to trigger nutrition interventions (carb increases, stress management)
- Baseline establishment requires 14+ days of consistent measurement

### 2. **Resting Heart Rate (RHR)**
- **Field**: `resting_hr_bpm`
- **Unit**: beats per minute (bpm)
- **Typical Range**: 45-80 bpm (lower in trained athletes)
- **What it measures**: Cardiovascular fitness and recovery status
- **Where to find it**:
  - WHOOP: Recovery screen → Resting Heart Rate
  - Garmin: Heart Rate widget → RHR
  - Oura Ring: Readiness tab → Resting Heart Rate
  - Apple Watch: Health app → Heart → Resting Heart Rate

**Evidence-based use**:
- RHR increases ≥5 bpm above baseline for 2+ consecutive days indicates stress/incomplete recovery
- Complements HRV for intervention triggering
- Tracked longitudinally to detect overtraining and metabolic adaptation

### 3. **Sleep Duration**
- **Field**: `sleep_duration_hrs`
- **Unit**: hours
- **Optimal Range**: 7-9 hours for most adults
- **What it measures**: Total sleep time
- **Where to find it**:
  - WHOOP: Sleep Performance → Total Sleep
  - Garmin: Sleep widget → Sleep Time
  - Oura Ring: Sleep tab → Total Sleep
  - Apple Watch: Sleep app → Time Asleep

**Evidence-based use**:
- Sleep duration <7 hours consistently associated with impaired recovery
- Used in readiness score calculation
- <6 hours triggers intervention recommendations

### 4. **Sleep Quality Score**
- **Field**: `sleep_quality_score`
- **Unit**: 0-100 scale
- **Optimal Range**: 80-100
- **What it measures**: Composite metric of sleep efficiency, architecture, and disturbances
- **Where to find it**:
  - WHOOP: Sleep Performance → Sleep Performance %
  - Garmin: Sleep Score
  - Oura Ring: Sleep Score
  - Apple Watch: Estimate based on time in bed vs. time asleep

**Evidence-based use**:
- Sleep quality <70 for 3+ consecutive days triggers carb timing intervention (shift carbs to evening)
- Used to calculate readiness score
- Correlates with next-day performance and recovery

## Advanced Metrics (Optional)

### Sleep Architecture

#### **Deep Sleep**
- **Field**: `deep_sleep_hrs`
- **Unit**: hours
- **Typical Range**: 1-2 hours (15-20% of total sleep)
- **Evidence**: Critical for physical recovery and HRV restoration

#### **REM Sleep**
- **Field**: `rem_sleep_hrs`
- **Unit**: hours
- **Typical Range**: 1.5-2.5 hours (20-25% of total sleep)
- **Evidence**: Important for cognitive function and skill consolidation

#### **Light Sleep**
- **Field**: `light_sleep_hrs`
- **Unit**: hours
- **Typical Range**: 3-5 hours (50-60% of total sleep)
- **Evidence**: Transitional stage, important for overall sleep architecture

#### **Sleep Efficiency**
- **Field**: `sleep_efficiency_percent`
- **Unit**: percentage (0-100)
- **Optimal Range**: >85%
- **Calculation**: (Time Asleep / Time in Bed) × 100
- **Evidence**: >85% indicates good sleep quality; <80% may indicate sleep disorders

### Activity Metrics

#### **Steps**
- **Field**: `steps`
- **Unit**: count
- **Typical Range**: 5,000-15,000 steps/day
- **Evidence**: Used to estimate NEAT (Non-Exercise Activity Thermogenesis) for TDEE calculation

#### **Active Calories**
- **Field**: `active_calories`
- **Unit**: kcal
- **Typical Range**: 200-800 kcal/day
- **Evidence**: Directly used in TDEE estimation and energy availability calculations

#### **Training Load**
- **Field**: `training_load`
- **Unit**: arbitrary units (device-specific)
- **Typical Range**: 0-500
- **Evidence**: Tracks accumulated training stress; used to prevent overtraining

#### **Recovery Time**
- **Field**: `recovery_time_hrs`
- **Unit**: hours
- **Typical Range**: 6-72 hours
- **Evidence**: Device estimate of time until full recovery; influences training recommendations

## Data Source Tracking

### **Source Device**
- **Field**: `source_device`
- **Options**: manual, whoop, garmin, oura, apple_watch, fitbit, other
- **Device Accuracy (CCC - Concordance Correlation Coefficient)**:
  - Oura Ring Gen 4: 0.99 (highest accuracy)
  - WHOOP 4.0: 0.94
  - Garmin Fenix: 0.87
  - Apple Watch: 0.85
  - Fitbit: 0.83
  - Manual Entry: 0.90 (assumed decent accuracy from other devices)

**Evidence-based use**:
- Device accuracy displayed on all visualizations to contextualize confidence
- Lower accuracy devices may require larger changes to trigger interventions

## Baseline Establishment

### Automatic Baseline Calculation
Once 14 days of core metrics are logged, the system automatically calculates:

1. **HRV Baseline**
   - Mean HRV over 14 days
   - Standard deviation (SD)
   - Smallest Worthwhile Change (SWC) = 0.5 × SD

2. **RHR Baseline**
   - Mean RHR over 14 days
   - Standard deviation (SD)

### Why 14 Days?
- Captures week-to-week variability
- Sufficient to establish personal norms
- Accounts for menstrual cycle variations (for women)
- Based on sports science research (Plews et al., 2013)

## Calculated Metrics

### Readiness Score
Automatically calculated when core metrics are submitted:

**Formula** (weighted average):
- Sleep Quality: 40%
- Sleep Duration: 20% (7-9 hours optimal)
- HRV: 25% (normalized to 0-100 scale)
- RHR: 15% (normalized, inverse scale)

**Range**: 0-100
- 80-100: Optimal recovery
- 70-79: Good recovery
- 60-69: Fair recovery
- <60: Poor recovery (intervention triggered)

## Integration with Platform Features

### 1. **Nutrition Target Adjustment**
- Low HRV/high RHR → increase carbs by 10-15%
- Poor sleep quality → shift carbs to evening meals
- High training load → increase protein by 0.2g/kg

### 2. **Intervention Triggers**
Stored in `intervention_logs` table with supporting research citations:
- HRV decline trigger with literature support
- RHR elevation trigger with evidence
- Sleep quality intervention with timing recommendations

### 3. **RED-S Risk Assessment**
Poor biometrics combined with low energy availability:
- Persistent HRV decline + EA <30 kcal/kg FFM
- Triggers clinical referral recommendation

### 4. **Reverse Diet Protocol Monitoring**
- Tracks metabolic recovery via HRV/RHR normalization
- Adjusts weekly calorie increases based on biometric response
- Documents metabolic adaptation reversal

### 5. **TDEE Estimation Refinement**
- Activity metrics (steps, active calories) improve TDEE accuracy
- Reduces reliance on formula-based estimates
- Enables detection of metabolic adaptation

## Data Visualization

### Current Displays
1. **HRV Trend Chart**: 7-day rolling average with baseline bands (mean ± 1 SD)
2. **RHR Trend**: Mini line chart with baseline reference
3. **Sleep Timeline**: Sleep stage visualization (when detailed data available)
4. **Sleep Quality Trend**: 7-day trend
5. **Historical Data Table**: Last 14 days with color-coded quality indicators

### Future Enhancements
- Correlation analysis (HRV vs. training load)
- Predicted recovery timelines
- Intervention effectiveness tracking

## Evidence Base

### Key Research Papers
1. **HRV and Recovery**
   - Plews et al. (2013): "Training adaptation and heart rate variability in elite endurance athletes"
   - DOI: 10.1055/s-0032-1312623

2. **Sleep and Performance**
   - Simpson et al. (2017): "Sleep restriction and negative energy balance effects"
   - DOI: 10.1113/JP273433

3. **Device Accuracy**
   - Kholghi et al. (2022): "Validation of consumer-grade wearables"
   - DOI: 10.3390/s22010187

4. **Intervention Timing**
   - Impey et al. (2018): "Fuel for the work required: practical implications"
   - DOI: 10.1007/s40279-018-0860-6

## Best Practices

### For Users
1. **Consistency**: Log metrics at the same time each day (morning preferred)
2. **Accuracy**: Use device readings rather than estimates when possible
3. **Completeness**: At minimum, log the 4 core metrics daily
4. **Context**: Advanced metrics improve recommendations but aren't required

### For Interpretation
1. **Personal Baselines**: Never compare to population norms
2. **Trends Over Time**: Single-day metrics less meaningful than 3-7 day trends
3. **Context Matters**: Consider external stressors (work, life events, illness)
4. **Device Reliability**: Higher CCC devices require smaller changes to trigger interventions

## API Endpoints

### Save Manual Metrics
```
POST /api/v1/biometrics/manual
```

### Get Daily Summary
```
GET /api/v1/biometrics/daily
```

### Get Historical Data
```
GET /api/v1/biometrics/history?days=30
```

### Get Baseline Status
```
GET /api/v1/biometrics/baseline
```

### Get Trends
```
GET /api/v1/biometrics/trends
```

## Database Schema

### biometrics Table
```sql
create table public.biometrics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  date date not null,
  
  -- Core metrics
  hrv_rmssd_ms numeric(6,2),
  resting_hr_bpm int,
  sleep_duration_hrs numeric(4,2),
  sleep_quality_score int,
  
  -- Sleep architecture
  deep_sleep_hrs numeric(4,2),
  rem_sleep_hrs numeric(4,2),
  light_sleep_hrs numeric(4,2),
  sleep_efficiency_percent int,
  
  -- Activity metrics
  steps int,
  active_calories int,
  training_load int,
  recovery_time_hrs int,
  
  -- Metadata
  source_device varchar(50),
  device_accuracy_ccc numeric(4,3),
  
  -- Calculated
  readiness_score int,
  
  created_at timestamp with time zone default now(),
  unique(user_id, date)
);
```

### users Table (Baseline Fields)
```sql
-- In public.users table
baseline_established boolean default false,
baseline_start_date date,
baseline_hrv_mean numeric(6,2),
baseline_hrv_sd numeric(6,2),
baseline_rhr_mean int,
baseline_rhr_sd numeric(4,2)
```

## Future Enhancements

### Phase 1 (Current)
- ✅ Manual input form with validation
- ✅ Automatic baseline calculation
- ✅ Historical data table
- ✅ Basic visualization

### Phase 2 (Near-term)
- 📋 Bulk import from CSV
- 📋 Edit/delete historical entries
- 📋 Weekly/monthly summary reports
- 📋 Export data to CSV

### Phase 3 (Medium-term)
- 📋 API integration with Terra (multi-wearable platform)
- 📋 Automated sync from WHOOP, Garmin, Oura
- 📋 Correlation analysis dashboard
- 📋 Predictive recovery modeling

### Phase 4 (Long-term)
- 📋 Machine learning for personalized thresholds
- 📋 Advanced sleep stage analysis
- 📋 Training load optimization recommendations
- 📋 Integration with training periodization
