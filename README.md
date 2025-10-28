# Commercial Real Estate Investment Calculator

A production-ready cross-platform mobile app (iOS, Android, Web) built with React Native, Expo, and TypeScript. Calculate key financial metrics for commercial real estate investments including NOI, Cap Rate, GRM, DSCR, LTV, Cash-on-Cash Return, and IRR.

## Features

- **Comprehensive Financial Metrics**: Calculate NOI, Cap Rate, GRM, DSCR, LTV, Cash-on-Cash Return, and IRR
- **IRR Calculation**: Advanced IRR computation using Newton-Raphson method with fallbacks
- **Loan Analysis**: Support for interest-only periods, variable amortization schedules
- **Cash Flow Projections**: Annual cash flow visualization over hold period
- **Offline-First**: All calculations run locally, no internet required
- **Local Persistence**: Save and recall recent calculations
- **Accessible UI**: Large touch targets, high contrast, clear typography
- **Cross-Platform**: Single codebase for iOS, Android, and Web

## Tech Stack

- **Framework**: Expo SDK ~54
- **Language**: TypeScript (strict mode)
- **Navigation**: React Navigation v6
- **Forms**: React Hook Form + Zod
- **State Management**: Zustand
- **Storage**: AsyncStorage
- **Testing**: Jest + React Native Testing Library
- **Linting**: ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- iOS development: Xcode 14+ (for iOS builds)
- Android development: Android Studio (for Android builds)

### Installation

```bash
# Install dependencies
npm install

# Or with yarn
yarn install
```

### Development

```bash
# Start the development server
npm start
# Or
yarn start

# Run on iOS simulator
npm run ios
# Or
yarn ios

# Run on Android emulator
npm run android
# Or
yarn android

# Run on web
npm run web
# Or
yarn web
```

### Testing

```bash
# Run tests
npm test
# Or
yarn test

# Run tests in watch mode
npm run test:watch
# Or
yarn test:watch
```

### Linting and Formatting

```bash
# Run linter
npm run lint
# Or
yarn lint

# Format code
npm run format
# Or
yarn format
```

## Financial Calculations

### Sample Acceptance Test

The calculator includes a comprehensive unit test suite that validates calculations against the following test case:

**Input:**
- Purchase Price: $1,200,000
- Monthly Rent: $9,000 (Annual: $108,000)
- Operating Expenses: $24,000
- Vacancy Rate: 0%
- Loan Amount: $780,000 (65% LTV)
- Interest Rate: 6.5%
- Amortization: 30 years
- Closing Costs: 3%
- Hold Period: 5 years
- Rent Growth: 2% annually
- Exit Cap Rate: 7.25%
- Selling Costs: 3%

**Expected Output:**
- NOI: $84,000
- Cap Rate: 7.00%
- GRM: 11.11
- Annual Debt Service: $59,161.57
- DSCR: 1.42
- LTV: 65%
- Cash-on-Cash Return: 5.45%
- IRR: 7.30%

All calculations are verified within tight tolerances (±0.01%).

### IRR Implementation

The app includes a robust IRR calculation using the Newton-Raphson method with bisection fallback. The implementation:

- Handles variable annual cash flows
- Accounts for rent/expense growth rates
- Includes exit sale proceeds based on cap rate
- Deducts selling costs
- Returns annualized rate

**Limitations**: IRR convergence depends on cash flow patterns. Some edge cases may return approximations rather than exact values.

## Building for Production

### iOS (TestFlight)

1. **Configure EAS**:
   ```bash
   eas build:configure
   ```

2. **Build for iOS**:
   ```bash
   eas build --platform ios --profile production
   ```

3. **Submit to App Store**:
   ```bash
   eas submit --platform ios
   ```

### Android (Play Store)

1. **Build Android APK/AAB**:
   ```bash
   eas build --platform android --profile production
   ```

2. **Submit to Play Store**:
   ```bash
   eas submit --platform android
   ```

### Web

Build and deploy web version:

```bash
npm run build:web
# Or
yarn build:web
```

## Project Structure

```
.
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/             # App screens
│   ├── navigation/          # Navigation configuration
│   ├── hooks/               # Custom React hooks
│   ├── lib/
│   │   ├── finance/         # Financial calculation functions
│   │   ├── storage/         # Local storage utilities
│   │   └── format/          # Number/currency formatting
│   ├── styles/              # Theme and styling
│   └── tests/               # Test utilities
├── App.tsx                   # Root component
├── package.json
├── tsconfig.json
├── jest.config.js
├── .eslintrc.js
├── .prettierrc
└── README.md
```

## Key Features Explained

### NOI (Net Operating Income)
Annual rental income minus operating expenses and vacancy. Represents the property's income after operational costs.

### Cap Rate (Capitalization Rate)
NOI divided by purchase price. Indicates the property's annual return if purchased entirely in cash.

### GRM (Gross Rent Multiplier)
Purchase price divided by annual rent. A lower GRM suggests the property generates more income relative to its price.

### DSCR (Debt Service Coverage Ratio)
NOI divided by annual debt service. A ratio above 1.0 indicates the property generates enough income to cover debt payments.

### LTV (Loan-to-Value)
Loan amount divided by purchase price, expressed as a percentage.

### Cash-on-Cash Return
Annual cash flow (NOI minus debt service) divided by initial cash investment.

### IRR (Internal Rate of Return)
The annualized rate of return over the hold period, accounting for all cash flows.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linter
5. Submit a pull request

## License

MIT

## Disclaimer

This calculator is for educational and estimation purposes only. Actual investment performance may vary significantly. Always consult with qualified financial and legal professionals before making investment decisions. This calculator does not account for tax implications, depreciation, or all potential costs and risks associated with real estate investment.

