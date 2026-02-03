# Manual Health Metrics Feature

## Overview

A comprehensive manual health tracking system that mimics wearable device functionality without requiring API integrations. Users can input daily metrics (HRV, RHR, sleep data, activity) which are then used throughout the platform for personalized recommendations and evidence-based interventions.

## Key Features

### ✅ What's Included

1. **User-Friendly Input Form**
   - 4 core required metrics (HRV, RHR, sleep duration, sleep quality)
   - 8 optional advanced metrics (sleep stages, activity data)
   - Collapsible advanced section
   - Date picker with validation
   - Data source tracking
   - Success/error messaging

2. **Automatic Baseline Establishment**
   - Calculates personal HRV/RHR baselines after 14 days
   - Determines statistical thresholds (mean ± SD)
   - Activates intervention system
   - Evidence-based approach (no population norms)

3. **Interactive Device Guide**
   - Step-by-step instructions for 5 major devices
   - WHOOP, Garmin, Oura, Apple Watch, Fitbit
   - Shows exactly where to find each metric
   - Pro tips for consistent logging

4. **Progress Tracking**
   - Baseline status indicator with progress bar
   - Historical data table (last 14 days)
   - Color-coded quality indicators
   - Trend visualization with baseline bands

5. **Evidence-Based Integration**
   - Triggers nutrition interventions (HRV decline ≥7.5%)
   - Adjusts carb timing (sleep quality <70 for 3 days)
   - Detects overtraining (RHR elevation ≥5 bpm)
   - Calculates readiness score
   - All thresholds backed by peer-reviewed research

## Quick Start

### For Users

1. **Navigate to Biometrics page** in the app
2. **Select your device** in the Device Guide
3. **Find your metrics** following the step-by-step instructions
4. **Log daily** in the Manual Metrics Input form
5. **Wait 14 days** for baseline establishment
6. **Receive personalized recommendations** starting day 15

### For Developers

1. **Run database setup**:
   ```bash
   # Execute in Supabase SQL Editor
   # File: SETUP_MANUAL_METRICS.sql
   ```

2. **Deploy code**:
   ```bash
   npm run build
   npm run deploy
   ```

3. **Verify**:
   - Visit `/biometrics`
   - Test form submission
   - Check data appears in charts

## Files Created

### Components
- `components/biometrics/manual-metrics-form.tsx` - Main input form
- `components/biometrics/device-guide.tsx` - Device-specific instructions
- `components/biometrics/baseline-status.tsx` - Progress indicator
- `components/biometrics/metrics-history-table.tsx` - Historical data display

### API Routes
- `app/api/v1/biometrics/manual/route.ts` - Save manual metrics (POST)
- `app/api/v1/biometrics/history/route.ts` - Fetch historical data (GET)

### Documentation
- `MANUAL_HEALTH_METRICS.md` - Comprehensive technical documentation
- `QUICK_START_MANUAL_METRICS.md` - User-friendly quick start guide
- `MANUAL_METRICS_IMPLEMENTATION_SUMMARY.md` - Implementation overview
- `SETUP_MANUAL_METRICS.sql` - Database setup script
- `README_MANUAL_METRICS.md` - This file

### Updated Files
- `app/(app)/biometrics/page.tsx` - Added new components

## Architecture

### Data Flow

```
User Input → Form Validation → API Endpoint → Database
                                      ↓
                          Calculate Readiness Score
                          Assign Device Accuracy
                          Check for Baseline Update
                                      ↓
                          Return Success/Error
                                      ↓
                          Refresh Page → Display Updated Data
```

### Baseline Calculation Flow

```
Day 1-13: Collect Data
    ↓
Day 14: Trigger Baseline Calculation
    ↓
Calculate HRV Mean & SD
Calculate RHR Mean & SD
    ↓
Update users table
    ↓
Activate Intervention System
    ↓
Display Baseline Bands on Charts
```

### Intervention Trigger Flow

```
New Data Logged (Day 15+)
    ↓
Compare to Baseline
    ↓
HRV < (Baseline - 7.5%)? → Trigger Intervention
RHR > (Baseline + 5 bpm) for 2 days? → Trigger Intervention
Sleep Quality < 70 for 3 days? → Carb Timing Adjustment
    ↓
Log Intervention with Research Citations
    ↓
Display Recommendation to User
```

