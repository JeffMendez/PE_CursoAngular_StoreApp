import { CommonModule } from '@angular/common';
import { Component, Input, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration = 0;
  @Input({required: true}) message = '';
  counter = signal(0);
  counterRef: number | undefined;

  // Ciclo de vida de componente
  // Orden 1
  constructor() {
    // No es Async
    // Se ejecuta antes de render
    // Es para declarar variables directas e inyecciones.
    console.log(1, 'Constructor');
  }

  // Orden 2
  ngOnChanges(changes: SimpleChanges) {
    // Se ejecuta antes y durante render
    console.log(2, 'OnChanges', changes);
  }

  // Orden 3
  ngOnInit() {
    // Luego del render, se ejecuta una vez. Ya se permiten async
    console.log(3, 'OnInit', `Duration: ${this.duration} - Message: ${this.message}`);
    this.counterRef = window.setInterval(() => {
      console.log('Run interval');
      this.counter.update(statePrev => statePrev + 100);
    }, this.duration);
  }

  // Orden 4
  ngAfterViewInit() {
    // Se ejecuta cuando los hijos de este componente ya fueron renderizados
    console.log(4, 'AfterViewInit');
  }

  // Orden 5
  ngOnDestroy() {
    // Cuando se destruye el componente
    // Importante para evitar el memory leak
    console.log(5, 'OnDestroy');
    window.clearInterval(this.counterRef);
  }

  doSomething() {
    console.log('doSomething');
  }
}
