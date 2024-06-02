import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FakeServiceService {
  getInfoFromBackend = () => toSignal(of('Client app').pipe(delay(500)));
}
