import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
   selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
   @Input() defaultColour: string = 'transparent';
   @Input('appBetterHighlight') highlightColour: string = 'blue';

   constructor(private elRef: ElementRef, private renderer: Renderer2) {
   }

   ngOnInit() {
      // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
      this.backgroundColor = this.defaultColour;
   }

   @HostBinding('style.backgroundColor') backgroundColor: string;

   @HostListener('mouseenter') mouseover(eventData: Event) {
      // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
      this.backgroundColor = this.highlightColour;
   }

   @HostListener('mouseleave') mouseleave(eventData: Event) {
      // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
      this.backgroundColor = this.defaultColour;
   }
}