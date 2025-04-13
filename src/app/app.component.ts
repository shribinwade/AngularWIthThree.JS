import { NgtCanvas } from 'angular-three';
import { Experience } from './experience/experience.component';
import { Component } from '@angular/core';
@Component({
    selector: 'app-root',
    imports: [NgtCanvas],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    sceneGraph = Experience;
    title = 'angular_three_custom_model';
}