export interface Question {
  id: number
  text: string
  trait: 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'neuroticism'
  options: string[]
}

export const questions: Question[] = [
  // 開放性 (Openness)
  {
    id: 1,
    text: "新しいアイデアや経験に対して、どのように感じますか？",
    trait: "openness",
    options: [
      "新しいことに挑戦するのが大好きで、いつも積極的に取り組んでいる",
      "興味があれば、新しいことにも取り組んでみたい",
      "場合によって、新しいことに取り組むこともある",
      "慣れたやり方を変えたくない",
      "新しいことは避けたい"
    ]
  },
  {
    id: 2,
    text: "芸術や文化的な活動について、どのように感じますか？",
    trait: "openness",
    options: [
      "芸術や文化に深い関心があり、積極的に触れている",
      "芸術作品や文化活動を楽しむことができる",
      "時々興味を持つことがある",
      "特に関心はないが、必要に応じて参加する",
      "芸術や文化活動には全く興味がない"
    ]
  },
  {
    id: 3,
    text: "抽象的な考えや哲学的な議論について、どう思いますか？",
    trait: "openness",
    options: [
      "深い思考や議論を非常に楽しむ",
      "興味深いトピックについては考えを深めたい",
      "時と場合による",
      "具体的な話題の方が好き",
      "抽象的な議論は避けたい"
    ]
  },

  // 誠実性 (Conscientiousness)
  {
    id: 4,
    text: "計画や締め切りに関して、どのように取り組みますか？",
    trait: "conscientiousness",
    options: [
      "常に計画を立て、締め切りより早く終わらせるようにしている",
      "計画を立てて、締め切りは必ず守るようにしている",
      "できるだけ計画的に進めようとしている",
      "締め切りギリギリになることが多い",
      "計画を立てることは苦手で、よく締め切りに遅れる"
    ]
  },
  {
    id: 5,
    text: "整理整頓や清潔さについて、どの程度気を配りますか？",
    trait: "conscientiousness",
    options: [
      "常に完璧な状態を保つように心がけている",
      "定期的に整理整頓を行い、清潔に保っている",
      "ある程度の秩序は保つようにしている",
      "気が向いたときに整理する程度",
      "整理整頓にはあまり関心がない"
    ]
  },
  {
    id: 6,
    text: "目標達成に向けての取り組み方は？",
    trait: "conscientiousness",
    options: [
      "目標を細分化し、着実に実行している",
      "目標を立てて、コツコツと取り組む",
      "目標は立てるが、柔軟に対応する",
      "大まかな方向性だけ決めている",
      "特に目標は立てずに過ごしている"
    ]
  },

  // 外向性 (Extraversion)
  {
    id: 7,
    text: "グループでの活動や社交的な場面で、どのように感じますか？",
    trait: "extraversion",
    options: [
      "人と関わるのが大好きで、いつも積極的に交流している",
      "社交的な場面を楽しむことができる",
      "時と場合によって、社交的になれる",
      "少人数での交流を好む",
      "一人で過ごす時間の方が心地よい"
    ]
  },
  {
    id: 8,
    text: "新しい人との出会いについて、どのように感じますか？",
    trait: "extraversion",
    options: [
      "積極的に新しい出会いを求めている",
      "新しい出会いを楽しむことができる",
      "状況に応じて交流する",
      "知人から紹介された人とは話せる",
      "新しい人との出会いは避けたい"
    ]
  },
  {
    id: 9,
    text: "エネルギーの回復方法について、どちらが当てはまりますか？",
    trait: "extraversion",
    options: [
      "人と話したり活動したりすることでエネルギーが湧く",
      "適度な社交活動で活力が得られる",
      "両方のバランスが必要",
      "一人の時間で少しずつ回復する",
      "完全な一人時間が必要"
    ]
  },

  // 協調性 (Agreeableness)
  {
    id: 10,
    text: "他人との意見の相違に対して、どのように対応しますか？",
    trait: "agreeableness",
    options: [
      "常に相手の立場に立って理解しようとする",
      "できるだけ歩み寄りを試みる",
      "状況に応じて妥協点を探る",
      "自分の意見は主張する",
      "自分の考えを曲げたくない"
    ]
  },
  {
    id: 11,
    text: "他人を助けることについて、どのように考えますか？",
    trait: "agreeableness",
    options: [
      "困っている人を見かけたら、必ず手を差し伸べる",
      "できる範囲で積極的に助ける",
      "状況に応じて協力する",
      "頼まれれば対応する",
      "自分のことで精一杯"
    ]
  },
  {
    id: 12,
    text: "チームでの協力や調和について、どのように考えますか？",
    trait: "agreeableness",
    options: [
      "チームの調和を最も重視する",
      "協力的な関係を大切にする",
      "必要に応じて協力する",
      "個人の成果を重視する",
      "独立して行動したい"
    ]
  },

  // 神経症的傾向 (Neuroticism)
  {
    id: 13,
    text: "ストレスや不安を感じたとき、どのように反応しますか？",
    trait: "neuroticism",
    options: [
      "非常に敏感に反応し、強い不安を感じる",
      "ある程度のストレスを感じる",
      "時と場合による",
      "あまり気にしない",
      "ほとんど影響を受けない"
    ]
  },
  {
    id: 14,
    text: "予期せぬ変化や不確実な状況に対して、どのように感じますか？",
    trait: "neuroticism",
    options: [
      "強い不安や心配を感じる",
      "少し不安になる",
      "状況に応じて対応する",
      "比較的冷静に受け止められる",
      "まったく動揺しない"
    ]
  },
  {
    id: 15,
    text: "自己批判や失敗への対応について、どのように感じますか？",
    trait: "neuroticism",
    options: [
      "失敗を強く気にして、長く悩む",
      "失敗するとそれなりに落ち込む",
      "程度によって異なる",
      "あまり気にせず次に進める",
      "失敗してもほとんど気にならない"
    ]
  }
]

export const traitDescriptions = {
  openness: "開放性",
  conscientiousness: "誠実性",
  extraversion: "外向性",
  agreeableness: "協調性",
  neuroticism: "神経症的傾向"
} 