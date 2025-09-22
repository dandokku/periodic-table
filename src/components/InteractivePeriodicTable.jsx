import React, { useState, useMemo, useRef, useEffect } from "react";

// SAMPLE_DATA: replace with a full dataset or import from ./elements.json
const SAMPLE_DATA = [
  { number: 1, symbol: "H", name: "Hydrogen", atomic_mass: 1.008, group: 1, period: 1, category: "nonmetal" },
  { number: 2, symbol: "He", name: "Helium", atomic_mass: 4.0026, group: 18, period: 1, category: "noble gas" },
  { number: 3, symbol: "Li", name: "Lithium", atomic_mass: 6.94, group: 1, period: 2, category: "alkali metal" },
  { number: 4, symbol: "Be", name: "Beryllium", atomic_mass: 9.0122, group: 2, period: 2, category: "alkaline earth metal" },
  { number: 5, symbol: "B", name: "Boron", atomic_mass: 10.81, group: 13, period: 2, category: "metalloid" },
  { number: 6, symbol: "C", name: "Carbon", atomic_mass: 12.011, group: 14, period: 2, category: "nonmetal" },
  { number: 7, symbol: "N", name: "Nitrogen", atomic_mass: 14.007, group: 15, period: 2, category: "nonmetal" },
  { number: 8, symbol: "O", name: "Oxygen", atomic_mass: 15.999, group: 16, period: 2, category: "nonmetal" },
  { number: 9, symbol: "F", name: "Fluorine", atomic_mass: 18.998, group: 17, period: 2, category: "halogen" },
  { number: 10, symbol: "Ne", name: "Neon", atomic_mass: 20.180, group: 18, period: 2, category: "noble gas" },
  { number: 11, symbol: "Na", name: "Sodium", atomic_mass: 22.990, group: 1, period: 3, category: "alkali metal" },
  { number: 12, symbol: "Mg", name: "Magnesium", atomic_mass: 24.305, group: 2, period: 3, category: "alkaline earth metal" },
  { number: 13, symbol: "Al", name: "Aluminium", atomic_mass: 26.982, group: 13, period: 3, category: "post-transition metal" },
  { number: 14, symbol: "Si", name: "Silicon", atomic_mass: 28.085, group: 14, period: 3, category: "metalloid" },
  { number: 15, symbol: "P", name: "Phosphorus", atomic_mass: 30.974, group: 15, period: 3, category: "nonmetal" },
  { number: 16, symbol: "S", name: "Sulfur", atomic_mass: 32.06, group: 16, period: 3, category: "nonmetal" },
  { number: 17, symbol: "Cl", name: "Chlorine", atomic_mass: 35.45, group: 17, period: 3, category: "halogen" },
  { number: 18, symbol: "Ar", name: "Argon", atomic_mass: 39.948, group: 18, period: 3, category: "noble gas" },
  { number: 19, symbol: "K", name: "Potassium", atomic_mass: 39.098, group: 1, period: 4, category: "alkali metal" },
  { number: 20, symbol: "Ca", name: "Calcium", atomic_mass: 40.078, group: 2, period: 4, category: "alkaline earth metal" }
];

const CATEGORY_COLORS = {
  "nonmetal": "bg-green-200 text-green-900",
  "noble gas": "bg-blue-200 text-blue-900",
  "alkali metal": "bg-red-200 text-red-900",
  "alkaline earth metal": "bg-orange-200 text-orange-900",
  "metalloid": "bg-yellow-200 text-yellow-900",
  "halogen": "bg-purple-200 text-purple-900",
  "post-transition metal": "bg-gray-200 text-gray-900",
  "transition metal": "bg-indigo-200 text-indigo-900",
  "lanthanoid": "bg-pink-200 text-pink-900",
  "actinoid": "bg-rose-200 text-rose-900",
};

