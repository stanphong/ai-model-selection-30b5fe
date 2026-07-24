// A tiny EVAL stub: the point isn't to run it, it's to show that every lever
// choice must come with the eval that would PROVE it. For the policy bot, the
// eval that matters is FRESHNESS: after a policy is edited, does the system
// answer with the NEW value? Fine-tuning would fail this by construction.
export interface EvalCase {
  question: string;
  expected: string;     // the CURRENT correct answer
  afterEdit?: boolean;  // this case checks behavior after a policy change
}

export const FRESHNESS_EVAL: EvalCase[] = [
  { question: 'How many vacation days do I get?', expected: '20 (updated this month from 18)', afterEdit: true },
  { question: 'What is the remote-work policy?', expected: 'Hybrid: 3 days in office (changed in Q2)', afterEdit: true },
];

// The proof: a system PASSES only if it reflects the post-edit value. RAG reads
// the current doc → passes. A model fine-tuned last month → answers the OLD
// value → fails. The eval encodes the binding constraint as a test.
export function describesFreshness(c: EvalCase): boolean {
  return c.afterEdit === true;
}
