export type RoadmapPeriod = {
  id: string;
  label: string;
  title: string;
  summary: string;
  priorities: { title: string; detail: string }[];
  consultantEmphasis: string[];
  mistakes: string[];
};

export const roadmap: RoadmapPeriod[] = [
  {
    id: "grade-9", label: "09", title: "Grade 9 — foundation and exploration", summary: "Build sustainable academic habits and a wide field of genuine exploration.",
    priorities: [
      { title: "Academic habits", detail: "Establish systems for reading, writing, help-seeking, deadlines, and reflection before adding unnecessary difficulty." },
      { title: "Course challenge", detail: "Choose appropriate rigor in context of prerequisites, available courses, adjustment, and wellbeing." },
      { title: "Exploration", detail: "Sample activities and subjects without turning each choice into an admissions tactic." },
      { title: "Relationships", detail: "Participate in class, seek help, and become a reliable member of the school community." },
      { title: "Activity record", detail: "Keep a simple log of time, responsibility, work produced, contribution, and reflection." },
      { title: "Summer", detail: "Consider rest, work, local learning, service, creative practice, family needs, and skill building." },
    ],
    consultantEmphasis: ["Avoid premature specialization.", "Identify learning supports early.", "Keep exploration separate from résumé optimization."],
    mistakes: ["Treating freshman choices as irreversible.", "Adding advanced courses before learning routines are stable.", "Starting an activity only for perceived admissions value."],
  },
  {
    id: "grade-10", label: "10", title: "Grade 10 — direction and depth", summary: "Review academic sequence and identify a few areas worth deeper investment.",
    priorities: [
      { title: "Course sequence", detail: "Map prerequisites through senior year and increase rigor only where preparation supports it." },
      { title: "Diagnostic testing", detail: "Use full-length SAT and ACT diagnostics to inform—not dominate—a future plan." },
      { title: "Activity depth", detail: "Notice which commitments are becoming meaningful; release shallow obligations when appropriate." },
      { title: "Academic direction", detail: "Explore two or three possible areas through courses, reading, conversations, and small projects." },
      { title: "Summer plan", detail: "Choose feasible work, learning, contribution, project, or recovery based on interests and constraints." },
      { title: "Financial conversation", detail: "Introduce family budget, net price, and geographic constraints without requiring a final college list." },
    ],
    consultantEmphasis: ["Do not force a permanent ‘spike.’", "Distinguish genuine interest from external pressure.", "Treat financial fit as normal planning."],
    mistakes: ["Overloading the junior-year plan without checking prerequisites.", "Using one diagnostic as a label.", "Maintaining every activity to avoid ‘looking inconsistent.’"],
  },
  {
    id: "grade-11", label: "11", title: "Grade 11 — evidence and preparation", summary: "Protect junior-year learning while converting interests and constraints into a researched application plan.",
    priorities: [
      { title: "Academic performance", detail: "Sustain strong work in appropriately rigorous courses and address problems early." },
      { title: "Testing", detail: "Prepare, test, and complete a bounded plan when possible; verify school policies by cycle." },
      { title: "Contribution", detail: "Document responsibility, initiative, impact, employment, care, and reflection with accuracy." },
      { title: "College research", detail: "Research curriculum, programs, place, support, culture, and cost across a wide range of schools." },
      { title: "Recommendations", detail: "Identify teachers with firsthand knowledge and prepare school-approved context before summer." },
      { title: "Preliminary list", detail: "Build a broad, balanced, and financially informed working list before summer." },
    ],
    consultantEmphasis: ["Junior-year academic performance matters greatly.", "Complete testing when it remains useful.", "Begin serious fit and affordability analysis."],
    mistakes: ["Building an Ivy-only list.", "Waiting until fall to ask for recommendations.", "Letting testing displace coursework, sleep, or meaningful commitments."],
  },
  {
    id: "summer-after-11", label: "S11", title: "Summer after grade 11 — application preparation", summary: "Turn the student’s real record into an accurate, researched application plan while protecting authorship.",
    priorities: [
      { title: "Application account", detail: "Review platform requirements and begin factual sections with consistent information." },
      { title: "Inventories", detail: "Compile activities, honors, responsibilities, employment, context, and missing dates without exaggeration." },
      { title: "Personal statement", detail: "Brainstorm, draft, pause, and revise through student reflection; do not ghostwrite." },
      { title: "Supplement research", detail: "Map each prompt to specific institutional research rather than generic praise." },
      { title: "College list", detail: "Finalize a preliminary balanced list with usable likely and financially likely options." },
      { title: "Calendar and aid", detail: "Track application, recommendation, testing, FAFSA, CSS Profile, and institutional deadlines." },
    ],
    consultantEmphasis: ["Maintain student authorship.", "Leave time for reflection and revision.", "Prepare regular-decision work before early results."],
    mistakes: ["Writing an essay to a formula.", "Postponing all regular applications.", "Assuming the family can solve aid forms after submission."],
  },
  {
    id: "grade-12", label: "12", title: "Grade 12 — execution", summary: "Submit accurate work on a balanced timeline while maintaining academics, health, and decision options.",
    priorities: [
      { title: "August–September", detail: "Confirm list, early strategy, application facts, essay plan, recommenders, testing, and financial tasks." },
      { title: "October", detail: "Complete early applications, run quality control, verify policies and portals, and continue regular work." },
      { title: "November", detail: "Submit early work, confirm materials, handle interviews, and continue regular essays and aid forms." },
      { title: "December–January", detail: "Interpret early outcomes, submit remaining applications, send required reports, and verify portals." },
      { title: "February–March", detail: "Maintain performance, send only meaningful updates, compare aid records, and respond to deferrals carefully." },
      { title: "April–May", detail: "Compare full options and aid, choose by deadlines, withdraw other applications, and complete enrollment tasks." },
    ],
    consultantEmphasis: ["Protect accuracy and student voice under deadline pressure.", "Do not let an early result define the student.", "Review cost before enrollment."],
    mistakes: ["Submitting without portal verification.", "Stopping senior-year effort.", "Comparing colleges without comparing financial commitments."],
  },
  {
    id: "post-submission", label: "POST", title: "Post-submission and decision period", summary: "Use restrained communication, compare real options, and close the process responsibly.",
    priorities: [
      { title: "Portal review", detail: "Confirm required materials and respond to legitimate requests through official channels." },
      { title: "Interviews", detail: "Prepare for a thoughtful conversation without scripting or overinterpreting availability." },
      { title: "Updates", detail: "Send new, material information only when permitted and useful." },
      { title: "Deferral and waitlist", detail: "Follow instructions, communicate concise continued interest if appropriate, and keep other plans active." },
      { title: "Decision comparison", detail: "Compare education, community, support, cost, debt, and student preferences—not only reputation." },
      { title: "Closure", detail: "Enroll by the deadline, withdraw other active applications, thank supporters, and preserve accurate records." },
    ],
    consultantEmphasis: ["Treat waitlists as uncertain.", "Compare aid conditions, not just grant totals.", "Support a healthy transition away from admissions status."],
    mistakes: ["Sending repeated low-value updates.", "Holding multiple enrollment deposits without a valid documented reason.", "Allowing prestige to erase fit or affordability concerns."],
  },
];
