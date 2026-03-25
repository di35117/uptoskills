import React, { useEffect, useRef } from "react";
import p5 from "p5";

export function ForceFieldBackground({
  hue = 300, // Neon Pink/Purple
  saturation = 100,
  threshold = 100,
  minStroke = 1,
  maxStroke = 4,
  spacing = 15, // Slightly wider spacing for performance
  density = 1.5,
  magnifierEnabled = true,
  magnifierRadius = 250,
  forceStrength = 20,
  friction = 0.85,
  restoreSpeed = 0.08,
  className = "",
}) {
  const containerRef = useRef(null);
  const p5InstanceRef = useRef(null);

  const propsRef = useRef({
    hue,
    saturation,
    threshold,
    minStroke,
    maxStroke,
    spacing,
    density,
    magnifierEnabled,
    magnifierRadius,
    forceStrength,
    friction,
    restoreSpeed,
  });

  useEffect(() => {
    propsRef.current = {
      hue,
      saturation,
      threshold,
      minStroke,
      maxStroke,
      spacing,
      density,
      magnifierEnabled,
      magnifierRadius,
      forceStrength,
      friction,
      restoreSpeed,
    };
  }, [
    hue,
    saturation,
    threshold,
    minStroke,
    maxStroke,
    spacing,
    density,
    magnifierEnabled,
    magnifierRadius,
    forceStrength,
    friction,
    restoreSpeed,
  ]);

  useEffect(() => {
    if (!containerRef.current) return;

    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
    }

    const sketch = (p) => {
      let palette = [];
      let points = [];

      let lastHue = -1;
      let lastSaturation = -1;
      let lastSpacing = -1;
      let lastDensity = -1;

      let magnifierX = 0;
      let magnifierY = 0;
      let magnifierInertia = 0.15;

      p.setup = () => {
        const { clientWidth, clientHeight } = containerRef.current;
        p.createCanvas(clientWidth, clientHeight);

        magnifierX = p.width / 2;
        magnifierY = p.height / 2;

        generatePalette(propsRef.current.hue, propsRef.current.saturation);
        generatePoints();
      };

      p.windowResized = () => {
        if (!containerRef.current) return;
        const { clientWidth, clientHeight } = containerRef.current;
        p.resizeCanvas(clientWidth, clientHeight);
        generatePoints();
      };

      function generatePalette(h, s) {
        palette = [];
        p.push();
        p.colorMode(p.HSL);
        for (let i = 0; i < 12; i++) {
          let lightness = p.map(i, 0, 11, 80, 20); // Bright to dark
          palette.push(p.color(h, s, lightness));
        }
        p.pop();
      }

      function generatePoints() {
        points = [];
        const { spacing, density } = propsRef.current;
        const safeSpacing = Math.max(4, spacing);

        // Generate points based on screen size using Perlin noise instead of an image
        for (let y = 0; y < p.height; y += safeSpacing) {
          for (let x = 0; x < p.width; x += safeSpacing) {
            if (p.random() > density) continue;

            // Use noise to create organic clouds of particles
            let noiseVal = p.noise(x * 0.003, y * 0.003);
            let brightness = p.map(noiseVal, 0, 1, 0, 255);

            let nx = p.noise(x * 0.01, y * 0.01) - 0.5;
            let ny = p.noise((x + 500) * 0.01, (y + 500) * 0.01) - 0.5;

            let px = x + nx * safeSpacing;
            let py = y + ny * safeSpacing;

            points.push({
              pos: p.createVector(px, py),
              originalPos: p.createVector(px, py),
              vel: p.createVector(0, 0),
              baseBrightness: brightness, // Store mathematical brightness
            });
          }
        }

        lastSpacing = spacing;
        lastDensity = density;
      }

      function applyForceField(mx, my) {
        const props = propsRef.current;
        if (!props.magnifierEnabled) return;

        for (let pt of points) {
          let dir = p5.Vector.sub(pt.pos, p.createVector(mx, my));
          let d = dir.mag();

          if (d < props.magnifierRadius) {
            dir.normalize();
            // Pushes particles away from the mouse
            let force = dir.mult(props.forceStrength / Math.max(1, d * 0.1));
            pt.vel.add(force);
          }

          // Friction slows them down
          pt.vel.mult(props.friction);

          // Restore force snaps them back to their original grid spot
          let restore = p5.Vector.sub(pt.pos, pt.originalPos).mult(
            -props.restoreSpeed,
          );
          pt.vel.add(restore);

          pt.pos.add(pt.vel);
        }
      }

      p.draw = () => {
        p.clear(); // Transparent background so your site shows through

        const props = propsRef.current;

        // Re-generate if settings change
        if (props.hue !== lastHue || props.saturation !== lastSaturation) {
          generatePalette(props.hue, props.saturation);
          lastHue = props.hue;
          lastSaturation = props.saturation;
        }

        if (props.spacing !== lastSpacing || props.density !== lastDensity) {
          generatePoints();
        }

        // Smooth mouse following
        magnifierX = p.lerp(magnifierX, p.mouseX, magnifierInertia);
        magnifierY = p.lerp(magnifierY, p.mouseY, magnifierInertia);

        applyForceField(magnifierX, magnifierY);

        p.noFill();

        for (let pt of points) {
          // Only draw particles that meet the brightness threshold
          if (pt.baseBrightness > props.threshold) {
            let shadeIndex = Math.floor(
              p.map(pt.baseBrightness, 0, 255, 0, palette.length - 1),
            );
            shadeIndex = p.constrain(shadeIndex, 0, palette.length - 1);

            let strokeSize = p.map(
              pt.baseBrightness,
              0,
              255,
              props.minStroke,
              props.maxStroke,
            );

            // Make particles bigger when the mouse gets near them
            let d = p.dist(pt.pos.x, pt.pos.y, magnifierX, magnifierY);
            if (props.magnifierEnabled && d < props.magnifierRadius) {
              let factor = p.map(d, 0, props.magnifierRadius, 2.5, 1);
              strokeSize *= factor;
            }

            if (palette[shadeIndex]) {
              p.stroke(palette[shadeIndex]);
              p.strokeWeight(strokeSize);
              p.point(pt.pos.x, pt.pos.y);
            }
          }
        }
      };
    };

    const myP5 = new p5(sketch, containerRef.current);
    p5InstanceRef.current = myP5;

    return () => {
      myP5.remove();
    };
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Isolated Canvas Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 pointer-events-auto"
      ></div>
    </div>
  );
}
