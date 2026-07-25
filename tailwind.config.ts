import type { Config } from 'tailwindcss'
import { tokens } from './src/styles/tokens'

/**
 * Tailwind theme is derived from `src/styles/tokens.ts` — do not diverge hex values here.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wyze: {
          purple: {
            DEFAULT: tokens.colors.purple,
            dark: tokens.colors.purpleDark,
            light: tokens.colors.purpleLight,
          },
          blue: {
            DEFAULT: tokens.colors.blue,
            dark: tokens.colors.blueDark,
            link: tokens.colors.blue,
            unlimited: tokens.colors.camUnlimited,
          },
          teal: {
            DEFAULT: tokens.colors.teal,
            savings: tokens.colors.tealSavings,
          },
          navy: tokens.colors.navy,
        },
        surface: {
          page: tokens.colors.pageBg,
          card: tokens.colors.cardBg,
          review: tokens.colors.reviewBg,
          muted: tokens.colors.muted,
        },
        border: {
          DEFAULT: tokens.colors.border,
          light: tokens.colors.borderLight,
          selected: tokens.colors.borderSelected,
          divider: tokens.colors.borderDivider,
        },
        text: {
          primary: tokens.colors.textPrimary,
          navy: tokens.colors.textNavy,
          secondary: tokens.colors.textMuted,
          muted: tokens.colors.textMuted,
          compare: tokens.colors.textCompare,
          body: tokens.colors.textSecondary,
        },
        chip: {
          active: tokens.colors.chipActiveBg,
          'active-border': tokens.colors.chipActiveBorder,
          inactive: tokens.colors.chipInactiveBorder,
        },
        price: {
          compare: tokens.colors.compareRed,
          active: tokens.colors.priceActive,
        },
        stepper: {
          border: tokens.colors.stepperBorder,
          plus: tokens.colors.stepperPlusBg,
          minus: tokens.colors.stepperMinusIcon,
          icon: tokens.colors.stepperPlusIcon,
          qty: tokens.colors.qtyText,
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        'step-label': [
          '11px',
          { lineHeight: '16px', letterSpacing: '0.08em', fontWeight: '600' },
        ],
        category: [
          '11px',
          { lineHeight: '16px', letterSpacing: '0.06em', fontWeight: '700' },
        ],
      },
      borderRadius: {
        card: tokens.radius.card,
        button: tokens.radius.button,
        badge: tokens.radius.badge,
        chip: tokens.radius.chip,
      },
      boxShadow: {
        card: tokens.shadow.card,
        review: tokens.shadow.review,
      },
      maxWidth: {
        builder: tokens.maxWidth.builder,
        review: tokens.maxWidth.review,
        page: tokens.maxWidth.page,
      },
    },
  },
  plugins: [],
}

export default config