export default function InteractivePeriodicTable({ elements = SAMPLE_DATA }) {
  // Map elements by (period, group) => cell
  const grid = useMemo(() => {
    const map = {};
    elements.forEach(el => {
      // Use group 0/undefined for lanthanoids/actinoids placement if dataset has that
      const key = `${el.period}-${el.group || 0}`;
      map[key] = el;
    });
    return map;
  }, [elements]);

  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const tooltipRef = useRef(null);

  const categories = useMemo(() => {
    const s = new Set(elements.map(e => e.category));
    return Array.from(s);
  }, [elements]);

  const filteredElements = useMemo(() => {
    return elements.filter(e => {
      if (categoryFilter && e.category !== categoryFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return e.name.toLowerCase().includes(q) || e.symbol.toLowerCase().includes(q) || String(e.number) === q;
    });
  }, [elements, query, categoryFilter]);

  // keyboard navigation: track focused coordinates
  const [focusCoord, setFocusCoord] = useState({ period: 1, group: 1 });
  useEffect(() => {
    const onKey = (e) => {
      // ignore when typing in inputs
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      setFocusCoord(prev => {
        let { period, group } = prev;
        if (e.key === 'ArrowRight') group = Math.min(18, group + 1);
        if (e.key === 'ArrowLeft') group = Math.max(1, group - 1);
        if (e.key === 'ArrowUp') period = Math.max(1, period - 1);
        if (e.key === 'ArrowDown') period = Math.min(9, period + 1);
        return { period, group };
      });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const key = `${focusCoord.period}-${focusCoord.group}`;
    const el = grid[key];
    if (el) {
      setSelected(el);
      // scroll into view
      const node = document.getElementById(`el-${el.number}`);
      node?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }, [focusCoord, grid]);

  // layout: periods 1..7 rows, groups 1..18 columns
  const periods = [1,2,3,4,5,6,7];
  const groups = Array.from({length:18},(_,i)=>i+1);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h2 className="text-2xl font-semibold">Interactive Periodic Table</h2>
        <div className="flex gap-2 items-center">
          <input
            className="border rounded px-3 py-1 w-48"
            placeholder="Search by name, symbol or #"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
          />
          <select className="border rounded px-2 py-1" value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)}>
            <option value="">All categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <button className="px-3 py-1 border rounded" onClick={()=>{setQuery(''); setCategoryFilter('');}}>Reset</button>
        </div>
      </div>

      <div className="overflow-auto border rounded p-2">
        <div className="grid grid-cols-18 gap-1" style={{gridTemplateColumns: 'repeat(18, minmax(48px, 1fr))'}}>
          {/* Render a header row for group numbers */}
          {groups.map(g => (
            <div key={`g-${g}`} className="text-xs text-center py-1 opacity-60">{g}</div>
          ))}

          {/* Render rows by period */}
          {periods.flatMap(period => (
            groups.map(group => {
              const key = `${period}-${group}`;
              const el = grid[key];
              const isMatched = filteredElements.includes(el) || !el;
              return (
                <div
                  key={key}
                  id={el ? `el-${el.number}` : `cell-${key}`}
                  tabIndex={el ? 0 : -1}
                  onMouseEnter={() => el && setHovered(el)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => el && setSelected(el)}
                  className={`relative h-20 border rounded p-1 flex flex-col justify-between ${el ? (CATEGORY_COLORS[el.category] || 'bg-white') : 'bg-transparent'} ${el && (!filteredElements.includes(el) ? 'opacity-30' : '')} focus:outline-none focus:ring-2 focus:ring-offset-1`}
                >
                  {el ? (
                    <>
                      <div className="flex justify-between text-[10px]">
                        <span>{el.number}</span>
                        <span className="italic">{el.atomic_mass}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-lg font-semibold">{el.symbol}</div>
                        <div className="text-[10px]">{el.name}</div>
                      </div>
                      <div className="text-[10px] text-right">{el.category}</div>
                    </>
                  ) : (
                    <div className="h-full" />
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {hovered && (
        <div ref={tooltipRef} className="fixed z-50 p-2 rounded shadow-lg bg-white border text-sm w-56 right-6 bottom-6">
          <div className="font-bold text-lg">{hovered.symbol} — {hovered.name}</div>
          <div className="text-xs">Atomic #: {hovered.number}</div>
          <div className="text-xs">Atomic mass: {hovered.atomic_mass}</div>
          <div className="text-xs">Category: {hovered.category}</div>
        </div>
      )}

      {/* Detail panel/modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4" onClick={()=>setSelected(null)}>
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6" onClick={(e)=>e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-4xl font-bold">{selected.symbol}</div>
                <div className="text-xl">{selected.name} <span className="text-sm text-gray-500">(#{selected.number})</span></div>
                <div className="text-sm text-gray-600">{selected.category}</div>
              </div>
              <button className="text-gray-600" onClick={()=>setSelected(null)}>Close</button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500">Atomic mass</div>
                <div className="font-medium">{selected.atomic_mass}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Group / Period</div>
                <div className="font-medium">{selected.group || '-'} / {selected.period}</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-700">
              {/* Extended info placeholder. Add properties such as electron configuration, electronegativity, melting point, etc to your dataset and show them here. */}
              Add extended properties (electronegativity, density, melting point, electron configuration) to your elements dataset and they will show up here.
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4">
        <div className="font-semibold mb-2">Legend</div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <div key={cat} className={`px-3 py-1 rounded text-xs ${CATEGORY_COLORS[cat] || 'bg-gray-100'}`}>{cat}</div>
          ))}
        </div>
      </div>

      {/* Quick notes */}
      <div className="mt-4 text-xs text-gray-600">
        Tip: For production, provide the full 118-element dataset (with extra properties) as JSON and consider virtualization if you add heavy visuals. Also include proper placement rules for lanthanoids & actinoids.
      </div>
    </div>
  );
}
