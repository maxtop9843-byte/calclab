export type AverageWageLocale = "ko" | "en";

export const averageWageContent = {
  ko: {
    title: "평균임금 계산기",
    metaTitle: "평균임금 계산기 | 1일 평균임금 계산",
    description:
      "사유 발생 전 3개월간 임금총액과 산정기간 총일수로 1일 평균임금과 30일분 평균임금을 계산합니다.",
    category: "근로·급여 계산기",
    intro:
      "퇴직금·휴업수당·재해보상 등의 기초가 되는 평균임금을 간편하게 확인하세요.",
    input: "평균임금 조건",
    wageTotal: "산정기간 임금총액",
    wagePlaceholder: "예: 9,000,000",
    calendarDays: "산정기간 총일수",
    daysPlaceholder: "예: 92",
    calculate: "평균임금 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 결과",
    daily: "1일 평균임금",
    thirtyDay: "30일분 평균임금",
    annualized: "연 환산 금액",
    note: "원 단위 반올림 전 정밀값으로 계산한 추정치입니다.",
    details: "계산 상세",
    total: "포함한 임금총액",
    days: "나눈 총일수",
    formula: "임금총액 ÷ 산정기간 총일수",
    empty: "계산하면 적용한 금액과 일수가 표시됩니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "근로기준법상 평균임금은 산정 사유 발생 전 3개월간 지급된 임금총액을 그 기간의 총일수로 나눈 금액입니다.",
      "30일분 평균임금은 계산된 1일 평균임금에 30을 곱합니다.",
      "상여금·연차수당은 법적 포함 범위를 확인한 뒤 임금총액에 반영해야 합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "업무상 재해 요양, 출산전후휴가, 사용자 귀책 휴업 등 법정 제외기간은 입력 일수와 임금총액에서 함께 제외해야 합니다.",
      "산출 평균임금이 통상임금보다 낮으면 통상임금이 평균임금으로 적용될 수 있으나 이 계산기는 자동 비교하지 않습니다.",
      "실제 정산에는 급여대장과 고용노동부 또는 노무 전문가의 확인이 필요합니다.",
    ],
    faq: [
      [
        "3개월은 항상 90일인가요?",
        "아닙니다. 달력상 3개월의 실제 총일수에 따라 보통 89~92일이 될 수 있습니다.",
      ],
      [
        "세전 금액을 입력하나요?",
        "네. 소득세와 4대보험을 공제하기 전 임금총액을 기준으로 입력합니다.",
      ],
      [
        "상여금도 포함하나요?",
        "정기성·지급 기준에 따라 포함 범위가 달라질 수 있으므로 실제 산정에서는 지급 규정과 공식 안내를 확인하세요.",
      ],
      [
        "퇴직금으로 바로 사용할 수 있나요?",
        "평균임금은 퇴직금 산식의 한 요소입니다. 계속근로기간과 통상임금 비교 등은 별도로 확인해야 합니다.",
      ],
    ],
    reference: "국가법령정보센터 근로기준법 제2조",
  },
  en: {
    title: "Korean Average Wage Calculator",
    metaTitle: "Korean Average Wage Calculator",
    description:
      "Calculate Korean average daily wage and a 30-day amount from total wages and calendar days in the calculation period.",
    category: "Employment calculator",
    intro:
      "Estimate the average wage used as a basis for severance, shutdown allowance, and statutory compensation.",
    input: "Average wage inputs",
    wageTotal: "Total wages in period",
    wagePlaceholder: "e.g. 9,000,000",
    calendarDays: "Calendar days in period",
    daysPlaceholder: "e.g. 92",
    calculate: "Calculate average wage",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated result",
    daily: "Average daily wage",
    thirtyDay: "30-day average wage",
    annualized: "Annualized amount",
    note: "An estimate calculated at full precision before display rounding.",
    details: "Calculation details",
    total: "Included total wages",
    days: "Calendar-day divisor",
    formula: "Total wages ÷ calendar days",
    empty: "Calculate to see the applied amount and divisor.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Under the Korean Labor Standards Act, average wage is total wages paid during the three months before the relevant event divided by total calendar days in that period.",
      "The 30-day amount multiplies average daily wage by 30.",
      "Include bonuses and unused-leave pay only after confirming their legally applicable allocation.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "Statutory excluded periods must be removed from both wages and days.",
      "If calculated average wage is below ordinary wage, ordinary wage may apply; this calculator does not compare them.",
      "Use payroll records and official or professional guidance for an actual settlement.",
    ],
    faq: [
      [
        "Is three months always 90 days?",
        "No. The actual calendar period commonly ranges from 89 to 92 days.",
      ],
      [
        "Should I enter pre-tax wages?",
        "Yes. Enter wages before income tax and social-insurance deductions.",
      ],
      [
        "Are bonuses included?",
        "Treatment depends on payment rules and legal allocation; confirm the official guidance for your case.",
      ],
      [
        "Can this directly calculate severance?",
        "Average wage is only one part of severance calculation. Service period and ordinary-wage comparison also matter.",
      ],
    ],
    reference: "Korean Labor Standards Act, Article 2",
  },
} as const;
