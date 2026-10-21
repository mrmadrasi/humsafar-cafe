"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Coffee,
  Heart,
  Eye,
  Maximize2,
  Minimize2,
  Sparkles,
  Volume2,
  VolumeX,
  CloudRain,
  Music,
  Compass,
  RotateCw,
} from "lucide-react";
import { romanticAudio } from "@/utils/romanticAudio";

export type CafeCameraView = "couple" | "candle" | "window" | "overhead";
export type CafeLightingMood = "candlelight" | "midnight" | "sunset" | "rose";

interface RomanticCafe3DProps {
  onSwitchToPlayer?: () => void;
  onOpenBooking?: () => void;
  initialView?: CafeCameraView;
}

export function RomanticCafe3D({
  onSwitchToPlayer,
  onOpenBooking,
  initialView = "couple",
}: RomanticCafe3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState<CafeCameraView>(initialView);
  const [activeMood, setActiveMood] = useState<CafeLightingMood>("candlelight");
  const [isCandleLit, setIsCandleLit] = useState(true);
  const [isRainSoundOn, setIsRainSoundOn] = useState(false);
  const [isCrackleSoundOn, setIsCrackleSoundOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [interactionNotice, setInteractionNotice] = useState<string | null>(
    "✨ Drag to explore the 3D Café • Tap the candle or coffee"
  );

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const candleLightRef = useRef<THREE.PointLight | null>(null);
  const flameMeshRef = useRef<THREE.Mesh | null>(null);
  const steamParticlesRef = useRef<THREE.Points | null>(null);
  const rainBokehRef = useRef<THREE.Group | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const windowLightRef = useRef<THREE.DirectionalLight | null>(null);

  // Animation states
  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.6, 3.2));
  const targetCameraLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.45, 0));
  const currentCameraLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.45, 0));
  const mouseOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDragging = useRef<boolean>(false);
  const prevMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const orbitAngle = useRef<{ theta: number; phi: number }>({ theta: 0, phi: 0 });

  // Camera presets
  const cameraPresets: Record<CafeCameraView, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
    couple: { pos: [0, 1.45, 2.9], lookAt: [0, 0.42, 0] },
    candle: { pos: [0.15, 0.85, 1.3], lookAt: [0, 0.55, 0] },
    window: { pos: [2.0, 1.35, 2.1], lookAt: [-0.3, 0.5, 0] },
    overhead: { pos: [0, 3.2, 0.8], lookAt: [0, 0, 0] },
  };

  const applyCameraView = useCallback((view: CafeCameraView) => {
    setActiveView(view);
    const preset = cameraPresets[view];
    targetCameraPos.current.set(...preset.pos);
    targetCameraLookAt.current.set(...preset.lookAt);
    orbitAngle.current = { theta: 0, phi: 0 };
  }, []);

  // Update mood colors
  useEffect(() => {
    if (!candleLightRef.current || !ambientLightRef.current || !windowLightRef.current) return;

    if (activeMood === "candlelight") {
      candleLightRef.current.color.setHex(0xffaa44);
      candleLightRef.current.intensity = isCandleLit ? 3.0 : 0.05;
      ambientLightRef.current.color.setHex(0x281016);
      ambientLightRef.current.intensity = 1.0;
      windowLightRef.current.color.setHex(0x556688);
      windowLightRef.current.intensity = 0.6;
    } else if (activeMood === "midnight") {
      candleLightRef.current.color.setHex(0xffbb66);
      candleLightRef.current.intensity = isCandleLit ? 3.4 : 0.05;
      ambientLightRef.current.color.setHex(0x11091a);
      ambientLightRef.current.intensity = 0.7;
      windowLightRef.current.color.setHex(0x334477);
      windowLightRef.current.intensity = 0.4;
    } else if (activeMood === "sunset") {
      candleLightRef.current.color.setHex(0xff8833);
      candleLightRef.current.intensity = isCandleLit ? 2.5 : 0.05;
      ambientLightRef.current.color.setHex(0x441818);
      ambientLightRef.current.intensity = 1.3;
      windowLightRef.current.color.setHex(0xcc6633);
      windowLightRef.current.intensity = 1.2;
    } else if (activeMood === "rose") {
      candleLightRef.current.color.setHex(0xff7799);
      candleLightRef.current.intensity = isCandleLit ? 2.8 : 0.05;
      ambientLightRef.current.color.setHex(0x380b1e);
      ambientLightRef.current.intensity = 1.1;
      windowLightRef.current.color.setHex(0xaa4466);
      windowLightRef.current.intensity = 0.8;
    }
  }, [activeMood, isCandleLit]);

  // Audio ambient effects toggles
  useEffect(() => {
    romanticAudio.setCandleCrackle(isCrackleSoundOn, 0.2);
  }, [isCrackleSoundOn]);

  useEffect(() => {
    romanticAudio.setRain(isRainSoundOn, 0.35);
  }, [isRainSoundOn]);

  // Handle candle toggle
  const handleToggleCandle = () => {
    const nextState = !isCandleLit;
    setIsCandleLit(nextState);
    romanticAudio.playCandleSpark(nextState);
    if (flameMeshRef.current) {
      flameMeshRef.current.visible = nextState;
    }
    if (candleLightRef.current) {
      candleLightRef.current.intensity = nextState ? 3.0 : 0.05;
    }
    setInteractionNotice(
      nextState ? "✨ Candle relit! Warm romantic glow restored." : "💨 Candle blown out. Whisper a wish..."
    );
    setTimeout(() => setInteractionNotice(null), 3000);
  };

  // Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // 1. Scene & Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0e0408, 0.16);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 40);
    camera.position.set(0, 1.45, 2.9);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing and shadow map
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x0a0306);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x281016, 1.0);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    // Candle Point Light (Dynamic romantic source)
    const candleLight = new THREE.PointLight(0xffaa44, 3.0, 7.5, 2.0);
    candleLight.position.set(0, 0.72, 0);
    candleLight.castShadow = true;
    candleLight.shadow.bias = -0.002;
    candleLight.shadow.mapSize.width = 1024;
    candleLight.shadow.mapSize.height = 1024;
    scene.add(candleLight);
    candleLightRef.current = candleLight;

    // Window Street Light / Moon
    const windowLight = new THREE.DirectionalLight(0x556688, 0.7);
    windowLight.position.set(4, 5, -3);
    windowLight.target.position.set(0, 0, 0);
    scene.add(windowLight);
    scene.add(windowLight.target);
    windowLightRef.current = windowLight;

    // 5. Materials
    const mahoganyTableMat = new THREE.MeshStandardMaterial({
      color: 0x220c12,
      roughness: 0.28,
      metalness: 0.18,
    });

    const brassGoldMat = new THREE.MeshStandardMaterial({
      color: 0xdfb871,
      roughness: 0.25,
      metalness: 0.85,
    });

    const ceramicWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xf6f0e6,
      roughness: 0.35,
      metalness: 0.05,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 0.5,
      transparent: true,
      roughness: 0.08,
      ior: 1.5,
    });

    const roseVelvetMat = new THREE.MeshStandardMaterial({
      color: 0xa81832,
      roughness: 0.55,
      metalness: 0.1,
    });

    const stemGreenMat = new THREE.MeshStandardMaterial({
      color: 0x224a25,
      roughness: 0.6,
    });

    // 6. Table & Pedestal for Two
    const tableTopGeo = new THREE.CylinderGeometry(1.65, 1.65, 0.09, 48);
    const tableTop = new THREE.Mesh(tableTopGeo, mahoganyTableMat);
    tableTop.position.set(0, 0, 0);
    tableTop.receiveShadow = true;
    scene.add(tableTop);

    // Brass edge rim for luxury café aesthetic
    const rimGeo = new THREE.TorusGeometry(1.65, 0.02, 16, 64);
    rimGeo.rotateX(Math.PI / 2);
    const rim = new THREE.Mesh(rimGeo, brassGoldMat);
    rim.position.set(0, 0.045, 0);
    scene.add(rim);

    // Table Pedestal & Cast Iron Base
    const pedestalGeo = new THREE.CylinderGeometry(0.08, 0.12, 1.4, 24);
    const pedestal = new THREE.Mesh(pedestalGeo, brassGoldMat);
    pedestal.position.set(0, -0.72, 0);
    scene.add(pedestal);

    const baseGeo = new THREE.CylinderGeometry(0.7, 0.75, 0.08, 32);
    const base = new THREE.Mesh(baseGeo, brassGoldMat);
    base.position.set(0, -1.4, 0);
    scene.add(base);

    // 7. Glass Lantern Candle in Center
    const lanternBaseGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.04, 32);
    const lanternBase = new THREE.Mesh(lanternBaseGeo, brassGoldMat);
    lanternBase.position.set(0, 0.065, 0);
    scene.add(lanternBase);

    const lanternGlassGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.75, 32, 1, true);
    const lanternGlass = new THREE.Mesh(lanternGlassGeo, glassMat);
    lanternGlass.position.set(0, 0.44, 0);
    scene.add(lanternGlass);

    const lanternCapGeo = new THREE.TorusGeometry(0.24, 0.02, 16, 32);
    lanternCapGeo.rotateX(Math.PI / 2);
    const lanternCap = new THREE.Mesh(lanternCapGeo, brassGoldMat);
    lanternCap.position.set(0, 0.81, 0);
    scene.add(lanternCap);

    // Candle Wax Pillar
    const candleWaxGeo = new THREE.CylinderGeometry(0.14, 0.15, 0.42, 24);
    const candleWaxMat = new THREE.MeshStandardMaterial({
      color: 0xfff7e6,
      roughness: 0.7,
    });
    const candleWax = new THREE.Mesh(candleWaxGeo, candleWaxMat);
    candleWax.position.set(0, 0.275, 0);
    candleWax.castShadow = true;
    scene.add(candleWax);

    // Candle Wick
    const wickGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.07, 8);
    const wickMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const wick = new THREE.Mesh(wickGeo, wickMat);
    wick.position.set(0, 0.51, 0);
    scene.add(wick);

    // Teardrop Flame Mesh with Emissive Glow
    const flameGeo = new THREE.ConeGeometry(0.045, 0.14, 16);
    flameGeo.translate(0, 0.07, 0);
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xffec99,
    });
    const flameMesh = new THREE.Mesh(flameGeo, flameMat);
    flameMesh.position.set(0, 0.53, 0);
    scene.add(flameMesh);
    flameMeshRef.current = flameMesh;

    // 8. Two Romantic Coffee Cups & Saucers
    const createCoffeeCup = (
      x: number,
      z: number,
      rotationY: number,
      hasHeart: boolean = true
    ) => {
      const group = new THREE.Group();

      // Saucer
      const saucerGeo = new THREE.CylinderGeometry(0.32, 0.22, 0.03, 32);
      const saucer = new THREE.Mesh(saucerGeo, ceramicWhiteMat);
      saucer.position.set(0, 0.06, 0);
      saucer.castShadow = true;
      group.add(saucer);

      // Gold saucer ring
      const saucerRingGeo = new THREE.TorusGeometry(0.3, 0.007, 16, 32);
      saucerRingGeo.rotateX(Math.PI / 2);
      const saucerRing = new THREE.Mesh(saucerRingGeo, brassGoldMat);
      saucerRing.position.set(0, 0.076, 0);
      group.add(saucerRing);

      // Cup
      const cupGeo = new THREE.CylinderGeometry(0.2, 0.15, 0.24, 32);
      const cup = new THREE.Mesh(cupGeo, ceramicWhiteMat);
      cup.position.set(0, 0.18, 0);
      cup.castShadow = true;
      group.add(cup);

      // Cup Gold Rim
      const cupRimGeo = new THREE.TorusGeometry(0.2, 0.006, 16, 32);
      cupRimGeo.rotateX(Math.PI / 2);
      const cupRim = new THREE.Mesh(cupRimGeo, brassGoldMat);
      cupRim.position.set(0, 0.3, 0);
      group.add(cupRim);

      // Cup Handle
      const handleGeo = new THREE.TorusGeometry(0.08, 0.02, 12, 24, Math.PI);
      const handle = new THREE.Mesh(handleGeo, ceramicWhiteMat);
      handle.position.set(0.22, 0.18, 0);
      handle.rotation.z = -Math.PI / 2;
      group.add(handle);

      // Coffee Liquid inside
      const coffeeGeo = new THREE.CircleGeometry(0.185, 32);
      coffeeGeo.rotateX(-Math.PI / 2);
      const coffeeMat = new THREE.MeshStandardMaterial({
        color: 0x241108,
        roughness: 0.1,
      });
      const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
      coffee.position.set(0, 0.28, 0);
      group.add(coffee);

      // Latte Art Heart on top
      if (hasHeart) {
        const heartShape = new THREE.Shape();
        heartShape.moveTo(0, 0.04);
        heartShape.bezierCurveTo(0.04, 0.08, 0.09, 0.07, 0.09, 0.02);
        heartShape.bezierCurveTo(0.09, -0.03, 0.04, -0.06, 0, -0.09);
        heartShape.bezierCurveTo(-0.04, -0.06, -0.09, -0.03, -0.09, 0.02);
        heartShape.bezierCurveTo(-0.09, 0.07, -0.04, 0.08, 0, 0.04);

        const heartGeo = new THREE.ShapeGeometry(heartShape);
        heartGeo.rotateX(-Math.PI / 2);
        const heartMat = new THREE.MeshBasicMaterial({
          color: 0xf5deb3,
          side: THREE.DoubleSide,
        });
        const heartMesh = new THREE.Mesh(heartGeo, heartMat);
        heartMesh.position.set(0, 0.282, 0);
        group.add(heartMesh);
      }

      group.position.set(x, 0, z);
      group.rotation.y = rotationY;
      return group;
    };

    // Cup 1: Foreground for partner
    const cup1 = createCoffeeCup(0.65, 0.65, -Math.PI / 4, true);
    scene.add(cup1);

    // Cup 2: Across the table for you
    const cup2 = createCoffeeCup(-0.65, -0.65, (3 * Math.PI) / 4, true);
    scene.add(cup2);

    // 9. Rising Steam Particles from Cup 1
    const steamCount = 36;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    const steamSpeeds = new Float32Array(steamCount);

    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3] = 0.65 + (Math.random() - 0.5) * 0.12;
      steamPositions[i * 3 + 1] = 0.35 + Math.random() * 0.7;
      steamPositions[i * 3 + 2] = 0.65 + (Math.random() - 0.5) * 0.12;
      steamSpeeds[i] = 0.003 + Math.random() * 0.004;
    }

    steamGeo.setAttribute("position", new THREE.BufferAttribute(steamPositions, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xedd5be,
      size: 0.08,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    scene.add(steamParticles);
    steamParticlesRef.current = steamParticles;

    // 10. Crystal Vase with Red Rose & Leaves
    const vaseGeo = new THREE.CylinderGeometry(0.1, 0.07, 0.48, 24);
    const vase = new THREE.Mesh(vaseGeo, glassMat);
    vase.position.set(-0.75, 0.285, 0.3);
    vase.castShadow = true;
    scene.add(vase);

    // Rose Stem
    const stemGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.6, 12);
    const stem = new THREE.Mesh(stemGeo, stemGreenMat);
    stem.position.set(-0.75, 0.48, 0.3);
    stem.rotation.z = 0.08;
    scene.add(stem);

    // Velvet Rose Bloom (Layered petals)
    const roseGroup = new THREE.Group();
    for (let p = 0; p < 8; p++) {
      const petalGeo = new THREE.SphereGeometry(0.075, 12, 12, 0, Math.PI, 0, Math.PI / 1.5);
      const petal = new THREE.Mesh(petalGeo, roseVelvetMat);
      petal.rotation.y = (p * Math.PI) / 4;
      petal.rotation.x = 0.3 + (p % 2) * 0.2;
      roseGroup.add(petal);
    }
    roseGroup.position.set(-0.72, 0.78, 0.3);
    scene.add(roseGroup);

    // Scattered Rose Petals on Table
    const petalPositions = [
      [0.3, 0.05, 0.2, 0.4],
      [-0.25, 0.05, 0.45, -0.6],
      [0.45, 0.05, -0.3, 1.2],
      [-0.45, 0.05, -0.2, -1.1],
      [0.1, 0.05, -0.5, 0.8],
    ];

    petalPositions.forEach(([px, py, pz, rot]) => {
      const singlePetalGeo = new THREE.PlaneGeometry(0.08, 0.06);
      singlePetalGeo.rotateX(-Math.PI / 2);
      const singlePetal = new THREE.Mesh(singlePetalGeo, roseVelvetMat);
      singlePetal.position.set(px, py, pz);
      singlePetal.rotation.y = rot;
      scene.add(singlePetal);
    });

    // 11. Rainy Window Frame & City Night Bokeh Group in Background
    const bokehGroup = new THREE.Group();
    const bokehCount = 45;
    const bokehColors = [0xffcc66, 0xff88aa, 0xdfb871, 0x66aaff, 0xff7744];

    for (let b = 0; b < bokehCount; b++) {
      const radius = 0.08 + Math.random() * 0.22;
      const bokehGeo = new THREE.SphereGeometry(radius, 16, 16);
      const bColor = bokehColors[Math.floor(Math.random() * bokehColors.length)];
      const bokehMat = new THREE.MeshBasicMaterial({
        color: bColor,
        transparent: true,
        opacity: 0.4 + Math.random() * 0.4,
      });
      const bokehMesh = new THREE.Mesh(bokehGeo, bokehMat);
      bokehMesh.position.set(
        (Math.random() - 0.5) * 8,
        0.5 + Math.random() * 4,
        -4.5 - Math.random() * 3
      );
      bokehGroup.add(bokehMesh);
    }

    // Arched French Window Mullions
    const windowFrameGeo = new THREE.BoxGeometry(7, 4.5, 0.1);
    const windowFrameMat = new THREE.MeshStandardMaterial({
      color: 0x14060b,
      roughness: 0.9,
    });
    const windowFrame = new THREE.Mesh(windowFrameGeo, windowFrameMat);
    windowFrame.position.set(0, 2.2, -4.2);
    scene.add(windowFrame);
    scene.add(bokehGroup);
    rainBokehRef.current = bokehGroup;

    // 12. Floating Champagne Sparks / Love Dust
    const dustCount = 140;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);

    for (let d = 0; d < dustCount; d++) {
      dustPos[d * 3] = (Math.random() - 0.5) * 5;
      dustPos[d * 3 + 1] = Math.random() * 3;
      dustPos[d * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xdfb871,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // 13. Event Listeners for Smooth Parallax & Drag Orbit
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseOffset.current = { x: x * 0.35, y: y * 0.2 };

      if (isDragging.current) {
        const deltaX = e.clientX - prevMousePos.current.x;
        const deltaY = e.clientY - prevMousePos.current.y;
        orbitAngle.current.theta += deltaX * 0.006;
        orbitAngle.current.phi = Math.max(
          -0.3,
          Math.min(0.5, orbitAngle.current.phi + deltaY * 0.004)
        );
        prevMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMousePos.current.x;
        const deltaY = e.touches[0].clientY - prevMousePos.current.y;
        orbitAngle.current.theta += deltaX * 0.008;
        orbitAngle.current.phi = Math.max(
          -0.3,
          Math.min(0.5, orbitAngle.current.phi + deltaY * 0.006)
        );
        prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    // Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // 14. 60 FPS Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Realistic Candle Flame Flicker
      if (flameMeshRef.current && candleLightRef.current && isCandleLit) {
        const flicker =
          Math.sin(elapsedTime * 9) * 0.05 +
          Math.sin(elapsedTime * 23) * 0.03 +
          (Math.random() - 0.5) * 0.04;

        flameMeshRef.current.scale.set(
          1 + flicker * 1.5,
          1 + flicker * 2.2,
          1 + flicker * 1.5
        );
        flameMeshRef.current.rotation.z = Math.sin(elapsedTime * 6) * 0.08;

        candleLightRef.current.intensity = 2.8 + flicker * 1.4;
        candleLightRef.current.position.x = Math.sin(elapsedTime * 4) * 0.01;
        candleLightRef.current.position.z = Math.cos(elapsedTime * 3) * 0.01;
      }

      // Rising Coffee Steam animation
      if (steamParticlesRef.current) {
        const posAttr = steamParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        for (let s = 0; s < steamCount; s++) {
          posArray[s * 3 + 1] += steamSpeeds[s];
          posArray[s * 3] += Math.sin(elapsedTime * 2 + s) * 0.0008;

          // Loop back down to cup surface
          if (posArray[s * 3 + 1] > 1.25) {
            posArray[s * 3 + 1] = 0.32;
            posArray[s * 3] = 0.65 + (Math.random() - 0.5) * 0.1;
            posArray[s * 3 + 2] = 0.65 + (Math.random() - 0.5) * 0.1;
          }
        }
        posAttr.needsUpdate = true;
      }

      // Floating dust particles drift
      if (dustPoints) {
        dustPoints.rotation.y = elapsedTime * 0.02;
      }

      // Gentle Bokeh Pulse outside window
      if (rainBokehRef.current) {
        rainBokehRef.current.children.forEach((child, index) => {
          const s = 1 + Math.sin(elapsedTime * 1.5 + index) * 0.08;
          child.scale.set(s, s, s);
        });
      }

      // Smooth Camera Lerp with Parallax & Orbit
      const currentTargetPos = targetCameraPos.current.clone();
      currentTargetPos.x += mouseOffset.current.x + Math.sin(orbitAngle.current.theta) * 0.8;
      currentTargetPos.y += mouseOffset.current.y + orbitAngle.current.phi * 0.6;
      currentTargetPos.z += (1 - Math.cos(orbitAngle.current.theta)) * -0.4;

      camera.position.lerp(currentTargetPos, 0.04);
      currentCameraLookAt.current.lerp(targetCameraLookAt.current, 0.05);
      camera.lookAt(currentCameraLookAt.current);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isCandleLit]);

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-color)] bg-black transition-all duration-700 ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen" : "h-[580px] sm:h-[680px]"
      }`}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        onClick={handleToggleCandle}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        title="Click to toggle candle, drag to rotate camera view"
      />

      {/* Atmospheric Film Grain & Romantic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-black/40" />

      {/* Interaction Notice Pill */}
      <AnimatePresence>
        {interactionNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-[var(--border-color)] text-xs text-[var(--accent-gold)] shadow-xl flex items-center gap-2 whitespace-nowrap"
          >
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent-gold)] animate-pulse" />
            <span>{interactionNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Left: 3D Badge & Live Status */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="bg-black/60 backdrop-blur-md border border-[var(--border-color)] rounded-full px-3 py-1 text-[11px] font-medium text-[var(--text-primary)] flex items-center gap-2 shadow-lg">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Realistic 3D Sanctuary</span>
        </div>

        <button
          onClick={handleToggleCandle}
          className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all flex items-center gap-1.5 backdrop-blur-md shadow-md ${
            isCandleLit
              ? "bg-amber-500/20 border-amber-400 text-amber-300 hover:bg-amber-500/30"
              : "bg-stone-800/80 border-stone-600 text-stone-400 hover:text-white"
          }`}
        >
          <Flame className={`h-3 w-3 ${isCandleLit ? "text-amber-400 fill-current" : ""}`} />
          <span>{isCandleLit ? "Candle Lit" : "Relight Flame"}</span>
        </button>
      </div>

      {/* Top Right: Fullscreen & Quick Switch to Music Player */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {onSwitchToPlayer && (
          <button
            onClick={onSwitchToPlayer}
            className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs px-3.5 py-1.5 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            <Music className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Romantic Spotify Player</span>
            <span className="sm:hidden">Songs</span>
          </button>
        )}

        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-white transition shadow-lg"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      </div>

      {/* Bottom Bar: Camera Presets & Ambiance Controls */}
      <div className="absolute bottom-4 inset-x-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-black/65 backdrop-blur-xl border border-[var(--border-color)]/70 p-3 sm:px-5 sm:py-2.5 rounded-2xl shadow-2xl">
        {/* Camera Views */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] mr-1 hidden md:inline">
            View:
          </span>
          {(
            [
              { id: "couple", label: "For Two", icon: Heart },
              { id: "candle", label: "Candlelight", icon: Flame },
              { id: "window", label: "Window & Rain", icon: CloudRain },
              { id: "overhead", label: "Overhead", icon: Compass },
            ] as const
          ).map((item) => {
            const Icon = item.icon;
            const isSelected = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => applyCameraView(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-[var(--accent-gold)] text-black font-bold shadow-md scale-105"
                    : "bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Atmosphere & Lighting Mood */}
        <div className="flex items-center gap-2">
          {/* Rain Sound Toggle */}
          <button
            onClick={() => setIsRainSoundOn(!isRainSoundOn)}
            className={`p-2 rounded-xl text-xs border transition-all flex items-center gap-1 ${
              isRainSoundOn
                ? "bg-sky-500/20 border-sky-400 text-sky-300"
                : "bg-white/5 border-transparent text-[var(--text-muted)] hover:text-white"
            }`}
            title="Toggle Soft Rain Sounds"
          >
            <CloudRain className="h-3.5 w-3.5" />
            <span className="text-[10px] hidden sm:inline">Rain Sound</span>
          </button>

          {/* Crackle Sound Toggle */}
          <button
            onClick={() => setIsCrackleSoundOn(!isCrackleSoundOn)}
            className={`p-2 rounded-xl text-xs border transition-all flex items-center gap-1 ${
              isCrackleSoundOn
                ? "bg-amber-500/20 border-amber-400 text-amber-300"
                : "bg-white/5 border-transparent text-[var(--text-muted)] hover:text-white"
            }`}
            title="Toggle Candlelight Crackle Sound"
          >
            <Flame className="h-3.5 w-3.5" />
            <span className="text-[10px] hidden sm:inline">Crackle</span>
          </button>

          {/* Mood Selector Dropdown / Pills */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
            {(
              [
                { id: "candlelight", label: "🕯️ Warm", color: "text-amber-300" },
                { id: "midnight", label: "🌙 Night", color: "text-indigo-300" },
                { id: "sunset", label: "🌅 Dusk", color: "text-orange-300" },
                { id: "rose", label: "🌹 Rose", color: "text-pink-300" },
              ] as const
            ).map((mood) => (
              <button
                key={mood.id}
                onClick={() => setActiveMood(mood.id)}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition ${
                  activeMood === mood.id
                    ? "bg-[var(--accent-burgundy)] text-white shadow"
                    : "text-[var(--text-muted)] hover:text-white"
                }`}
              >
                {mood.label}
              </button>
            ))}
          </div>

          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-[var(--accent-burgundy)] to-[var(--accent-rose)] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-lg hover:scale-105 transition"
            >
              <span>Reserve Table</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
