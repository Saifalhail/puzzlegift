class SoundManager {
  constructor() {
    this.sounds = {
      click: new Audio('/sounds/click.mp3'),
      success: new Audio('/sounds/success.mp3'),
      gateOpen: new Audio('/sounds/gate.mp3'),
      background: new Audio('/sounds/background.mp3')
    };

    // Configure background music
    this.sounds.background.loop = true;
    this.sounds.background.volume = 0.3;

    // Configure other sounds
    this.sounds.click.volume = 0.4;
    this.sounds.success.volume = 0.4;
    this.sounds.gateOpen.volume = 0.4;
  }

  play(soundName) {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(err => console.log('Audio play failed:', err));
    }
  }

  stopAll() {
    Object.values(this.sounds).forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  startBackgroundMusic() {
    this.sounds.background.play().catch(err => console.log('Background music failed:', err));
  }

  stopBackgroundMusic() {
    this.sounds.background.pause();
    this.sounds.background.currentTime = 0;
  }
}

export default new SoundManager(); 