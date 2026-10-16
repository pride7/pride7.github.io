export type Project = {
  id: string
  name: string
  kind: string
  icon: string
  summary: string
  description: string
  features: string[]
  links: { label: string; url: string }[]
}

export const projects: Project[] = [
  {
    id: 'frameseq',
    name: 'FrameSeq',
    kind: '演示工具',
    icon: 'fa6-solid:clapperboard',
    summary: '像做 PPT 一样编辑幻灯片，也能用代码和 AI 创作。',
    description:
      '一款可视化幻灯片编辑器。可以拖拽排版、插入公式与图表，也能让 AI 帮忙修改；每一页都有可读的代码，支持导出可编辑的 PowerPoint、PDF 和网页。',
    features: ['可视化编辑', 'AI 辅助', '多格式导出'],
    links: [
      { label: '访问官网', url: 'https://pride7.github.io/frameseq/zh/' },
      { label: 'GitHub', url: 'https://github.com/pride7/frameseq' },
    ],
  },
  {
    id: 'verso',
    name: 'Verso · 页',
    kind: '笔记软件',
    icon: 'fa6-solid:book-open',
    summary: '本地优先的 Markdown 笔记，写公式、整理想法，也能用 Git 同步。',
    description:
      '笔记就是硬盘上的普通 Markdown 文件，随时可以用其他编辑器打开。支持公式快捷输入、思维导图、笔记整理与 Git 同步，把写作体验和数据自主权放在一起。',
    features: ['本地 Markdown', '公式输入', 'Git 同步'],
    links: [
      { label: '下载软件', url: 'https://github.com/pride7/verso/releases/latest' },
      { label: 'GitHub', url: 'https://github.com/pride7/verso' },
    ],
  },
  {
    id: 'windward-tales',
    name: '风行物语',
    kind: '独立游戏',
    icon: 'fa6-solid:gamepad',
    summary: '一人一程，自在生长。策略战斗、角色养成与自由探索。',
    description:
      '一款单主角养成 RPG。围绕自己的角色展开冒险，在探索和策略战斗中逐步成长。打开网页即可进入游戏，也可以选择游客身份开始自己的旅程。',
    features: ['策略战斗', '角色养成', '网页游玩'],
    links: [{ label: '开始冒险', url: 'https://wwtales.cn/' }],
  },
]
