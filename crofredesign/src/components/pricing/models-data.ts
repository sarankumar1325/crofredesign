export type Badge = 'vision' | 'beta' | 'lightning'

export interface Model {
  id: string
  lab: 'deepseek' | 'kimi' | 'qwen' | 'glm' | 'gemma' | 'others'
  name: string
  quant: string
  context: string
  badges: Badge[]
  input: string
  cache: string
  output: string
  speed: string
  maxOutput: string
  multiplier?: string
}

export const models: Model[] = [
  // DeepSeek (5)
  { id: 'ds-v3', lab: 'deepseek', name: 'deepseek/deepseek-v3', quant: 'FP8', context: '128K', badges: ['lightning'], input: '$0.14', cache: '$0.07', output: '$0.28', speed: '~237 t/s', maxOutput: '8K', multiplier: '10x' },
  { id: 'ds-r1', lab: 'deepseek', name: 'deepseek/deepseek-r1', quant: 'FP8', context: '128K', badges: ['beta'], input: '$0.55', cache: '$0.14', output: '$2.19', speed: '~180 t/s', maxOutput: '32K', multiplier: '3x' },
  { id: 'ds-chat', lab: 'deepseek', name: 'deepseek/deepseek-chat', quant: 'Q4', context: '64K', badges: [], input: '$0.07', cache: '$0.035', output: '$0.14', speed: '~280 t/s', maxOutput: '4K' },
  { id: 'ds-v2', lab: 'deepseek', name: 'deepseek/deepseek-v2.5', quant: 'FP16', context: '128K', badges: ['vision'], input: '$0.18', cache: '$0.09', output: '$0.36', speed: '~200 t/s', maxOutput: '8K' },
  { id: 'ds-coder', lab: 'deepseek', name: 'deepseek/deepseek-coder-v2', quant: 'Q8', context: '128K', badges: ['lightning'], input: '$0.10', cache: '$0.05', output: '$0.20', speed: '~260 t/s', maxOutput: '8K', multiplier: '0.5x' },

  // Kimi (4)
  { id: 'kimi-k1', lab: 'kimi', name: 'kimi/kimi-k1.5', quant: 'FP8', context: '128K', badges: ['vision', 'beta'], input: '$0.40', cache: '$0.10', output: '$1.60', speed: '~145 t/s', maxOutput: '32K', multiplier: '3x' },
  { id: 'kimi-vl', lab: 'kimi', name: 'kimi/kimi-vl-a3b', quant: 'Q4', context: '64K', badges: ['vision'], input: '$0.12', cache: '$0.06', output: '$0.24', speed: '~220 t/s', maxOutput: '8K' },
  { id: 'kimi-moonshot', lab: 'kimi', name: 'kimi/moonshot-v1-8k', quant: 'FP8', context: '8K', badges: [], input: '$0.24', cache: '$0.12', output: '$0.48', speed: '~190 t/s', maxOutput: '4K' },
  { id: 'kimi-32k', lab: 'kimi', name: 'kimi/moonshot-v1-32k', quant: 'FP8', context: '32K', badges: [], input: '$0.36', cache: '$0.18', output: '$0.72', speed: '~165 t/s', maxOutput: '8K' },

  // Qwen (3)
  { id: 'qwen-max', lab: 'qwen', name: 'qwen/qwen2.5-72b-instruct', quant: 'FP8', context: '128K', badges: ['lightning'], input: '$0.18', cache: '$0.045', output: '$0.36', speed: '~245 t/s', maxOutput: '8K', multiplier: '0.75x' },
  { id: 'qwen-vl', lab: 'qwen', name: 'qwen/qwen2-vl-72b', quant: 'FP8', context: '32K', badges: ['vision'], input: '$0.22', cache: '$0.11', output: '$0.44', speed: '~210 t/s', maxOutput: '4K' },
  { id: 'qwen-coder', lab: 'qwen', name: 'qwen/qwen2.5-coder-32b', quant: 'Q8', context: '32K', badges: ['lightning'], input: '$0.09', cache: '$0.045', output: '$0.18', speed: '~270 t/s', maxOutput: '8K' },

  // GLM (5)
  { id: 'glm-4', lab: 'glm', name: 'glm/glm-4-9b', quant: 'Q4', context: '128K', badges: [], input: '$0.06', cache: '$0.03', output: '$0.12', speed: '~290 t/s', maxOutput: '4K', multiplier: '10x' },
  { id: 'glm-4-flash', lab: 'glm', name: 'glm/glm-4-flash', quant: 'FP8', context: '128K', badges: ['lightning'], input: '$0.05', cache: '$0.025', output: '$0.10', speed: '~320 t/s', maxOutput: '8K' },
  { id: 'glm-4-long', lab: 'glm', name: 'glm/glm-4-long', quant: 'FP8', context: '1M', badges: ['beta'], input: '$0.15', cache: '$0.075', output: '$0.30', speed: '~160 t/s', maxOutput: '32K' },
  { id: 'glm-z1', lab: 'glm', name: 'glm/glm-z1-rumination', quant: 'Q8', context: '128K', badges: ['vision'], input: '$0.30', cache: '$0.15', output: '$0.60', speed: '~175 t/s', maxOutput: '8K' },
  { id: 'glm-4v', lab: 'glm', name: 'glm/glm-4v-plus', quant: 'FP16', context: '64K', badges: ['vision'], input: '$0.20', cache: '$0.10', output: '$0.40', speed: '~200 t/s', maxOutput: '4K' },

  // Gemma (1)
  { id: 'gemma-27', lab: 'gemma', name: 'gemma/gemma-3-27b-it', quant: 'FP8', context: '128K', badges: ['vision'], input: '$0.14', cache: '$0.07', output: '$0.28', speed: '~230 t/s', maxOutput: '8K', multiplier: '3x' },

  // Others (7): MiniMax, MIMO, Greg variants
  { id: 'minimax-text', lab: 'others', name: 'minimax/minimax-text-01', quant: 'FP8', context: '1M', badges: ['beta'], input: '$0.25', cache: '$0.125', output: '$0.50', speed: '~150 t/s', maxOutput: '32K' },
  { id: 'minimax-vl', lab: 'others', name: 'minimax/minimax-vl-01', quant: 'FP8', context: '512K', badges: ['vision', 'beta'], input: '$0.35', cache: '$0.175', output: '$0.70', speed: '~130 t/s', maxOutput: '16K' },
  { id: 'mimo-7', lab: 'others', name: 'mimo/mimo-7b', quant: 'Q4', context: '32K', badges: ['lightning'], input: '$0.04', cache: '$0.02', output: '$0.08', speed: '~380 t/s', maxOutput: '4K', multiplier: '0.5x' },
  { id: 'mimo-72', lab: 'others', name: 'mimo/mimo-72b', quant: 'Q4', context: '64K', badges: ['lightning'], input: '$0.08', cache: '$0.04', output: '$0.16', speed: '~310 t/s', maxOutput: '8K' },
  { id: 'greg-v1', lab: 'others', name: 'greg/greg-alpha-v1', quant: 'FP8', context: '32K', badges: ['beta'], input: '$0.50', cache: '$0.25', output: '$1.00', speed: '~120 t/s', maxOutput: '16K', multiplier: '3x' },
  { id: 'greg-v2', lab: 'others', name: 'greg/greg-alpha-v2', quant: 'FP8', context: '64K', badges: ['beta'], input: '$0.80', cache: '$0.40', output: '$1.60', speed: '~110 t/s', maxOutput: '32K' },
  { id: 'greg-mini', lab: 'others', name: 'greg/greg-mini', quant: 'Q4', context: '16K', badges: ['lightning'], input: '$0.03', cache: '$0.015', output: '$0.06', speed: '~420 t/s', maxOutput: '4K', multiplier: '0.5x' },
]
