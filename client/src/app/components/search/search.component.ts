import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];
  searchArtistorAlbum:boolean = false;
  searchTrack:boolean = false;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  search() {
    //TODO: call search function in spotifyService and parse response

    this.spotifyService.searchFor(this.searchCategory, this.searchString).then((data) => {

      this.resources = []
      switch (this.searchCategory) {
        case "artist":
          let artists = []
          data["artists"].items.forEach(element => {
            this.resources.push(new ArtistData(element))
          });
          console.log(this.resources)
          this.searchArtistorAlbum = true;
          this.searchTrack = false;
          break;
        case "track":
           let tracks = []
           data["tracks"].items.forEach(element => {
            this.resources.push(new TrackData(element))
           });
           this.searchArtistorAlbum = false;
           this.searchTrack = true;
           break;
        case "album":
          let albums = []
            data["albums"].items.forEach(element => {
             this.resources.push(new AlbumData(element))
            });
            this.searchArtistorAlbum = true;
            this.searchTrack = false;
            break;
        default:
          throw "Unrecognized Data"
    }

    })
  }

}
