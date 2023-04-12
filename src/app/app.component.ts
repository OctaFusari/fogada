import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fogada';

  load = 1

  ngOnInit(): void {
    this.load = 1;
    setTimeout(() => {
      this.load = 0;
    },20000);
  }
}
