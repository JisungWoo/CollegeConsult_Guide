import { policySchema, validateCollection, type Policy } from "./schema";

const warning = "Recheck the institution’s official website before advising a student or submitting an application.";
const reviewed = "2026-07-10";
const nextReview = "2026-10-01";

const rawPolicies: Policy[] = [
  {
    id: "brown-testing-2026-27", institution: "Brown University", category: "testing", applicationCycle: "2026–27", status: "Test-required", verificationStatus: "current",
    summary: "First-year applicants must submit SAT or ACT scores.", details: "Brown superscores either exam. ACT Science and the writing components are optional. Verify score-submission instructions for the applicant’s cycle.",
    officialSourceUrl: "https://admission.brown.edu/first-year/standardized-tests", sourceTitle: "Brown Undergraduate Admission — Standardized Tests", lastVerifiedAt: reviewed, nextReviewDate: nextReview, reviewWarning: warning,
  },
  {
    id: "brown-early-2026-27", institution: "Brown University", category: "early-application", applicationCycle: "2026–27", status: "Binding Early Decision", verificationStatus: "current",
    summary: "Brown offers binding Early Decision.", details: "Applicants may not also file ED, SCEA, or REA elsewhere. Nonrestrictive EA may remain pending, but admitted students must withdraw other applications. Recheck the current deadline after the application opens.",
    officialSourceUrl: "https://admission.brown.edu/first-year/early-decision", sourceTitle: "Brown Undergraduate Admission — Early Decision", lastVerifiedAt: reviewed, nextReviewDate: nextReview, reviewWarning: warning,
  },
  {
    id: "columbia-testing-2026-27", institution: "Columbia University", category: "testing", applicationCycle: "2026–27", status: "Test-optional", verificationStatus: "current",
    summary: "Columbia College and Engineering applicants for fall 2027 may omit SAT or ACT scores without disadvantage.", details: "Columbia announced required testing beginning with the 2027–28 application cycle for fall 2028 entry, with a hardship-waiver path.",
    officialSourceUrl: "https://communications.news.columbia.edu/news/update-columbia-college-and-columbia-engineering-testing-policy", sourceTitle: "Columbia — Testing Policy Update", lastVerifiedAt: reviewed, nextReviewDate: nextReview, reviewWarning: warning,
  },
  {
    id: "columbia-early-2026-27", institution: "Columbia University", category: "early-application", applicationCycle: "2026–27", status: "Binding Early Decision", verificationStatus: "current",
    summary: "Columbia offers binding Early Decision.", details: "The plan is intended for applicants prepared to enroll if admitted. Verify the exact current-cycle deadline and notification date on the application page.",
    officialSourceUrl: "https://undergrad.admissions.columbia.edu/faq?body_value=&field_question_topics_tid=405&page=0", sourceTitle: "Columbia Undergraduate Admissions — FAQ", lastVerifiedAt: reviewed, nextReviewDate: nextReview, reviewWarning: warning,
  },
  {
    id: "cornell-testing-2026-27", institution: "Cornell University", category: "testing", applicationCycle: "2026–27", status: "Test-required", verificationStatus: "current",
    summary: "All first-year applicants enrolling fall 2026 and beyond must submit SAT or ACT scores.", details: "Cornell accepts self-reported scores for review and requires official scores from enrolling students. It considers superscores.",
    officialSourceUrl: "https://admissions.cornell.edu/how-to-submit-your-standardized-test-scores", sourceTitle: "Cornell Admissions — Standardized Test Scores", lastVerifiedAt: reviewed, nextReviewDate: nextReview, reviewWarning: warning,
  },
  {
    id: "cornell-early-2026-27", institution: "Cornell University", category: "early-application", applicationCycle: "2026–27", status: "Binding Early Decision", verificationStatus: "current",
    summary: "Cornell offers binding Early Decision.", details: "Applicants may hold nonbinding applications elsewhere but must withdraw them if admitted. Cornell describes a financial-aid release when the award does not make attendance affordable. Verify exact dates.",
    officialSourceUrl: "https://admissions.cornell.edu/how-to-apply/first-year-applicants", sourceTitle: "Cornell Admissions — First-Year Applicants", lastVerifiedAt: reviewed, nextReviewDate: nextReview, reviewWarning: warning,
  },
  {
    id: "dartmouth-testing-2026-27", institution: "Dartmouth College", category: "testing", applicationCycle: "2026–27", status: "Test-required", verificationStatus: "current",
    summary: "U.S.-schooled applicants must submit SAT or ACT scores; applicants schooled outside the U.S. have defined alternative test pathways.", details: "International pathways may include AP, IB, A-level, or qualifying national-exam results under Dartmouth’s official guidelines.",
    officialSourceUrl: "https://admissions.dartmouth.edu/apply/testing-policy", sourceTitle: "Dartmouth Admissions — Testing Guidelines", lastVerifiedAt: reviewed, nextReviewDate: nextReview, reviewWarning: warning,
  },
  {
    id: "dartmouth-early-2026-27", institution: "Dartmouth College", category: "early-application", applicationCycle: "2026–27", status: "Binding Early Decision", verificationStatus: "current",
    summary: "Dartmouth offers binding Early Decision.", details: "Applicants may use nonrestricted, nonbinding programs but not another binding or restricted early plan. Dartmouth notes release may be possible for financial hardship. Verify dates.",
    officialSourceUrl: "https://admissions.dartmouth.edu/glossary-term/early-decision", sourceTitle: "Dartmouth Admissions — Early Decision", lastVerifiedAt: reviewed, nextReviewDate: nextReview, reviewWarning: warning,
  },
  {
    id: "harvard-testing-2026-27", institution: "Harvard University", category: "testing", applicationCycle: "2026–27", status: "Test-required", verificationStatus: "current",
    summary: "SAT or ACT is normally required.", details: "When those exams are genuinely inaccessible, Harvard lists specific externally assessed alternatives. English-proficiency exams do not fulfill this requirement.",
    officialSourceUrl: "https://college.harvard.edu/resources/faq/which-standardized-tests-does-harvard-require", sourceTitle: "Harvard College — Standardized Testing FAQ", lastVerifiedAt: reviewed, nextReviewDate: nextReview, reviewWarning: warning,
  },
  {
    id: "harvard-early-2026-27", institution: "Harvard University", category: "early-application", applicationCycle: "2026–27", status: "Nonbinding Restrictive Early Action", verificationStatus: "current",
    summary: "Harvard offers nonbinding Restrictive Early Action.", details: "The plan restricts other private U.S. early applications, with defined exceptions for public, international, military-academy, rolling, and certain scholarship applications. Read the full restriction before advising.",
    officialSourceUrl: "https://college.harvard.edu/admissions/apply/first-year-applicants", sourceTitle: "Harvard College — First-Year Applicants", lastVerifiedAt: reviewed, nextReviewDate: nextReview, reviewWarning: warning,
  },
  {
    id: "penn-testing-2026-27", institution: "University of Pennsylvania", category: "testing", applicationCycle: "2026–27", status: "Verification needed", verificationStatus: "verification-needed",
    summary: "Penn’s official testing page located during review still described the 2025–26 cycle; a 2026–27 rule was not yet cycle-confirmed.", details: "Do not carry the prior-cycle SAT/ACT requirement and hardship-waiver language forward. Reopen the official page after Penn publishes the current cycle.",
    officialSourceUrl: "https://admissions.upenn.edu/how-to-apply/preparing-your-application/testing", sourceTitle: "Penn Admissions — Testing", lastVerifiedAt: reviewed, nextReviewDate: "2026-08-15", reviewWarning: warning,
  },
  {
    id: "penn-early-2026-27", institution: "University of Pennsylvania", category: "early-application", applicationCycle: "2026–27", status: "Binding Early Decision; exact dates need verification", verificationStatus: "verification-needed",
    summary: "Penn confirms a binding Early Decision agreement, but the exact 2026 deadline was not cycle-confirmed at review.", details: "Applicant, parent or guardian, and counselor sign the agreement. Verify the new-cycle deadline before planning.",
    officialSourceUrl: "https://admissions.upenn.edu/how-to-apply/first-year-applicants", sourceTitle: "Penn Admissions — First-Year Applicants", lastVerifiedAt: reviewed, nextReviewDate: "2026-08-15", reviewWarning: warning,
  },
  {
    id: "princeton-testing-2026-27", institution: "Princeton University", category: "testing", applicationCycle: "2026–27", status: "Test-optional", verificationStatus: "current",
    summary: "Applicants for fall 2027 may omit SAT or ACT scores without disadvantage.", details: "Princeton announced a return to required testing for the 2027–28 cycle, covering fall 2028 entry.",
    officialSourceUrl: "https://admission.princeton.edu/apply/standardized-testing", sourceTitle: "Princeton Admission — Standardized Testing", lastVerifiedAt: reviewed, nextReviewDate: nextReview, reviewWarning: warning,
  },
  {
    id: "princeton-early-2026-27", institution: "Princeton University", category: "early-application", applicationCycle: "2026–27", status: "Nonbinding Single-Choice Early Action", verificationStatus: "current",
    summary: "Princeton offers nonbinding Single-Choice Early Action.", details: "Applicants may not apply early to another private U.S. institution. Defined public, service-academy, international, and rolling exceptions apply. Read the full policy before planning.",
    officialSourceUrl: "https://admission.princeton.edu/apply/first-year-application-dates-deadlines", sourceTitle: "Princeton Admission — Dates and Deadlines", lastVerifiedAt: reviewed, nextReviewDate: nextReview, reviewWarning: warning,
  },
  {
    id: "yale-testing-2026-27", institution: "Yale University", category: "testing", applicationCycle: "2026–27", status: "Test-required", verificationStatus: "current",
    summary: "Applicants must submit ACT or SAT scores for the 2026–27 cycle.", details: "AP and IB results no longer independently fulfill the requirement. Yale permits self-reporting; ACT Science and Writing are optional.",
    officialSourceUrl: "https://news.yale.edu/2026/05/27/undergraduate-admissions-updates-testing-policy", sourceTitle: "Yale News — Undergraduate Admissions Updates Testing Policy", lastVerifiedAt: reviewed, nextReviewDate: nextReview, reviewWarning: warning,
  },
  {
    id: "yale-early-2026-27", institution: "Yale University", category: "early-application", applicationCycle: "2026–27", status: "Nonbinding Single-Choice Early Action", verificationStatus: "current",
    summary: "Yale offers nonbinding Single-Choice Early Action.", details: "Other early applications are restricted with specified exceptions for rolling, public, later-notifying, and non-U.S. programs. Read Yale’s current exceptions before advising.",
    officialSourceUrl: "https://admissions.yale.edu/timelines", sourceTitle: "Yale Admissions — Timelines", lastVerifiedAt: reviewed, nextReviewDate: nextReview, reviewWarning: warning,
  },
];

export const policies = validateCollection(policySchema, rawPolicies);

export function getPoliciesForSchool(name: string) {
  return policies.filter((policy) => policy.institution === name);
}
