import type { OhangType } from './strings'

export interface SeedMaster {
  id: string
  speciesName: string
  energyCode: OhangType
  rarity: 'normal' | 'rare'
  requiredHours: number
  flowerMeaning: string
}

export const SEEDS: SeedMaster[] = [
  { id: 'b001', speciesName: '새싹풀', energyCode: 'wood', rarity: 'normal', requiredHours: 48, flowerMeaning: '작은 시작의 용기를 담은 풀' },
  { id: 'b002', speciesName: '푸른잎사귀', energyCode: 'wood', rarity: 'normal', requiredHours: 48, flowerMeaning: '꾸준함이 만드는 초록빛 위로' },
  { id: 'b003', speciesName: '별빛대나무', energyCode: 'wood', rarity: 'rare', requiredHours: 96, flowerMeaning: '흔들려도 꺾이지 않는 마음' },
  { id: 'b004', speciesName: '불꽃채송화', energyCode: 'fire', rarity: 'normal', requiredHours: 48, flowerMeaning: '작지만 뜨거운 하루의 열정' },
  { id: 'b005', speciesName: '노을꽃', energyCode: 'fire', rarity: 'normal', requiredHours: 48, flowerMeaning: '하루의 끝을 물들이는 따뜻함' },
  { id: 'b006', speciesName: '태양의정원', energyCode: 'fire', rarity: 'rare', requiredHours: 96, flowerMeaning: '스스로 빛나는 법을 아는 꽃' },
  { id: 'b007', speciesName: '흙빛다육이', energyCode: 'earth', rarity: 'normal', requiredHours: 48, flowerMeaning: '느려도 단단하게 뿌리내리는 마음' },
  { id: 'b008', speciesName: '황금보리', energyCode: 'earth', rarity: 'normal', requiredHours: 48, flowerMeaning: '기다림이 여무는 시간' },
  { id: 'b009', speciesName: '대지의나무', energyCode: 'earth', rarity: 'rare', requiredHours: 96, flowerMeaning: '흔들리지 않는 뿌리 깊은 안정' },
  { id: 'b00a', speciesName: '은빛방울꽃', energyCode: 'metal', rarity: 'normal', requiredHours: 48, flowerMeaning: '맑게 정돈되는 마음의 소리' },
  { id: 'b00b', speciesName: '서리꽃', energyCode: 'metal', rarity: 'normal', requiredHours: 48, flowerMeaning: '차분함 속에 감춘 단단함' },
  { id: 'b00c', speciesName: '달빛백합', energyCode: 'metal', rarity: 'rare', requiredHours: 96, flowerMeaning: '고요함이 만드는 순도 높은 위로' },
  { id: 'b00d', speciesName: '물망초', energyCode: 'water', rarity: 'normal', requiredHours: 48, flowerMeaning: '흘러가도 잊지 않는 다정함' },
  { id: 'b00e', speciesName: '푸른물결꽃', energyCode: 'water', rarity: 'normal', requiredHours: 48, flowerMeaning: '유연하게 흐르는 하루하루' },
  { id: 'b00f', speciesName: '달빛수련', energyCode: 'water', rarity: 'rare', requiredHours: 96, flowerMeaning: '마음이 고요해지는 물의 소리' },
]

export function getSeedById(id: string): SeedMaster | undefined {
  return SEEDS.find((s) => s.id === id)
}

export function pickDailySeed(energyCode: OhangType): SeedMaster {
  const pool = SEEDS.filter((s) => s.energyCode === energyCode)
  const isRare = Math.random() < 0.15
  const rarity = isRare ? 'rare' : 'normal'
  const candidates = pool.filter((s) => s.rarity === rarity)
  return candidates[Math.floor(Math.random() * candidates.length)] ?? pool[0]
}

export const ENERGY_FALLBACK: Record<OhangType, string> = {
  wood: '오늘은 새로운 시작에 힘을 실어주는 날이에요. 작은 씨앗 하나를 심어보세요.',
  fire: '마음속 열정이 따뜻하게 피어오르는 날이에요. 하고 싶었던 일에 손을 내밀어보세요.',
  earth: '차분히 다지고 뿌리내리기 좋은 날이에요. 서두르지 않아도 괜찮아요.',
  metal: '생각이 맑아지고 정돈되는 기운이 흐르는 날이에요. 마음을 가다듬어보세요.',
  water: '고요히 흐르며 스스로를 돌아보기 좋은 날이에요. 오늘 하루도 다정하게 흘러가길.',
}

/** 오늘의 에너지 (목업: 요일 기반 순환) */
export function getTodayEnergy(): OhangType {
  const codes: OhangType[] = ['wood', 'fire', 'earth', 'metal', 'water']
  return codes[new Date().getDay() % 5]
}
