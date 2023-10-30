import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  ngOnInit() {
    const arrow = document.querySelectorAll(".arrow");
    for (let i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener("click", (e) => {
        const arrowParent = (e.target as HTMLElement).parentElement?.parentElement;
        arrowParent?.classList.toggle("showMenu");
      });
    }

    const sidebar = document.querySelector(".sidebar");
    const sidebarBtn = document.querySelector(".bx-menu") as HTMLElement | null;

    sidebarBtn?.addEventListener("click", () => {
      sidebar?.classList.toggle("close");
    });
  }

}
