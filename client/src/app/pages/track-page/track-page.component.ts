import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { TrackFeature } from '../../data/track-feature';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {
	trackId:string;
	track:TrackData;
  audioFeatures:TrackFeature[];

  constructor(private route: ActivatedRoute, private service: SpotifyService) { }

  ngOnInit() {
  	this.trackId = this.route.snapshot.paramMap.get('id');
  	//TODO: Inject the spotifyService and use it to get the track data and it's audio features
    this.service.getTrack(this.trackId).then((data) => {
      this.track = new TrackData(data)
    })

    this.service.getAudioFeaturesForTrack(this.trackId).then((data) => {
      this.audioFeatures = []
      this.audioFeatures.push(new TrackFeature("acousticness", data["acousticness"]))
      this.audioFeatures.push(new TrackFeature("danceability", data["danceability"]))
      this.audioFeatures.push(new TrackFeature("energy", data["energy"]))
      this.audioFeatures.push(new TrackFeature("speechiness", data["speechiness"]))
      this.audioFeatures.push(new TrackFeature("instrumentalness", data["instrumentalness"]))
      this.audioFeatures.push(new TrackFeature("liveness", data["energy"]))
      this.audioFeatures.push(new TrackFeature("valence", data["valence"]))
      console.log(this.audioFeatures)
    })


  }

  loadTrack() {
    window.location.href = this.track.url
  }

}
