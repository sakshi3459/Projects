// Sound effects for the birthday webapp
// Using free sound effects from various sources

export class SoundEffects {
  private static sounds: { [key: string]: HTMLAudioElement } = {}

  static init() {
    // Friendship level up sound (using a bell/chime sound)
    this.sounds.friendship = new Audio('https://cdn.pixabay.com/audio/2022/03/24/audio_16e1f0d3f1.mp3')
    this.sounds.friendship.volume = 0.3

    // Menu click sound
    this.sounds.click = new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3')
    this.sounds.click.volume = 0.2

    // Pop sound for portraits
    this.sounds.pop = new Audio('https://cdn.pixabay.com/audio/2022/03/10/audio_c09e7d7f60.mp3')
    this.sounds.pop.volume = 0.3

    // Celebration sound
    this.sounds.celebration = new Audio('https://cdn.pixabay.com/audio/2021/08/09/audio_077e5f2ea7.mp3')
    this.sounds.celebration.volume = 0.4

    // Achievement sound
    this.sounds.achievement = new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443c.mp3')
    this.sounds.achievement.volume = 0.35

    // Animal sounds
    this.sounds.chicken = new Audio('https://cdn.pixabay.com/audio/2022/03/14/audio_53c0c5c4e7.mp3')
    this.sounds.chicken.volume = 0.25

    this.sounds.cow = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_dcd168bd29.mp3')
    this.sounds.cow.volume = 0.25
  }

  static play(soundName: string) {
    const sound = this.sounds[soundName]
    if (sound) {
      // Clone and play to allow overlapping sounds
      const clone = sound.cloneNode() as HTMLAudioElement
      clone.volume = sound.volume
      clone.play().catch(err => {
        console.log('Sound play prevented:', err)
      })
    }
  }

  static playFriendship() {
    this.play('friendship')
  }

  static playClick() {
    this.play('click')
  }

  static playPop() {
    this.play('pop')
  }

  static playCelebration() {
    this.play('celebration')
  }

  static playAchievement() {
    this.play('achievement')
  }

  static playChicken() {
    this.play('chicken')
  }

  static playCow() {
    this.play('cow')
  }
}
