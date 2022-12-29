import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ResourceData } from 'src/app/data/resource-data';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private service: SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    this.service.getArtist(this.artistId).then((data => {
      this.artist = new ArtistData(data)
    }))


    this.service.getRelatedArtists(this.artistId).then((data) => {
      this.relatedArtists = []
      data["artists"].forEach(artist => {
        this.relatedArtists.push(new ArtistData(artist))
      })
     })

    this.service.getTopTracksForArtist(this.artistId).then((data) => {
      this.topTracks = []
      data["tracks"].forEach(track => {
        this.topTracks.push(new TrackData(track))
      })
    })

    this.service.getAlbumsForArtist(this.artistId).then((data) => {
      this.albums = []
      data["items"].forEach(album => {
        this.albums.push(new AlbumData(album))
      })
    })

    //console.log(this.topTracks)
  }

  loadArtistProfile() {
    window.location.href = this.artist.url
  }


}