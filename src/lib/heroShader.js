const VERTEX = `attribute vec2 a_position;
void main(){ gl_Position = vec4(a_position, 0.0, 1.0); }`

const FRAGMENT = `precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_dpr;
uniform vec2 u_mouse;
vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox; m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
void main(){
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;
  float gridSize = 48.0 * u_dpr;
  vec2 gridSt = gl_FragCoord.xy / gridSize;
  vec2 gridFract = fract(gridSt);
  float lineThickness = 1.0 / gridSize;
  float gridLines = step(1.0 - lineThickness, gridFract.x) + step(1.0 - lineThickness, gridFract.y);
  gridLines = clamp(gridLines, 0.0, 1.0) * 0.12;
  vec2 mouseAspect = vec2(u_mouse.x * (u_resolution.x / u_resolution.y), u_mouse.y);
  float dist = distance(st, mouseAspect);
  float pull = exp(-dist * 3.2) * 0.075;
  vec2 warp = normalize(st - mouseAspect + 0.0001) * pull;
  float noiseScale = 1.4;
  vec2 noisePos = (st - warp) * noiseScale + vec2(u_time * 0.015, u_time * 0.025);
  float n = snoise(noisePos) * 0.5 + 0.5;
  float numBands = 10.0;
  float bandVal = n * numBands;
  float triangleWave = abs(fract(bandVal) - 0.5) * 2.0;
  float topoLines = smoothstep(0.02, 0.00, triangleWave) * 0.45;
  vec3 copper = vec3(0.902, 0.478, 0.051);
  vec3 amberc = vec3(1.000, 0.584, 0.020);
  float heat  = exp(-dist * 2.1);
  vec3 color = vec3(0.0);
  color += mix(copper * 0.55, amberc, heat) * gridLines;
  color += mix(copper, amberc, clamp(heat * 1.4 + n * 0.3, 0.0, 1.0)) * topoLines;
  color += amberc * heat * 0.055;
  gl_FragColor = vec4(color, 1.0);
}`

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader))
    return null
  }
  return shader
}

// Returns a cleanup function, or null when WebGL is unavailable (caller shows the CSS fallback).
export function startHeroShader(canvas) {
  let gl = null
  try {
    gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false })
  } catch {
    return null
  }
  if (!gl) return null

  try {
    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    if (!vs || !fs) return null

    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program))
      return null
    }
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uDpr = gl.getUniformLocation(program, 'u_dpr')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let mouseX = 0.5, mouseY = 0.5, targetX = 0.5, targetY = 0.5
    const parent = canvas.parentElement
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      targetX = (e.clientX - rect.left) / rect.width
      targetY = 1 - (e.clientY - rect.top) / rect.height
    }
    parent.addEventListener('pointermove', onMove, { passive: true })

    const resize = () => {
      const w = Math.round(canvas.clientWidth * dpr)
      const h = Math.round(canvas.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
        gl.uniform2f(uResolution, w, h)
        gl.uniform1f(uDpr, dpr)
      }
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    let visible = true
    const visibilityObserver = new IntersectionObserver(
      (entries) => { visible = entries[0].isIntersecting },
      { threshold: 0 },
    )
    visibilityObserver.observe(canvas)

    const start = performance.now()
    let raf = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) return
      mouseX += (targetX - mouseX) * 0.045
      mouseY += (targetY - mouseY) * 0.045
      gl.uniform2f(uMouse, mouseX, mouseY)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      parent.removeEventListener('pointermove', onMove)
    }
  } catch (error) {
    console.warn('Shader error: ' + error.message)
    return null
  }
}
