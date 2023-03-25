import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('animazioneCentro', { static: true })
  canvasElementRef!: ElementRef<HTMLCanvasElement>;
  
  constructor() { }

  ngOnInit(): void {
    const scene= new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.setClearColor(0x0E0E0E, 0);
    
    document.body.appendChild( renderer.domElement );

    const curve = new THREE.SplineCurve( [
      new THREE.Vector2( 10, 0 ),
      new THREE.Vector2( 20, 20 ),
      new THREE.Vector2( 30, 20 ),
    ] );
    
    const points = curve.getPoints( 1000 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide} );
    
    
    // Create the final object to add to the scene
    const splineObject = new THREE.Line( geometry, material );

    scene.add( splineObject );

    camera.position.z = 40;

    function animate() {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }
    /* animate(); */
  }

  octimal(){
    window.location.href = "https://octimal.it/";
  }

}
