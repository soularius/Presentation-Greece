/* ══════════════════════════════════════════════════════════════
   OUR TRIP TO GREECE
   Eight illustrated scenes narrated as a dialogue between Jenny and
   Yined (p1 and p2 in the code and in the asset filenames).
   ══════════════════════════════════════════════════════════════ */

// ── DOM ───────────────────────────────────────────────────────
const canvas = document.getElementById('sceneCanvas');
const ctx    = canvas.getContext('2d');

const actor1 = document.getElementById('actor1');
const actor2 = document.getElementById('actor2');
const p1El   = document.getElementById('p1');
const p2El   = document.getElementById('p2');

const hero = document.getElementById('hero');

const dayBadge      = document.getElementById('dayBadge');
const dayBadgeNum   = document.getElementById('dayBadgeNum');
const dayBadgePlace = document.getElementById('dayBadgePlace');

const dialogue       = document.getElementById('dialogue');
const dialogueAvatar = document.getElementById('dialogueAvatar');
const dialogueName   = document.getElementById('dialogueName');
const dialogueText   = document.getElementById('dialogueText');

const startBtn = document.getElementById('startBtn');
const nextBtn  = document.getElementById('nextBtn');
const backBtn  = document.getElementById('backBtn');
const menuBtn  = document.getElementById('menuBtn');
const musicBtn = document.getElementById('musicBtn');

const videoBubble    = document.getElementById('videoBubble');
const videoBubbleBtn = document.getElementById('videoBubbleBtn');
const videoThumb     = document.getElementById('videoThumb');
const videoOverlay   = document.getElementById('videoOverlay');
const videoLarge     = document.getElementById('videoLarge');
const videoCaption   = document.getElementById('videoCaption');
const closeVideoBtn  = document.getElementById('closeVideoBtn');

const sceneMenu       = document.getElementById('sceneMenu');
const closeMenuBtn    = document.getElementById('closeMenuBtn');
const creditsBtn      = document.getElementById('creditsBtn');
const creditsOverlay  = document.getElementById('creditsOverlay');
const closeCreditsBtn = document.getElementById('closeCreditsBtn');

// ── Speakers ──────────────────────────────────────────────────
// Jenny and Yined read their own lines out loud, so each gets a colour
// of its own: whoever is on stage can tell at a glance that it is their
// turn. The class drives the avatar ring and the name. The p1 / p2 keys
// stay as they are because the artwork files are named that way.
const SPEAKERS = {
  p1: { name: 'Jenny', face: 'assets/img/escene_0/p1_face.png', cls: 'dialogue--p1' },
  p2: { name: 'Yined', face: 'assets/img/escene_0/p2_face.png', cls: 'dialogue--p2' },
};

