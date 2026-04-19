import Link from "next/link";
import { WebGpuHexBoard } from "../components/webgpu/WebGpuHexBoard";

export default function WebGpuPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-cyan-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:py-14">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-900/40 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.6)]">
              Experimental Lab
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] md:text-4xl">
              Synthwave Hex Board (WebGPU)
            </h1>
          </div>
          <Link
            href="/"
            className="rounded-md border border-cyan-900/60 bg-cyan-900/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 transition hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          >
            Back to Home
          </Link>
        </header>

        <p className="max-w-3xl border-l-2 border-fuchsia-500/50 pl-4 text-sm leading-7 text-cyan-100/80 md:text-base">
          This demo procedurally generates a hexagon grid in a fragment shader and drives luminance with a synthesized beat pulse.
          No textures, no assets, just GPU math tuned for a cyberpunk vibe.
        </p>

        <WebGpuHexBoard />
      </div>
    </div>
  );
}

