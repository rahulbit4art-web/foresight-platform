import type { GEM2Output } from '@/lib/types'

interface HierarchyPyramidProps {
  data: GEM2Output
}

const LAYERS = [
  { key: 'l1', label: 'Broader Structural Issue', fill: '#fce8e1', stroke: '#e8a87c', textColor: '#a83420' },
  { key: 'l2', label: 'Underlying Drivers', fill: '#f5ead8', stroke: '#b89a5a', textColor: '#8a6b2a' },
  { key: 'l3', label: 'Lived Frustrations', fill: '#eaf3de', stroke: '#6b9940', textColor: '#3b6d11' },
  { key: 'l4', label: 'Negative Results', fill: '#e1f5ee', stroke: '#1d9e75', textColor: '#085041' },
  { key: 'l5', label: 'What Accumulates', fill: '#e6f1fb', stroke: '#378add', textColor: '#0c447c' },
] as const

export function HierarchyPyramid({ data }: HierarchyPyramidProps) {
  const W = 560
  const layerH = 52
  const gap = 2
  const topOffset = 20

  // Each layer grows wider by 40px on each side
  const layers = LAYERS.map((layer, i) => {
    const indent = (4 - i) * 40
    const x = indent
    const y = topOffset + i * (layerH + gap)
    const w = W - indent * 2
    return { ...layer, x, y, w, value: data[layer.key] }
  })

  const svgH = topOffset + 5 * (layerH + gap) + 80 // extra for signal box

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-4">
      <svg
        width="100%"
        viewBox={`0 0 ${W} ${svgH}`}
        role="img"
        aria-label="Problem Hierarchy Pyramid"
      >
        <title>Problem Hierarchy Pyramid</title>

        {layers.map((layer) => (
          <g key={layer.key}>
            <rect
              x={layer.x}
              y={layer.y}
              width={layer.w}
              height={layerH}
              rx={4}
              fill={layer.fill}
              stroke={layer.stroke}
              strokeWidth={1}
            />
            {/* Layer label */}
            <text
              x={W / 2}
              y={layer.y + 16}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={9}
              fontWeight={600}
              fill={layer.textColor}
              fontFamily="system-ui, sans-serif"
              letterSpacing="0.06em"
              style={{ textTransform: 'uppercase' }}
            >
              {layer.label}
            </text>
            {/* Layer value */}
            <text
              x={W / 2}
              y={layer.y + 34}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={11}
              fill={layer.textColor}
              fontFamily="system-ui, sans-serif"
              opacity={0.85}
            >
              {layer.value.length > 60 ? layer.value.substring(0, 57) + '…' : layer.value}
            </text>
          </g>
        ))}

        {/* Intervention Signal box */}
        <rect
          x={16}
          y={topOffset + 5 * (layerH + gap) + 12}
          width={W - 32}
          height={56}
          rx={8}
          fill="#f5f3ee"
          stroke="#e2ded6"
          strokeWidth={1}
        />
        <text
          x={W / 2}
          y={topOffset + 5 * (layerH + gap) + 29}
          textAnchor="middle"
          fontSize={8}
          fill="#9c9a92"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.1em"
          fontWeight={500}
          style={{ textTransform: 'uppercase' }}
        >
          EARLY INTERVENTION SIGNAL
        </text>
        <text
          x={W / 2}
          y={topOffset + 5 * (layerH + gap) + 50}
          textAnchor="middle"
          fontSize={10}
          fill="#5c5a54"
          fontFamily="system-ui, sans-serif"
        >
          {data.signal.length > 80 ? data.signal.substring(0, 77) + '…' : data.signal}
        </text>
      </svg>
    </div>
  )
}
