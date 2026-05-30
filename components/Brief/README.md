# Brief Animation / Scene Engine — Spec

## 🧭 Goal

Build a lightweight, deterministic **presentation engine** for the web that behaves similarly to tools like Keynote, After Effects (simplified), and Framer Motion scenes.

It must support:

- Multiple scenes over time
- Multiple frames per scene
- Entry / hold / exit lifecycle per frame
- Continuous per-frame animation timelines
- Nested frame composition
- Coordinated motion transitions between steps

The system is designed to be:

- deterministic (no randomness in animation state)
- time-driven (single global clock)
- declarative (scene + frame data defines behavior)

---

## 🧱 Core Concepts

### 1. Global Clock

A single monotonic time source:

```ts
time = useClock();
```

Drives everything in the system.

---

### 2. Scene Steps (Discrete Timeline)

A scene is composed of time-based steps:

```ts
type MotionStep = {
  at: number;
  frames: MotionFrame[];
};
```

Each step defines:

- when frames enter
- what frames exist
- when they exit (implied by next step)

---

### 3. Frame Lifecycle

Each frame follows a lifecycle:

```
enter → hold → exit → done
```

Phases are derived from global time + step boundaries.

---

### 4. Frame Animation (Continuous Timeline)

Each frame may define its own animation timeline:

```ts
timeline: Keyframe[]
```

This is interpolated independently from scene lifecycle.

---

### 5. Motion System (Directional Entry/Exit)

Frames can define:

```ts
motion: MotionKey
exitMotion?: MotionKey
```

These resolve to transform-based animations:

- enter: offscreen → onscreen
- exit: onscreen → offscreen

---

### 6. Rendering Tree

Frames can be nested:

```ts
Frame → children → AnimatedFrame → recursive render
```

---

## ⚙️ Data Model

### MotionFrame

```ts
type MotionFrame = {
  id: string;
  type: FrameType;

  x: number;
  y: number;
  width: number;
  height: number;

  motion: MotionKey;
  exitMotion?: MotionKey;
};
```

---

### MotionStep

```ts
type MotionStep = {
  at: number;
  frames: MotionFrame[];
};
```

---

### Scene Registry

```ts
type SceneRegistry = {
  motion: MotionStep[];
};
```

---

### Frame Timeline

```ts
type Keyframe = {
  at: number;
  style?: Partial<Style>;
  transform?: Partial<Transform>;
};
```

---

## 🧠 Runtime Model

### Frame evaluation pipeline

For every frame:

1. Determine active step(s)
2. Compute lifecycle phase:
   - enter
   - hold
   - exit

3. Compute motion transforms
4. Compute timeline interpolation
5. Merge styles
6. Render recursively

---

## 🔄 Execution Flow

```
Global Clock
   ↓
Scene Step Resolver (find active + overlapping steps)
   ↓
Frame Lifecycle Resolver (enter/hold/exit)
   ↓
Motion Resolver (motion + exitMotion)
   ↓
Timeline Interpolator (keyframes)
   ↓
AnimatedFrame render tree
```

---

## 🧩 Dependencies

### Runtime

- React (hooks, rendering)
- requestAnimationFrame or setInterval clock

### Optional / Future

- framer-motion (reference only, not required)
- immer (for immutability safety)
- d3-interpolate (optional smoother easing system)

---

## 🚧 Current Status

### ✅ DONE

| Feature                   | Status                    |
| ------------------------- | ------------------------- |
| Global clock system       | ✅ Stable                 |
| Motion entry animations   | ✅ Working                |
| Motion exit animations    | ⚠️ Partial                |
| Timeline interpolation    | ✅ Working                |
| Frame rendering recursion | ✅ Working                |
| Basic scene stepping      | ⚠️ Functional but brittle |
| Frame grouping per step   | ⚠️ Works but fragile      |
| Transform builder         | ✅ Working                |

---

### ⚠️ PARTIALLY DONE

| Feature           | Issue                                       |
| ----------------- | ------------------------------------------- |
| Scene progression | No true overlap between steps               |
| Exit animations   | Only work when frame survives step boundary |
| Frame persistence | Frames replaced instead of co-existing      |
| Step activation   | Single-step selection breaks transitions    |

---

### ❌ NOT DONE

| Feature                        | Description                                 |
| ------------------------------ | ------------------------------------------- |
| Overlapping step system        | Required for smooth exits                   |
| Multi-step concurrency         | Multiple active steps simultaneously        |
| Scene blending                 | Crossfade between steps/scenes              |
| Stable lifecycle manager       | Replace ad-hoc filtering logic              |
| Camera animation system        | Not integrated with scene lifecycle         |
| Shared frame identity tracking | Needed for persistent entities across steps |

---

## 🧨 Known Core Problem

Current system incorrectly assumes:

> One time → one active step → one frame set

This breaks:

- exit animations
- transitions
- overlapping motion
- persistence across steps

Correct model requires:

> One time → multiple active lifecycle states

---

## 🧭 Next Architecture Direction

To complete this system, we need:

### 1. Overlapping step model

Frames remain alive across step boundaries.

### 2. Frame lifecycle manager

Each frame independently tracked:

```ts
{
  (enterStart, holdStart, exitStart);
}
```

### 3. Multi-active-step renderer

Do NOT replace steps — layer them.

### 4. Unified interpolation pipeline

Merge:

- timeline
- motion
- lifecycle transforms

---

## 🧠 Summary

This is not a renderer problem.

This is a **state model problem**.

Once frame lifecycle becomes independent of step selection, the system becomes:

✔ deterministic
✔ composable
✔ Keynote-like
✔ animation-safe

---

## 📌 Design Principle

> Never compute “what is active”
>
> Always compute “what is alive and in what phase”
