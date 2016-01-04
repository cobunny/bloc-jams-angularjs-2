 (function () {
     function SongPlayer($rootScope, Fixtures) {
         /**
          * @desc Create objects and methods to set,play and pause song;
          * @type {Object Constructor}
          */
         var SongPlayer = {};

         /**
          * @desc Currently playing album
          * @type {Object}
          */
         var currentAlbum = Fixtures.getAlbum();

         /**
          * @desc Buzz object audio file
          * @type {Object}
          */
         var currentBuzzObject = null;

         /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
         var setSong = function (song) {
             resetSongs(song);
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             currentBuzzObject.bind('timeupdate', function () {
                 $rootScope.$apply(function () {
                     SongPlayer.currentTime = currentBuzzObject.getTime();
                 });
             });


             currentBuzzObject.bind('volumechange', function () {
                 $rootScope.$apply(function () {
                     SongPlayer.volume = currentBuzzObject.getVolume();
                 });
             });


             SongPlayer.currentSong = song;
         };

         /**
          * @function playSong
          * @desc Plays audio file of song as currentBuzzObject and signals front-end song-playing is true 
          * @param {Object} song
          */
         var playSong = function (song) {
             currentBuzzObject.play();
             song.playing = true;
         };

         /**
          * @function getSongIndex
          * @desc Gets index of currently playing song
          * @param {Object} song
          */
         var getSongIndex = function (song) {
             return currentAlbum.songs.indexOf(song);
         };

         /**
          * @function resetSongs
          * @desc This sets song.playing = false, if song isn't the song we cliked on.
          * @param {Object} song
          */
         var resetSongs = function (song) {
             currentAlbum.songs.forEach(function (item) {
                 if (item !== song) {
                     item.playing = false;
                 }
             });
         };

         /**
          * @function resetSongs
          * @desc Stops song
          */
         var stopSong = function (song) {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;

         };

         /**
          * @desc user clicked song
          * @type {Object}
          */
         SongPlayer.currentSong = null;

         /**
          * @desc Current playback time (in seconds) of currently playing song
          * @type {Number}
          */
         SongPlayer.currentTime = null;

         /**
          * @function setCurrentTime
          * @desc Set current time (in seconds) of currently playing song
          * @param {Number} time
          */
         SongPlayer.setCurrentTime = function (time) {
             if (currentBuzzObject) {
                 currentBuzzObject.setTime(time);
             }
         };


         /**
          * @desc volume of currently playing song
          * @type {Number}
          */
         SongPlayer.volume = null;
         var currentVolume = 80;

         /**
          * @function setVolume
          * @desc Sets volume of currently playing song
          * @param {Number} volume
          */
         SongPlayer.setVolume = function (volume) {
             if (currentBuzzObject) {
                 currentBuzzObject.setVolume(volume);
             }
             SongPlayer.volume = SongPlayer.currentVolume;
         };


         /**
          * @function SongPlayer.play
          * @desc If song isn't currently playing song, sets song and plays, but if it is and it is paused, plays song.
          * @param {Object} song
          */
         SongPlayer.play = function (song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 playSong(song);
             } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
             }
         };

         /**
          * @function SongPlayer.pause
          * @desc Pauses song and signals front-end song-playing is false 
          * @param {Object} song
          */
         SongPlayer.pause = function (song) {
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };

         /**
          * @function SongPlayer.previous 
          * @desc Gets index of song played last
          */
         SongPlayer.previous = function () {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;

             if (currentSongIndex < 0) {
                 currentSongIndex = currentAlbum.songs.length - 1;
                 stopSong();
                 SongPlayer.currentSong = currentAlbum.songs[currentSongIndex];
                 setSong(SongPlayer.currentSong);
                 playSong(SongPlayer.currentSong);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };

         /**
          * @function SongPlayer.next 
          * @desc Gets index of next song to be played
          */
         SongPlayer.next = function () {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;

             if (currentSongIndex >= currentAlbum.songs.length) {
                 currentSongIndex = 0;
                 stopSong();
                 SongPlayer.currentSong = currentAlbum.songs[currentSongIndex];
                 setSong(SongPlayer.currentSong);
                 playSong(SongPlayer.currentSong);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };



         return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();