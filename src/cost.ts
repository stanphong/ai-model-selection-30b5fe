// A quick COST/LATENCY model. Not a billing system — a back-of-envelope that
// turns a lever choice into numbers you can defend. Two approaches compared:
//   - a big-model mega-prompt (many tokens per call, slower, pricier)
//   - a small fine-tuned model (few tokens, faster, cheaper at scale)
export interface Approach {
  name: string;
  promptTokens: number;   // tokens sent per call (a fine-tune needs far fewer)
  costPer1kTokens: number; // $ per 1k tokens for this model
  latencyMs: number;
}

export function monthlyCost(a: Approach, calls: number): number {
  return (a.promptTokens / 1000) * a.costPer1kTokens * calls;
}

// The tagger: 5M calls/month, 300ms latency budget, 12 fixed tags.
export const MEGA_PROMPT: Approach = {
  name: 'big model + 1.5k-token mega-prompt',
  promptTokens: 1500,    // few-shot examples + the 12 tag definitions, every call
  costPer1kTokens: 0.005,
  latencyMs: 900,        // blows the 300ms budget
};

export const SMALL_FINETUNE: Approach = {
  name: 'small fine-tuned classifier',
  promptTokens: 40,      // just the ticket — the task is baked into the weights
  costPer1kTokens: 0.0008,
  latencyMs: 120,        // inside the budget
};
