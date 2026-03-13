"use client"

import { useEffect, useRef, useCallback } from "react"

// ─── Flowmap shader (ping-pong FBO — stamps mouse velocity, dissipates) ─────

const FLOW_VERTEX = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FLOW_FRAGMENT = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uPrevFlow;
uniform vec2 uMouse;
uniform vec2 uMouseVelocity;
uniform float uFalloff;
uniform float uDissipation;
uniform float uAlpha;
uniform float uAspect;

void main() {
  vec2 prev = texture2D(uPrevFlow, vUv).rg;
  prev *= uDissipation;

  vec2 cursor = uMouse;
  vec2 coord = vUv;
  coord.x *= uAspect;
  cursor.x *= uAspect;

  float dist = distance(coord, cursor);
  float stamp = smoothstep(uFalloff, 0.0, dist) * uAlpha;

  vec2 flow = prev + uMouseVelocity * stamp;
  flow = clamp(flow, -1.0, 1.0);

  gl_FragColor = vec4(flow, 0.0, 1.0);
}
`

// ─── Main scene shader ──────────────────────────────────────────────────────

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
uniform sampler2D tFlow;

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

  // ── Flowmap distortion ──
  vec2 flow = texture2D(tFlow, uv).rg;
  vec2 coord = vec2(uv.x * aspect, uv.y);
  coord += flow * 0.45;

  float t = uTime * 0.12;

  // ── UV distortion layers ──
  float distort1 = snoise(coord * 1.0 + t * 0.7) * 0.2;
  float distort2 = snoise(coord * 0.6 - t * 0.5 + 3.0) * 0.18;
  vec2 distortedCoord = coord + vec2(distort1, distort2);

  // ── Noise layers ──
  float shape1 = snoise(distortedCoord * 1.2 + t * 0.8);
  float shape2 = snoise(distortedCoord * 0.7 - t * 0.6 + 10.0);
  float shape3 = snoise(distortedCoord * 1.8 + t * 0.4 + 20.0);
  float wave   = snoise(distortedCoord * 0.5 + t * 0.3 + 50.0);
  float detail = snoise(distortedCoord * 2.5 - t * 0.9 + 30.0);

  // ── Combine ──
  float combined = shape1 * 0.35 + shape2 * 0.25 + shape3 * 0.15 + wave * 0.15 + detail * 0.1;
  combined = combined * 0.5 + 0.5;
  combined = smoothstep(0.3, 0.7, combined);

  // ── Grayscale (0.08 → 0.55) ──
  float luma = mix(0.08, 0.55, combined);
  luma = mix(luma, 0.3, 0.15);
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

// ─── Helpers ────────────────────────────────────────────────────────────────

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

function createProgram(gl: WebGLRenderingContext, vsSrc: string, fsSrc: string) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSrc)
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSrc)
  const p = gl.createProgram()!
  gl.attachShader(p, vs)
  gl.attachShader(p, fs)
  gl.linkProgram(p)
  return p
}

// ─── Component ──────────────────────────────────────────────────────────────

export function WarpedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const startTime = useRef(Date.now())
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const smoothMouse = useRef({ x: 0.5, y: 0.5 })
  const prevMouse = useRef({ x: 0.5, y: 0.5 })

  const setup = useCallback((canvas: HTMLCanvasElement) => {
    const gl = canvas.getContext("webgl", {
      alpha: false, antialias: false,
      premultipliedAlpha: false, preserveDrawingBuffer: false,
    })
    if (!gl) return null

    // Float texture support
    gl.getExtension("OES_texture_float")
    gl.getExtension("OES_texture_float_linear")

    // Quad buffer
    const quadBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)

    // ── Flowmap program ──
    const flowProg = createProgram(gl, FLOW_VERTEX, FLOW_FRAGMENT)
    const flowU = {
      uPrevFlow: gl.getUniformLocation(flowProg, "uPrevFlow"),
      uMouse: gl.getUniformLocation(flowProg, "uMouse"),
      uMouseVelocity: gl.getUniformLocation(flowProg, "uMouseVelocity"),
      uFalloff: gl.getUniformLocation(flowProg, "uFalloff"),
      uDissipation: gl.getUniformLocation(flowProg, "uDissipation"),
      uAlpha: gl.getUniformLocation(flowProg, "uAlpha"),
      uAspect: gl.getUniformLocation(flowProg, "uAspect"),
    }
    const flowPos = gl.getAttribLocation(flowProg, "position")

    // ── Main program ──
    const mainProg = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER)
    const mainU = {
      uTime: gl.getUniformLocation(mainProg, "uTime"),
      uResolution: gl.getUniformLocation(mainProg, "uResolution"),
      tFlow: gl.getUniformLocation(mainProg, "tFlow"),
    }
    const mainPos = gl.getAttribLocation(mainProg, "position")

    // ── Ping-pong FBOs (128x128) ──
    const FLOW_SIZE = 128
    const makeFBO = () => {
      const tex = gl.createTexture()!
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, FLOW_SIZE, FLOW_SIZE, 0, gl.RGBA, gl.FLOAT, null)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      const fbo = gl.createFramebuffer()!
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.bindTexture(gl.TEXTURE_2D, null)
      return { fbo, tex }
    }

    return {
      gl, quadBuf, FLOW_SIZE,
      flowProg, flowU, flowPos,
      mainProg, mainU, mainPos,
      flowA: makeFBO(), flowB: makeFBO(),
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = setup(canvas)
    if (!ctx) return

    const { gl, quadBuf, FLOW_SIZE, flowProg, flowU, flowPos, mainProg, mainU, mainPos } = ctx
    let { flowA, flowB } = ctx

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      const w = window.innerWidth, h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
    }
    resize()
    window.addEventListener("resize", resize, { passive: true })

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX / window.innerWidth, y: 1.0 - e.clientY / window.innerHeight }
    }
    window.addEventListener("mousemove", onMove, { passive: true })

    const render = () => {
      const t = (Date.now() - startTime.current) / 1000
      const aspect = canvas.width / canvas.height

      // Smooth mouse
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.06
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.06

      // Velocity (scaled up for visibility)
      const vx = (smoothMouse.current.x - prevMouse.current.x) * 30
      const vy = (smoothMouse.current.y - prevMouse.current.y) * 30
      prevMouse.current = { ...smoothMouse.current }

      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf)

      // ── Pass 1: Flowmap update ──
      gl.useProgram(flowProg)
      gl.enableVertexAttribArray(flowPos)
      gl.vertexAttribPointer(flowPos, 2, gl.FLOAT, false, 0, 0)

      gl.bindFramebuffer(gl.FRAMEBUFFER, flowB.fbo)
      gl.viewport(0, 0, FLOW_SIZE, FLOW_SIZE)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, flowA.tex)
      gl.uniform1i(flowU.uPrevFlow, 0)
      gl.uniform2f(flowU.uMouse, smoothMouse.current.x, smoothMouse.current.y)
      gl.uniform2f(flowU.uMouseVelocity, vx, vy)
      gl.uniform1f(flowU.uFalloff, 0.18)
      gl.uniform1f(flowU.uDissipation, 0.98)
      gl.uniform1f(flowU.uAlpha, 0.85)
      gl.uniform1f(flowU.uAspect, aspect)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      // ── Pass 2: Main scene ──
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, canvas.width, canvas.height)

      gl.useProgram(mainProg)
      gl.enableVertexAttribArray(mainPos)
      gl.vertexAttribPointer(mainPos, 2, gl.FLOAT, false, 0, 0)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, flowB.tex)
      gl.uniform1i(mainU.tFlow, 0)
      gl.uniform1f(mainU.uTime, t)
      gl.uniform2f(mainU.uResolution, canvas.width, canvas.height)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      // Swap
      const tmp = flowA
      flowA = flowB
      flowB = tmp

      rafRef.current = requestAnimationFrame(render)
    }
    rafRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [setup])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  )
}
