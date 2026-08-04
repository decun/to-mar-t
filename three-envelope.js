import * as THREE from "./assets/vendor/three.module.js";

const canvas = document.querySelector("#envelope-3d");
const stage = document.querySelector("#stage");
const toggle = document.querySelector("#letter-toggle");

if (canvas && stage && toggle) {
  try {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.set(0, 0.15, 10);

    scene.add(new THREE.HemisphereLight(0xeaf7ff, 0x835b55, 2.2));

    const key = new THREE.DirectionalLight(0xfff2dd, 4.6);
    key.position.set(-4, 6, 7);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);

    const rim = new THREE.PointLight(0x9fd4ff, 15, 18);
    rim.position.set(4.5, 1.5, 4);
    scene.add(rim);

    const paperCanvas = document.createElement("canvas");
    paperCanvas.width = paperCanvas.height = 128;
    const paperContext = paperCanvas.getContext("2d");
    paperContext.fillStyle = "#eee1c8";
    paperContext.fillRect(0, 0, 128, 128);
    for (let index = 0; index < 900; index += 1) {
      const shade = 138 + Math.random() * 80;
      paperContext.fillStyle = `rgba(${shade},${shade - 10},${shade - 28},${0.015 + Math.random() * 0.035})`;
      paperContext.fillRect(Math.random() * 128, Math.random() * 128, 1 + Math.random(), 1 + Math.random());
    }
    const paperTexture = new THREE.CanvasTexture(paperCanvas);
    paperTexture.colorSpace = THREE.SRGBColorSpace;
    paperTexture.wrapS = paperTexture.wrapT = THREE.RepeatWrapping;
    paperTexture.repeat.set(3, 2);

    const envelopeGroup = new THREE.Group();
    envelopeGroup.position.y = -0.48;
    scene.add(envelopeGroup);

    const paperMaterial = new THREE.MeshStandardMaterial({ map: paperTexture, color: 0xf1e4cc, roughness: 0.84, metalness: 0, side: THREE.DoubleSide });
    const paperLight = new THREE.MeshStandardMaterial({ map: paperTexture, color: 0xfff2dc, roughness: 0.88, metalness: 0, side: THREE.DoubleSide });
    const paperShade = new THREE.MeshStandardMaterial({ map: paperTexture, color: 0xd7c3a4, roughness: 0.9, metalness: 0, side: THREE.DoubleSide });
    const foldEdgeMaterial = new THREE.LineBasicMaterial({ color: 0xb8a184, transparent: true, opacity: 0.42 });

    const back = new THREE.Mesh(new THREE.BoxGeometry(5.45, 3.12, 0.11), paperShade);
    back.castShadow = true;
    back.receiveShadow = true;
    envelopeGroup.add(back);

    function shapeMesh(points, material, z = 0.1) {
      const shape = new THREE.Shape();
      shape.moveTo(points[0][0], points[0][1]);
      for (let index = 1; index < points.length; index += 1) shape.lineTo(points[index][0], points[index][1]);
      shape.closePath();
      const geometry = new THREE.ShapeGeometry(shape);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = z;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), foldEdgeMaterial);
      edges.position.z = 0.008;
      mesh.add(edges);
      return mesh;
    }

    envelopeGroup.add(
      shapeMesh([[-2.72, 1.53], [-2.72, -1.56], [0.05, -0.08]], paperMaterial, 0.13),
      shapeMesh([[2.72, 1.53], [2.72, -1.56], [0.05, -0.08]], paperMaterial, 0.14),
      shapeMesh([[-2.72, -1.56], [2.72, -1.56], [0.05, -0.08]], paperLight, 0.18)
    );

    const flapPivot = new THREE.Group();
    flapPivot.position.set(0, 1.54, 0.19);
    envelopeGroup.add(flapPivot);
    flapPivot.add(shapeMesh([[-2.72, 0], [2.72, 0], [0, -1.78]], paperLight, 0));
    flapPivot.add(shapeMesh([[-2.58, -0.01], [2.58, -0.01], [0, -1.66]], new THREE.MeshStandardMaterial({ color: 0xcdb89a, roughness: 1, side: THREE.DoubleSide }), -0.012));

    const letterCanvas = document.createElement("canvas");
    const letterWidth = 1024;
    const letterHeight = 760;
    const letterResolution = 2;
    letterCanvas.width = letterWidth * letterResolution;
    letterCanvas.height = letterHeight * letterResolution;
    const letterContext = letterCanvas.getContext("2d");
    const letterTexture = new THREE.CanvasTexture(letterCanvas);
    letterTexture.colorSpace = THREE.SRGBColorSpace;
    letterTexture.anisotropy = Math.min(16, renderer.capabilities.getMaxAnisotropy());
    letterTexture.minFilter = THREE.LinearMipmapLinearFilter;
    letterTexture.magFilter = THREE.LinearFilter;
    letterTexture.generateMipmaps = true;
    const letterStamp = new Image();
    const tintedLetterStamp = document.createElement("canvas");
    const stampGlyphs = ["う", "さ", "ぎ"].map(() => document.createElement("canvas"));
    letterStamp.decoding = "async";
    letterStamp.src = "./assets/usagi-letter-stamp-v2.png";

    function prepareLetterStamp() {
      tintedLetterStamp.width = letterStamp.naturalWidth;
      tintedLetterStamp.height = letterStamp.naturalHeight;
      const stampContext = tintedLetterStamp.getContext("2d");
      stampContext.clearRect(0, 0, tintedLetterStamp.width, tintedLetterStamp.height);
      stampContext.drawImage(letterStamp, 0, 0);
      stampContext.globalCompositeOperation = "source-in";
      stampContext.fillStyle = "#0a1d3b";
      stampContext.fillRect(0, 0, tintedLetterStamp.width, tintedLetterStamp.height);
      stampContext.globalCompositeOperation = "source-over";

      ["う", "さ", "ぎ"].forEach((character, glyphIndex) => {
        const glyphCanvas = stampGlyphs[glyphIndex];
        glyphCanvas.width = 112;
        glyphCanvas.height = 112;
        const glyphContext = glyphCanvas.getContext("2d");
        glyphContext.fillStyle = "#0a1d3b";
        glyphContext.font = '800 82px "Yu Mincho", "Hiragino Mincho ProN", serif';
        glyphContext.textAlign = "center";
        glyphContext.textBaseline = "middle";
        glyphContext.fillText(character, 56, 57);
        glyphContext.globalCompositeOperation = "destination-out";
        let textureSeed = 4831 + glyphIndex * 997;
        for (let index = 0; index < 34; index += 1) {
          textureSeed = (textureSeed * 16807) % 2147483647;
          const x = (textureSeed / 2147483647) * glyphCanvas.width;
          textureSeed = (textureSeed * 16807) % 2147483647;
          const y = (textureSeed / 2147483647) * glyphCanvas.height;
          textureSeed = (textureSeed * 16807) % 2147483647;
          const radius = 1.4 + (textureSeed / 2147483647) * 3.4;
          glyphContext.beginPath();
          glyphContext.ellipse(x, y, radius * 1.7, radius, 0.35, 0, Math.PI * 2);
          glyphContext.fill();
        }
        glyphContext.globalCompositeOperation = "source-over";
      });
    }

    function getWrappedLetterLines(text, maxWidth) {
      const words = text.trim().split(/\s+/);
      const lines = [];
      let line = "";
      for (const word of words) {
        const candidate = line ? `${line} ${word}` : word;
        if (letterContext.measureText(candidate).width > maxWidth && line) {
          lines.push(line);
          line = word;
        } else {
          line = candidate;
        }
      }
      if (line) lines.push(line);
      return lines;
    }

    function drawLetter() {
      letterContext.setTransform(letterResolution, 0, 0, letterResolution, 0, 0);
      const article = document.querySelector("#letter");
      const date = article?.querySelector(".letter-date")?.textContent ?? "un pedacito de lo que siento";
      const heading = article?.querySelector("h2")?.textContent ?? "Hola, tú";
      const paragraphs = [...(article?.querySelectorAll("p") ?? [])];
      const currentPage = Number(article?.dataset.currentPage ?? 0);
      const pageCount = Math.max(1, ...paragraphs.map((paragraph) => Number(paragraph.dataset.letterPage ?? 0) + 1));
      const pageHeadings = [heading, "Y también quería decirte…"];
      const messages = paragraphs
        .filter((paragraph) => !paragraph.classList.contains("signature") && Number(paragraph.dataset.letterPage ?? 0) === currentPage)
        .map((paragraph) => paragraph.textContent?.trim() ?? "")
        .filter(Boolean);
      const signatureElement = article?.querySelector(".signature");
      const signature = Number(signatureElement?.dataset.letterPage ?? -1) === currentPage ? signatureElement?.textContent ?? "" : "";
      const paperGradient = letterContext.createLinearGradient(0, 0, 0, letterHeight);
      paperGradient.addColorStop(0, "#eefaff");
      paperGradient.addColorStop(1, "#c7e6f5");
      letterContext.clearRect(0, 0, letterWidth, letterHeight);
      letterContext.fillStyle = paperGradient;
      letterContext.fillRect(0, 0, letterWidth, letterHeight);
      letterContext.strokeStyle = "rgba(61,111,146,.28)";
      letterContext.lineWidth = 3;
      letterContext.strokeRect(28, 28, letterWidth - 56, letterHeight - 56);
      letterContext.fillStyle = "#d58b92";
      letterContext.fillRect(92, 82, 92, 4);
      letterContext.fillStyle = "rgba(23,58,90,.72)";
      letterContext.font = '500 19px "Montserrat", Arial, sans-serif';
      letterContext.letterSpacing = "3px";
      letterContext.fillText(`${date.toUpperCase()}  ·  ${currentPage + 1} DE ${pageCount}`, 92, 140);
      letterContext.letterSpacing = "0px";
      letterContext.fillStyle = "#173a5a";
      letterContext.font = '600 50px "Cormorant Garamond", Georgia, serif';
      letterContext.fillText(pageHeadings[currentPage] ?? heading, 72, 202);

      const textX = 72;
      const textWidth = 880;
      const textTop = 246;
      const textBottom = 692;
      let bodyFontSize = 36;
      let lineHeight = 35;
      let paragraphGap = 9;
      let wrappedParagraphs = [];

      while (bodyFontSize >= 25) {
        lineHeight = Math.round(bodyFontSize * 1.22);
        paragraphGap = Math.max(6, Math.round(bodyFontSize * 0.35));
        letterContext.font = `500 ${bodyFontSize}px "Cormorant Garamond", Georgia, serif`;
        wrappedParagraphs = messages.map((message) => getWrappedLetterLines(message, textWidth));
        const bodyHeight = wrappedParagraphs.reduce((height, lines) => height + lines.length * lineHeight, 0)
          + Math.max(0, wrappedParagraphs.length - 1) * paragraphGap;
        const signatureHeight = signature ? Math.round(bodyFontSize * 1.2) + 14 : 0;
        if (bodyHeight + signatureHeight <= textBottom - textTop) break;
        bodyFontSize -= 1;
      }

      letterContext.fillStyle = "#173a5a";
      letterContext.font = `500 ${bodyFontSize}px "Cormorant Garamond", Georgia, serif`;
      let cursorY = textTop;
      wrappedParagraphs.forEach((lines, index) => {
        lines.forEach((line) => {
          letterContext.fillText(line, textX, cursorY);
          cursorY += lineHeight;
        });
        if (index < wrappedParagraphs.length - 1) cursorY += paragraphGap;
      });

      letterContext.fillStyle = "#6f5878";
      letterContext.font = `italic ${Math.max(23, bodyFontSize + 2)}px "Cormorant Garamond", Georgia, serif`;
      letterContext.fillText(signature, textX, Math.min(cursorY + 12, 714));

      if (currentPage === pageCount - 1 && tintedLetterStamp.width) {
        const stampSize = 190;
        letterContext.save();
        letterContext.translate(875, 620);
        letterContext.rotate(-0.085);
        letterContext.globalAlpha = 0.8;
        letterContext.globalCompositeOperation = "multiply";
        letterContext.drawImage(tintedLetterStamp, -stampSize / 2, -108, stampSize, stampSize);
        const glyphPlacements = [
          { x: 62, y: -78, angle: 0.28 },
          { x: 88, y: -48, angle: 0.58 },
          { x: 101, y: -9, angle: 0.92 }
        ];
        stampGlyphs.forEach((glyphCanvas, glyphIndex) => {
          const placement = glyphPlacements[glyphIndex];
          letterContext.save();
          letterContext.translate(placement.x, placement.y);
          letterContext.rotate(placement.angle);
          letterContext.drawImage(glyphCanvas, -14, -14, 28, 28);
          letterContext.restore();
        });
        letterContext.restore();
      }
      letterTexture.needsUpdate = true;
    }

    drawLetter();
    letterStamp.addEventListener("load", () => {
      prepareLetterStamp();
      drawLetter();
    }, { once: true });
    document.fonts?.ready.then(drawLetter).catch(() => {});
    stage.addEventListener("letter-page-change", drawLetter);

    function createLetterSegment(segmentIndex, depthOffset = 0) {
      const geometry = new THREE.PlaneGeometry(4.4, 1.1);
      const uv = geometry.attributes.uv;
      for (let index = 0; index < uv.count; index += 1) {
        uv.setY(index, uv.getY(index) / 3 + segmentIndex / 3);
      }
      uv.needsUpdate = true;
      const material = new THREE.MeshBasicMaterial({
        map: letterTexture,
        toneMapped: false,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = depthOffset;
      mesh.receiveShadow = true;
      return mesh;
    }

    const letterAssembly = new THREE.Group();
    const letterMiddle = createLetterSegment(1, 0);
    const letterTopPivot = new THREE.Group();
    const letterTop = createLetterSegment(2, 0.008);
    const letterBottomPivot = new THREE.Group();
    const letterBottom = createLetterSegment(0, 0.014);
    letterTopPivot.position.y = 0.55;
    letterTop.position.y = 0.55;
    letterBottomPivot.position.y = -0.55;
    letterBottom.position.y = -0.55;
    letterTopPivot.add(letterTop);
    letterBottomPivot.add(letterBottom);
    letterAssembly.add(letterMiddle, letterTopPivot, letterBottomPivot);
    letterAssembly.position.set(0, -0.3, 0.09);
    letterAssembly.visible = false;
    envelopeGroup.add(letterAssembly);

    const roseTexture = new THREE.TextureLoader().load("./assets/usagi-gift-sticker-clean.png");
    roseTexture.colorSpace = THREE.SRGBColorSpace;
    roseTexture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    const roseMaterial = new THREE.MeshBasicMaterial({ map: roseTexture, transparent: true, depthWrite: false, toneMapped: false, side: THREE.DoubleSide });
    const roseGeometry = new THREE.PlaneGeometry(2.1, 2.1, 18, 18);
    const roseBasePositions = Float32Array.from(roseGeometry.attributes.position.array);
    const roseSeal = new THREE.Mesh(roseGeometry, roseMaterial);
    roseSeal.position.set(0, -0.08, 0.27);
    envelopeGroup.add(roseSeal);

    stage.classList.add("webgl-ready");

    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowContext = shadowCanvas.getContext("2d");
    const shadowGradient = shadowContext.createRadialGradient(128, 128, 3, 128, 128, 126);
    shadowGradient.addColorStop(0, "rgba(32,54,82,.34)");
    shadowGradient.addColorStop(0.48, "rgba(32,54,82,.15)");
    shadowGradient.addColorStop(1, "rgba(32,54,82,0)");
    shadowContext.fillStyle = shadowGradient;
    shadowContext.fillRect(0, 0, 256, 256);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const softShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(6.5, 1.45),
      new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false, toneMapped: false })
    );
    softShadow.position.set(0, -1.72, -0.18);
    envelopeGroup.add(softShadow);

    let pointerX = 0;
    let pointerY = 0;
    let openAmount = toggle.checked ? 1 : 0;
    let requestedOpen = toggle.checked;
    let stickerTappedAt = -1000;
    let arrivalStartedAt = stage.dataset.sceneReady === "true" ? performance.now() : null;
    let lastFrameAt = performance.now();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    toggle.addEventListener("change", () => { requestedOpen = toggle.checked; });
    stage.addEventListener("seal-tap", () => { stickerTappedAt = performance.now(); });
    stage.addEventListener("scene-ready", () => { arrivalStartedAt = performance.now(); });
    const supportsEnvelopeTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (supportsEnvelopeTilt) {
      stage.addEventListener("pointermove", (event) => {
        const bounds = stage.getBoundingClientRect();
        pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      });
      stage.addEventListener("pointerleave", () => { pointerX = 0; pointerY = 0; });
      window.addEventListener("blur", () => { pointerX = 0; pointerY = 0; });
    }

    function resize() {
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      const verticalFov = THREE.MathUtils.degToRad(camera.fov);
      const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
      const mobileFitDistance = 5.85 / (2 * Math.tan(horizontalFov / 2));
      camera.position.z = Math.max(10, mobileFitDistance);
      camera.updateProjectionMatrix();
    }
    new ResizeObserver(resize).observe(stage);
    resize();

    const startedAt = performance.now();
    function updateStickerPeel(peelAmount) {
      const positions = roseGeometry.attributes.position.array;
      const stickerWidth = 2.1;
      const rightEdge = stickerWidth / 2;
      const boundary = rightEdge - stickerWidth * peelAmount;
      const peeledWidth = Math.max(0.001, stickerWidth * peelAmount);
      const maxAngle = Math.PI * 0.88;
      const radius = Math.max(0.025, peeledWidth / maxAngle);

      for (let index = 0; index < positions.length; index += 3) {
        const baseX = roseBasePositions[index];
        const baseY = roseBasePositions[index + 1];
        positions[index] = baseX;
        positions[index + 1] = baseY;
        positions[index + 2] = 0;

        if (peelAmount > 0.001 && baseX > boundary) {
          const local = THREE.MathUtils.clamp((baseX - boundary) / peeledWidth, 0, 1);
          const angle = local * maxAngle;
          positions[index] = boundary + Math.sin(angle) * radius;
          positions[index + 1] = baseY + Math.sin(local * Math.PI) * 0.035;
          positions[index + 2] = (1 - Math.cos(angle)) * radius + Math.sin(local * Math.PI) * 0.075;
        }
      }
      roseGeometry.attributes.position.needsUpdate = true;
      roseGeometry.computeVertexNormals();
    }

    function render(now = performance.now()) {
      const elapsed = (now - startedAt) / 1000;
      const arrivalProgress = prefersReducedMotion
        ? 1
        : arrivalStartedAt === null
          ? 0
          : THREE.MathUtils.clamp((now - arrivalStartedAt) / 1900, 0, 1);
      const arrivalEase = 1 - Math.pow(1 - arrivalProgress, 3);
      const arrivalFlutter = Math.sin(arrivalProgress * Math.PI * 2.4) * Math.pow(1 - arrivalProgress, 1.45);
      const targetOpen = requestedOpen ? 1 : 0;
      const frameDelta = Math.min(0.05, (now - lastFrameAt) / 1000);
      lastFrameAt = now;
      if (Math.abs(targetOpen - openAmount) > 0.0001) {
        const duration = targetOpen ? 3.2 : 2.8;
        openAmount += Math.sign(targetOpen - openAmount) * frameDelta / duration;
        openAmount = THREE.MathUtils.clamp(openAmount, 0, 1);
      }

      const smoothstep = (edge0, edge1, value) => {
        const amount = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1);
        return amount * amount * (3 - 2 * amount);
      };
      const flapAmount = requestedOpen
        ? smoothstep(0.18, 0.52, openAmount)
        : smoothstep(0.1, 0.55, openAmount);
      const stickerPeel = requestedOpen
        ? smoothstep(0, 0.2, openAmount)
        : smoothstep(0, 0.12, openAmount);
      const stickerDetach = requestedOpen
        ? smoothstep(0.18, 0.32, openAmount)
        : smoothstep(0.08, 0.18, openAmount);
      const stickerOpacity = 1 - smoothstep(0.72, 1, stickerDetach);
      const letterExtract = smoothstep(0.55, 0.84, openAmount);
      const letterRelease = smoothstep(0.84, 0.91, openAmount);
      const letterUnfold = smoothstep(0.91, 1, openAmount);

      flapPivot.rotation.x = -Math.PI * flapAmount;
      flapPivot.position.z = 0.19 - flapAmount * 0.5;
      const extractedLetterY = THREE.MathUtils.lerp(-0.3, 2.22, letterExtract);
      letterAssembly.position.y = THREE.MathUtils.lerp(extractedLetterY, 1.16, letterUnfold);
      letterAssembly.position.z = THREE.MathUtils.lerp(0.09, 0.52, letterRelease);
      letterAssembly.rotation.x = -0.035 * letterRelease + 0.018 * letterUnfold;
      letterTopPivot.rotation.x = Math.PI * (1 - letterUnfold);
      letterBottomPivot.rotation.x = -Math.PI * (1 - letterUnfold);
      letterAssembly.visible = letterExtract > 0.002;
      updateStickerPeel(stickerPeel);
      roseSeal.position.set(stickerDetach * 0.72, -0.08 + stickerDetach * 0.52, 0.27 + stickerDetach * 0.82);
      const tapPhase = THREE.MathUtils.clamp((now - stickerTappedAt) / 420, 0, 1);
      const tapBounce = Math.sin(tapPhase * Math.PI) * (1 - tapPhase);
      roseSeal.rotation.z = stickerDetach * 0.18 - tapBounce * 0.12;
      roseSeal.rotation.y = -stickerDetach * 0.14;
      roseMaterial.opacity = stickerOpacity;
      roseSeal.visible = stickerOpacity > 0.01;
      roseSeal.scale.setScalar(1 - stickerDetach * 0.08 + Math.sin(stickerPeel * Math.PI) * 0.025 + tapBounce * 0.13);
      const landingShadow = smoothstep(0.48, 1, arrivalProgress);
      softShadow.material.opacity = Math.max(0, 1 - flapAmount * 1.35) * landingShadow;
      softShadow.visible = flapAmount < 0.76;
      const restingY = -0.48 - flapAmount * 0.32 + Math.sin(elapsed * 1.25) * 0.035;
      envelopeGroup.position.x = THREE.MathUtils.lerp(6.8, 0, arrivalEase) + arrivalFlutter * 0.3;
      envelopeGroup.position.y = restingY + THREE.MathUtils.lerp(4.5, 0, arrivalEase) + arrivalFlutter * 0.52;
      envelopeGroup.position.z = THREE.MathUtils.lerp(-6.2, 0, arrivalEase);
      const arrivalYaw = (1 - arrivalEase) * 0.68 + arrivalFlutter * 0.16;
      const arrivalPitch = (1 - arrivalEase) * -0.22 + arrivalFlutter * 0.08;
      envelopeGroup.rotation.y += (pointerX * 0.12 + arrivalYaw - envelopeGroup.rotation.y) * 0.075;
      envelopeGroup.rotation.x += (-pointerY * 0.055 + arrivalPitch - envelopeGroup.rotation.x) * 0.075;
      envelopeGroup.rotation.z = Math.sin(elapsed * 0.8) * 0.008 - (1 - arrivalEase) * 0.52 + arrivalFlutter * 0.14;

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    render();
  } catch (error) {
    stage.classList.add("webgl-fallback");
  }
}
