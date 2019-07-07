import { SpeechRecognitionService } from './speech-recognition.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  search = '';
  url = 'https://www.google.com/search?q=';

  constructor(private speech: SpeechRecognitionService, private router: Router) {
  }
  Record() {
    this.speech.record()
    .subscribe(e => this.title = e);
  }
  Search() {
    this.speech.search()
    .subscribe(e =>  { this.search = this.url + e; setTimeout(() => window.open(this.url + e, '_blank'), 600); });
  }
}
