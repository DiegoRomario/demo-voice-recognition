import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {

  constructor(private zone: NgZone) { }

  record(): Observable<string> {
    return Observable.create(observer => {
      const { webkitSpeechRecognition }: IWindow = window as IWindow;
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = e => this.zone.run( () => observer.next(e.results.item(e.results.length - 1).item(0).transcript));
      recognition.onerror = e => observer.error(e);
      recognition.onend = () => observer.complete();
      recognition.lang = 'pt-BR';
      recognition.start();
    });
  }

  search(): Observable<string> {
    return Observable.create(observer => {
      const { webkitSpeechRecognition }: IWindow = window as IWindow;
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'pt-BR';
      recognition.start();

      recognition.onresult = e => this.zone.run( () =>
        observer.next(e.results.item(e.results.length - 1).item(0).transcript));
      });
    }
  }

