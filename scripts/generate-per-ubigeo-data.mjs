#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Regenerates react/country/data/PER.json from an INEI ubigeo CSV.
 *
 * Source used for the 2026 refresh (INEI 2025 Directorio Nacional, cleaned):
 * https://raw.githubusercontent.com/MichaelSuarez0/ubigeos_peru/main/databases/ubigeo_inei_2025.csv
 *
 * Usage:
 *   curl -sL '<csv-url>' -o /tmp/ubigeo_inei.csv
 *   node scripts/generate-per-ubigeo-data.mjs /tmp/ubigeo_inei.csv
 */
import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const [, , csvPath] = process.argv

if (!csvPath) {
  console.error(
    'Usage: node scripts/generate-per-ubigeo-data.mjs <inei-csv-path>'
  )
  process.exit(1)
}

const raw = readFileSync(csvPath, 'utf8').replace(/^\uFEFF/, '')
const lines = raw.trim().split(/\r?\n/)
const headers = lines[0].split(';')
const idx = {
  departamento: headers.indexOf('departamento'),
  provincia: headers.indexOf('provincia'),
  distrito: headers.indexOf('distrito'),
  ubigeo: headers.indexOf('ubigeo'),
}

for (const [key, value] of Object.entries(idx)) {
  if (value === -1) {
    console.error(`Missing CSV column: ${key}`)
    process.exit(1)
  }
}

const tree = {}

for (const line of lines.slice(1)) {
  if (!line.trim()) continue

  const cols = line.split(';')
  const department = cols[idx.departamento]
  const province = cols[idx.provincia]
  const district = cols[idx.distrito]
  const ubigeo = cols[idx.ubigeo]

  if (!tree[department]) tree[department] = {}
  if (!tree[department][province]) tree[department][province] = {}
  tree[department][province][district] = ubigeo
}

const sortObject = (value) => {
  if (typeof value !== 'object' || value === null) return value

  const sorted = {}

  for (const key of Object.keys(value).sort((a, b) =>
    a.localeCompare(b, 'es', { sensitivity: 'base' })
  )) {
    sorted[key] = sortObject(value[key])
  }

  return sorted
}

const sorted = sortObject(tree)
const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '../react/country/data/PER.json')

writeFileSync(outPath, `${JSON.stringify(sorted, null, 2)}\n`, 'utf8')

const districtCount = Object.values(sorted).reduce(
  (acc, provinces) =>
    acc +
    Object.values(provinces).reduce(
      (inner, districts) => inner + Object.keys(districts).length,
      0
    ),
  0
)

console.log(
  `Wrote ${outPath} (${
    Object.keys(sorted).length
  } departments, ${districtCount} districts)`
)
