import React, { useState, useMemo, useRef, useEffect } from "react";

// Enhanced sample data with more visual properties
const SAMPLE_DATA = [
  {
    number: 1,
    symbol: "H",
    name: "Hydrogen",
    atomic_mass: 1.008,
    group: 1,
    period: 1,
    category: "nonmetal",
    electronConfig: "1s¹",
    density: 0.00008988,
  },
  {
    number: 2,
    symbol: "He",
    name: "Helium",
    atomic_mass: 4.0026,
    group: 18,
    period: 1,
    category: "noble gas",
    electronConfig: "1s²",
    density: 0.0001785,
  },
  {
    number: 3,
    symbol: "Li",
    name: "Lithium",
    atomic_mass: 6.94,
    group: 1,
    period: 2,
    category: "alkali metal",
    electronConfig: "[He] 2s¹",
    density: 0.534,
  },
  {
    number: 4,
    symbol: "Be",
    name: "Beryllium",
    atomic_mass: 9.0122,
    group: 2,
    period: 2,
    category: "alkaline earth metal",
    electronConfig: "[He] 2s²",
    density: 1.85,
  },
  {
    number: 5,
    symbol: "B",
    name: "Boron",
    atomic_mass: 10.81,
    group: 13,
    period: 2,
    category: "metalloid",
    electronConfig: "[He] 2s² 2p¹",
    density: 2.34,
  },
  {
    number: 6,
    symbol: "C",
    name: "Carbon",
    atomic_mass: 12.011,
    group: 14,
    period: 2,
    category: "nonmetal",
    electronConfig: "[He] 2s² 2p²",
    density: 2.267,
  },
  {
    number: 7,
    symbol: "N",
    name: "Nitrogen",
    atomic_mass: 14.007,
    group: 15,
    period: 2,
    category: "nonmetal",
    electronConfig: "[He] 2s² 2p³",
    density: 0.0012506,
  },
  {
    number: 8,
    symbol: "O",
    name: "Oxygen",
    atomic_mass: 15.999,
    group: 16,
    period: 2,
    category: "nonmetal",
    electronConfig: "[He] 2s² 2p⁴",
    density: 0.001429,
  },
  {
    number: 9,
    symbol: "F",
    name: "Fluorine",
    atomic_mass: 18.998,
    group: 17,
    period: 2,
    category: "halogen",
    electronConfig: "[He] 2s² 2p⁵",
    density: 0.001696,
  },
  {
    number: 10,
    symbol: "Ne",
    name: "Neon",
    atomic_mass: 20.18,
    group: 18,
    period: 2,
    category: "noble gas",
    electronConfig: "[He] 2s² 2p⁶",
    density: 0.0008999,
  },
  {
    number: 11,
    symbol: "Na",
    name: "Sodium",
    atomic_mass: 22.99,
    group: 1,
    period: 3,
    category: "alkali metal",
    electronConfig: "[Ne] 3s¹",
    density: 0.971,
  },
  {
    number: 12,
    symbol: "Mg",
    name: "Magnesium",
    atomic_mass: 24.305,
    group: 2,
    period: 3,
    category: "alkaline earth metal",
    electronConfig: "[Ne] 3s²",
    density: 1.738,
  },
  {
    number: 13,
    symbol: "Al",
    name: "Aluminium",
    atomic_mass: 26.982,
    group: 13,
    period: 3,
    category: "post-transition metal",
    electronConfig: "[Ne] 3s² 3p¹",
    density: 2.698,
  },
  {
    number: 14,
    symbol: "Si",
    name: "Silicon",
    atomic_mass: 28.085,
    group: 14,
    period: 3,
    category: "metalloid",
    electronConfig: "[Ne] 3s² 3p²",
    density: 2.3296,
  },
  {
    number: 15,
    symbol: "P",
    name: "Phosphorus",
    atomic_mass: 30.974,
    group: 15,
    period: 3,
    category: "nonmetal",
    electronConfig: "[Ne] 3s² 3p³",
    density: 1.82,
  },
  {
    number: 16,
    symbol: "S",
    name: "Sulfur",
    atomic_mass: 32.06,
    group: 16,
    period: 3,
    category: "nonmetal",
    electronConfig: "[Ne] 3s² 3p⁴",
    density: 2.067,
  },
  {
    number: 17,
    symbol: "Cl",
    name: "Chlorine",
    atomic_mass: 35.45,
    group: 17,
    period: 3,
    category: "halogen",
    electronConfig: "[Ne] 3s² 3p⁵",
    density: 0.003214,
  },
  {
    number: 18,
    symbol: "Ar",
    name: "Argon",
    atomic_mass: 39.948,
    group: 18,
    period: 3,
    category: "noble gas",
    electronConfig: "[Ne] 3s² 3p⁶",
    density: 0.0017837,
  },
  {
    number: 19,
    symbol: "K",
    name: "Potassium",
    atomic_mass: 39.098,
    group: 1,
    period: 4,
    category: "alkali metal",
    electronConfig: "[Ar] 4s¹",
    density: 0.862,
  },
  {
    number: 20,
    symbol: "Ca",
    name: "Calcium",
    atomic_mass: 40.078,
    group: 2,
    period: 4,
    category: "alkaline earth metal",
    electronConfig: "[Ar] 4s²",
    density: 1.54,
  },
  {
    number: 21,
    symbol: "Sc",
    name: "Scandium",
    atomic_mass: 44.956,
    group: 3,
    period: 4,
    category: "transition metal",
    electronConfig: "[Ar] 3d¹ 4s²",
    density: 2.989,
  },
  {
    number: 22,
    symbol: "Ti",
    name: "Titanium",
    atomic_mass: 47.867,
    group: 4,
    period: 4,
    category: "transition metal",
    electronConfig: "[Ar] 3d² 4s²",
    density: 4.54,
  },
  {
    number: 23,
    symbol: "V",
    name: "Vanadium",
    atomic_mass: 50.942,
    group: 5,
    period: 4,
    category: "transition metal",
    electronConfig: "[Ar] 3d³ 4s²",
    density: 6.11,
  },
  {
    number: 24,
    symbol: "Cr",
    name: "Chromium",
    atomic_mass: 51.996,
    group: 6,
    period: 4,
    category: "transition metal",
    electronConfig: "[Ar] 3d⁵ 4s¹",
    density: 7.15,
  },
  {
    number: 25,
    symbol: "Mn",
    name: "Manganese",
    atomic_mass: 54.938,
    group: 7,
    period: 4,
    category: "transition metal",
    electronConfig: "[Ar] 3d⁵ 4s²",
    density: 7.44,
  },
  {
    number: 26,
    symbol: "Fe",
    name: "Iron",
    atomic_mass: 55.845,
    group: 8,
    period: 4,
    category: "transition metal",
    electronConfig: "[Ar] 3d⁶ 4s²",
    density: 7.874,
  },
  {
    number: 27,
    symbol: "Co",
    name: "Cobalt",
    atomic_mass: 58.933,
    group: 9,
    period: 4,
    category: "transition metal",
    electronConfig: "[Ar] 3d⁷ 4s²",
    density: 8.86,
  },
  {
    number: 28,
    symbol: "Ni",
    name: "Nickel",
    atomic_mass: 58.693,
    group: 10,
    period: 4,
    category: "transition metal",
    electronConfig: "[Ar] 3d⁸ 4s²",
    density: 8.912,
  },
  {
    number: 29,
    symbol: "Cu",
    name: "Copper",
    atomic_mass: 63.546,
    group: 11,
    period: 4,
    category: "transition metal",
    electronConfig: "[Ar] 3d¹⁰ 4s¹",
    density: 8.96,
  },
  {
    number: 30,
    symbol: "Zn",
    name: "Zinc",
    atomic_mass: 65.38,
    group: 12,
    period: 4,
    category: "transition metal",
    electronConfig: "[Ar] 3d¹⁰ 4s²",
    density: 7.134,
  },
  {
    number: 31,
    symbol: "Ga",
    name: "Gallium",
    atomic_mass: 69.723,
    group: 13,
    period: 4,
    category: "post-transition metal",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p¹",
    density: 5.907,
  },
  {
    number: 32,
    symbol: "Ge",
    name: "Germanium",
    atomic_mass: 72.63,
    group: 14,
    period: 4,
    category: "metalloid",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p²",
    density: 5.323,
  },
  {
    number: 33,
    symbol: "As",
    name: "Arsenic",
    atomic_mass: 74.922,
    group: 15,
    period: 4,
    category: "metalloid",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p³",
    density: 5.776,
  },
  {
    number: 34,
    symbol: "Se",
    name: "Selenium",
    atomic_mass: 78.971,
    group: 16,
    period: 4,
    category: "nonmetal",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁴",
    density: 4.809,
  },
  {
    number: 35,
    symbol: "Br",
    name: "Bromine",
    atomic_mass: 79.904,
    group: 17,
    period: 4,
    category: "halogen",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁵",
    density: 3.122,
  },
  {
    number: 36,
    symbol: "Kr",
    name: "Krypton",
    atomic_mass: 83.798,
    group: 18,
    period: 4,
    category: "noble gas",
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁶",
    density: 0.003733,
  },
  {
    number: 37,
    symbol: "Rb",
    name: "Rubidium",
    atomic_mass: 85.468,
    group: 1,
    period: 5,
    category: "alkali metal",
    electronConfig: "[Kr] 5s¹",
    density: 1.532,
  },
  {
    number: 38,
    symbol: "Sr",
    name: "Strontium",
    atomic_mass: 87.62,
    group: 2,
    period: 5,
    category: "alkaline earth metal",
    electronConfig: "[Kr] 5s²",
    density: 2.64,
  },
  {
    number: 39,
    symbol: "Y",
    name: "Yttrium",
    atomic_mass: 88.906,
    group: 3,
    period: 5,
    category: "transition metal",
    electronConfig: "[Kr] 4d¹ 5s²",
    density: 4.469,
  },
  {
    number: 40,
    symbol: "Zr",
    name: "Zirconium",
    atomic_mass: 91.224,
    group: 4,
    period: 5,
    category: "transition metal",
    electronConfig: "[Kr] 4d² 5s²",
    density: 6.506,
  },
  {
    number: 41,
    symbol: "Nb",
    name: "Niobium",
    atomic_mass: 92.906,
    group: 5,
    period: 5,
    category: "transition metal",
    electronConfig: "[Kr] 4d⁴ 5s¹",
    density: 8.57,
  },
  {
    number: 42,
    symbol: "Mo",
    name: "Molybdenum",
    atomic_mass: 95.95,
    group: 6,
    period: 5,
    category: "transition metal",
    electronConfig: "[Kr] 4d⁵ 5s¹",
    density: 10.22,
  },
  {
    number: 43,
    symbol: "Tc",
    name: "Technetium",
    atomic_mass: 98,
    group: 7,
    period: 5,
    category: "transition metal",
    electronConfig: "[Kr] 4d⁵ 5s²",
    density: 11.5,
  },
  {
    number: 44,
    symbol: "Ru",
    name: "Ruthenium",
    atomic_mass: 101.07,
    group: 8,
    period: 5,
    category: "transition metal",
    electronConfig: "[Kr] 4d⁷ 5s¹",
    density: 12.37,
  },
  {
    number: 45,
    symbol: "Rh",
    name: "Rhodium",
    atomic_mass: 102.91,
    group: 9,
    period: 5,
    category: "transition metal",
    electronConfig: "[Kr] 4d⁸ 5s¹",
    density: 12.41,
  },
  {
    number: 46,
    symbol: "Pd",
    name: "Palladium",
    atomic_mass: 106.42,
    group: 10,
    period: 5,
    category: "transition metal",
    electronConfig: "[Kr] 4d¹⁰",
    density: 12.02,
  },
  {
    number: 47,
    symbol: "Ag",
    name: "Silver",
    atomic_mass: 107.87,
    group: 11,
    period: 5,
    category: "transition metal",
    electronConfig: "[Kr] 4d¹⁰ 5s¹",
    density: 10.501,
  },
  {
    number: 48,
    symbol: "Cd",
    name: "Cadmium",
    atomic_mass: 112.41,
    group: 12,
    period: 5,
    category: "transition metal",
    electronConfig: "[Kr] 4d¹⁰ 5s²",
    density: 8.69,
  },
  {
    number: 49,
    symbol: "In",
    name: "Indium",
    atomic_mass: 114.82,
    group: 13,
    period: 5,
    category: "post-transition metal",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p¹",
    density: 7.31,
  },
  {
    number: 50,
    symbol: "Sn",
    name: "Tin",
    atomic_mass: 118.71,
    group: 14,
    period: 5,
    category: "post-transition metal",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p²",
    density: 7.287,
  },
  {
    number: 51,
    symbol: "Sb",
    name: "Antimony",
    atomic_mass: 121.76,
    group: 15,
    period: 5,
    category: "metalloid",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p³",
    density: 6.685,
  },
  {
    number: 52,
    symbol: "Te",
    name: "Tellurium",
    atomic_mass: 127.6,
    group: 16,
    period: 5,
    category: "metalloid",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁴",
    density: 6.232,
  },
  {
    number: 53,
    symbol: "I",
    name: "Iodine",
    atomic_mass: 126.9,
    group: 17,
    period: 5,
    category: "halogen",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁵",
    density: 4.93,
  },
  {
    number: 54,
    symbol: "Xe",
    name: "Xenon",
    atomic_mass: 131.29,
    group: 18,
    period: 5,
    category: "noble gas",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁶",
    density: 0.005887,
  },
  {
    number: 55,
    symbol: "Cs",
    name: "Caesium",
    atomic_mass: 132.91,
    group: 1,
    period: 6,
    category: "alkali metal",
    electronConfig: "[Xe] 6s¹",
    density: 1.873,
  },
  {
    number: 56,
    symbol: "Ba",
    name: "Barium",
    atomic_mass: 137.33,
    group: 2,
    period: 6,
    category: "alkaline earth metal",
    electronConfig: "[Xe] 6s²",
    density: 3.594,
  },
  {
    number: 57,
    symbol: "La",
    name: "Lanthanum",
    atomic_mass: 138.91,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 5d¹ 6s²",
    density: 6.145,
  },
  {
    number: 58,
    symbol: "Ce",
    name: "Cerium",
    atomic_mass: 140.12,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f¹ 5d¹ 6s²",
    density: 6.77,
  },
  {
    number: 59,
    symbol: "Pr",
    name: "Praseodymium",
    atomic_mass: 140.91,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f³ 6s²",
    density: 6.773,
  },
  {
    number: 60,
    symbol: "Nd",
    name: "Neodymium",
    atomic_mass: 144.24,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f⁴ 6s²",
    density: 7.007,
  },
  {
    number: 61,
    symbol: "Pm",
    name: "Promethium",
    atomic_mass: 145,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f⁵ 6s²",
    density: 7.26,
  },
  {
    number: 62,
    symbol: "Sm",
    name: "Samarium",
    atomic_mass: 150.36,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f⁶ 6s²",
    density: 7.52,
  },
  {
    number: 63,
    symbol: "Eu",
    name: "Europium",
    atomic_mass: 151.96,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f⁷ 6s²",
    density: 5.243,
  },
  {
    number: 64,
    symbol: "Gd",
    name: "Gadolinium",
    atomic_mass: 157.25,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f⁷ 5d¹ 6s²",
    density: 7.895,
  },
  {
    number: 65,
    symbol: "Tb",
    name: "Terbium",
    atomic_mass: 158.93,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f⁹ 6s²",
    density: 8.229,
  },
  {
    number: 66,
    symbol: "Dy",
    name: "Dysprosium",
    atomic_mass: 162.5,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f¹⁰ 6s²",
    density: 8.55,
  },
  {
    number: 67,
    symbol: "Ho",
    name: "Holmium",
    atomic_mass: 164.93,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f¹¹ 6s²",
    density: 8.795,
  },
  {
    number: 68,
    symbol: "Er",
    name: "Erbium",
    atomic_mass: 167.26,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f¹² 6s²",
    density: 9.066,
  },
  {
    number: 69,
    symbol: "Tm",
    name: "Thulium",
    atomic_mass: 168.93,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f¹³ 6s²",
    density: 9.321,
  },
  {
    number: 70,
    symbol: "Yb",
    name: "Ytterbium",
    atomic_mass: 173.05,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f¹⁴ 6s²",
    density: 6.965,
  },
  {
    number: 71,
    symbol: "Lu",
    name: "Lutetium",
    atomic_mass: 174.97,
    group: 3,
    period: 6,
    category: "lanthanide",
    electronConfig: "[Xe] 4f¹⁴ 5d¹ 6s²",
    density: 9.84,
  },
  {
    number: 72,
    symbol: "Hf",
    name: "Hafnium",
    atomic_mass: 178.49,
    group: 4,
    period: 6,
    category: "transition metal",
    electronConfig: "[Xe] 4f¹⁴ 5d² 6s²",
    density: 13.31,
  },
  {
    number: 73,
    symbol: "Ta",
    name: "Tantalum",
    atomic_mass: 180.95,
    group: 5,
    period: 6,
    category: "transition metal",
    electronConfig: "[Xe] 4f¹⁴ 5d³ 6s²",
    density: 16.654,
  },
  {
    number: 74,
    symbol: "W",
    name: "Tungsten",
    atomic_mass: 183.84,
    group: 6,
    period: 6,
    category: "transition metal",
    electronConfig: "[Xe] 4f¹⁴ 5d⁴ 6s²",
    density: 19.25,
  },
  {
    number: 75,
    symbol: "Re",
    name: "Rhenium",
    atomic_mass: 186.21,
    group: 7,
    period: 6,
    category: "transition metal",
    electronConfig: "[Xe] 4f¹⁴ 5d⁵ 6s²",
    density: 21.02,
  },
  {
    number: 76,
    symbol: "Os",
    name: "Osmium",
    atomic_mass: 190.23,
    group: 8,
    period: 6,
    category: "transition metal",
    electronConfig: "[Xe] 4f¹⁴ 5d⁶ 6s²",
    density: 22.59,
  },
  {
    number: 77,
    symbol: "Ir",
    name: "Iridium",
    atomic_mass: 192.22,
    group: 9,
    period: 6,
    category: "transition metal",
    electronConfig: "[Xe] 4f¹⁴ 5d⁷ 6s²",
    density: 22.56,
  },
  {
    number: 78,
    symbol: "Pt",
    name: "Platinum",
    atomic_mass: 195.08,
    group: 10,
    period: 6,
    category: "transition metal",
    electronConfig: "[Xe] 4f¹⁴ 5d⁹ 6s¹",
    density: 21.46,
  },
  {
    number: 79,
    symbol: "Au",
    name: "Gold",
    atomic_mass: 196.97,
    group: 11,
    period: 6,
    category: "transition metal",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹",
    density: 19.282,
  },
  {
    number: 80,
    symbol: "Hg",
    name: "Mercury",
    atomic_mass: 200.59,
    group: 12,
    period: 6,
    category: "transition metal",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s²",
    density: 13.5336,
  },
  {
    number: 81,
    symbol: "Tl",
    name: "Thallium",
    atomic_mass: 204.38,
    group: 13,
    period: 6,
    category: "post-transition metal",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹",
    density: 11.85,
  },
  {
    number: 82,
    symbol: "Pb",
    name: "Lead",
    atomic_mass: 207.2,
    group: 14,
    period: 6,
    category: "post-transition metal",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",
    density: 11.342,
  },
  {
    number: 83,
    symbol: "Bi",
    name: "Bismuth",
    atomic_mass: 208.98,
    group: 15,
    period: 6,
    category: "post-transition metal",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³",
    density: 9.807,
  },
  {
    number: 84,
    symbol: "Po",
    name: "Polonium",
    atomic_mass: 209,
    group: 16,
    period: 6,
    category: "post-transition metal",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴",
    density: 9.32,
  },
  {
    number: 85,
    symbol: "At",
    name: "Astatine",
    atomic_mass: 210,
    group: 17,
    period: 6,
    category: "halogen",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵",
    density: 7,
  },
  {
    number: 86,
    symbol: "Rn",
    name: "Radon",
    atomic_mass: 222,
    group: 18,
    period: 6,
    category: "noble gas",
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶",
    density: 0.00973,
  },
  {
    number: 87,
    symbol: "Fr",
    name: "Francium",
    atomic_mass: 223,
    group: 1,
    period: 7,
    category: "alkali metal",
    electronConfig: "[Rn] 7s¹",
    density: 1.87,
  },
  {
    number: 88,
    symbol: "Ra",
    name: "Radium",
    atomic_mass: 226,
    group: 2,
    period: 7,
    category: "alkaline earth metal",
    electronConfig: "[Rn] 7s²",
    density: 5.5,
  },
  {
    number: 89,
    symbol: "Ac",
    name: "Actinium",
    atomic_mass: 227,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 6d¹ 7s²",
    density: 10.07,
  },
  {
    number: 90,
    symbol: "Th",
    name: "Thorium",
    atomic_mass: 232.04,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 6d² 7s²",
    density: 11.72,
  },
  {
    number: 91,
    symbol: "Pa",
    name: "Protactinium",
    atomic_mass: 231.04,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f² 6d¹ 7s²",
    density: 15.37,
  },
  {
    number: 92,
    symbol: "U",
    name: "Uranium",
    atomic_mass: 238.03,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f³ 6d¹ 7s²",
    density: 19.1,
  },
  {
    number: 93,
    symbol: "Np",
    name: "Neptunium",
    atomic_mass: 237,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f⁴ 6d¹ 7s²",
    density: 20.45,
  },
  {
    number: 94,
    symbol: "Pu",
    name: "Plutonium",
    atomic_mass: 244,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f⁶ 7s²",
    density: 19.84,
  },
  {
    number: 95,
    symbol: "Am",
    name: "Americium",
    atomic_mass: 243,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f⁷ 7s²",
    density: 13.69,
  },
  {
    number: 96,
    symbol: "Cm",
    name: "Curium",
    atomic_mass: 247,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f⁷ 6d¹ 7s²",
    density: 13.51,
  },
  {
    number: 97,
    symbol: "Bk",
    name: "Berkelium",
    atomic_mass: 247,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f⁹ 7s²",
    density: 14.79,
  },
  {
    number: 98,
    symbol: "Cf",
    name: "Californium",
    atomic_mass: 251,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f¹⁰ 7s²",
    density: 15.1,
  },
  {
    number: 99,
    symbol: "Es",
    name: "Einsteinium",
    atomic_mass: 252,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f¹¹ 7s²",
    density: 8.84,
  },
  {
    number: 100,
    symbol: "Fm",
    name: "Fermium",
    atomic_mass: 257,
    group: 3,
    period: 7,
    category: "actinide",
    electronConfig: "[Rn] 5f¹² 7s²",
    density: 9.7,
  },
];

const CATEGORY_COLORS = {
  nonmetal: "from-emerald-400 to-green-500 text-white shadow-green-200",
  "noble gas": "from-sky-400 to-blue-500 text-white shadow-blue-200",
  "alkali metal": "from-rose-400 to-red-500 text-white shadow-red-200",
  "alkaline earth metal":
    "from-orange-400 to-amber-500 text-white shadow-orange-200",
  metalloid: "from-yellow-400 to-amber-400 text-gray-800 shadow-yellow-200",
  halogen: "from-purple-400 to-violet-500 text-white shadow-purple-200",
  "post-transition metal":
    "from-slate-400 to-gray-500 text-white shadow-gray-200",
  "transition metal":
    "from-indigo-400 to-blue-600 text-white shadow-indigo-200",
  lanthanoid: "from-pink-400 to-rose-500 text-white shadow-pink-200",
  actinoid: "from-fuchsia-400 to-pink-600 text-white shadow-fuchsia-200",
};

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