// ── Scenes ────────────────────────────────────────────────────
//
//   kind    'home'  opening screen
//           'story' illustrated scene with one or more spoken lines
//
//   folder  asset folder for this scene (background / p1 / p2 / sprite)
//
//   cast    'pose'  both characters standing still on top of the art
//           'walk'  both walk in, then settle into a slow stroll
//           'ride'  one combined sprite (cfg.sprite) travels the road
//                   described by cfg.ride.path, looping
//           'none'  characters are already painted in the background
//
//   stage   placement for 'pose' and 'walk', as { p1, p2 }:
//             x → horizontal centre, in % of the viewport width
//             y → distance from the bottom, in % of the height
//             h → height, in vh
//
//   enter   'left' (default) or 'right' — the side the cast walks in
//           from. Match it to the direction the art faces.
//
//   video   filename inside the scene folder. Shows the looping, muted
//           bubble in the corner; clicking it opens the large view.
//
const SCENES = {
  0: {
    kind: 'home',
    folder: 'escene_0',
    cast: 'pose',
    stage: { p1: { x: 17, y: 0, h: 74 }, p2: { x: 83, y: 0, h: 76 } },
  },

  1: {
    kind: 'story',
    folder: 'escene_1',
    day: 'Day 1',
    place: 'Athens Airport',
    cast: 'walk',
    // Both walk up the open concourse; p2 sits a little further back.
    stage: { p1: { x: 36, y: 1, h: 63 }, p2: { x: 58, y: 6, h: 55 } },
    lines: [
      { who: 'p1', text: 'On our first day, we are going to arrive in Athens.' },
    ],
  },

  2: {
    kind: 'story',
    folder: 'escene_2',
    day: 'Day 1',
    place: 'Around the City',
    // They tour the city on the chariot: it rolls in from the right,
    // crosses the street on a gentle arc and parks on the left, where
    // it waits for Next instead of looping.
    cast: 'ride',
    sprite: 'carraje.png',
    ride: {
      duration: 5500,
      loop: false,
      // x → centre, y → distance from the bottom (both as a fraction of
      // the viewport); h → sprite height in vh. It crosses in the near
      // foreground: the wheels ride below the frame and the size is big
      // enough that passing in front of the town reads as depth. Height
      // stays at 70vh throughout; the entry and the parked end sit at
      // -13%, and the middle lifts a little to give the arc.
      path: [
        { x: 1.30, y: -0.130, h: 70 },
        { x: 0.92, y: -0.100, h: 70 },
        { x: 0.64, y: -0.088, h: 70 },
        { x: 0.44, y: -0.105, h: 70 },
        { x: 0.30, y: -0.130, h: 70 },
      ],
    },
    lines: [
      { who: 'p1', text: 'We are going to walk around the city…' },
    ],
  },

  3: {
    kind: 'story',
    folder: 'escene_3',
    video: 'video.mp4',
    day: 'Day 1',
    place: 'Acropolis & Parthenon',
    cast: 'none',
    lines: [
      { who: 'p1', text: '…and see amazing places like the Acropolis and the Parthenon.' },
    ],
  },

  4: {
    kind: 'story',
    folder: 'escene_4',
    video: 'video.mp4',
    day: 'Day 2',
    place: 'Santorini · Oia & the Caldera',
    cast: 'none',
    lines: [
      { who: 'p2', text: 'On the second day, we are going to travel to Santorini.' },
      { who: 'p2', text: 'First, we are going to visit the beach and watch the sunset.' },
      { who: 'p2', text: 'Also, we are going to see Oia and the beautiful Santorini Caldera.' },
    ],
  },

  5: {
    kind: 'story',
    folder: 'escene_5',
    video: 'video.mp4',
    day: 'Day 3',
    place: 'Shops & the City',
    cast: 'none',
    lines: [
      { who: 'p2', text: 'Finally, on day three, we are going to explore the rest of Santorini.' },
      { who: 'p2', text: 'We are going to take a lot of photos and visit some local shops.' },
    ],
  },

  6: {
    kind: 'story',
    folder: 'escene_6',
    video: 'video.mp4',
    day: 'Day 3',
    place: 'Red Beach & Fira',
    cast: 'none',
    lines: [
      { who: 'p1', text: 'We are also going to see the Red Beach and Fira.' },
    ],
  },

  7: {
    kind: 'story',
    folder: 'escene_7',
    day: 'The End',
    place: 'Goodbye, Greece',
    cast: 'none',
    lines: [
      { who: 'p1', text: 'It is going to be a great trip!' },
    ],
  },
};

const SCENE_IDS = Object.keys(SCENES).map(Number).sort((a, b) => a - b);

// The canvas only changes on a scene change, a cross-fade, a resize or
// a background finishing its download. Repainting a 2754×1536 image on
// every frame is wasted work, and it also forces the blurred panels on
// top of it to recompute their backdrop each frame.
let needsPaint = true;

// ── Assets ────────────────────────────────────────────────────
// Backgrounds try .png first and fall back to .jpg. If neither is
// there yet, the canvas paints a styled Aegean placeholder.
function loadBackground(folder) {
  const img = new Image();
  img.dataset.state = 'loading';
  img.addEventListener('load', () => {
    img.dataset.state = 'ok';
    needsPaint = true;   // a late arrival has to replace its placeholder
  });
  img.addEventListener('error', () => {
    if (img.dataset.state === 'loading') {
      img.dataset.state = 'retry';
      img.src = `assets/img/${folder}/background.jpg`;
    } else {
      img.dataset.state = 'missing';
    }
  });
  img.src = `assets/img/${folder}/background.png`;
  return img;
}

