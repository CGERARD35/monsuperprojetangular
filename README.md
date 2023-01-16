```ts
import './style.css';

import {
  of,
  map,
  Observable,
  Subject,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
} from 'rxjs';

of('World')
  .pipe(
    map((name) => `Hello, ${name}!`),
    map((name) => `bonjour, ${name}!`),
    map((name) => `diez mat 1, ${name}!`)
  )
  .subscribe(console.log);

function log(prefix: string, obsName: string, value: any) {
  console.log(`[${prefix}] ${obsName} : ${value}`);
}

function subject() {
  const prefix = 'subject';
  const subject1 = new Subject<number>();
  subject1.next(1);
  subject1.next(2);

  const obs1 = subject1.asObservable().subscribe((d) => log(prefix, 'obs1', d));
  subject1.next(3);
  const obs2 = subject1.asObservable().subscribe((d) => log(prefix, 'obs2', d));
  subject1.next(4);
  obs1.unsubscribe();
  subject1.next(5);
}

function behaviorSubject() {
  const prefix = 'behaviorSubject';
  const behaviorSubject1 = new BehaviorSubject<number>(0);
  behaviorSubject1.next(1);
  behaviorSubject1.next(2);

  log(prefix, 'none', behaviorSubject1.value);

  const obs1 = behaviorSubject1
    .asObservable()
    .subscribe((d) => log(prefix, 'obs1', d));
  behaviorSubject1.next(3);
  const obs2 = behaviorSubject1
    .asObservable()
    .subscribe((d) => log(prefix, 'obs2', d));
  behaviorSubject1.next(4);
  obs1.unsubscribe();
  behaviorSubject1.next(5);
}

function replaySubject() {
  const prefix = 'replaySubject';
  const replaySubject1 = new ReplaySubject<number>(3);
  replaySubject1.next(0);
  replaySubject1.next(1);
  replaySubject1.next(2);

  const obs1 = replaySubject1
    .asObservable()
    .subscribe((d) => log(prefix, 'obs1', d));
  replaySubject1.next(3);
  const obs2 = replaySubject1
    .asObservable()
    .subscribe((d) => log(prefix, 'obs2', d));
  replaySubject1.next(4);
  obs1.unsubscribe();
  replaySubject1.next(5);
}

function asyncSubject() {
  const prefix = 'asyncSubject';
  const asyncSubject = new AsyncSubject<number>();
  asyncSubject.next(0);
  asyncSubject.next(1);
  asyncSubject.next(2);

  const obs1 = asyncSubject.asObservable().subscribe({
    next: (d) => log(prefix, 'obs1', d),
    error: (error) => console.error(error),
    complete: () => log(prefix, 'obs1', 'FINITO !!'),
  });
  asyncSubject.next(3);
  const obs2 = asyncSubject.asObservable().subscribe({
    next: (d) => log(prefix, 'obs2', d),
    error: (error) => console.error(error),
    complete: () => log(prefix, 'obs2', 'FINITO !!'),
  });
  asyncSubject.next(4);

  asyncSubject.complete();

  obs1.unsubscribe();
  asyncSubject.next(5);

  asyncSubject.complete();
}

function behaviorSubject_errors() {
  const prefix = 'behaviorSubject_errors';
  const behaviorSubject1 = new BehaviorSubject<number>(0);
  behaviorSubject1.next(1);
  behaviorSubject1.next(2);

  const obs1 = behaviorSubject1.asObservable().subscribe({
    next: (d) => log(prefix, 'obs1', d),
    error: (error) => console.error(error),
    complete: () => log(prefix, 'obs1', 'FINITO !!'),
  });
  behaviorSubject1.next(3);
  const obs2 = behaviorSubject1.asObservable().subscribe({
    next: (d) => log(prefix, 'obs2', d),
    error: (error) => console.error(error),
    complete: () => log(prefix, 'obs2', 'FINITO !!'),
  });
  behaviorSubject1.next(4);
  obs1.unsubscribe();
  behaviorSubject1.error('this is an error !!');
  behaviorSubject1.complete();
  behaviorSubject1.next(5);
}

function behaviorSubject_complete() {
  const prefix = 'behaviorSubject_errors';
  const behaviorSubject1 = new BehaviorSubject<number>(0);
  behaviorSubject1.next(1);
  behaviorSubject1.next(2);

  const obs1 = behaviorSubject1.asObservable().subscribe({
    next: (d) => log(prefix, 'obs1', d),
    error: (error) => console.error(error),
    complete: () => log(prefix, 'obs1', 'FINITO !!'),
  });
  behaviorSubject1.next(3);
  const obs2 = behaviorSubject1.asObservable().subscribe({
    next: (d) => log(prefix, 'obs2', d),
    error: (error) => console.error(error),
    complete: () => log(prefix, 'obs2', 'FINITO !!'),
  });
  behaviorSubject1.next(4);
  behaviorSubject1.complete();
  obs1.unsubscribe();
  behaviorSubject1.error('this is an error !!');
  behaviorSubject1.next(5);
}

/*
  Subject => Il permet d'envoyer sans stocké de donnée
  Utilisation => Envoyer une donnée "unitaire" à un moment donné
*/
subject();

/*
  BehaviorSubject => Il permet d'envoyer une donnée et de la stocké pour la réutiliser plus tard
  Utilisation => Stocker le dernier état de la donnée
*/
behaviorSubject();

/*
  ReplaySubject => Il permet d'envoyer une donnée et de la stocké avec les N derniere pour les réutiliser plus tard
  Utilisation => faire du cache avec auto destruction au bout d'un certain temps si renseigné
*/
replaySubject();

/*
  AsyncSubject => Il permet d'envoyer la derniere donnée avec que l'observable soit "complete()"
  Utilisation => attendre la fin d'une action avant d'envoyer la donnée
*/
asyncSubject();
// behaviorSubject_errors();
// behaviorSubject_complete();


```
