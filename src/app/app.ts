import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from "three";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  title = 'fogada';

@ViewChild('animazioneCentro', { static: true })
  canvasElementRef!: ElementRef<HTMLCanvasElement>;
  private cleanup: Array<() => void> = [];

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

    const renderer = new THREE.WebGLRenderer({ canvas: this.canvasElementRef.nativeElement, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0E0E0E, 0);


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
    const splineObject = new THREE.Line(geometry, material);

    scene.add(splineObject);

    camera.position.z = 40;

    const grandezze = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    const onResize = () => {
      grandezze.width = window.innerWidth;
      grandezze.height = window.innerHeight;

      camera.aspect = grandezze.width / grandezze.height;
      camera.updateProjectionMatrix();

      renderer.setSize(grandezze.width, grandezze.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      renderer.render(scene, camera); // -> Also needed

    };
    window.addEventListener('resize', onResize);
    this.cleanup.push(() => window.removeEventListener('resize', onResize));


    let frameId = 0;
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

      frameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
    this.cleanup.push(() => { cancelAnimationFrame(frameId); renderer.dispose(); geometry.dispose(); material.dispose(); });

    const textElement = document.querySelector<HTMLElement>('.text');
    if (textElement) {
    const counterElement = textElement;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateText();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(textElement);
    this.cleanup.push(() => observer.disconnect());

    function animateText() {
      let count = 0;
      const animationDuration = 1000;
      const increment = 2;
      const targetValue = 348;
      const intervalId = setInterval(() => {
        count += increment;
        counterElement.textContent = "Iscrizioni annuali " + count.toString();

        if (count >= targetValue) {
          clearInterval(intervalId);
        }
      }, animationDuration / (targetValue / increment));
    }
    }

    let lastscroll = 0;

    const carousel = document.querySelector<HTMLElement>('.body__galleria');
    const carousel__reverse = document.querySelector<HTMLElement>('.body__galleria__reverse');

    if (carousel) carousel.scrollLeft += 600;
    if (carousel__reverse) carousel__reverse.scrollLeft += 3000;

    const onScroll = () => {
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
        if (carousel) carousel.scrollLeft += 2;
        if (carousel__reverse) carousel__reverse.scrollLeft -= 2;
      } else if (lastscroll > scrollY) {
        if (carousel) carousel.scrollLeft -= 2;
        if (carousel__reverse) carousel__reverse.scrollLeft += 2;
      }
      lastscroll = scrollY;

    };
    window.addEventListener('scroll', onScroll, { passive: true });
    this.cleanup.push(() => window.removeEventListener('scroll', onScroll));

    const targetTime = new Date("2026-10-11T00:00:00+02:00").getTime();
    this.countdown(targetTime);
  }



  countdown(targetTime: number) {
    const outputElement = document.getElementById("countdown-output");
    const outputElement1 = document.getElementById("countdown-output1");
    if (!outputElement || !outputElement1) return;
    const update = () => {
      const now = new Date().getTime();
      const remainingTime = Math.floor((targetTime - now) / 1000);
      if (remainingTime <= 0) {
        outputElement.innerText = 'La gara è iniziata';
        outputElement1.innerText = '';
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
    };
    const interval = setInterval(update, 1000);
    update();
    this.cleanup.push(() => clearInterval(interval));
  }

  octimal() {
    window.location.href = "https://octimal.it/";
  }


  ngOnDestroy(): void {
    this.cleanup.forEach(dispose => dispose());
  }

  scroll(el: HTMLElement) {

    el.scrollIntoView({ behavior: 'smooth' });
  }

}
