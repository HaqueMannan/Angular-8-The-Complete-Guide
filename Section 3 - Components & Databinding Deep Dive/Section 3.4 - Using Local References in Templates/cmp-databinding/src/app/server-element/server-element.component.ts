import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
   selector: 'app-server-element',
   templateUrl: './server-element.component.html',
   styleUrls: ['./server-element.component.css'],
   encapsulation: ViewEncapsulation.Emulated       // Emulated (Default), None, Native, ShadowDom
})

export class ServerElementComponent implements OnInit {
   @Input('srvElement') element: {type: string, name: string, content: string};

   constructor() { }

   ngOnInit() {
   }
}