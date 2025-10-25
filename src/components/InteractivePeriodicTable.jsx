import React, { useState, useMemo, useRef, useEffect } from "react";
import { SAMPLE_DATA, CATEGORY_COLORS } from "../constants/elements";


export default function InteractivePeriodicTable({ elements = SAMPLE_DATA }) {
  const grid = useMemo(() => {
    const map = {};
    elements.forEach((el) => {
      const key = `${el.period}-${el.group || 0}`;
      map[key] = el;
    });
    return map;
  }, [elements]);

  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const tooltipRef = useRef(null);

  const categories = useMemo(() => {
    const s = new Set(elements.map((e) => e.category));
    return Array.from(s);
  }, [elements]);

  const filteredElements = useMemo(() => {
    return elements.filter((e) => {
      if (categoryFilter && e.category !== categoryFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        e.name.toLowerCase().includes(q) ||
        e.symbol.toLowerCase().includes(q) ||
        String(e.number) === q
      );
    });
  }, [elements, query, categoryFilter]);

  const [focusCoord, setFocusCoord] = useState({ period: 1, group: 1 });

  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      setFocusCoord((prev) => {
        let { period, group } = prev;
        if (e.key === "ArrowRight") group = Math.min(18, group + 1);
        if (e.key === "ArrowLeft") group = Math.max(1, group - 1);
        if (e.key === "ArrowUp") period = Math.max(1, period - 1);
        if (e.key === "ArrowDown") period = Math.min(9, period + 1);
        return { period, group };
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const key = `${focusCoord.period}-${focusCoord.group}`;
    const el = grid[key];
    if (el) {
      setSelected(el);
      const node = document.getElementById(`el-${el.number}`);
      node?.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }, [focusCoord, grid]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const periods = [1, 2, 3, 4, 5, 6, 7];
  const groups = Array.from({ length: 18 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Interactive Periodic Table
          </h1>
          <p className="text-gray-300 text-lg">
            Explore the elements in stunning detail
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 mb-8">
          <div className="relative">
            <input
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 text-white placeholder-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
              placeholder="Search elements..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <select
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="" className="bg-gray-800">
              All categories
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-gray-800">
                {cat}
              </option>
            ))}
          </select>

          <button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => {
              setQuery("");
              setCategoryFilter("");
            }}
          >
            Reset
          </button>
        </div>

        {/* Periodic Table */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl">
          <div className="overflow-auto">
            <div
              className="grid grid-cols-18 gap-2"
              style={{ gridTemplateColumns: "repeat(18, minmax(60px, 1fr))" }}
            >
              {/* Group headers */}
              {groups.map((g) => (
                <div
                  key={`g-${g}`}
                  className="text-xs text-center py-2 text-gray-300 font-medium"
                >
                  {g}
                </div>
              ))}

              {/* Element cells */}
              {periods.flatMap((period) =>
                groups.map((group) => {
                  const key = `${period}-${group}`;
                  const el = grid[key];
                  const isMatched = filteredElements.includes(el) || !el;
                  const colorClass = el
                    ? CATEGORY_COLORS[el.category] ||
                      "from-gray-400 to-gray-500 text-white shadow-gray-200"
                    : "";

                  return (
                    <div
                      key={key}
                      id={el ? `el-${el.number}` : `cell-${key}`}
                      tabIndex={el ? 0 : -1}
                      onMouseEnter={(e) => {
                        if (el) {
                          setHovered(el);
                          setMousePos({ x: e.clientX, y: e.clientY });
                        }
                      }}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => el && setSelected(el)}
                      className={`
                        relative h-24 rounded-xl p-2 flex flex-col justify-between cursor-pointer
                        transition-all duration-300 transform hover:scale-105
                        ${
                          el
                            ? `bg-gradient-to-br ${colorClass} shadow-lg`
                            : "bg-transparent"
                        }
                        ${el && !isMatched ? "opacity-20 scale-95" : ""}
                        ${
                          hovered === el
                            ? "ring-2 ring-white/50 shadow-2xl z-20"
                            : ""
                        }
                        focus:outline-none focus:ring-2 focus:ring-purple-400
                      `}
                      style={{
                        boxShadow: el
                          ? `0 8px 32px -8px rgba(${
                              el.category === "nonmetal"
                                ? "34, 197, 94"
                                : el.category === "noble gas"
                                ? "59, 130, 246"
                                : "239, 68, 68"
                            }, 0.3)`
                          : "none",
                      }}
                    >
                      {el ? (
                        <>
                          <div className="flex justify-between text-xs opacity-90">
                            <span className="font-bold">{el.number}</span>
                            <span className="font-medium">
                              {el.atomic_mass.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex flex-col items-center justify-center flex-1">
                            <div className="text-2xl font-bold mb-1">
                              {el.symbol}
                            </div>
                            <div className="text-xs text-center font-medium opacity-90 leading-tight">
                              {el.name}
                            </div>
                          </div>
                          <div className="text-xs text-center opacity-75 font-medium">
                            {el.category
                              .split(" ")
                              .map((word) => word.charAt(0).toUpperCase())
                              .join("")}
                          </div>
                        </>
                      ) : (
                        <div className="h-full" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Tooltip */}
        {hovered && (
          <div
            className="fixed z-50 pointer-events-none transition-all duration-200"
            style={{
              left: mousePos.x + 20,
              top: mousePos.y - 100,
              transform:
                mousePos.x > window.innerWidth - 300
                  ? "translateX(-100%) translateX(-40px)"
                  : "none",
            }}
          >
            <div className="bg-black/80 backdrop-blur-md rounded-xl p-4 text-white shadow-2xl border border-white/20 min-w-64">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${
                    CATEGORY_COLORS[hovered.category]
                  } flex items-center justify-center text-sm font-bold`}
                >
                  {hovered.symbol}
                </div>
                <div>
                  <div className="font-bold text-lg">{hovered.name}</div>
                  <div className="text-sm text-gray-300">
                    Atomic #{hovered.number}
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Mass:</span>
                  <span className="font-medium">{hovered.atomic_mass}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Category:</span>
                  <span className="font-medium">{hovered.category}</span>
                </div>
                {hovered.electronConfig && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Config:</span>
                    <span className="font-medium font-mono text-xs">
                      {hovered.electronConfig}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Detail Modal */}
        {selected && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl max-w-2xl w-full border border-white/20 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${
                        CATEGORY_COLORS[selected.category]
                      } flex items-center justify-center shadow-2xl`}
                    >
                      <span className="text-3xl font-bold">
                        {selected.symbol}
                      </span>
                    </div>
                    <div>
                      <div className="text-4xl font-bold">{selected.name}</div>
                      <div className="text-xl text-gray-300">
                        Element #{selected.number}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {selected.category}
                      </div>
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                    onClick={() => setSelected(null)}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-sm text-gray-400 mb-1">
                      Atomic Mass
                    </div>
                    <div className="text-2xl font-bold">
                      {selected.atomic_mass}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-sm text-gray-400 mb-1">
                      Group / Period
                    </div>
                    <div className="text-2xl font-bold">
                      {selected.group || "-"} / {selected.period}
                    </div>
                  </div>
                  {selected.density && (
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">
                        Density (g/cm³)
                      </div>
                      <div className="text-2xl font-bold">
                        {selected.density}
                      </div>
                    </div>
                  )}
                </div>

                {selected.electronConfig && (
                  <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-sm text-gray-400 mb-2">
                      Electron Configuration
                    </div>
                    <div className="text-lg font-mono bg-black/20 rounded-lg p-3 border border-white/10">
                      {selected.electronConfig}
                    </div>
                  </div>
                )}

                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full px-4 py-2 border border-purple-400/30">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">
                      Click outside to close
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Legend */}
        <div className="mt-8 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <div className="text-xl font-bold text-white mb-4 text-center">
            Element Categories
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            {categories.map((cat) => (
              <div
                key={cat}
                className={`px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r ${CATEGORY_COLORS[cat]} transform hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer`}
                onClick={() =>
                  setCategoryFilter(categoryFilter === cat ? "" : cat)
                }
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="text-gray-400 text-sm mb-2">
            Use arrow keys to navigate • Click elements for detailed information
          </div>
          <div className="text-xs text-gray-500">
            Built with React • Designed for exploration and learning by Daniel
            Jesuloba Ajide
          </div>
        </div>
      </div>
    </div>
  );
}