const BACKGROUNDS = {};
SCENE_IDS.forEach((id) => { BACKGROUNDS[id] = loadBackground(SCENES[id].folder); });

// Character art per scene, falling back to the scene 0 artwork so a
// scene without its own p1/p2 still shows somebody.
function setActorSrc(el, folder, name) {
  const fallback = `assets/img/escene_0/${name}.png`;
  const wanted   = `assets/img/${folder}/${name}.png`;
  if (folder === 'escene_0') { el.src = fallback; return; }

  const probe = new Image();
  probe.addEventListener('load',  () => { el.src = wanted; });
  probe.addEventListener('error', () => { el.src = fallback; });
  probe.src = wanted;
}

// ── Audio ─────────────────────────────────────────────────────
const bgMusic = new Audio('assets/sounds/music.mp3');
bgMusic.loop   = true;
bgMusic.volume = 0.4;
bgMusic.muted  = true;
let musicStarted = false;

function updateMusicButton() {
  const isMuted = bgMusic.muted || !musicStarted;
  musicBtn.textContent = isMuted ? '🔇' : '🔊';
  musicBtn.setAttribute('aria-label', isMuted ? 'Muted audio' : 'Audio on');
  musicBtn.title = isMuted ? 'Muted audio' : 'Audio on';
  musicBtn.classList.toggle('is-muted', isMuted);
  musicBtn.classList.toggle('is-unmuted', !isMuted);
}

function toggleMusic() {
  if (!musicStarted) {
    musicStarted = true;
    bgMusic.play().catch(() => { musicStarted = false; updateMusicButton(); });
  }
  bgMusic.muted = !bgMusic.muted;
  if (bgMusic.paused) bgMusic.play().catch(() => {});
  updateMusicButton();
}

// ── State ─────────────────────────────────────────────────────
const ANIM = {
  FADE_SPEED: 0.08,
  WALK_MS:    2900,    // walk-in duration plus the slowest delay
};

const state = {
  w: 0,
  h: 0,
  scene: 0,
  lineIndex: 0,
  fadeAlpha: 1,
  prevBg: null,
};

let walkTimer = null;
let rideStart = 0;

// ?t=0.4 freezes a ride at that point of its loop. Handy for tracing a
// new path over a background without chasing a moving sprite.
const rideFreeze = (() => {
  const raw = new URLSearchParams(window.location.search).get('t');
  const value = Number(raw);
  return raw !== null && Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : null;
})();

// ── Canvas ────────────────────────────────────────────────────
function resizeCanvas() {
  const dpr  = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width  = Math.round(rect.width  * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  state.w = rect.width;
  state.h = rect.height;
  needsPaint = true;
}

function isReady(img) {
  return !!img && img.complete && img.naturalWidth > 0;
}

function drawPlaceholder(sceneId) {
  const { w, h } = state;
  const cfg = SCENES[sceneId] || {};

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0,    '#123249');
  sky.addColorStop(0.48, '#2f7ba6');
  sky.addColorStop(0.52, '#1b4965');
  sky.addColorStop(1,    '#0b2233');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const sun = ctx.createRadialGradient(w * 0.5, h * 0.48, 4, w * 0.5, h * 0.48, h * 0.3);
  sun.addColorStop(0,   'rgba(240, 205, 118, 0.42)');
  sun.addColorStop(0.5, 'rgba(216, 168, 56, 0.14)');
  sun.addColorStop(1,   'rgba(216, 168, 56, 0)');
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(240, 205, 118, 0.32)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(0, h * 0.5);
  ctx.lineTo(w, h * 0.5);
  ctx.stroke();

  // Meander band along the bottom
  const band = h * 0.055;
  const unit = band * 0.5;
  ctx.save();
  ctx.strokeStyle = 'rgba(240, 205, 118, 0.2)';
  ctx.lineWidth = Math.max(2, unit * 0.16);
  ctx.beginPath();
  for (let x = -unit; x < w + unit; x += unit * 3) {
    const y = h - band;
    ctx.moveTo(x, y + unit * 1.4);
    ctx.lineTo(x, y);
    ctx.lineTo(x + unit * 1.9, y);
    ctx.lineTo(x + unit * 1.9, y + unit * 0.95);
    ctx.lineTo(x + unit * 0.85, y + unit * 0.95);
    ctx.lineTo(x + unit * 0.85, y + unit * 0.45);
  }
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(247, 242, 231, 0.24)';
  ctx.font = `700 ${Math.max(11, Math.min(15, w * 0.011))}px "Quicksand", sans-serif`;
  ctx.fillText(`assets/img/${cfg.folder}/background.png`, w * 0.5, h * 0.955);

  if (cfg.place) {
    const text = cfg.place.toUpperCase();
    let size = Math.max(40, Math.min(150, w * 0.11));
    ctx.font = `700 ${size}px "Cinzel", Georgia, serif`;
    const maxW = w * 0.86;
    const measured = ctx.measureText(text).width;
    if (measured > maxW) {
      size = Math.max(22, size * (maxW / measured));
      ctx.font = `700 ${size}px "Cinzel", Georgia, serif`;
    }
    ctx.fillStyle = 'rgba(247, 242, 231, 0.1)';
    ctx.fillText(text, w * 0.5, h * 0.28);
  }
  ctx.restore();
}

