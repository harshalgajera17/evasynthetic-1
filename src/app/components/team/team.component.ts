import { Component } from '@angular/core';
import { TeamListComponent } from "../team-list/team-list.component";
import { TestimonialComponent } from "../testimonial/testimonial.component";

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [TeamListComponent, TestimonialComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  infoEmail = 'info@evasynthetic.com';
}