## Evidence Base

### Research Citations

All algorithms are backed by peer-reviewed research:

1. **HRV Thresholds**
   - Plews et al. (2013) - DOI: 10.1055/s-0032-1312623
   - 7.5% decline indicates incomplete recovery

2. **Sleep Quality**
   - Simpson et al. (2017) - DOI: 10.1113/JP273433
   - <70 score correlates with impaired recovery

3. **Device Accuracy**
   - Kholghi et al. (2022) - DOI: 10.3390/s22010187
   - CCC values for consumer wearables

4. **Carb Timing**
   - Impey et al. (2018) - DOI: 10.1007/s40279-018-0860-6
   - Evening carbs improve sleep quality

### Evidence-Based Features

- ✅ Personal baselines (not population norms)
- ✅ 14-day baseline period (captures variability)
- ✅ Smallest Worthwhile Change = 0.5 × SD
- ✅ HRV decline threshold: 7.5%
- ✅ RHR elevation threshold: 5 bpm
- ✅ Sleep quality threshold: <70 for 3 days
- ✅ Device accuracy displayed (CCC values)
- ✅ All interventions cite supporting research

## API Documentation

### POST /api/v1/biometrics/manual

Save manually entered biometrics data.

**Request Body**:
```typescript
{
  date: string // ISO date format (YYYY-MM-DD)
  hrv_rmssd_ms: number // Required, milliseconds
  resting_hr_bpm: number // Required, beats per minute
  sleep_duration_hrs: number // Required, hours (decimal)
  sleep_quality_score: number // Required, 0-100 scale
  
  // Optional advanced metrics
  hrv_sdnn_ms?: number
  sleeping_hr_bpm?: number
  deep_sleep_hrs?: number
  rem_sleep_hrs?: number
  light_sleep_hrs?: number
  sleep_efficiency_percent?: number
  steps?: number
  active_calories?: number
  training_load?: number
  recovery_time_hrs?: number
  source_device: string // manual, whoop, garmin, oura, etc.
}
```

**Response**:
```typescript
{
  success: true,
  data: BiometricsRecord,
  message: "Biometrics saved successfully"
}
```

**Errors**:
- 400: Validation error (missing required fields)
- 401: Unauthorized (no session)
- 500: Database error

### GET /api/v1/biometrics/history?days=30

Fetch historical biometrics data.

**Query Parameters**:
- `days` (optional): Number of days to fetch (default: 30, max: 365)

**Response**:
```typescript
{
  data: BiometricsRecord[],
  count: number
}
```

## Database Schema

### biometrics Table

```sql
create table public.biometrics (
  id uuid primary key,
  user_id uuid references users(id),
  date date not null,
  
  -- Core metrics (required)
  hrv_rmssd_ms numeric(6,2),
  resting_hr_bpm int,
  sleep_duration_hrs numeric(4,2),
  sleep_quality_score int,
  
  -- Advanced metrics (optional)
  hrv_sdnn_ms numeric(6,2),
  sleeping_hr_bpm int,
  deep_sleep_hrs numeric(4,2),
  rem_sleep_hrs numeric(4,2),
  light_sleep_hrs numeric(4,2),
  sleep_efficiency_percent int,
  steps int,
  active_calories int,
  training_load int,
  recovery_time_hrs int,
  
  -- Metadata
  source_device varchar(50),
  device_accuracy_ccc numeric(4,3),
  
  -- Calculated
  readiness_score int,
  recovery_grade varchar(10),
  intervention_triggered boolean,
  
  created_at timestamp with time zone,
  unique(user_id, date)
);
```

### users Table (Baseline Fields)

```sql
-- Added to existing users table
baseline_established boolean default false,
baseline_start_date date,
baseline_hrv_mean numeric(6,2),
baseline_hrv_sd numeric(6,2),
baseline_rhr_mean int,
baseline_rhr_sd numeric(4,2)
```

## Integration with Existing Features

### Nutrition Module
- Low HRV → increase carbs 10-15%
- High RHR → reduce training volume recommendation
- Poor sleep → shift carbs to evening meals
- Adjustments appear in macro calculator

