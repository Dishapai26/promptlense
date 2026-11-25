import { Component, computed, signal } from '@angular/core';
import { scorePrompt } from './scorePrompt';

const WEAK = 'Write about diabetes.';
const STRONG =
  'You are a friendly diabetes nurse educator. Explain how insulin works for beginners in 5 bullet points, under 120 words, avoid medical jargon, and end with one example of a daily routine.';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // One signal holds the text in the box. Everything else is calculated from it.
  prompt = signal(WEAK);

  // computed() reruns automatically whenever `prompt` changes. Instant feedback.
  result = computed(() => scorePrompt(this.prompt()));

  setPrompt(text: string) { this.prompt.set(text); }
  useStrong() { this.prompt.set(STRONG); }
  useWeak() { this.prompt.set(WEAK); }
}
