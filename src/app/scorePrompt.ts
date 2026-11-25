// The whole "brain" of PromptLens. No React here, just plain TypeScript,
// so it is easy to test and easy to explain.

export interface Rule {
  key: string;      // name shown to the user
  pattern: RegExp;  // if the prompt matches this, the check passes
  tip: string;      // what to do when the check fails
}

// Five rules. Each one is worth 20 points, so the maximum score is 100.
export const RULES: Rule[] = [
  {
    key: 'Context',
    pattern: /\b(you are|act as|as an? |context|i am|i'm|my (team|project|goal|company)|we are|background)\b/i,
    tip: 'Say who the AI should act as, or give a line of background.'
  },
  {
    key: 'Clear task',
    pattern: /\b(write|explain|summari[sz]e|create|generate|list|compare|translate|review|fix|draft|analy[sz]e|describe|plan|build|suggest|rewrite)\b/i,
    tip: 'Start with an action word such as write, compare or summarize.'
  },
  {
    key: 'Limits',
    pattern: /\b(must|only|at most|no more than|under \d+|within \d+|exactly|avoid|do not|don't|\d+\s*(words|sentences|bullets|points|lines|minutes))\b/i,
    tip: 'Add a limit, for example a word count or something to avoid.'
  },
  {
    key: 'Output format',
    pattern: /\b(table|bullets?|json|markdown|numbered|steps|paragraphs?|csv|headings?|as a list|format)\b/i,
    tip: 'Name the output shape: a table, bullet points, JSON or steps.'
  },
  {
    key: 'Example or audience',
    pattern: /\b(for example|e\.g\.|such as|example|input:|output:|audience|beginners?|students?|for (a|an|my) )/i,
    tip: 'Add an example, or say who the answer is for.'
  }
];

export interface CheckResult { key: string; passed: boolean; tip: string; }
export interface ScoreResult { score: number; label: string; checks: CheckResult[]; }

const POINTS_PER_RULE = 100 / RULES.length; // 20

const LABELS: [number, string][] = [
  [0, 'Vague'], [20, 'Needs work'], [40, 'Basic'],
  [60, 'Decent'], [80, 'Strong'], [100, 'Excellent']
];

export function scorePrompt(prompt: string): ScoreResult {
  const text = prompt.trim();
  const checks = RULES.map(rule => ({
    key: rule.key,
    tip: rule.tip,
    passed: text.length > 0 && rule.pattern.test(text)
  }));
  const score = checks.filter(c => c.passed).length * POINTS_PER_RULE;
  // Pick the highest label whose threshold the score has reached.
  const label = [...LABELS].reverse().find(([min]) => score >= min)![1];
  return { score, label, checks };
}
