export type MinimumWageLocale = "ko" | "en";

export const minimumWageContent = {
  ko: {
    title: "최저임금 계산기",
    metaTitle: "2026 최저임금 계산기",
    description:
      "2026년 최저시급 10,320원을 기준으로 주 소정근로시간에 따른 최저 주급과 월 환산액을 계산합니다.",
    category: "근로·급여 계산기",
    intro:
      "주 소정근로시간과 유급 주휴시간 포함 여부를 바탕으로 최저임금 기준의 세전 금액을 간편하게 확인하세요.",
    input: "근로 시간",
    weeklyHours: "주 소정근로시간",
    holiday: "유급 주휴시간을 포함합니다 (주 15시간 이상인 경우)",
    calculate: "최저임금 계산하기",
    reset: "초기화",
    result: "2026년 최저임금 기준",
    hourly: "최저 시급",
    weekly: "예상 최저 주급",
    monthly: "월 환산 최저임금",
    error: "주 소정근로시간을 1~40시간 범위로 입력하세요.",
    resultNote:
      "월 환산액은 주급에 평균 4.345주를 곱한 세전 비교용 추정치입니다.",
    explanationTitle: "계산 기준",
    explanation: [
      "2026년 법정 최저시급 10,320원을 사용합니다.",
      "유급 주휴시간은 주 15시간 이상 선택 시 주 소정근로시간 ÷ 5로 계산하고 8시간을 넘지 않게 합니다.",
      "월 환산액은 주급 × 4.345로 계산하며, 고시상 월 환산 209시간과는 근로 형태에 따라 차이가 날 수 있습니다.",
    ],
    cautionsTitle: "확인할 사항",
    cautions: [
      "최저임금 적용 여부와 산입 임금은 근로계약, 업종, 수습 여부 및 법정 예외에 따라 달라질 수 있습니다.",
      "주휴수당은 주 15시간 이상 및 소정근로일 개근 등 일반 요건을 전제로 한 단순화된 계산입니다.",
      "이 결과는 세전 추정치이며 실제 임금명세서 또는 법률 판단을 대신하지 않습니다.",
    ],
    faq: [
      [
        "2026년 최저시급은 얼마인가요?",
        "2026년 적용 최저시급은 10,320원입니다. 1일 8시간 기준 일급은 82,560원입니다.",
      ],
      [
        "월급 2,156,880원은 어떻게 계산하나요?",
        "주 40시간과 유급 주휴 8시간을 포함한 월 209시간을 기준으로 한 고시상 금액입니다.",
      ],
      [
        "주휴시간을 항상 포함해야 하나요?",
        "주 15시간 이상 근무하고 소정근로일을 개근하는 등 요건을 충족하는지 먼저 확인해야 합니다.",
      ],
      [
        "수습 기간에도 최저임금이 적용되나요?",
        "일부 조건에서는 감액 규정이 적용될 수 있으므로 근로계약과 법정 요건을 확인하세요.",
      ],
    ] as const,
  },
  en: {
    title: "Minimum Wage Calculator",
    metaTitle: "2026 Korean Minimum Wage Calculator",
    description:
      "Estimate weekly and monthly minimum pay from scheduled weekly hours using Korea's 2026 minimum hourly wage of KRW 10,320.",
    category: "Employment calculator",
    intro:
      "Use scheduled weekly hours and paid weekly-holiday treatment to check a simplified pre-tax minimum-pay estimate.",
    input: "Working hours",
    weeklyHours: "Scheduled weekly hours",
    holiday:
      "Include paid weekly-holiday hours (when working at least 15 hours)",
    calculate: "Calculate minimum pay",
    reset: "Reset",
    result: "2026 minimum-wage basis",
    hourly: "Minimum hourly wage",
    weekly: "Estimated minimum weekly pay",
    monthly: "Monthly equivalent",
    error: "Enter scheduled weekly hours from 1 to 40.",
    resultNote:
      "The monthly equivalent is a pre-tax comparison estimate using 4.345 average weeks per month.",
    explanationTitle: "Calculation basis",
    explanation: [
      "Uses the 2026 statutory minimum hourly wage of KRW 10,320.",
      "When selected for at least 15 weekly hours, paid weekly-holiday hours equal weekly hours divided by five, capped at eight hours.",
      "The monthly equivalent is weekly pay times 4.345; it can differ from the official 209-hour monthly reference by work arrangement.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "Coverage and includable wages can differ by contract, industry, probation status, and statutory exceptions.",
      "The weekly-holiday option is a simplified estimate based on general eligibility conditions, including 15 weekly hours and completed scheduled workdays.",
      "This is a pre-tax estimate and does not replace a wage statement or legal determination.",
    ],
    faq: [
      [
        "What is the 2026 minimum hourly wage?",
        "The 2026 Korean minimum hourly wage is KRW 10,320. The eight-hour daily reference is KRW 82,560.",
      ],
      [
        "How is KRW 2,156,880 calculated?",
        "It is the official monthly reference for 209 hours, including 40 weekly work hours and eight paid weekly-holiday hours.",
      ],
      [
        "Should I always include paid weekly-holiday hours?",
        "First confirm the general eligibility requirements, including at least 15 weekly hours and completed scheduled workdays.",
      ],
      [
        "Does minimum wage apply during probation?",
        "A reduced-rate rule may apply only in limited circumstances; check the contract and statutory requirements.",
      ],
    ] as const,
  },
} as const;
