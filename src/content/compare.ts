/**
 * The honest comparison table.
 *
 * Every market range below is an *advertised* range observed across Pakistani
 * providers in November 2026 (freelancer and small-studio packages from about
 * PKR 20,000; broader business builds advertised from about PKR 80,000 to
 * 250,000+). They are stated as observed ranges, never as facts about any
 * named company. Our own column is the published pricing, unchanged.
 *
 * The "choose them if" row is deliberately unflattering: a comparison where
 * one column wins every line is an advert, not a decision aid.
 */

export type CompareRow = {
  label: string;
  freelancer: string;
  agency: string;
  here: string;
};

export const COMPARE_ROWS: CompareRow[] = [
  {
    label: "Typical advertised price",
    freelancer: "PKR 20,000–80,000",
    agency: "PKR 80,000–250,000+",
    here: "PKR 150,000+ (published, then scoped in writing)",
  },
  {
    label: "Who does the work",
    freelancer: "Usually the person you message",
    agency: "Senior people pitch, junior people build",
    here: "Muhammad Zarrar, first call to final deploy",
  },
  {
    label: "Time to a real reply",
    freelancer: "Hours, or days if they're mid-project",
    agency: "After a discovery call",
    here: "Within 24 hours, on WhatsApp",
  },
  {
    label: "Diagnosis before the build",
    freelancer: "Rarely offered",
    agency: "Often sold as a separate project",
    here: "Always — and sometimes the audit is the only thing you need",
  },
  {
    label: "Speed on mobile data",
    freelancer: "Depends on the stack they use",
    agency: "Depends on the template",
    here: "Measured, and this site is the published sample",
  },
  {
    label: "What Google receives",
    freelancer: "Sometimes an empty shell",
    agency: "Often whatever the plugin renders",
    here: "Server-rendered HTML on every page — view source and check",
  },
  {
    label: "Who owns the domain and hosting",
    freelancer: "Yours, if you set it up",
    agency: "Frequently the agency",
    here: "Yours from day one, before any deposit",
  },
  {
    label: "Ongoing cost",
    freelancer: "Per change, per conversation",
    agency: "A retainer that starts at launch",
    here: "Optional care plan — the site keeps running without it",
  },
  {
    label: "If it goes wrong",
    freelancer: "The number stops answering",
    agency: "You get an account manager",
    here: "One named person, reachable, with the files in your name",
  },
  {
    label: "Choose them if…",
    freelancer:
      "your budget is under PKR 100,000 and you need a simple presence, not a system",
    agency:
      "you genuinely need a team of twenty, or enterprise integrations over a year",
    here:
      "you want the evidence first, and one accountable person building the fix",
  },
];

export const COLUMNS = [
  { key: "freelancer" as const, label: "Freelancer", note: "One person, low overhead" },
  { key: "agency" as const, label: "Agency", note: "Many people, a sales layer" },
  { key: "here" as const, label: "Zarrar.Solutions", note: "One builder, audit first" },
];
