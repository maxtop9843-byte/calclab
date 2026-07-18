export type RetirementPensionLocale = "ko" | "en";

export const retirementPensionContent = {
  ko: {
    category: "노후 준비",
    title: "퇴직연금 계산기",
    description:
      "매월 적립하는 금액과 예상 수익률로 퇴직연금의 미래 가치를 계산합니다.",
    intro: "예상 수익률을 적용한 참고용 계산 결과입니다.",
    input: "적립 조건",
    monthlyContribution: "월 적립액",
    years: "적립 기간 (년)",
    annualReturnRate: "예상 연 수익률 (%)",
    calculate: "계산하기",
    reset: "초기화",
    result: "예상 퇴직연금",
    principal: "총 납입액",
    estimatedBalance: "예상 적립금",
    investmentGain: "예상 운용수익",
    empty: "조건을 입력하면 예상 적립금을 확인할 수 있습니다.",
    note: "실제 수익률과 수수료, 납입 시점에 따라 결과는 달라질 수 있습니다.",
    error: "올바른 금액, 기간, 수익률을 입력해 주세요.",
    explanationTitle: "계산 방법",
    explanation: [
      "매월 말에 같은 금액을 납입하는 것으로 가정합니다.",
      "연 수익률을 월 수익률로 환산해 복리로 계산합니다.",
    ],
    cautionsTitle: "확인하세요",
    cautions: [
      "이 결과는 세금과 수수료를 반영하지 않은 추정치입니다.",
      "퇴직연금 상품의 위험도와 수익률을 함께 확인하세요.",
    ],
    faq: [
      [
        "퇴직연금은 언제 받을 수 있나요?",
        "일반적으로 퇴직 후 연금 또는 일시금으로 수령합니다.",
      ],
      [
        "수익률을 높게 넣어도 되나요?",
        "장기 기대수익률을 보수적으로 설정해 여러 시나리오를 비교하세요.",
      ],
    ],
  },
  en: {
    category: "Retirement planning",
    title: "Retirement Pension Calculator",
    description:
      "Estimate the future value of retirement contributions using a projected return.",
    intro:
      "This is an illustrative estimate based on the return rate you enter.",
    input: "Contribution details",
    monthlyContribution: "Monthly contribution",
    years: "Contribution period (years)",
    annualReturnRate: "Expected annual return (%)",
    calculate: "Calculate",
    reset: "Reset",
    result: "Estimated retirement pension",
    principal: "Total contributions",
    estimatedBalance: "Estimated balance",
    investmentGain: "Estimated investment gain",
    empty: "Enter your details to see an estimated balance.",
    note: "Actual results vary with returns, fees, and contribution timing.",
    error: "Enter a valid amount, period, and return rate.",
    explanationTitle: "How it works",
    explanation: [
      "The estimate assumes equal contributions at the end of every month.",
      "The annual return is converted to a monthly compound rate.",
    ],
    cautionsTitle: "Keep in mind",
    cautions: [
      "This estimate excludes taxes and fees.",
      "Review product risk and expected returns before investing.",
    ],
    faq: [
      [
        "When can I receive a retirement pension?",
        "It is generally received as an annuity or lump sum after retirement.",
      ],
      [
        "Can I use a high return rate?",
        "Compare several conservative long-term return scenarios.",
      ],
    ],
  },
} as const;
