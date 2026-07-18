export type DsrLocale = "ko" | "en";

export const dsrContent = {
  ko: {
    title: "DSR 계산기",
    metaTitle: "DSR 계산기 | 총부채원리금상환비율 계산",
    description:
      "연소득, 기존 연간 원리금 상환액과 신규 대출 조건으로 예상 DSR을 계산합니다.",
    category: "대출 계산기",
    intro:
      "신규 원리금균등상환 대출을 포함한 연간 원리금 부담이 소득에서 차지하는 비율을 확인하세요.",
    input: "소득과 대출 조건",
    annualIncome: "연소득",
    existingDebt: "기존 연간 원리금 상환액",
    newLoan: "신규 대출금",
    interestRate: "신규 대출 연이율",
    termYears: "상환 기간",
    calculate: "DSR 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 DSR",
    dsr: "총부채원리금상환비율",
    monthlyPayment: "신규 대출 월 상환액",
    annualDebt: "총 연간 원리금 상환액",
    details: "상환 부담 상세",
    newAnnualDebt: "신규 대출 연간 상환액",
    existingAnnualDebt: "기존 연간 상환액",
    income: "입력 연소득",
    empty: "계산하면 예상 DSR과 상환 부담이 표시됩니다.",
    note: "원리금균등상환을 가정한 계획용 추정치이며 금융기관의 실제 DSR 심사와 다를 수 있습니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "DSR은 모든 대출의 연간 원리금 상환액을 연소득으로 나눈 뒤 100을 곱합니다.",
      "신규 대출은 입력한 금리와 기간에 따른 원리금균등 월 상환액을 12배해 반영합니다.",
      "기존 대출은 사용자가 입력한 연간 원리금 상환액을 더합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "금융기관은 대출 종류별 만기·상환방식과 인정소득을 별도 기준으로 산정할 수 있습니다.",
      "스트레스 금리, 예외 대출, 규제 비율 등 실제 심사 규정은 이 계산에 반영되지 않습니다.",
      "대출 결정 전 금융기관에서 개인별 한도와 적용 기준을 확인하세요.",
    ],
    faq: [
      [
        "DSR이란 무엇인가요?",
        "총부채원리금상환비율로, 연소득 대비 모든 대출의 연간 원리금 상환 부담을 나타냅니다.",
      ],
      [
        "기존 대출에는 무엇을 입력하나요?",
        "주택담보대출, 신용대출 등 기존 부채의 한 해 원금과 이자 상환액 합계를 입력합니다.",
      ],
      [
        "40% 이하면 대출이 가능한가요?",
        "반드시 그렇지는 않습니다. 규제와 금융기관 심사, 소득 인정 방식에 따라 결과가 달라집니다.",
      ],
      [
        "신규 대출 상환 방식은 무엇인가요?",
        "원리금균등상환을 가정합니다. 다른 방식의 실제 연간 상환액과 차이가 날 수 있습니다.",
      ],
    ],
  },
  en: {
    title: "DSR Calculator",
    metaTitle: "DSR Calculator",
    description:
      "Estimate debt service ratio from annual income, existing annual debt service, and a new loan scenario.",
    category: "Loan calculator",
    intro:
      "See how annual principal-and-interest payments, including a new amortizing loan, compare with income.",
    input: "Income and loan inputs",
    annualIncome: "Annual income",
    existingDebt: "Existing annual debt service",
    newLoan: "New loan amount",
    interestRate: "New loan annual interest rate",
    termYears: "Repayment term",
    calculate: "Calculate DSR",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated DSR",
    dsr: "Debt service ratio",
    monthlyPayment: "New loan monthly payment",
    annualDebt: "Total annual debt service",
    details: "Debt service details",
    newAnnualDebt: "New loan annual debt service",
    existingAnnualDebt: "Existing annual debt service",
    income: "Annual income entered",
    empty: "Calculate to see the estimated DSR and debt-service amounts.",
    note: "A planning estimate assuming level monthly payments; a lender's actual DSR assessment may differ.",
    explanationTitle: "How it is calculated",
    explanation: [
      "DSR equals total annual principal-and-interest payments divided by annual income, multiplied by 100.",
      "The new loan uses a level-payment amortization estimate; its monthly payment is multiplied by 12.",
      "Your existing annual debt-service amount is added to the new-loan estimate.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "Lenders may apply separate rules for recognized income, loan type, maturity, and repayment method.",
      "Stress rates, excluded loans, and current regulatory thresholds are not modeled.",
      "Confirm your personal limit and applicable rules with a lender before borrowing.",
    ],
    faq: [
      [
        "What is DSR?",
        "Debt service ratio compares all annual principal-and-interest payments with annual income.",
      ],
      [
        "What counts as existing debt service?",
        "Enter the total principal and interest you repay in one year across existing debts.",
      ],
      [
        "Does a DSR below 40% guarantee approval?",
        "No. Regulations, lender underwriting, and recognized income can change eligibility.",
      ],
      [
        "Which repayment method is assumed?",
        "The new loan uses level monthly principal-and-interest payments; other methods can produce different annual amounts.",
      ],
    ],
  },
} as const;
