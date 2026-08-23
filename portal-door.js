import * as THREE from "./assets/vendor/three.module.js";

const portalCanvas = document.querySelector("#portal-3d");
const portalGateElement = document.querySelector("#portal-gate");
const portalWorldElement = document.querySelector("#portal-world");

if (portalCanvas && portalGateElement && portalWorldElement) {
  try {
    const renderer = new THREE.WebGLRenderer({
      canvas: portalCanvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 40);
    camera.position.set(0, 0.18, 10.2);

    const hemisphere = new THREE.HemisphereLight(0xeef4ff, 0x433451, 2.45);
    scene.add(hemisphere);

    const keyLight = new THREE.DirectionalLight(0xffe2b9, 5.2);
    keyLight.position.set(-4.5, 6, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 7;
    keyLight.shadow.camera.bottom = -6;
    scene.add(keyLight);

    const coolRim = new THREE.PointLight(0xaac8ff, 11, 16, 2);
    coolRim.position.set(3.2, 2.2, 4.5);
    scene.add(coolRim);

    const portalLight = new THREE.PointLight(0xffffff, 4.2, 14, 1.6);
    portalLight.position.set(0, 0.2, 1.4);
    scene.add(portalLight);

    function createDoorTexture() {
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = 256;
      textureCanvas.height = 512;
      const context = textureCanvas.getContext("2d");
      const gradient = context.createLinearGradient(0, 0, 256, 0);
      gradient.addColorStop(0, "#201b36");
      gradient.addColorStop(0.22, "#45304d");
      gradient.addColorStop(0.55, "#342540");
      gradient.addColorStop(0.82, "#493250");
      gradient.addColorStop(1, "#19172e");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 256, 512);
      let seed = 8923;
      for (let index = 0; index < 180; index += 1) {
        seed = (seed * 16807) % 2147483647;
        const x = (seed / 2147483647) * 256;
        seed = (seed * 16807) % 2147483647;
        const alpha = 0.018 + (seed / 2147483647) * 0.045;
        context.strokeStyle = `rgba(238,204,173,${alpha})`;
        context.lineWidth = 0.5 + (index % 3) * 0.4;
        context.beginPath();
        context.moveTo(x, 0);
        context.bezierCurveTo(x + Math.sin(index) * 8, 150, x - Math.cos(index * 0.7) * 7, 350, x + Math.sin(index * 1.4) * 5, 512);
        context.stroke();
      }
      const texture = new THREE.CanvasTexture(textureCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      return texture;
    }

    function createStoneTexture() {
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = textureCanvas.height = 256;
      const context = textureCanvas.getContext("2d");
      context.fillStyle = "#88898b";
      context.fillRect(0, 0, 256, 256);
      let seed = 4109;
      for (let index = 0; index < 2600; index += 1) {
        seed = (seed * 48271) % 2147483647;
        const value = seed / 2147483647;
        seed = (seed * 48271) % 2147483647;
        const x = (seed / 2147483647) * 256;
        seed = (seed * 48271) % 2147483647;
        const y = (seed / 2147483647) * 256;
        const shade = Math.round(86 + value * 92);
        context.fillStyle = `rgba(${shade},${shade},${shade},${0.055 + value * 0.09})`;
        context.fillRect(x, y, 0.7 + value * 1.6, 0.7 + value * 1.6);
      }
      const texture = new THREE.CanvasTexture(textureCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2.2, 3.1);
      return texture;
    }

    const doorTexture = createDoorTexture();
    const stoneTexture = createStoneTexture();
    const root = new THREE.Group();
    root.position.y = 0.16;
    scene.add(root);

    const outerArch = new THREE.Shape();
    outerArch.moveTo(-1.4, -2.35);
    outerArch.lineTo(1.4, -2.35);
    outerArch.lineTo(1.4, 2.48);
    outerArch.lineTo(-1.4, 2.48);
    outerArch.closePath();

    const archOpening = new THREE.Path();
    archOpening.moveTo(-1.17, -2.2);
    archOpening.lineTo(-1.17, 2.28);
    archOpening.lineTo(1.17, 2.28);
    archOpening.lineTo(1.17, -2.2);
    archOpening.closePath();
    outerArch.holes.push(archOpening);

    const frameGeometry = new THREE.ExtrudeGeometry(outerArch, {
      depth: 0.46,
      bevelEnabled: true,
      bevelSegments: 5,
      bevelSize: 0.045,
      bevelThickness: 0.05,
      curveSegments: 36
    });
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x8f9092,
      map: stoneTexture,
      bumpMap: stoneTexture,
      bumpScale: 0.055,
      roughness: 0.86,
      metalness: 0.01
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.z = -0.22;
    frame.castShadow = true;
    frame.receiveShadow = true;
    root.add(frame);

    const innerPortalShape = new THREE.Shape();
    innerPortalShape.moveTo(-1.14, -2.17);
    innerPortalShape.lineTo(1.14, -2.17);
    innerPortalShape.lineTo(1.14, 2.25);
    innerPortalShape.lineTo(-1.14, 2.25);
    innerPortalShape.closePath();

    const portalMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      depthWrite: false,
      opacity: 0.94,
      toneMapped: false
    });
    const portalSurface = new THREE.Mesh(new THREE.ShapeGeometry(innerPortalShape, 32), portalMaterial);
    portalSurface.position.z = -0.29;
    root.add(portalSurface);

    const doorShape = new THREE.Shape();
    doorShape.moveTo(0, -2.19);
    doorShape.lineTo(2.27, -2.19);
    doorShape.lineTo(2.27, 2.26);
    doorShape.lineTo(0, 2.26);
    doorShape.closePath();

    const doorMaterial = new THREE.MeshStandardMaterial({
      color: 0x49314f,
      map: doorTexture,
      bumpMap: doorTexture,
      bumpScale: 0.04,
      roughness: 0.7,
      metalness: 0.03
    });
    const panelMaterial = new THREE.MeshStandardMaterial({
      color: 0x5c3e5f,
      map: doorTexture,
      roughness: 0.64,
      metalness: 0.04
    });
    const doorPivot = new THREE.Group();
    doorPivot.position.set(-1.135, 0, 0.02);
    root.add(doorPivot);

    const doorGeometry = new THREE.ExtrudeGeometry(doorShape, {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.035,
      bevelThickness: 0.035,
      curveSegments: 28
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.z = -0.03;
    door.castShadow = true;
    door.receiveShadow = true;
    doorPivot.add(door);

    function addRaisedPanel(shape) {
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.045,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 0.035,
        bevelThickness: 0.025,
        curveSegments: 20
      });
      const panel = new THREE.Mesh(geometry, panelMaterial);
      panel.position.z = 0.19;
      panel.castShadow = true;
      doorPivot.add(panel);
    }

    const upperPanel = new THREE.Shape();
    upperPanel.moveTo(0.28, 0.23);
    upperPanel.lineTo(1.98, 0.23);
    upperPanel.lineTo(1.98, 1.88);
    upperPanel.lineTo(0.28, 1.88);
    upperPanel.closePath();
    addRaisedPanel(upperPanel);

    const lowerPanel = new THREE.Shape();
    lowerPanel.moveTo(0.28, -1.85);
    lowerPanel.lineTo(1.98, -1.85);
    lowerPanel.lineTo(1.98, -0.13);
    lowerPanel.lineTo(0.28, -0.13);
    lowerPanel.closePath();
    addRaisedPanel(lowerPanel);

    const brassMaterial = new THREE.MeshStandardMaterial({ color: 0xc99a5b, roughness: 0.25, metalness: 0.82 });
    const handleStem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.22, 20), brassMaterial);
    handleStem.rotation.x = Math.PI / 2;
    handleStem.position.set(1.92, -0.02, 0.34);
    handleStem.castShadow = true;
    doorPivot.add(handleStem);
    const handleKnob = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 16), brassMaterial);
    handleKnob.position.set(1.92, -0.02, 0.47);
    handleKnob.castShadow = true;
    doorPivot.add(handleKnob);
    const handleHitArea = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 12, 8),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
    );
    handleHitArea.position.copy(handleKnob.position);
    doorPivot.add(handleHitArea);

    const hingeMaterial = new THREE.MeshStandardMaterial({ color: 0x9b774f, roughness: 0.38, metalness: 0.65 });
    [-1.34, 1.04].forEach((hingeY) => {
      const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.32, 18), hingeMaterial);
      hinge.position.set(0.01, hingeY, 0.14);
      hinge.castShadow = true;
      doorPivot.add(hinge);
    });

    const thresholdMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b8d8f,
      map: stoneTexture,
      roughness: 0.9,
      metalness: 0.01
    });
    const threshold = new THREE.Mesh(new THREE.BoxGeometry(3.45, 0.3, 1.38, 3, 1, 3), thresholdMaterial);
    threshold.position.set(0, -2.4, 0.24);
    threshold.castShadow = true;
    threshold.receiveShadow = true;
    root.add(threshold);

    let requestedOpen = false;
    let requestedEnter = false;
    let openAmount = 0;
    let enterAmount = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let lastFrameAt = performance.now();
    const startedAt = performance.now();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const handleRaycaster = new THREE.Raycaster();
    const handlePointer = new THREE.Vector2();
    const handleTargets = [handleKnob, handleStem, handleHitArea];

    function pointerHitsHandle(event) {
      const bounds = portalCanvas.getBoundingClientRect();
      handlePointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      handlePointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      handleRaycaster.setFromCamera(handlePointer, camera);
      return handleRaycaster.intersectObjects(handleTargets, false).length > 0;
    }

    function requestKeypad() {
      if (requestedOpen || requestedEnter) return;
      portalGateElement.dispatchEvent(new CustomEvent("portal-keypad-request"));
    }

    portalCanvas.addEventListener("pointermove", (event) => {
      portalCanvas.style.cursor = pointerHitsHandle(event) ? "pointer" : "default";
    });
    portalCanvas.addEventListener("pointerleave", () => { portalCanvas.style.cursor = "default"; });
    portalCanvas.addEventListener("pointerup", (event) => {
      if (pointerHitsHandle(event)) requestKeypad();
    });
    portalCanvas.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      requestKeypad();
    });

    portalGateElement.addEventListener("portal-unlock", () => { requestedOpen = true; });
    portalGateElement.addEventListener("portal-enter", () => { requestedEnter = true; });
    portalGateElement.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch" || requestedEnter) return;
      const bounds = portalGateElement.getBoundingClientRect();
      targetPointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      targetPointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    });
    portalGateElement.addEventListener("pointerleave", () => {
      targetPointerX = 0;
      targetPointerY = 0;
    });

    function resizePortal() {
      const width = Math.max(1, portalCanvas.clientWidth);
      const height = Math.max(1, portalCanvas.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const mobile = width < 620;
      root.position.x = mobile ? 0 : -0.76;
      root.scale.setScalar(mobile ? 0.9 : 0.96);
      camera.position.z = mobile ? 10.65 : 10.2;
    }
    new ResizeObserver(resizePortal).observe(portalWorldElement);
    resizePortal();

    function renderPortal(now = performance.now()) {
      const elapsed = (now - startedAt) / 1000;
      const delta = Math.min(0.05, (now - lastFrameAt) / 1000);
      lastFrameAt = now;
      const openSpeed = reduceMotion ? 8 : 0.62;
      const enterSpeed = reduceMotion ? 8 : 0.7;
      openAmount += (Number(requestedOpen) - openAmount) * Math.min(1, delta * openSpeed * 3.2);
      enterAmount += (Number(requestedEnter) - enterAmount) * Math.min(1, delta * enterSpeed * 3.2);
      pointerX += (targetPointerX - pointerX) * 0.045;
      pointerY += (targetPointerY - pointerY) * 0.045;

      const doorEase = openAmount * openAmount * (3 - 2 * openAmount);
      doorPivot.rotation.y = -doorEase * Math.PI * 0.63;
      doorPivot.position.z = doorEase * 0.08;
      portalMaterial.opacity = 0.94 + doorEase * 0.06;
      portalLight.intensity = 4.2 + doorEase * 14;

      root.rotation.y += (pointerX * 0.095 - root.rotation.y) * 0.055;
      root.rotation.x += (-pointerY * 0.038 - root.rotation.x) * 0.055;
      root.position.y = 0.16 + Math.sin(elapsed * 0.8) * 0.035;
      camera.position.z = (portalCanvas.clientWidth < 620 ? 10.65 : 10.2) - enterAmount * 1.35;
      camera.position.y = 0.18 + enterAmount * 0.12;

      renderer.render(scene, camera);
      requestAnimationFrame(renderPortal);
    }

    portalWorldElement.classList.add("webgl-ready");
    renderPortal();
  } catch (error) {
    portalWorldElement.classList.add("webgl-fallback");
    console.warn("No se pudo iniciar la puerta 3D", error);
  }
}
