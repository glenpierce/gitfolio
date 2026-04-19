"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_BPM = 124;
const MAX_DEVICE_PIXEL_RATIO = 2;

function beatPulse(timeSeconds: number, bpm: number) {
  const beat = (timeSeconds * bpm) / 60;
  const beatPhase = beat - Math.floor(beat);
  const pulse = Math.pow(1 - beatPhase, 7);
  return { beatPhase, pulse };
}

export function WebGpuHexBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let animationFrameId = 0;
    let resizeObserver: ResizeObserver | null = null;

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    if (!("gpu" in navigator)) {
      setErrorMessage("WebGPU is unavailable in this browser. Try Chrome or Edge with WebGPU enabled.");
      return;
    }

    const init = async () => {
      try {
        const gpu = navigator.gpu;
        const adapter = await gpu.requestAdapter();
        if (!adapter) {
          setErrorMessage("No compatible GPU adapter found on this device.");
          return;
        }

        const device = await adapter.requestDevice();
        const context = canvas.getContext("webgpu") as GPUCanvasContext | null;
        if (!context) {
          setErrorMessage("Unable to create a WebGPU canvas context.");
          return;
        }

        const format = gpu.getPreferredCanvasFormat();
        const uniformData = new Float32Array(8);
        const uniformBuffer = device.createBuffer({
          label: "hex-board-uniforms",
          size: uniformData.byteLength,
          usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        const shaderModule = device.createShaderModule({
          label: "hex-board-shader",
          code: /* wgsl */ `
struct Uniforms {
  resolution: vec2f,
  time: f32,
  pulse: f32,
  beatPhase: f32,
  _pad0: vec3f,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

fn hash21(p: vec2f) -> f32 {
  let h = dot(p, vec2f(127.1, 311.7));
  return fract(sin(h) * 43758.5453123);
}

fn hex_distance(p: vec2f) -> f32 {
  let q = abs(p);
  return max(q.x * 0.8660254 + q.y * 0.5, q.y);
}

@vertex
fn vs_main(@builtin(vertex_index) index: u32) -> @builtin(position) vec4f {
  var positions = array<vec2f, 3>(
    vec2f(-1.0, -3.0),
    vec2f(-1.0, 1.0),
    vec2f(3.0, 1.0)
  );

  return vec4f(positions[index], 0.0, 1.0);
}

@fragment
fn fs_main(@builtin(position) position: vec4f) -> @location(0) vec4f {
  let resolution = uniforms.resolution;
  var uv = (position.xy / resolution) * 2.0 - vec2f(1.0, 1.0);
  uv.x *= resolution.x / resolution.y;

  let time = uniforms.time;
  let pulse = uniforms.pulse;
  let beatPhase = uniforms.beatPhase;

  let gridScale = 9.0;
  let cellSize = vec2f(1.0, 1.7320508);
  let offset = vec2f(0.5, 0.8660254);

  let p = uv * gridScale;
  let localA = fract(p / cellSize) * cellSize - cellSize * 0.5;
  let localB = fract((p - offset) / cellSize) * cellSize - cellSize * 0.5;

  let distA = hex_distance(localA);
  let distB = hex_distance(localB);
  let useB = distB < distA;

  let local = select(localA, localB, useB);
  let edgeDist = select(distA, distB, useB);

  let idA = floor(p / cellSize);
  let idB = floor((p - offset) / cellSize);
  let cellId = select(idA, idB, useB);

  let edge = smoothstep(0.5, 0.42, edgeDist);
  let line = 1.0 - smoothstep(0.44, 0.5, edgeDist);

  let radial = length(uv);
  let n = hash21(cellId);
  let wave = 0.5 + 0.5 * sin(time * 2.3 + n * 6.2831853 - radial * 8.5 - beatPhase * 6.2831853);
  let spark = smoothstep(0.72, 1.0, hash21(cellId + vec2f(floor(time * 2.0), 7.0 + pulse * 13.0)));

  let synthPulse = (0.25 + wave * 0.75) * (0.3 + pulse * 1.8 + spark * 0.5);
  let hexGlow = edge * synthPulse;

  let cyan = vec3f(0.133, 0.827, 0.933);
  let fuchsia = vec3f(0.851, 0.275, 0.937);
  let purple = vec3f(0.659, 0.333, 0.969);

  let base = mix(cyan, fuchsia, 0.5 + 0.5 * sin(time * 0.35 + radial * 3.0));
  var color = mix(base * 0.07, base, hexGlow);
  color += line * (cyan * 0.18 + pulse * 0.2);
  color += (0.15 + pulse * 0.25) * exp(-radial * 3.2) * mix(fuchsia, purple, 0.5 + 0.5 * sin(time * 0.4));

  return vec4f(color, 1.0);
}
`,
        });

        const pipeline = device.createRenderPipeline({
          label: "hex-board-pipeline",
          layout: "auto",
          vertex: {
            module: shaderModule,
            entryPoint: "vs_main",
          },
          fragment: {
            module: shaderModule,
            entryPoint: "fs_main",
            targets: [{ format }],
          },
          primitive: {
            topology: "triangle-list",
          },
        });

        const bindGroup = device.createBindGroup({
          layout: pipeline.getBindGroupLayout(0),
          entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
        });

        const resize = () => {
          const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
          const width = Math.max(1, Math.floor(canvas.clientWidth * pixelRatio));
          const height = Math.max(1, Math.floor(canvas.clientHeight * pixelRatio));

          if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
          }

          context.configure({
            device,
            format,
            alphaMode: "opaque",
          });
        };

        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);
        resize();

        const start = performance.now();

        const renderFrame = (now: number) => {
          const elapsedSeconds = (now - start) / 1000;
          const { beatPhase, pulse } = beatPulse(elapsedSeconds, DEFAULT_BPM);

          uniformData[0] = canvas.width;
          uniformData[1] = canvas.height;
          uniformData[2] = elapsedSeconds;
          uniformData[3] = pulse;
          uniformData[4] = beatPhase;
          device.queue.writeBuffer(uniformBuffer, 0, uniformData);

          const encoder = device.createCommandEncoder({ label: "hex-board-encoder" });
          const renderPass = encoder.beginRenderPass({
            colorAttachments: [
              {
                view: context.getCurrentTexture().createView(),
                clearValue: { r: 0.02, g: 0.02, b: 0.08, a: 1 },
                loadOp: "clear",
                storeOp: "store",
              },
            ],
          });

          renderPass.setPipeline(pipeline);
          renderPass.setBindGroup(0, bindGroup);
          renderPass.draw(3);
          renderPass.end();

          device.queue.submit([encoder.finish()]);
          animationFrameId = requestAnimationFrame(renderFrame);
        };

        animationFrameId = requestAnimationFrame(renderFrame);
        setIsReady(true);
      } catch {
        setErrorMessage("WebGPU initialization failed. Your browser might block this feature.");
      }
    };

    void init();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl border border-cyan-900/50 bg-[#050510] shadow-[0_0_20px_rgba(34,211,238,0.2)]">
      <canvas ref={canvasRef} className="block h-[24rem] w-full md:h-[32rem]" aria-label="WebGPU synthwave hex board demo" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between border-b border-cyan-900/40 bg-[#050510]/60 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-cyan-400/80 backdrop-blur-sm">
        <span>{isReady ? "Renderer: WebGPU" : "Renderer: Initializing"}</span>
        <span>BPM {DEFAULT_BPM}</span>
      </div>

      {errorMessage ? (
        <div className="absolute inset-0 grid place-items-center bg-[#050510]/95 p-6 text-center">
          <div className="max-w-md space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-400">WebGPU Offline</p>
            <p className="text-sm text-cyan-100/80">{errorMessage}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

