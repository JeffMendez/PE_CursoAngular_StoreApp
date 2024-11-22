import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  // Las directivas sirven para hacer manipulaciones del DOM de forma directa
  element = inject(ElementRef);

  constructor() { }

  ngOnInit() {
    this.element.nativeElement.style.color = "red";
  }
}