function drawBackgroundImage(img) {
  const { w, h } = state;
  const imgRatio    = img.naturalWidth / img.naturalHeight;
  const canvasRatio = w / h;

  let drawW, drawH, offsetX = 0, offsetY = 0;
  if (imgRatio > canvasRatio) {
    drawH = h;
    drawW = drawH * imgRatio;
    offsetX = (w - drawW) * 0.5;
  } else {
    drawW = w;
    drawH = drawW / imgRatio;
    offsetY = (h - drawH) * 0.5;
  }
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

function paintScene(sceneId) {
  const img = BACKGROUNDS[sceneId];
  if (isReady(img)) drawBackgroundImage(img);
  else drawPlaceholder(sceneId);
}

function drawBackground() {
  ctx.clearRect(0, 0, state.w, state.h);

  if (state.prevBg !== null && state.fadeAlpha < 1) {
    paintScene(state.prevBg);
    ctx.save();
    ctx.globalAlpha = state.fadeAlpha;
    paintScene(state.scene);
    ctx.restore();
    state.fadeAlpha = Math.min(1, state.fadeAlpha + ANIM.FADE_SPEED);
    if (state.fadeAlpha >= 1) state.prevBg = null;
    return;
  }

  paintScene(state.scene);
}

function drawVignette() {
  const { w, h } = state;
  const g = ctx.createRadialGradient(w * 0.5, h * 0.45, h * 0.32, w * 0.5, h * 0.5, h * 0.95);
  g.addColorStop(0, 'rgba(4, 14, 22, 0)');
  g.addColorStop(1, 'rgba(4, 14, 22, 0.55)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

// Soft gradient so the dialogue bar always sits on a readable base.
function drawFooterScrim() {
  const { w, h } = state;
  const g = ctx.createLinearGradient(0, h * 0.62, 0, h);
  g.addColorStop(0, 'rgba(4, 14, 22, 0)');
  g.addColorStop(1, 'rgba(4, 14, 22, 0.62)');
  ctx.fillStyle = g;
  ctx.fillRect(0, h * 0.62, w, h * 0.38);
}

// ── Staging ───────────────────────────────────────────────────
function placeActor(el, spot) {
  if (!spot) return;
  el.style.left   = `${spot.x}%`;
  el.style.bottom = `${spot.y}%`;
  el.style.height = `${spot.h}vh`;
}

function resetActorClasses(el) {
  el.classList.remove('is-posing', 'is-walking', 'is-arrived', 'is-grounded',
                      'from-right', 'is-riding');
  el.style.opacity = '';
}

// Piecewise interpolation along the waypoints of a ride path.
function samplePath(path, t) {
  const clamped = Math.max(0, Math.min(1, t));
  const seg = (path.length - 1) * clamped;
  const i   = Math.min(Math.floor(seg), path.length - 2);
  const f   = seg - i;
  const a   = path[i];
  const b   = path[i + 1];
  return {
    x: a.x + (b.x - a.x) * f,
    y: a.y + (b.y - a.y) * f,
    h: a.h + (b.h - a.h) * f,
  };
}

// Drives the riding sprite: position and size follow the path, so the
// wheels stay on the ground instead of hanging at a fixed height.
//
// A looping ride runs forever and speeds up toward the end, which is
// what an object coming at the camera does. A one-shot ride (loop:
// false) eases to a halt at the last waypoint and stays parked there
// until the scene changes.
function updateRide(cfg) {
  const ride = cfg.ride;
  if (!ride) return;

  const looping = ride.loop !== false;
  const elapsed = performance.now() - rideStart;

  let t;
  if (rideFreeze !== null) t = rideFreeze;
  else if (looping)        t = (elapsed % ride.duration) / ride.duration;
  else                     t = Math.min(1, elapsed / ride.duration);

  const eased = looping
    ? Math.pow(t, 1.35)          // accelerates as it nears the camera
    : 1 - Math.pow(1 - t, 2);    // rolls in and settles to a stop

  const spot = samplePath(ride.path, eased);

  actor1.style.left   = `${(spot.x * 100).toFixed(2)}%`;
  actor1.style.bottom = `${(spot.y * 100).toFixed(2)}%`;
  actor1.style.height = `${spot.h.toFixed(2)}vh`;

  // Fade in on arrival; a looping ride also fades out at the seam.
  let fade = t < 0.05 ? t / 0.05 : 1;
  if (looping && t > 0.93) fade = (1 - t) / 0.07;
  actor1.style.opacity = fade.toFixed(3);

  // Parked: swap the cobblestone rattle for a slow idle sway.
  if (!looping && t >= 1) actor1.classList.add('is-arrived');
}

function startWalking(actors, fromRight) {
  actors.forEach((el) => {
    el.classList.add('is-walking', 'is-grounded');
    if (fromRight) el.classList.add('from-right');
  });
  // Force a reflow so the entry animation restarts on every visit.
  void actors[0].offsetWidth;

  walkTimer = setTimeout(() => {
    actors.forEach((el) => el.classList.add('is-arrived'));
  }, ANIM.WALK_MS);
}

function stageActors(cfg) {
  clearTimeout(walkTimer);

  const mode      = cfg.cast || 'none';
  const fromRight = cfg.enter === 'right';

  [actor1, actor2].forEach(resetActorClasses);
  actor1.classList.add('hidden');
  actor2.classList.add('hidden');

  if (mode === 'none') return;

  // One combined sprite (e.g. both characters on a chariot) travelling
  // the road in perspective; updateRide() places it every frame.
  if (mode === 'ride') {
    p1El.src = `assets/img/${cfg.folder}/${cfg.sprite}`;
    actor1.classList.add('is-riding', 'is-grounded');
    actor1.classList.remove('hidden');
    rideStart = performance.now();
    updateRide(cfg);
    return;
  }

  setActorSrc(p1El, cfg.folder, 'p1');
  setActorSrc(p2El, cfg.folder, 'p2');

  if (cfg.stage) {
    placeActor(actor1, cfg.stage.p1);
    placeActor(actor2, cfg.stage.p2);
  }
  actor1.classList.remove('hidden');
  actor2.classList.remove('hidden');

  if (mode === 'pose') {
    actor1.classList.add('is-posing');
    actor2.classList.add('is-posing');
    return;
  }

  startWalking([actor1, actor2], fromRight);
}

// ── Video ─────────────────────────────────────────────────────
// The clips are decoration, never a soundtrack: they loop forever and
// stay muted. Browsers also refuse to autoplay anything with sound, so
// silence is what keeps them running at all.
function lockMuted(video) {
  const enforce = () => {
    if (!video.muted || video.volume !== 0) {
      video.muted  = true;
      video.volume = 0;
    }
  };
  enforce();
  // Chrome's right-click menu can expose native controls; this puts the
  // volume straight back if anyone reaches for it.
  video.addEventListener('volumechange', enforce);
  video.addEventListener('contextmenu', (e) => e.preventDefault());
}

[videoThumb, videoLarge].forEach(lockMuted);

function playSilently(video) {
  video.muted = true;
  const attempt = video.play();
  if (attempt && attempt.catch) attempt.catch(() => {});
}

function closeVideo(resumeThumb = true) {
  videoOverlay.classList.add('hidden');
  videoLarge.pause();
  videoLarge.removeAttribute('src');
  videoLarge.load();
  if (resumeThumb && videoThumb.getAttribute('src')) playSilently(videoThumb);
}

function openVideo() {
  const cfg = SCENES[state.scene];
  if (!cfg || !cfg.video) return;

  videoCaption.textContent = cfg.place || '';
  videoLarge.src = `assets/img/${cfg.folder}/${cfg.video}`;
  videoOverlay.classList.remove('hidden');
  playSilently(videoLarge);
  // No point decoding two copies of the same clip at once.
  videoThumb.pause();
}

// Only the current scene's clip is loaded, so the four videos are never
// downloaded at the same time.
function setupVideo(cfg) {
  closeVideo(false);

  if (!cfg.video) {
    videoBubble.classList.add('hidden');
    videoThumb.pause();
    videoThumb.removeAttribute('src');
    videoThumb.load();
    return;
  }

  const src = `assets/img/${cfg.folder}/${cfg.video}`;
  if (!videoThumb.src.endsWith(src)) videoThumb.src = src;
  videoBubble.classList.remove('hidden');
  playSilently(videoThumb);
}

// ── Dialogue ──────────────────────────────────────────────────
function currentLine() {
  const cfg = SCENES[state.scene];
  if (!cfg || !cfg.lines) return null;
  return cfg.lines[state.lineIndex] || null;
}

// The whole line shows at once — P1 and P2 read it aloud, so it has to
// be there to read from the moment it appears.
function startLine() {
  const line = currentLine();
  if (!line) return;

  const speaker = SPEAKERS[line.who];

  dialogue.classList.remove('dialogue--p1', 'dialogue--p2');
  dialogue.classList.add(speaker.cls);

  if (!dialogueAvatar.src.endsWith(speaker.face)) {
    dialogueAvatar.classList.add('swap');
    setTimeout(() => {
      dialogueAvatar.src = speaker.face;
      dialogueAvatar.classList.remove('swap');
    }, 180);
  }
  dialogueName.textContent = speaker.name;
  dialogueText.textContent = line.text;

  // Restart the fade so a new line is noticeable without animating the
  // text itself, which would slow the reader down.
  dialogueText.classList.remove('is-fresh');
  void dialogueText.offsetWidth;
  dialogueText.classList.add('is-fresh');

  updateNextLabel();
}

function updateNextLabel() {
  const cfg = SCENES[state.scene];
  if (!cfg || !cfg.lines) return;

  if (state.lineIndex < cfg.lines.length - 1) {
    nextBtn.textContent = 'Next ▸';
    return;
  }

  const next = SCENES[state.scene + 1];
  if (!next)                                 nextBtn.textContent = 'Travel Again ↻';
  else if (next.day && next.day !== cfg.day) nextBtn.textContent = `${next.day} ▸`;
  else                                       nextBtn.textContent = 'Next ▸';
}

function advance() {
  const cfg = SCENES[state.scene];
  if (!cfg || !cfg.lines) return;

  if (state.lineIndex < cfg.lines.length - 1) {
    state.lineIndex += 1;
    startLine();
    return;
  }
  goToScene(SCENES[state.scene + 1] ? state.scene + 1 : 0);
}

// ── Scene switching ───────────────────────────────────────────
function show(el, visible) {
  el.classList.toggle('hidden', !visible);
}

function goToScene(id) {
  const cfg = SCENES[id];
  if (!cfg) return;

  sceneMenu.classList.add('hidden');

  if (id !== state.scene) {
    state.prevBg    = state.scene;
    state.fadeAlpha = 0;
  }

  state.scene     = id;
  state.lineIndex = 0;
  needsPaint      = true;

  const isHome  = cfg.kind === 'home';
  const isStory = cfg.kind === 'story';

  show(hero,     isHome);
  show(dayBadge, isStory && !!cfg.day);
  show(dialogue, isStory);
  show(backBtn,  id > 0);

  stageActors(cfg);
  setupVideo(cfg);

  if (isStory) {
    dayBadgeNum.textContent   = cfg.day || '';
    dayBadgePlace.textContent = cfg.place || '';
    dialogueText.textContent  = '';
    startLine();
  }
}

// ── Render loop ───────────────────────────────────────────────
function render() {
  const cfg = SCENES[state.scene];

  // The riding sprite is a DOM element, so it moves without the canvas.
  if (cfg && cfg.cast === 'ride') updateRide(cfg);

  if (needsPaint) {
    drawBackground();
    if (cfg && cfg.kind === 'story') drawFooterScrim();
    else drawVignette();
    // Keep painting only while a cross-fade is still running.
    needsPaint = state.prevBg !== null;
  }

  requestAnimationFrame(render);
}

// ── Events ────────────────────────────────────────────────────
window.addEventListener('resize', resizeCanvas);

startBtn.addEventListener('click', () => goToScene(1));
nextBtn.addEventListener('click', advance);
backBtn.addEventListener('click', () => goToScene(Math.max(0, state.scene - 1)));
musicBtn.addEventListener('click', toggleMusic);

menuBtn.addEventListener('click', () => sceneMenu.classList.remove('hidden'));
closeMenuBtn.addEventListener('click', () => sceneMenu.classList.add('hidden'));
sceneMenu.addEventListener('click', (e) => {
  if (e.target === sceneMenu) sceneMenu.classList.add('hidden');
});
document.querySelectorAll('.panel__item').forEach((btn) => {
  btn.addEventListener('click', () => goToScene(Number(btn.dataset.target)));
});

videoBubbleBtn.addEventListener('click', openVideo);
closeVideoBtn.addEventListener('click', () => closeVideo());
videoOverlay.addEventListener('click', () => closeVideo());

creditsBtn.addEventListener('click', () => creditsOverlay.classList.remove('hidden'));
closeCreditsBtn.addEventListener('click', () => creditsOverlay.classList.add('hidden'));
creditsOverlay.addEventListener('click', (e) => {
  if (e.target === creditsOverlay) creditsOverlay.classList.add('hidden');
});

// Keyboard: space / arrows drive the story
window.addEventListener('keydown', (e) => {
  const cfg = SCENES[state.scene];
  if (e.key === 'Escape') {
    sceneMenu.classList.add('hidden');
    creditsOverlay.classList.add('hidden');
    closeVideo();
    return;
  }
  if (e.key === 'ArrowLeft') {
    if (state.scene > 0) goToScene(state.scene - 1);
    return;
  }
  if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
    e.preventDefault();
    if (!videoOverlay.classList.contains('hidden')) { closeVideo(); return; }
    if (!cfg) return;
    if (cfg.kind === 'story') advance();
    else goToScene(1);
  }
});

// ── Init ──────────────────────────────────────────────────────
// Deep link for presenting: index.html?scene=4&line=1 opens on Day 2
// with the second sentence already on screen.
function applyDeepLink() {
  const q = new URLSearchParams(window.location.search);

  const sceneId = Number(q.get('scene'));
  goToScene(SCENES[sceneId] ? sceneId : 0);

  // Opening straight on a scene should not cross-fade from scene 0.
  state.fadeAlpha = 1;
  state.prevBg    = null;

  const cfg = SCENES[state.scene];
  if (!cfg || !cfg.lines) return;

  const line = Number(q.get('line'));
  if (!Number.isFinite(line) || line <= 0) return;

  state.lineIndex = Math.min(line, cfg.lines.length - 1);
  startLine();
}

function init() {
  resizeCanvas();
  updateMusicButton();
  applyDeepLink();
  render();
}

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(init).catch(init);
} else {
  init();
}
