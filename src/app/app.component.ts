import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GeminiService } from './gemini.service';
import { SkeletonComponent } from "./skeleton/skeleton.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, HttpClientModule, SkeletonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-chatbot';

  
  prompt: string = '';

  geminiService: GeminiService = inject(GeminiService);

  loading: boolean = false;

  chatHistory: any[] = [];
  constructor() {
    this.geminiService.getMessageHistory().subscribe((res) => {
      if(res) {
        this.chatHistory.push(res);
      }
    })
  }

  async sendData() {
    if(this.prompt && !this.loading) {
      this.loading = true;
      const data = this.prompt;
      this.prompt = '';
      await this.geminiService.generateText(data);
      this.loading = false;
    }
  }

  formatText(text: string) {
    const result = text.replaceAll('*', '');
    return result;
  }



}
