type TrackName = 'bell' | 'nadaswaram' | 'thavil'

const LOOP_SECONDS = 60
const assetBase = `${import.meta.env.BASE_URL}assets/mp3/`

const trackUrls: Record<TrackName, string> = {
  bell: `${assetBase}freesound_community-indian-temple-bell-68150.mp3`,
  nadaswaram: `${assetBase}Divine-Nadaswaram-SnapYT.App.mp3`,
  thavil: `${assetBase}Kerala-Wedding-Thavil-SnapYT.App.mp3`,
}

class WeddingMusicController {
  private context: AudioContext | null = null
  private buffers: Partial<Record<TrackName, AudioBuffer>> = {}
  private loadPromise: Promise<void> | null = null
  private startPromise: Promise<void> | null = null
  private loopTimer: number | null = null
  private generation = 0
  private isPlaying = false
  private activeSources: AudioBufferSourceNode[] = []
  private interactionListenersAttached = false

  private readonly handleInteraction = () => {
    const context = this.context
    if (context?.state === 'suspended') {
      void context.resume().then(
        () => this.start(),
        () => undefined,
      )
    } else {
      void this.start()
    }
  }

  private getContext(): AudioContext {
    if (!this.context) {
      const AudioCtor =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext

      if (!AudioCtor) {
        throw new Error('Web Audio API is not supported in this browser.')
      }

      this.context = new AudioCtor()
    }

    return this.context
  }

  private attachInteractionListeners() {
    if (this.interactionListenersAttached) {
      return
    }

    document.addEventListener('pointerdown', this.handleInteraction, { passive: true })
    document.addEventListener('keydown', this.handleInteraction)
    this.interactionListenersAttached = true
  }

  private removeInteractionListeners() {
    if (!this.interactionListenersAttached) {
      return
    }

    document.removeEventListener('pointerdown', this.handleInteraction)
    document.removeEventListener('keydown', this.handleInteraction)
    this.interactionListenersAttached = false
  }

  private loadBuffers() {
    if (!this.loadPromise) {
      this.loadPromise = (async () => {
        const context = this.getContext()

        for (const [name, url] of Object.entries(trackUrls) as [TrackName, string][]) {
          try {
            const response = await fetch(url)
            if (!response.ok) {
              throw new Error(`Audio request failed (${response.status}): ${url}`)
            }

            const bytes = await response.arrayBuffer()
            this.buffers[name] = await context.decodeAudioData(bytes)
          } catch (error) {
            console.error(`Unable to load wedding music track "${name}".`, error)
            throw error
          }
        }
      })().catch((error: unknown) => {
        this.loadPromise = null
        throw error
      })
    }

    return this.loadPromise
  }

  private scheduleTrack(
    track: TrackName,
    startAt: number,
    volume: number,
    fadeInSeconds: number,
    sustainDuration: number,
    fadeOutSeconds: number,
  ) {
    const buffer = this.buffers[track]
    if (!buffer) {
      return
    }

    const context = this.getContext()
    const source = context.createBufferSource()
    const gainNode = context.createGain()
    const fadeInEnd = startAt + fadeInSeconds
    const sustainEnd = startAt + sustainDuration
    const fadeOutEnd = sustainEnd + fadeOutSeconds

    source.buffer = buffer
    source.connect(gainNode)
    gainNode.connect(context.destination)

    gainNode.gain.setValueAtTime(0.0001, startAt)
    gainNode.gain.linearRampToValueAtTime(volume, fadeInEnd)
    gainNode.gain.setValueAtTime(volume, sustainEnd)
    gainNode.gain.linearRampToValueAtTime(0.0001, fadeOutEnd)

    source.start(startAt, 0, Math.min(buffer.duration, fadeOutEnd - startAt))
    source.onended = () => {
      this.activeSources = this.activeSources.filter((activeSource) => activeSource !== source)
      gainNode.disconnect()
      source.disconnect()
    }

    this.activeSources.push(source)
  }

  private scheduleCycle(startAt: number) {
    const context = this.getContext()

    this.scheduleTrack('bell', startAt, 0.16, 2, 7, 3)
    this.scheduleTrack('nadaswaram', startAt + 5, 0.3, 3, 24, 6)
    this.scheduleTrack('thavil', startAt + 12, 0.23, 4, 31, 8)

    const nextCycle = startAt + LOOP_SECONDS
    const waitMs = Math.max(0, (nextCycle - context.currentTime) * 1000 - 120)

    if (this.isPlaying) {
      this.loopTimer = window.setTimeout(
        () => this.scheduleCycle(Math.max(nextCycle, context.currentTime + 0.15)),
        waitMs,
      )
    }
  }

  public start(): Promise<void> {
    if (this.isPlaying) {
      return Promise.resolve()
    }
    if (this.startPromise) {
      return this.startPromise
    }

    const generation = ++this.generation
    this.attachInteractionListeners()
    const pendingStart = this.startInternal(generation).finally(() => {
      if (this.startPromise === pendingStart) {
        this.startPromise = null
      }
    })
    this.startPromise = pendingStart
    return pendingStart
  }

  private async startInternal(generation: number) {
    try {
      await this.loadBuffers()
      if (generation !== this.generation) {
        return
      }

      const context = this.getContext()
      if (context.state === 'suspended') {
        try {
          await context.resume()
        } catch {
          return
        }
      }
      if (generation !== this.generation || context.state !== 'running') {
        return
      }

      this.isPlaying = true
      this.removeInteractionListeners()
      this.scheduleCycle(context.currentTime + 0.15)
    } catch {
      // The failed request is logged in loadBuffers; allow a later interaction to retry.
    }
  }

  public stop() {
    this.generation += 1
    this.isPlaying = false
    this.startPromise = null
    this.removeInteractionListeners()

    if (this.loopTimer !== null) {
      window.clearTimeout(this.loopTimer)
      this.loopTimer = null
    }

    this.activeSources.forEach((source) => {
      source.onended = null
      try {
        source.stop()
      } catch {
        // A source can finish between cleanup and stop.
      }
      source.disconnect()
    })
    this.activeSources = []

    this.context?.suspend().catch(() => undefined)
  }
}

let controller: WeddingMusicController | null = null

export function useWeddingBackgroundMusic() {
  if (!controller) {
    controller = new WeddingMusicController()
  }

  return controller
}
