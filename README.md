# Angular 3D Model Viewer using Angular Three and Three.js

This project demonstrates how to load and display an external 3D model (GLTF/GLB format) in an Angular application using [Angular Three](https://github.com/angular-three/angular-three), [Three.js](https://threejs.org/), and [angular-three-soba](https://github.com/angular-three/angular-three-soba).

## 🚀 Features

- Load and display external 3D models (`scene.gltf`)
- Use of advanced Three.js features like lights and orbit controls
- Auto-rotating 3D model view
- Powered by `angular-three` and `three-stdlib` for extended Three.js support
- Optimized for performance with `ChangeDetectionStrategy.OnPush`

## 🧱 Tech Stack

- [Angular](https://angular.io/)
- [Three.js](https://threejs.org/)
- [Angular Three](https://github.com/angular-three/angular-three)
- [angular-three-soba](https://github.com/angular-three/angular-three-soba)
- [three-stdlib](https://github.com/pmndrs/three-stdlib)

## 📦 Installation

- Make sure you have Angular CLI installed:

```bash
npm install -g @angular/cli
```

## Then install the dependencies:
```bash
npm install three
```
```bash
npm install angular-three
```
```bash
npm install angular-three-soba
```
```bash
npm install three-stdlib
```


## Component Setup (Experience)
- This component is responsible for rendering the 3D scene with lighting, camera, and model loading:

```bash
import { CUSTOM_ELEMENTS_SCHEMA, Component, viewChild, ElementRef, ChangeDetectionStrategy, computed } from '@angular/core';
import { injectStore, extend, injectBeforeRender, injectLoader, NgtArgs } from 'angular-three';
import * as THREE from 'three';
import { injectGLTF } from 'angular-three-soba/loaders';
import { OrbitControls } from 'three-stdlib';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

extend(THREE);
extend({ OrbitControls });

@Component({
  template: `
    <ngt-ambient-light [intensity]="10" />
    <ngt-spot-light [position]="10" [intensity]="0.5 * Math.PI" [angle]="0.15" [penumbra]="1" [decay]="0" />
    <ngt-point-light [position]="-10" [intensity]="0.5 * Math.PI" [decay]="0" />
    for .GLB extension
    <!-- @if (gltfResult(); as gltf) {
      <ngt-primitive *args="[gltf.scene]" />
    } -->
    <ngt-mesh #mesh>
      <ngt-primitive *args="[model()]" />
    </ngt-mesh>
    <ngt-orbit-controls #orbirControls *args="[camera(), glDomElement()]" [enableZoom]="false" [autoRotate]="true" [autoRotateSpeed]="5" />`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgtArgs],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Experience {
  protected readonly Math = Math;
  meshRef = viewChild.required<ElementRef<Mesh>>('mesh');
  orbitControls = viewChild.required<ElementRef<OrbitControls>>('orbirControls');

  constructor() {
    injectBeforeRender(({ delta }) => {
      const orbitControls = this.orbitControls()?.nativeElement;
      if (orbitControls) {
        orbitControls.update();
      }
    });
  }

  gltf = injectLoader(() => GLTFLoader, () => `scene.gltf`);
  model = computed(() => {
    const gltf = this.gltf();
    if (!gltf) return null;
    return gltf.scene;
  });

  //for .glf file Extension 
  // gltfResult = injectLoader(() => GLTFLoader, () => 'mac.glb');

  private store = injectStore();
  protected camera = this.store.select('camera');
  protected glDomElement = this.store.select('gl', 'domElement');
}

```

## Error handing 

- Camera Control  Error 'angular-three-soba/loaders'; not found 
  
```bash
   npm install camera-controls
```
- maath Error 'angular-three-soba/loaders'; not found   
   
```bash
   npm install maath
```
## Final Template will look like this 
![alt text](<Screenshot 2025-04-13 193242.png>)   