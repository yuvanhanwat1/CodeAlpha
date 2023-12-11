const playlist = [
    { name: 'Abrars-Entry-Jamal-Kudu-Animal.mp3', source: 'music/Abrars-Entry-Jamal-Kudu-Animal.mp3' },
    { name: 'Arjan-Vailly-Animal.mp3', source: 'music/Arjan-Vailly-Animal.mp3' },
    { name: 'Haiwaan-Animal.mp3', source: 'music/Haiwaan-Animal.mp3' },
    { name: 'Hua-Main-Animal.mp3', source: 'music/Hua-Main-Animal.mp3' },
    { name: 'Kashmir-Animal.mp3', source: 'music/Kashmir-Animal.mp3' },
    { name: 'Papa-Meri-Jaan-Animal.mp3', source: 'music/Papa-Meri-Jaan-Animal.mp3' },
    { name: 'Pehle-Bhi-Main-Animal.mp3', source: 'music/Pehle-Bhi-Main-Animal.mp3' },
    { name: 'Saari-Duniya-Jalaa-Denge-Animal.mp3', source: 'music/Saari-Duniya-Jalaa-Denge-Animal.mp3' },
    { name: 'Satranga-Animal.mp3', source: 'music/Satranga-Animal.mp3' },
  ];

  const audio = document.getElementById('audio');
  const playlistElement = document.getElementById('playlist');
  const playButton = document.getElementById('play');
  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('prev');
  const volumeControl = document.getElementById('volume');
  const progressBar = document.getElementById('progress-bar');
  const currentSongDisplay = document.getElementById('current-song');

  let currentTrackIndex = 0;

  function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.source;
    currentSongDisplay.textContent = `🎵 ${track.name}`;
  }

  function updatePlaylist() {
    playlistElement.innerHTML = '';
    playlist.forEach((track, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = track.name;
      listItem.addEventListener('click', () => {
        currentTrackIndex = index;
        loadTrack(currentTrackIndex);
        playAudio();
      });
      playlistElement.appendChild(listItem);
    });
  }

  function playAudio() {
    audio.play();
    playButton.textContent = '⏸️';
  }

  function pauseAudio() {
    audio.pause();
    playButton.textContent = '▶️';
  }

  function updateProgressBar() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
  }

  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playAudio();
  }

  function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    playAudio();
  }

  function setVolume() {
    audio.volume = volumeControl.value;
  }

  function updateCurrentTime() {
    updateProgressBar();
  }

  audio.addEventListener('ended', nextTrack);
  audio.addEventListener('timeupdate', updateCurrentTime);
  playButton.addEventListener('click', () => {
    if (audio.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  });
  nextButton.addEventListener('click', nextTrack);
  prevButton.addEventListener('click', prevTrack);
  volumeControl.addEventListener('input', setVolume);

  updatePlaylist();
  loadTrack(currentTrackIndex);