### Intervention System
- Monitors HRV/RHR vs. baseline
- Triggers when thresholds exceeded
- Logs intervention with supporting research
- Displays recommendations with confidence levels

### RED-S Risk Assessment
- Combines biometrics with energy availability
- Persistent HRV decline + low EA → high risk
- Clinical referral recommended when appropriate

### Reverse Diet Protocol
- Tracks metabolic recovery via HRV/RHR
- Adjusts weekly increases based on response
- Documents metabolic adaptation reversal

### TDEE Estimation
- Uses active calories and steps
- Improves accuracy over formula-based estimates
- Detects metabolic adaptation

## Testing

### Manual Test Checklist

- [ ] Form validation (required fields, ranges)
- [ ] Successful data submission
- [ ] Duplicate date handling (update existing)
- [ ] Advanced metrics collapsible section
- [ ] Device guide tabs
- [ ] Baseline calculation (14 days)
- [ ] Historical data display
- [ ] Chart updates
- [ ] Intervention triggers
- [ ] API error handling

### Test Data

```typescript
// Minimal valid input
{
  date: "2026-02-03",
  hrv_rmssd_ms: 45.5,
  resting_hr_bpm: 58,
  sleep_duration_hrs: 7.5,
  sleep_quality_score: 85,
  source_device: "manual"
}

// Complete input with advanced metrics
{
  date: "2026-02-03",
  hrv_rmssd_ms: 45.5,
  resting_hr_bpm: 58,
  sleep_duration_hrs: 7.5,
  sleep_quality_score: 85,
  deep_sleep_hrs: 1.5,
  rem_sleep_hrs: 1.8,
  light_sleep_hrs: 4.2,
  sleep_efficiency_percent: 92,
  steps: 8500,
  active_calories: 450,
  training_load: 250,
  recovery_time_hrs: 24,
  source_device: "whoop"
}
```

## Troubleshooting

### Common Issues

**"Baseline not calculating after 14 days"**
- Verify all 14 days have HRV and RHR values
- Check for gaps in date sequence
- Ensure values are > 0

**"Form validation errors"**
- All 4 core metrics are required
- Values must be in valid ranges:
  - HRV: 0-200 ms
  - RHR: 30-120 bpm
  - Sleep: 0-12 hours
  - Quality: 0-100

**"Data not appearing in charts"**
- Check browser console for errors
- Verify API response is 200
- Ensure RLS policies allow user access
- Check date is not in future

**"Device guide not showing my device"**
- Currently supports: WHOOP, Garmin, Oura, Apple Watch, Fitbit
- For other devices, use "Manual" as source
- Follow general HRV/RHR/sleep metric patterns

## Future Enhancements

### Phase 1 (Near-term)
- [ ] Bulk CSV import
- [ ] Edit/delete historical entries
- [ ] Weekly/monthly summary reports
- [ ] Export data to CSV
- [ ] Mobile-optimized input

### Phase 2 (Medium-term)
- [ ] Terra API integration (multi-device aggregator)
- [ ] Automated sync from WHOOP, Garmin, Oura
- [ ] Correlation analysis dashboard
- [ ] Predictive recovery modeling
- [ ] Training load recommendations

### Phase 3 (Long-term)
- [ ] Machine learning for personalized thresholds
- [ ] Advanced sleep stage analysis
- [ ] Integration with training periodization
- [ ] Menstrual cycle tracking integration
- [ ] Performance prediction models

## Contributing

When contributing to this feature:

1. **Maintain Evidence Base**: All new thresholds/recommendations must cite peer-reviewed research
2. **User Experience**: Prioritize simplicity and consistency
3. **Data Quality**: Validate inputs rigorously
4. **Privacy**: All data is user-owned and secured with RLS
5. **Documentation**: Update docs for any API/schema changes

## Support

- **User Guide**: See `QUICK_START_MANUAL_METRICS.md`
- **Technical Docs**: See `MANUAL_HEALTH_METRICS.md`
- **Implementation**: See `MANUAL_METRICS_IMPLEMENTATION_SUMMARY.md`
- **Database**: See `SETUP_MANUAL_METRICS.sql`

## License

Same as parent project.

---

**Built with evidence-based practices for personalized health optimization.**
