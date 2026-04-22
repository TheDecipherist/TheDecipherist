// cipher-grid.worklet.js — Houdini Paint Worklet
// Registered via: CSS.paintWorklet.addModule('/js/cipher-grid.worklet.js')
// Used like: background-image: paint(cipher-grid);
// Input properties: --grid-color, --grid-opacity, --cell-size, --symbol-density

// Zodiac cipher symbol set (printable ASCII approximations)
const SYMBOLS = [
  '+', '×', '÷', '⊕', '⊗', '⊙', '⊛', '⌖', '⌗', '⌘',
  'Z', '∂', '∇', '∆', '∫', '∑', 'π', 'Ω', 'φ', 'ψ',
  '◇', '◆', '○', '●', '□', '■', '△', '▲', '▽', '▼',
  '/', '\\', '|', '-', '=', '~', '^', '*', '@', '#',
];

class CipherGridPainter {
  static get inputProperties() {
    return [
      '--grid-color',
      '--grid-opacity',
      '--cell-size',
      '--symbol-density',
    ];
  }

  paint(ctx, geom, props) {
    const rawColor   = props.get('--grid-color').toString().trim() || 'oklch(0.78 0.15 196)';
    const opacity    = parseFloat(props.get('--grid-opacity').toString()) || 0.06;
    const cellSize   = parseFloat(props.get('--cell-size').toString()) || 28;
    const density    = parseFloat(props.get('--symbol-density').toString()) || 0.7;

    ctx.globalAlpha = opacity;
    ctx.font = `${cellSize * 0.6}px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = rawColor;

    const cols = Math.ceil(geom.width  / cellSize) + 1;
    const rows = Math.ceil(geom.height / cellSize) + 1;

    // Deterministic pseudo-random via position seed
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const seed = (r * 997 + c * 1009) % SYMBOLS.length;
        const showSeed = (r * 1013 + c * 991) % 100;
        if (showSeed / 100 > density) continue;
        const symbol = SYMBOLS[Math.abs(seed) % SYMBOLS.length];
        const x = c * cellSize + cellSize / 2;
        const y = r * cellSize + cellSize / 2;
        ctx.fillText(symbol, x, y);
      }
    }
  }
}

registerPaint('cipher-grid', CipherGridPainter);
