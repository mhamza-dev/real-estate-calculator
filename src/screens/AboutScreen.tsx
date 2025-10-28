import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components';
import { spacing, fontSize, fontWeight, iconSize, borderRadius } from '../styles';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
    const { colors } = useTheme();

    const features = [
        {
            icon: 'calculator',
            title: 'Quick Analysis',
            description: 'Calculate NOI, Cap Rate, GRM, DSCR, LTV, Cash-on-Cash Return, and IRR instantly',
        },
        {
            icon: 'chart-line',
            title: 'IRR Projections',
            description: 'Advanced IRR calculations with rent/expense growth rates and exit cap rate analysis',
        },
        {
            icon: 'time',
            title: 'Save & Recall',
            description: 'Save your calculations locally and access them anytime, even offline',
        },
        {
            icon: 'trending-up',
            title: 'Cash Flow Visualization',
            description: 'See projected cash flows over your hold period in an easy-to-read format',
        },
        {
            icon: 'moon',
            title: 'Dark Mode',
            description: 'Switch between light and dark themes for comfortable viewing in any environment',
        },
    ];

    const tips = [
        'Enter accurate rental income figures (annual or monthly)',
        'Include all operating expenses for precise NOI calculations',
        'Adjust growth rates based on market conditions',
        'Use exit cap rate to estimate sale proceeds',
        'Save calculations to track multiple properties',
    ];

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: colors.background }]}
            contentContainerStyle={{ paddingBottom: spacing.xxxl }}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.content}>
                <View style={styles.headerContainer}>
                    <View style={[styles.iconBadge, { backgroundColor: colors.primary + '20' }]}>
                        <Ionicons name="calculator" size={iconSize.xl} color={colors.primary} />
                    </View>
                    <Text style={[styles.appTitle, { color: colors.text }]}>Real Estate Investment Calculator</Text>
                    <Text style={[styles.appSubtitle, { color: colors.textSecondary }]}>Make informed investment decisions</Text>
                </View>

                <Card style={styles.featureSection}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="sparkles" size={iconSize.md} color={colors.primary} />
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Features</Text>
                    </View>
                    {features.map((feature, index) => (
                        <View key={index} style={[styles.featureCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <View style={[styles.featureIconContainer, { backgroundColor: colors.primary + '15' }]}>
                                <Ionicons name={feature.icon as any} size={iconSize.md} color={colors.primary} />
                            </View>
                            <View style={styles.featureContent}>
                                <Text style={[styles.featureTitle, { color: colors.text }]}>{feature.title}</Text>
                                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>{feature.description}</Text>
                            </View>
                        </View>
                    ))}
                </Card>

                <Card style={styles.howToSection}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="bulb" size={iconSize.md} color={colors.warning} />
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>How to Use</Text>
                    </View>
                    <View style={styles.stepsContainer}>
                        {[
                            'Navigate to Calculator tab',
                            'Enter property purchase price and rent',
                            'Input operating expenses and vacancy rate',
                            'Specify loan details (amount, rate, term)',
                            'Set IRR projection parameters',
                            'Tap Calculate to see all metrics',
                        ].map((step, index) => (
                            <View key={index} style={styles.stepItem}>
                                <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                                </View>
                                <Text style={[styles.stepText, { color: colors.textSecondary }]}>{step}</Text>
                            </View>
                        ))}
                    </View>
                </Card>

                <Card style={styles.metricsSection}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="analytics" size={iconSize.md} color={colors.success} />
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>Understanding Metrics</Text>
                    </View>
                    <View style={styles.metricGrid}>
                        {[
                            { label: 'NOI', desc: 'Net Operating Income' },
                            { label: 'Cap Rate', desc: 'NOI / Purchase Price' },
                            { label: 'GRM', desc: 'Gross Rent Multiplier' },
                            { label: 'DSCR', desc: 'Debt Service Coverage Ratio' },
                            { label: 'LTV', desc: 'Loan-to-Value' },
                            { label: 'Cash-on-Cash', desc: 'Annual return on cash invested' },
                            { label: 'IRR', desc: 'Internal Rate of Return' },
                        ].map((metric, index) => (
                            <View key={index} style={[styles.metricChip, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                                <Text style={[styles.metricLabel, { color: colors.text }]}>{metric.label}</Text>
                                <Text style={[styles.metricDesc, { color: colors.textSecondary }]}>{metric.desc}</Text>
                            </View>
                        ))}
                    </View>
                </Card>

                <Card style={styles.tipsSection}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="shield-checkmark" size={iconSize.md} color={colors.info} />
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>Pro Tips</Text>
                    </View>
                    {tips.map((tip, index) => (
                        <View key={index} style={styles.tipItem}>
                            <Ionicons name="checkmark-circle" size={iconSize.sm} color={colors.success} />
                            <Text style={[styles.tipText, { color: colors.textSecondary }]}>{tip}</Text>
                        </View>
                    ))}
                </Card>

                <Card style={styles.disclaimerSection}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="information-circle" size={iconSize.md} color={colors.warning} />
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>Disclaimer</Text>
                    </View>
                    <Text style={[styles.disclaimerText, { color: colors.textSecondary }]}>
                        This calculator is for educational and estimation purposes only. Actual investment performance may vary significantly. Always
                        consult with qualified financial and legal professionals before making investment decisions. This calculator does not account
                        for tax implications, depreciation, or all potential costs and risks.
                    </Text>
                </Card>

                <View style={styles.footer}>
                    <Text style={[styles.version, { color: colors.textSecondary }]}>Version 1.0.0</Text>
                    <Text style={[styles.footerText, { color: colors.textSecondary }]}>Made with ❤️ for real estate investors</Text>
                    <View style={[styles.footerBadge, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]}>
                        <Ionicons name="rocket" size={iconSize.sm} color={colors.primary} />
                        <Text style={[styles.footerBadgeText, { color: colors.primary }]}>Powered by Modern Technology</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: spacing.md,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: spacing.lg,
        gap: spacing.sm,
    },
    iconBadge: {
        borderRadius: borderRadius.xl,
        padding: spacing.md,
        marginBottom: spacing.sm,
    },
    appTitle: {
        fontSize: fontSize['2xl'],
        fontWeight: fontWeight.bold,
        textAlign: 'center',
    },
    appSubtitle: {
        fontSize: fontSize.base,
        textAlign: 'center',
    },
    featureSection: {
        marginBottom: spacing.md,
    },
    howToSection: {
        marginBottom: spacing.md,
    },
    metricsSection: {
        marginBottom: spacing.md,
    },
    tipsSection: {
        marginBottom: spacing.md,
    },
    disclaimerSection: {
        marginBottom: spacing.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
        gap: spacing.sm,
    },
    sectionTitle: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold,
    },
    featureCard: {
        flexDirection: 'row',
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        marginBottom: spacing.sm,
        gap: spacing.md,
    },
    featureIconContainer: {
        borderRadius: borderRadius.md,
        padding: spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.semibold,
        marginBottom: spacing.xs,
    },
    featureDescription: {
        fontSize: fontSize.sm,
        lineHeight: spacing.md + 4,
    },
    stepsContainer: {
        gap: spacing.sm,
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    stepNumber: {
        width: spacing.lg,
        height: spacing.lg,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepNumberText: {
        color: '#FFF',
        fontSize: fontSize.sm,
        fontWeight: fontWeight.bold,
    },
    stepText: {
        fontSize: fontSize.sm,
        flex: 1,
    },
    metricGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    metricChip: {
        padding: spacing.sm,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        minWidth: '45%',
    },
    metricLabel: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold,
        marginBottom: spacing.xs / 2,
    },
    metricDesc: {
        fontSize: fontSize.xs,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    tipText: {
        fontSize: fontSize.sm,
        flex: 1,
    },
    disclaimerText: {
        fontSize: fontSize.sm,
        lineHeight: spacing.md + 4,
    },
    footer: {
        marginTop: spacing.lg,
        marginBottom: spacing.xxl,
        alignItems: 'center',
        gap: spacing.xs,
    },
    version: {
        fontSize: fontSize.sm,
        marginBottom: spacing.xs,
    },
    footerText: {
        fontSize: fontSize.sm,
    },
    footerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        marginTop: spacing.sm,
    },
    footerBadgeText: {
        fontSize: fontSize.xs,
        fontWeight: fontWeight.semibold,
    },
});
