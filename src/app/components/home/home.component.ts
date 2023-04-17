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

  coreBody = 0;
  changeState(mode:any){
    if (mode == "sci"){
      this.coreBody = 1
      document.documentElement.style.setProperty('--background', 'rgba(14, 14, 14)');
      document.documentElement.style.setProperty('--text', 'rgb(201, 201, 201)');
      document.documentElement.style.setProperty('--text__back', 'rgba(36, 36, 36, 0.267)');
    }else{
      this.coreBody = 0
      document.documentElement.style.setProperty('--background', 'rgba(255, 255, 255)');
      document.documentElement.style.setProperty('--text', 'rgba(63, 63, 63)');
      document.documentElement.style.setProperty('--text__back', 'rgba(221, 221, 221, 0.267)');
    }
  }
  
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

    let curve = new THREE.CatmullRomCurve3( [
      new THREE.Vector3( curve__x-70, curve__y-25 ),
      new THREE.Vector3( curve__x-60, curve__y-23 ),
      new THREE.Vector3( curve__x-30, curve__y-14 ),
      new THREE.Vector3( curve__x-20, curve__y-10 ),
      new THREE.Vector3( curve__x-10, curve__y-9 ),
      new THREE.Vector3( curve__x+14, curve__y+6 ),
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

    })

    window.addEventListener('scroll', (size:any) => {
      console.log(size)
      
      let screenY = 0;
      let changeX = 1;
      let changeY = 1;

        changeX += .01
        changeY += .01

      splineObject.scale.set( changeX, changeY, 1 );
      
/*       curve__x += .01
      curve__y += .01
      splineObject.scale.set( curve__x, curve__y, 1 ); */
    })

    function animate() {

      if (window.innerWidth < 1111){
        camera.position.x = 30;
        camera.position.y = 8;
        camera.position.z = 25;
      }else{
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 40;
      }

      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }
    animate();

    const textElement:any = document.querySelector('.text');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateText();
        }
      });
    });
    
    observer.observe(textElement);
    
    function animateText() {
      let count = 0;
      const animationDuration = 1000;
      const increment = 2;
      const targetValue = 348;
      const intervalId = setInterval(() => {
        count += increment;
        textElement.textContent = count.toString();
        // if(count == 348){
        //   textElement.textContent = "100 + 1";
        // }
    
        if (count >= targetValue) {
          clearInterval(intervalId);
        }
      }, animationDuration / (targetValue / increment));
    }

  }

  

  octimal(){
    window.location.href = "https://octimal.it/";
  }

}

/*

// Define the Google Form URL
const formUrl = "https://docs.google.com/forms/d/e/FORM_ID/formResponse";

// Get the form element
const form = document.getElementById("myForm");

// Add a submit event listener to the form
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get the form data
    const formData = new FormData(form);

    // Convert the form data to an object
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Send the form data to Google Form using fetch() API
    const response = await fetch(formUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    // Check if the form submission was successful
    if (response.ok) {
        alert("Form submitted successfully!");
    } else {
        alert("Form submission failed.");
    }
});

*/