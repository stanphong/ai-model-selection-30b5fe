// The four LEVERS for shaping an AI feature. Picking the right one is the whole
// game — and the right one is decided by the problem's BINDING CONSTRAINT
// (freshness, format-at-scale, capability), not by what is fashionable.
export type Lever = 'prompt' | 'rag' | 'finetune' | 'rightsize';

export const LEVERS: Record<Lever, string> = {
  prompt:
    'Prompt engineering: instruct a capable base model with context in the request. ' +
    'Cheapest to build and change. Best when the model already CAN do the task.',
  rag:
    'Retrieval-augmented generation: fetch relevant docs at query time and ground ' +
    'the answer in them. Best when the task needs FRESH or private FACTS.',
  finetune:
    'Fine-tuning: train a model on examples so a behavior/FORMAT is baked in. ' +
    'Best for a NARROW, STABLE task at high volume where a big prompt is costly.',
  rightsize:
    'Right-sizing: pick a bigger model for missing CAPABILITY, or a smaller one ' +
    'to cut cost/latency once quality is met. A dial, not a default.',
};

// THE FRAMEWORK, distilled: name the binding constraint, map it to the lever,
// then prove it with an eval (and a cost model when scale is in play).
export const CONSTRAINT_TO_LEVER: Record<string, Lever> = {
  'facts change / must be fresh or private': 'rag',
  'narrow stable format at high volume / tight latency': 'finetune',
  'base model already capable / low volume': 'prompt',
  'task is beyond the current model / needs more capability': 'rightsize',
};
