import { scorePrompt } from './scorePrompt';

describe('scorePrompt', () => {
  it('gives 0 for an empty prompt', () => {
    expect(scorePrompt('').score).toBe(0);
    expect(scorePrompt('   ').score).toBe(0);
  });

  it('gives a low score to a vague prompt', () => {
    const result = scorePrompt('Write about diabetes.');
    expect(result.score).toBe(20); // only the "Clear task" rule passes
    expect(result.label).toBe('Needs work');
  });

  it('gives 100 to a prompt that meets every rule', () => {
    const prompt =
      'You are a friendly nurse. Explain insulin for beginners in 5 bullet points, under 120 words, avoid jargon, with one example.';
    const result = scorePrompt(prompt);
    expect(result.score).toBe(100);
    expect(result.label).toBe('Excellent');
  });

  it('reports which checks failed so the UI can show tips', () => {
    const failed = scorePrompt('Write about diabetes.').checks.filter(c => !c.passed);
    expect(failed.length).toBe(4);
  });
});
