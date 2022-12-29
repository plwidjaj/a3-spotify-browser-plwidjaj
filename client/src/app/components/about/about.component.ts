import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  name:string = "???";
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string = null;

  //TODO: inject the Spotify service

  constructor(private service: SpotifyService, private router: Router) {}

  ngOnInit() {

  }

  /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */

  loadAbout()  {
    this.service.aboutMe().then((data) => {
      this.name = data.name
      this.profile_pic = data.imageURL
    })
  
  }

  loadSpotifyProfile()  {
   this.service.aboutMe().then((data) => {
    window.location.href = data.spotifyProfile
   })
  }
}
