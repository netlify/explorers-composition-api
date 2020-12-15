import confetti from 'canvas-confetti'

export const launchConfetti = () => {
  var duration = 5000
  var animationEnd = Date.now() + duration
  var skew = 1

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  const frame = () => {
    var timeLeft = animationEnd - Date.now()
    var ticks = Math.max(200, 500 * (timeLeft / duration))
    skew = Math.max(0.8, skew - 0.001)

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      gravity: 0.5,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2
      },
      colors: ['#ffffff'],
      shapes: ['circle'],
      scalar: randomInRange(0.4, 1)
    })

    if (timeLeft > 0) {
      requestAnimationFrame(frame)
    }
  }

  frame()
}
