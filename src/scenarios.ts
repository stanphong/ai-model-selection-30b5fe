// Three product requirements we'll decide on, one per step. Each names the
// problem and a quantitative sheet (volume, latency budget, data) so the choice
// is made on CONSTRAINTS, not vibes. `proposed` is the team's first instinct —
// and in each case it is the WRONG lever, recommended confidently.
import { Lever } from './levers.js';

export interface Scenario {
  id: string;
  requirement: string;
  proposed: Lever;       // the team's (wrong) first instinct
  monthlyCalls: number;
  latencyBudgetMs: number;
  notes: string;
}

export const SCENARIOS: Record<string, Scenario> = {
  policyBot: {
    id: 'policyBot',
    requirement: 'Answer employee questions about company policies that change every few weeks.',
    proposed: 'finetune',
    monthlyCalls: 20_000,
    latencyBudgetMs: 4000,
    notes: 'Policies are edited often; answers must reflect the CURRENT version.',
  },
  tagger: {
    id: 'tagger',
    requirement: 'Classify 5M support tickets/month into a fixed set of 12 routing tags. Same task forever.',
    proposed: 'prompt',
    monthlyCalls: 5_000_000,
    latencyBudgetMs: 300,
    notes: 'Narrow, stable output format; enormous volume; tight latency budget.',
  },
  summarizer: {
    id: 'summarizer',
    requirement: 'Summarize a meeting transcript into 3 bullet points. Low volume, internal tool.',
    proposed: 'finetune',
    monthlyCalls: 500,
    latencyBudgetMs: 8000,
    notes: 'A strong base model already does this well with a good prompt.',
  },
};
