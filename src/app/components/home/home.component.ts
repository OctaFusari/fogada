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
  changeState(mode: any) {
    if (mode == 1) {
      this.coreBody = 1
      document.documentElement.style.setProperty('--background', 'rgba(14, 14, 14)');
      document.documentElement.style.setProperty('--text', 'rgb(255, 255, 255)');
      document.documentElement.style.setProperty('--text__back', 'rgba(36, 36, 36, 0.267)');
    } else {
      this.coreBody = 0
      document.documentElement.style.setProperty('--background', 'rgba(255, 255, 255)');
      document.documentElement.style.setProperty('--text', 'rgba(63, 63, 63)');
      document.documentElement.style.setProperty('--text__back', 'rgba(221, 221, 221, 0.267)');
    }
  }

  constructor() { }

  ngOnInit(): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0x0E0E0E, 0);

    document.body.appendChild(renderer.domElement);


    let curve__x = 0;
    let curve__y = 0;

    if (curve__x <= 1) {
      curve__x += 0.1
    }

    let curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(curve__x - 70, curve__y - 25),
      new THREE.Vector3(curve__x - 60, curve__y - 23),
      new THREE.Vector3(curve__x - 30, curve__y - 14),
      new THREE.Vector3(curve__x - 20, curve__y - 10),
      new THREE.Vector3(curve__x - 10, curve__y - 9),
      new THREE.Vector3(curve__x + 14, curve__y + 6),
      new THREE.Vector3(curve__x + 34, curve__y + 12),

      new THREE.Vector3(curve__x + 36, curve__y + 19),
      new THREE.Vector3(curve__x + 34, curve__y + 19),
      new THREE.Vector3(curve__x + 34, curve__y + 21),
      new THREE.Vector3(curve__x + 36, curve__y + 21),
      new THREE.Vector3(curve__x + 36, curve__y + 23),
      new THREE.Vector3(curve__x + 38, curve__y + 23),
      new THREE.Vector3(curve__x + 38, curve__y + 21),
      new THREE.Vector3(curve__x + 41, curve__y + 21),
      new THREE.Vector3(curve__x + 41, curve__y + 19),
      new THREE.Vector3(curve__x + 38, curve__y + 19),
      new THREE.Vector3(curve__x + 39, curve__y + 12),

      new THREE.Vector3(curve__x + 44, curve__y + 10),
      new THREE.Vector3(curve__x + 50, curve__y + 8),
      new THREE.Vector3(curve__x + 70, curve__y + 2),
      new THREE.Vector3(curve__x + 80, curve__y - 8),
    ]);

    const points = curve.getPoints(1000);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
      color: 0x006688,

    });

    // Create the final object to add to the scene
    const splineObject = new THREE.LineSegments(geometry, material);

    scene.add(splineObject);

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


    function animate() {

      if (window.innerWidth < 1111) {
        camera.position.x = 30;
        camera.position.y = 8;
        camera.position.z = 25;
      } else {
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 40;
      }

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    const textElement: any = document.querySelector('.text');
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
        textElement.textContent ="Iscrizioni annuali " + count.toString();

        if (count >= targetValue) {
          clearInterval(intervalId);
        }
      }, animationDuration / (targetValue / increment));
    }

    let lastscroll = 0;

    var carousel: any = document.querySelector('.body__galleria');
    var carousel__reverse: any = document.querySelector('.body__galleria__reverse');

    carousel.scrollLeft += 600;
    carousel__reverse.scrollLeft += 3000;

    window.addEventListener('scroll', (size: any) => {
      const line = document.querySelector('.line') as HTMLElement;

      var h: any = document.documentElement,
        b: any = document.body,
        st: any = 'scrollTop',
        sh: any = 'scrollHeight';

      var percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
      if ((percent * 9) <= 800) {
          line.style.width = percent * 9.6 + "px"
      }

      if (lastscroll < scrollY) {
        carousel.scrollLeft += 2;
        carousel__reverse.scrollLeft -= 2;
      } else if (lastscroll > scrollY) {
        carousel.scrollLeft -= 2;
        carousel__reverse.scrollLeft += 2;
      }
      lastscroll = scrollY;

    })

    let targetTime = new Date("2025-10-12T00:00:00").getTime();
    this.countdown(targetTime);
  }



  countdown(targetTime: number) {
    const outputElement: any = document.getElementById("countdown-output");
    const outputElement1: any = document.getElementById("countdown-output1");
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remainingTime = Math.floor((targetTime - now) / 1000);
      if (remainingTime < 0) {
        clearInterval(interval);
      } else {
        const days = Math.floor(remainingTime / (24 * 60 * 60));
        const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
        const seconds = Math.floor(remainingTime % 60);
        let date = `${days} giorni, ${hours} ore,`
        let date1 = `${minutes} minuti, ${seconds}`
        outputElement.innerText = date.toString();
        outputElement1.innerText = date1.toString();

      }
    }, 1000);
  }

  octimal() {
    window.location.href = "https://octimal.it/";
  }


  form() {
    window.location.href = "https://forms.gle/1GP7PvQxR8gAscLN8";
  }

  scroll(el: HTMLElement) {

    el.scrollIntoView({ behavior: 'smooth' });
  }

}
