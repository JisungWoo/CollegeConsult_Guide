import { caseSchema, validateCollection, type CaseStudy } from "./schema";

const rawCases: CaseStudy[] = [
  {
    id: "perfect-stats", slug: "perfect-stats-prestige-applicant", title: "The perfect-stats prestige applicant", subtitle: "Strong credentials, crowded résumé, unclear direction.",
    facts: [
      { label: "School context", detail: "Large, well-resourced suburban high school offering extensive AP courses." },
      { label: "Transcript", detail: "Exceptional grades in the school’s most advanced program." },
      { label: "Testing", detail: "Very high SAT score." },
      { label: "Activities", detail: "Many memberships and leadership titles; descriptions emphasize breadth over responsibility." },
      { label: "Family", detail: "Parents define success almost entirely through national rankings." },
      { label: "Student concern", detail: "Cannot explain what they want from college beyond access to a prestigious network." },
    ],
    learningGoals: ["Avoid assuming admission from statistics.", "Identify authenticity and fit questions.", "Build non-Ivy and financially usable options.", "Manage prestige pressure without dismissing the family."],
    missingInformation: ["Which commitments does the student choose when no one is evaluating?", "What academic environments and courses produce genuine engagement?", "What financial range and geographic constraints are real?"],
    expertReasoning: ["Academic preparation is strong evidence, but it does not resolve institutional uncertainty.", "The crowded list may conceal contribution; examine roles through specific actions and people affected.", "Begin fit work outside rankings and require multiple likely options the student would attend."],
    cautions: ["Do not convert strong credentials into a predicted admission result."],
  },
  {
    id: "late-engineer", slug: "late-blooming-engineer", title: "The late-blooming engineer", subtitle: "Uneven beginning, strong trajectory, real technical work.",
    facts: [
      { label: "School context", detail: "Public school with limited advanced computing and engineering courses." },
      { label: "Transcript", detail: "Uneven freshman year followed by a sustained upward trend in math and science." },
      { label: "Testing", detail: "Solid score with one planned retest." },
      { label: "Activities", detail: "Designs and repairs low-cost environmental sensors using open-source materials." },
      { label: "Recognition", detail: "No major formal awards; work is documented and used locally." },
      { label: "Finances", detail: "Family requires substantial aid and cannot fund branded summer programs." },
    ],
    learningGoals: ["Interpret trajectory and context.", "Evaluate technical preparation.", "Recognize meaningful work outside prestigious programs.", "Make affordability a primary list dimension."],
    missingInformation: ["What caused the early academic difficulty and what changed?", "Which mathematics sequence is available for senior year?", "Who can verify the project’s process and use?"],
    expertReasoning: ["The upward trend is meaningful when connected to changed habits and stronger preparation.", "The sensor project may show persistence, skill, and contribution without an award.", "The list should include generous-aid institutions and financially likely public or local pathways."],
    cautions: ["Do not romanticize hardship or overstate project impact."],
  },
  {
    id: "overloaded", slug: "overloaded-sophomore", title: "The overloaded sophomore", subtitle: "Too much rigor, too little sleep, no room to care.",
    facts: [
      { label: "Grade", detail: "Tenth grade." },
      { label: "Coursework", detail: "Advanced classes across nearly every available subject." },
      { label: "Wellbeing", detail: "Regularly sleeps fewer than six hours and reports constant anxiety." },
      { label: "Activities", detail: "Seven shallow commitments with overlapping meetings." },
      { label: "Family", detail: "Parent proposes an additional test-prep program and a summer research package." },
      { label: "Student concern", detail: "Believes dropping any commitment will ruin future admission." },
    ],
    learningGoals: ["Protect student health.", "Rebalance rigor.", "Prioritize depth and recovery.", "Communicate boundaries with parents."],
    missingInformation: ["Which academic supports and school professionals are available?", "Which commitments matter to the student?", "Are there health concerns requiring a licensed professional?"],
    expertReasoning: ["The immediate counseling goal is sustainability, not optimization.", "Map course prerequisites and identify where challenge can be reduced without closing key options.", "Refer anxiety or health concerns appropriately while restructuring the workload."],
    cautions: ["A consultant should not diagnose or treat a mental-health condition."],
  },
  {
    id: "contributor", slug: "community-contributor", title: "The community contributor", subtitle: "Work, care, and local responsibility that the student calls ‘ordinary.’",
    facts: [
      { label: "Transcript", detail: "Strong but not perfect grades in an average-sized public school." },
      { label: "Employment", detail: "Works fifteen hours each week at a neighborhood grocery." },
      { label: "Family", detail: "Provides regular care and translation support for younger siblings and grandparents." },
      { label: "Community", detail: "Coordinates an informal food-delivery network through an existing faith community." },
      { label: "Testing", detail: "Limited preparation time and one completed exam." },
      { label: "Student concern", detail: "Believes none of the work ‘counts’ because there are no awards." },
    ],
    learningGoals: ["Recognize responsibility and contribution.", "Document context precisely.", "Avoid unfair access comparisons.", "Help the student articulate impact without exaggeration."],
    missingInformation: ["What decisions and logistics does the student own?", "How do employment and care affect course and activity access?", "Which adults can corroborate the contribution?"],
    expertReasoning: ["Paid and family work are substantive commitments, not omissions from the ‘real’ activity list.", "Quantify time and responsibility accurately while explaining context.", "College-list planning must account for ongoing family and financial needs."],
    cautions: ["Do not turn family hardship into an exploitative narrative."],
  },
  {
    id: "brown-columbia", slug: "brown-or-columbia", title: "Brown or Columbia?", subtitle: "A student wants both maximum freedom and a shared Core.",
    facts: [
      { label: "Interests", detail: "Enjoys literature, physics, and the history of science." },
      { label: "Stated preference", detail: "Says both curricular freedom and a required shared curriculum are essential." },
      { label: "Research", detail: "Has read rankings and campus summaries but few course or requirement pages." },
      { label: "Environment", detail: "Enjoys city visits but has not considered daily density or commuting." },
      { label: "Learning style", detail: "Likes seminars but also changes direction frequently." },
      { label: "Consultant challenge", detail: "Turn a contradiction into useful research rather than naming a winner." },
    ],
    learningGoals: ["Use curriculum fit.", "Ask better questions.", "Compare educational models.", "Improve supplement research."],
    missingInformation: ["When has a requirement improved the student’s learning?", "How does the student make choices with few requirements?", "What daily urban experience do they want?"],
    expertReasoning: ["Brown and Columbia offer opposing forms of academic structure; neither is inherently better.", "Ask the student to build a sample first-year plan under both systems.", "Use the contradiction to clarify whether shared obligation or self-authorship matters more in practice."],
    cautions: ["Do not reduce the comparison to relaxed versus rigorous."],
  },
  {
    id: "nonprofit", slug: "last-minute-nonprofit", title: "The last-minute nonprofit", subtitle: "A title-first plan without demonstrated connection.",
    facts: [
      { label: "Grade", detail: "Eleventh grade, midway through spring." },
      { label: "Proposal", detail: "Create an organization primarily to add ‘founder’ before application season." },
      { label: "History", detail: "No sustained work with the issue the organization claims to address." },
      { label: "Family", detail: "Parent believes selective colleges require nonprofit leadership." },
      { label: "Current commitments", detail: "The student has useful but less flashy ongoing work at a community center." },
      { label: "Consultant challenge", detail: "Challenge the plan without humiliating the family or abandoning ambition." },
    ],
    learningGoals: ["Address unethical résumé manufacturing.", "Redirect toward genuine contribution.", "Explain why title does not equal impact.", "Preserve trust while changing the plan."],
    missingInformation: ["What need has the student already observed through current work?", "What does the community center actually need?", "What outcome does the parent believe the title will guarantee?"],
    expertReasoning: ["Name the mismatch between title and demonstrated commitment without accusing the student of bad character.", "Redirect energy toward a defined need inside the existing organization.", "Explain that concrete responsibility and honest reflection are stronger evidence than a rushed legal shell."],
    cautions: ["Do not promise that the ethical alternative will produce an admission outcome."],
  },
];

export const cases = validateCollection(caseSchema, rawCases);

export function getCase(slug: string) {
  return cases.find((item) => item.slug === slug);
}
