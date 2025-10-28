# Quick Start Guide

## ✅ Setup Complete!

Your Commercial Real Estate Investment Calculator is ready to use.

## Run the App

The Expo dev server is now running. To access it:

### iOS Simulator
Press `i` in the terminal where the server is running, or run:
```bash
npm run ios
```

### Android Emulator
Press `a` in the terminal where the server is running, or run:
```bash
npm run android
```

### Web Browser
Press `w` in the terminal where the server is running, or run:
```bash
npm run web
```

### Physical Device
- **iOS**: Install "Expo Go" from the App Store, then scan the QR code
- **Android**: Install "Expo Go" from the Play Store, then scan the QR code

## What Was Fixed

1. ✅ Removed `expo-router` plugin (using React Navigation instead)
2. ✅ Updated all dependencies to Expo SDK 54 compatible versions
3. ✅ Installed missing `babel-preset-expo` package
4. ✅ Created `babel.config.js` with React Native Reanimated plugin
5. ✅ Installed `react-native-worklets` for reanimated support

## App Features

- **Calculator Screen**: Input property details, loan terms, and projections
- **Results Screen**: View all calculated metrics (NOI, Cap Rate, GRM, DSCR, LTV, Cash-on-Cash, IRR)
- **Recent Screen**: Access previously saved calculations
- **About Screen**: Learn about each financial metric

## Test the Sample Case

Try these inputs to verify the calculator works:

- Purchase Price: `$1,200,000`
- Monthly Rent: `$9,000`
- Operating Expenses (Annual): `$24,000`
- Vacancy Rate: `0`
- Loan Amount: `$780,000`
- Interest Rate: `6.5`
- Amortization: `30` years
- Closing Costs: `3`
- Hold Period: `5` years
- Rent Growth: `2`
- Exit Cap Rate: `7.25`
- Selling Costs: `3`

Expected results should show:
- NOI: $84,000
- Cap Rate: ~7%
- Cash-on-Cash Return: ~5.45%
- IRR: ~7.30%

## Troubleshooting

### If you get errors:
1. Clear the cache: `npm start -- --clear`
2. Reinstall dependencies: `npm install --legacy-peer-deps`
3. Reset Metro bundler cache: `npx expo start --clear`

### Build for Production
```bash
# iOS
eas build --platform ios --profile production

# Android  
eas build --platform android --profile production
```

Enjoy calculating! 🏢📊

