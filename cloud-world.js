import * as THREE from "./assets/vendor/three.module.js";

const canvas = document.querySelector("#cloud-world");
const sky = document.querySelector(".sky");
const toggle = document.querySelector("#letter-toggle");

if (canvas && sky && toggle) {
  try {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x78add5, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uWarmth: { value: 0 }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      toneMapped: false,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uPointer;
        uniform float uWarmth;

        float hash21(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }

        float valueNoise(vec2 p) {
          vec2 cell = floor(p);
          vec2 local = fract(p);
          local = local * local * (3.0 - 2.0 * local);
          float a = hash21(cell);
          float b = hash21(cell + vec2(1.0, 0.0));
          float c = hash21(cell + vec2(0.0, 1.0));
          float d = hash21(cell + vec2(1.0, 1.0));
          return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
        }

        float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.52;
          mat2 rotation = mat2(0.80, 0.60, -0.60, 0.80);
          for (int octave = 0; octave < 5; octave++) {
            value += amplitude * valueNoise(p);
            p = rotation * p * 2.03 + 17.17;
            amplitude *= 0.5;
          }
          return value;
        }

        float cloudField(vec2 p, vec2 wind, float seed) {
          vec2 broadCoordinates = p * 0.72 + wind + seed;
          float broad = fbm(broadCoordinates);
          vec2 warp = vec2(
            valueNoise(broadCoordinates * 0.47 + 8.1),
            valueNoise(broadCoordinates * 0.43 - 5.7)
          ) - 0.5;
          float detail = fbm((p + warp * 0.7) * 2.45 - wind * 0.35 + seed * 0.31);
          return broad * 0.78 + detail * 0.22;
        }

        float cloudDensity(float field, float threshold, float softness) {
          return smoothstep(threshold - softness, threshold + softness, field);
        }

        void main() {
          float aspect = uResolution.x / max(1.0, uResolution.y);
          vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
          p += uPointer * vec2(0.055, 0.035);

          vec2 farWind = vec2(uTime * 0.0042, uTime * 0.00045);
          vec2 nearWind = vec2(uTime * 0.0068, uTime * 0.00075);
          vec2 sunDirection = normalize(vec2(-0.72, 0.52));

          float farField = cloudField(p * 1.18 + vec2(0.3, 0.16), farWind, 4.7);
          float farLitField = cloudField((p + sunDirection * 0.055) * 1.18 + vec2(0.3, 0.16), farWind, 4.7);
          float farDensity = cloudDensity(farField, 0.55, 0.048);
          farDensity *= 0.72 + 0.28 * smoothstep(-0.55, 0.58, p.y);

          float nearField = cloudField(p * 0.82 + vec2(-0.44, -0.28), nearWind, 12.3);
          float nearLitField = cloudField((p + sunDirection * 0.072) * 0.82 + vec2(-0.44, -0.28), nearWind, 12.3);
          float nearDensity = cloudDensity(nearField, 0.525 + p.y * 0.035, 0.046);
          nearDensity *= 1.0 - 0.32 * smoothstep(0.15, 0.82, p.y);

          float farLighting = clamp(0.58 + (farField - farLitField) * 5.2, 0.25, 1.0);
          float nearLighting = clamp(0.54 + (nearField - nearLitField) * 6.5, 0.18, 1.0);
          float farEdge = smoothstep(0.0, 0.7, farDensity);
          float nearEdge = smoothstep(0.0, 0.82, nearDensity);

          vec3 coolShadow = mix(vec3(0.58, 0.62, 0.78), vec3(0.64, 0.52, 0.70), uWarmth);
          vec3 warmLight = mix(vec3(1.0, 0.88, 0.74), vec3(1.0, 0.80, 0.76), uWarmth);
          vec3 farColor = mix(coolShadow, warmLight, farLighting * 0.72 + farEdge * 0.2);
          vec3 nearColor = mix(coolShadow * 0.95, warmLight, nearLighting * 0.76 + nearEdge * 0.22);

          float farAlpha = farDensity * 0.46;
          float nearAlpha = nearDensity * 0.76;
          float alpha = farAlpha + nearAlpha * (1.0 - farAlpha);
          vec3 color = mix(farColor, nearColor, nearAlpha / max(alpha, 0.001));

          float atmosphericFade = smoothstep(0.0, 0.16, alpha);
          gl_FragColor = vec4(color, alpha * atmosphericFade);
        }
      `
    });

    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    const targetPointer = new THREE.Vector2();
    const supportsPointerParallax = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (supportsPointerParallax) {
      window.addEventListener("pointermove", (event) => {
        targetPointer.set(
          event.clientX / Math.max(1, window.innerWidth) - 0.5,
          0.5 - event.clientY / Math.max(1, window.innerHeight)
        );
      }, { passive: true });
      window.addEventListener("blur", () => targetPointer.set(0, 0));
    }
    window.addEventListener("mobile-parallax", (event) => {
      const x = THREE.MathUtils.clamp(Number(event.detail?.x) || 0, -1, 1);
      const y = THREE.MathUtils.clamp(Number(event.detail?.y) || 0, -1, 1);
      targetPointer.set(x * 0.26, -y * 0.18);
    });

    function resize() {
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    }
    window.addEventListener("resize", resize, { passive: true });
    resize();

    const startedAt = performance.now();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let warmth = 0;
    function render(now = performance.now()) {
      const elapsed = (now - startedAt) / 1000;
      warmth += ((toggle.checked ? 1 : 0) - warmth) * 0.018;
      uniforms.uTime.value = reduceMotion ? 0 : elapsed;
      uniforms.uWarmth.value = warmth;
      uniforms.uPointer.value.lerp(targetPointer, 0.018);
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    sky.classList.add("clouds-ready");
    render();
  } catch (error) {
    sky.classList.add("clouds-fallback");
  }
}
