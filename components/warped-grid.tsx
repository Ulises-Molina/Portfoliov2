"use client"

import { useEffect, useRef, useCallback } from "react"

// ─── GLSL Shaders ───────────────────────────────────────────────────────────

const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uMouseVelocity;

//
// 2D Simplex Noise (Ashima Arts)
//
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                           + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  vec2 coord = vec2(uv.x * aspect, uv.y);

  float t = uTime * 0.12;

  // ── Mouse distortion ──
  vec2 mousePos = vec2(uMouse.x * aspect, uMouse.y);
  float mouseDist = distance(coord, mousePos);
  float mouseInfluence = smoothstep(0.45, 0.0, mouseDist) * 0.25 * (1.0 + uMouseVelocity * 4.0);
  vec2 mouseDir = normalize(coord - mousePos + 0.001);
  coord += mouseDir * mouseInfluence;

  // ── UV distortion layers ──
  float distort1 = snoise(coord * 1.0 + t * 0.7) * 0.2;
  float distort2 = snoise(coord * 0.6 - t * 0.5 + 3.0) * 0.18;
  vec2 distortedCoord = coord + vec2(distort1, distort2);

  // ── Noise layers (vaporous shapes — like quentinhocde.com) ──
  float shape1 = snoise(distortedCoord * 1.2 + t * 0.8);
  float shape2 = snoise(distortedCoord * 0.7 - t * 0.6 + 10.0);
  float shape3 = snoise(distortedCoord * 1.8 + t * 0.4 + 20.0);
  float wave   = snoise(distortedCoord * 0.5 + t * 0.3 + 50.0);
  float detail = snoise(distortedCoord * 2.5 - t * 0.9 + 30.0);

  // ── Combine — wide dynamic range ──
  float combined = shape1 * 0.35 + shape2 * 0.25 + shape3 * 0.15 + wave * 0.15 + detail * 0.1;
  combined = combined * 0.5 + 0.5;
  combined = smoothstep(0.3, 0.7, combined);

  // ── Grayscale color mapping (matching reference: 0.08 dark → 0.55 light) ──
  float luma = mix(0.08, 0.55, combined);

  // Soften contrast like the reference
  luma = mix(luma, 0.3, 0.15); // pull extremes slightly toward mid

  vec3 color = vec3(luma);

  // ── Vignette ──
  float vignette = distance(vUv, vec2(0.5));
  vignette = smoothstep(0.3, 1.1, vignette);
  color *= 1.0 - vignette * 0.5;

  // ── Film grain ──
  float grain = fract(sin(dot(uv * uTime * 0.5, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - 0.5) * 0.06;

  // ── Gamma ──
  color = pow(color, vec3(1.5));

  gl_FragColor = vec4(color, 1.0);
}
`

// ─── Component ──────────────────────────────────────────────────────────────

export function WarpedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({})
  const rafRef = useRef<number>(0)
  const startTime = useRef(Date.now())
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const smoothMouse = useRef({ x: 0.5, y: 0.5 })
  const prevMouse = useRef({ x: 0.5, y: 0.5 })
  const velocity = useRef(0)

  const initGL = useCallback((canvas: HTMLCanvasElement) => {
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    })
    if (!gl) return null

    // Compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vs, VERTEX_SHADER)
    gl.compileShader(vs)

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fs, FRAGMENT_SHADER)
    gl.compileShader(fs)

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    // Full-screen quad
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)

    const pos = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    // Get uniforms
    const uniforms: Record<string, WebGLUniformLocation | null> = {
      uTime: gl.getUniformLocation(program, "uTime"),
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uMouse: gl.getUniformLocation(program, "uMouse"),
      uMouseVelocity: gl.getUniformLocation(program, "uMouseVelocity"),
    }

    glRef.current = gl
    programRef.current = program
    uniformsRef.current = uniforms

    return gl
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const gl = initGL(canvas)
    if (!gl) return

    // Sizing
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5) // cap DPR for performance
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener("resize", resize, { passive: true })

    // Mouse tracking
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight, // flip Y for GL
      }
    }
    window.addEventListener("mousemove", onMove, { passive: true })

    // Render loop
    const render = () => {
      const u = uniformsRef.current
      const t = (Date.now() - startTime.current) / 1000

      // Smooth mouse lerp
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.05
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.05

      // Mouse velocity
      const dx = smoothMouse.current.x - prevMouse.current.x
      const dy = smoothMouse.current.y - prevMouse.current.y
      const v = Math.sqrt(dx * dx + dy * dy) * 60 // normalize to ~per-second
      velocity.current += (v - velocity.current) * 0.1
      prevMouse.current = { ...smoothMouse.current }

      gl.uniform1f(u.uTime, t)
      gl.uniform2f(u.uResolution, canvas.width, canvas.height)
      gl.uniform2f(u.uMouse, smoothMouse.current.x, smoothMouse.current.y)
      gl.uniform1f(u.uMouseVelocity, Math.min(velocity.current, 2.0))

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }
    rafRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [initGL])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100vw", height: "100vh" }}
      aria-hidden="true"
    />
  )
}
