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

    
    let curve__x = 0;
    let curve__y = 0;

    if(curve__x <= 1){
      curve__x += 0.1
    }

    const curve = new THREE.CatmullRomCurve3( [
      new THREE.Vector3( curve__x-70, curve__y-35 ),
      new THREE.Vector3( curve__x-60, curve__y-25 ),
      new THREE.Vector3( curve__x-30, curve__y-10 ),
      new THREE.Vector3( curve__x-20, curve__y-8 ),
      new THREE.Vector3( curve__x-10, curve__y ),
      new THREE.Vector3( curve__x+14, curve__y+8 ),
      new THREE.Vector3( curve__x+34, curve__y+12 ),
      
      new THREE.Vector3( curve__x+36, curve__y+19 ),
      new THREE.Vector3( curve__x+34, curve__y+19 ),
      new THREE.Vector3( curve__x+34, curve__y+21 ),
      new THREE.Vector3( curve__x+36, curve__y+21 ),
      new THREE.Vector3( curve__x+36, curve__y+23 ),
      new THREE.Vector3( curve__x+38, curve__y+23 ),
      new THREE.Vector3( curve__x+38, curve__y+21 ),
      new THREE.Vector3( curve__x+41, curve__y+21 ),
      new THREE.Vector3( curve__x+41, curve__y+19 ),
      new THREE.Vector3( curve__x+38, curve__y+19 ),
      new THREE.Vector3( curve__x+39, curve__y+12 ),

      new THREE.Vector3( curve__x+44, curve__y+10 ),
      new THREE.Vector3( curve__x+50, curve__y+8 ),
      new THREE.Vector3( curve__x+70, curve__y+2 ),
      new THREE.Vector3( curve__x+80, curve__y-8 ),
    ] );
    
    const points = curve.getPoints( 1000 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    
    const material = new THREE.LineBasicMaterial( {
      color: 0x006688,
      
    } );
    
    // Create the final object to add to the scene
    const splineObject = new THREE.LineSegments( geometry, material );

    scene.add( splineObject );

    camera.position.z = 40;

    const grandezze = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    

    window.addEventListener('resize', (size: any) => {
      grandezze.width = window.innerWidth;
      grandezze.height = window.innerHeight;

      camera.aspect = grandezze.width / grandezze.height;
      camera.updateProjectionMatrix();

      renderer.setSize(grandezze.width, grandezze.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      renderer.render(scene, camera); // -> Also needed
      console.log(window.innerHeight / 160)

    })

    function animate() {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }
    animate();
  }

  octimal(){
    window.location.href = "https://octimal.it/";
  }

}
