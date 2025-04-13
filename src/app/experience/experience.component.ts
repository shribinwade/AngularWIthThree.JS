import { CUSTOM_ELEMENTS_SCHEMA, Component, viewChild, ElementRef, ChangeDetectionStrategy, computed } from '@angular/core';
import { injectStore, extend, injectBeforeRender, injectLoader, NgtArgs } from 'angular-three';
import * as THREE from 'three';
import { injectGLTF } from 'angular-three-soba/loaders';
import { NgtsCameraControls } from 'angular-three-soba/controls';
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three-stdlib';

extend(THREE); // everything in THREE is now available
extend({ OrbitControls }); // makes ngt-orbit-controls available

@Component({
  template: `
  <ngt-ambient-light [intensity]="10" />
  <ngt-spot-light [position]="10" [intensity]="0.5 * Math.PI" [angle]="0.15" [penumbra]="1" [decay]="0" />
  <ngt-point-light [position]="-10" [intensity]="0.5 * Math.PI" [decay]="0" />
  <!-- @if (gltfResult(); as gltf) {
      <ngt-primitive *args="[gltf.scene]" />
    } -->
    <ngt-mesh #mesh>
      <!-- <ngt-box-geometry /> -->
       <ngt-primitive *args="[model()]"  ></ngt-primitive>
   
      <!-- <ngt-mesh-standard-material color='mediumpurple'/> -->

    </ngt-mesh>
    <ngt-orbit-controls #orbirControls *args="[camera(), glDomElement()]" [enableZoom]="false" [autoRotate]="true" [autoRotateSpeed]="5" />
    <!-- <ngts-camera-controls /> -->
  `,
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
      // const mesh = this.meshRef().nativeElement;
      // mesh.rotation.y += delta * 0.5;
    })
  }

  gltf = injectLoader(() => GLTFLoader, () => `scene.gltf`);
  model = computed(() => {
    const gltf = this.gltf();
    if (!gltf) return null;

    return gltf.scene;
  })

  // gltfResult = injectLoader(() => GLTFLoader, () => 'mac.glb');

  private store = injectStore();
  protected camera = this.store.select('camera');
  protected glDomElement = this.store.select('gl', 'domElement');
}

