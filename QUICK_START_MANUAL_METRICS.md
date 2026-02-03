# Quick Start: Manual Health Metrics

## 🎯 What You Need to Track (Minimum)

Every morning, log these 4 core metrics:

1. **Overnight HRV** (Heart Rate Variability in milliseconds)
2. **Resting Heart Rate** (RHR in beats per minute)
3. **Sleep Duration** (total hours of sleep)
4. **Sleep Quality Score** (0-100 scale)

## 📱 Where to Find Your Metrics

### WHOOP 4.0
1. Open WHOOP app
2. Go to **Recovery** screen
3. Note down:
   - HRV (shown in ms)
   - Resting Heart Rate (bpm)
4. Tap **Sleep** tab
5. Note down:
   - Total Sleep (convert to hours, e.g., 7h 30m = 7.5)
   - Sleep Performance % (this is your quality score)

### Garmin (Fenix, Forerunner, etc.)
1. Open Garmin Connect app
2. Go to **Morning Report** or tap the **☰ menu** → **Health Stats**
3. Note down:
   - HRV Status (last night's HRV in ms)
   - Resting Heart Rate (bpm)
4. Tap **Sleep** widget
5. Note down:
   - Sleep Time (hours)
   - Sleep Score (0-100)

### Oura Ring
1. Open Oura app
2. Go to **Readiness** tab
3. Note down:
   - HRV (ms) - tap the HRV card to see the value
   - Resting Heart Rate (bpm)
4. Go to **Sleep** tab
5. Note down:
   - Total Sleep (hours)
   - Sleep Score (0-100)

### Apple Watch
1. Open **Health** app on iPhone
2. Tap **Browse** → **Heart**
3. Tap **Heart Rate Variability**
   - Find the most recent overnight reading (usually in ms)
4. Go back, tap **Resting Heart Rate**
   - Note today's RHR (bpm)
5. Go back to Browse → **Sleep**
6. Note down:
   - Time Asleep (hours)
   - Sleep quality: Calculate as (Time Asleep / Time in Bed) × 100

### Fitbit
1. Open Fitbit app
2. Go to **Today** tab
3. Scroll to **Heart Rate** card
   - Tap to see HRV (called "HRV Summary")
   - Note Resting Heart Rate (bpm)
4. Scroll to **Sleep** card
5. Note down:
   - Sleep Duration (hours)
   - Sleep Score (0-100)

## 🖥️ How to Log Your Metrics

1. Navigate to **Biometrics** page in your app
2. Find the **Manual Health Metrics Input** form
3. Select today's date (or the date of the metrics)
4. Enter your 4 core metrics:
   - Overnight HRV (ms)
   - Resting Heart Rate (bpm)
   - Sleep Duration (hours)
   - Sleep Quality Score (0-100)
5. (Optional) Click **Advanced Metrics** to add:
   - Sleep stages (deep, REM, light sleep hours)
   - Steps, active calories, training load
6. Select your data source from dropdown
7. Click **Save Daily Metrics**

## 📊 What Happens Next

### Days 1-13: Baseline Collection Phase
- Your metrics are being collected
- Charts and trends will start appearing
- No interventions triggered yet (need baseline first)

### Day 14: Baseline Established! 🎉
- Your personal HRV baseline is automatically calculated
- Your personal RHR baseline is set
- These are YOUR norms (not population averages)
- Platform can now detect meaningful changes

### Day 15+: Active Monitoring
- HRV drops ≥7.5% from baseline → triggers nutrition intervention
- RHR rises ≥5 bpm for 2+ days → additional intervention signal
- Sleep quality <70 for 3+ days → carb timing adjustment
- All recommendations backed by research citations

## 💡 Pro Tips

### Consistency is Key
- Log at the same time each morning
- Ideally within 30 minutes of waking
- Before coffee, exercise, or stress

### Don't Stress About Single Days
- One bad night doesn't matter
- We look at 3-7 day trends
- Context matters (travel, stress, illness)

### Advanced Metrics = Better Insights
If your device provides them, logging these improves recommendations:
- Sleep stages (deep, REM, light)
- Steps and active calories → better TDEE estimation
- Training load → prevents overtraining

### Device Matters (But Not That Much)
- Oura Ring: Most accurate (CCC 0.99)
- WHOOP: Highly accurate (CCC 0.94)
- Garmin: Good (CCC 0.87)
- Apple Watch/Fitbit: Acceptable (CCC 0.83-0.85)

**All devices are good enough for trend tracking!**

## 🚨 Troubleshooting

### "I don't see HRV on my device"
- Garmin: May need to enable in settings → Physiological Metrics
- Apple Watch: Needs to be worn overnight, check Health app history
- Fitbit: Only available on Sense, Charge 5+, Versa 3+

### "My HRV seems way too high/low"
- HRV is highly individual (20-100+ ms is normal)
- Don't compare to others
- Your baseline will be YOUR norm

### "Sleep quality score isn't 0-100"
- Some devices use different scales
- Estimate: <6/10 = 60, 7/10 = 70, 8/10 = 80, 9/10 = 90, 10/10 = 100

### "I missed a day"
- No problem! Log the next day
- Try to log within 24 hours of waking
- Don't try to estimate old data

## 📈 What You'll See

### Immediately
- Your data appears in the historical table
- Charts update to show trends
- Current metrics displayed

### After 14 Days
- Baseline bands appear on HRV chart
- Readiness score becomes more accurate
- Intervention system activates
- Personalized recommendations based on YOUR data

## 🔬 The Science Behind It

### Why These Metrics?
- **HRV**: Most sensitive marker of recovery and autonomic nervous system status
- **RHR**: Complements HRV, indicates cardiovascular stress
- **Sleep**: Critical for recovery, hormone balance, and performance
- **Quality Score**: Captures sleep efficiency and disturbances

### Why 14 Days?
- Captures week-to-week variability
- Accounts for menstrual cycle (if applicable)
- Sufficient for statistical reliability
- Standard in sports science research

### Personal Baselines > Population Norms
- HRV range: 20-80ms? 40-100ms? Both normal!
- Genetics, fitness, age all factor in
- Only YOUR baseline matters for YOUR recommendations
- This is evidence-based (Plews et al., 2013)

## 📚 Next Steps

1. **Start logging daily** (even if you miss days, keep going)
2. **Watch for baseline establishment** (14 days)
3. **Review intervention recommendations** when they appear
4. **Track changes** after implementing recommendations
5. **Refine over time** as the system learns your patterns

## 🆘 Need Help?

- Check `MANUAL_HEALTH_METRICS.md` for detailed documentation
- Review evidence base in research tab
- All algorithms cite peer-reviewed research
- System prioritizes recognition over recall (context always visible)

---

**Remember**: This system mimics wearable device functionality. The goal is to use YOUR personal data to make science-backed recommendations that are personalized to YOU, not generic advice based on population averages.

Start logging today! 🚀
