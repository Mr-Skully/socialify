import { Pattern, Theme } from './types/configType'
import {
  signal,
  charlieBrown,
  formalInvitation,
  plus,
  circuitBoard,
  overlappingHexagons,
  brickWall,
  floatingCogs,
  diagonalStripes
} from 'hero-patterns'

const getDevIconClassName = (language: string, theme: Theme): string => {
  const LANGUAGE_ICON_MAPPING: { [key: string]: string } = {
    C: 'c-plain',
    'C#': 'csharp-plain',
    'C++': 'cplusplus-plain',
    CoffeeScript: 'coffeescript-original',
    CSS: 'css3-plain',
    Dockerfile: 'docker-plain',
    Go: 'go-plain',
    Groovy: 'groovy-plain',
    Haskell: 'haskell-plain',
    HTML: 'html5-plain',
    Java: 'java-plain',
    JavaScript: 'javascript-plain',
    'Jupyter Notebook': 'python-plain',
    Kotlin: 'kotlin-plain',
    PHP: 'php-plain',
    Python: 'python-plain',
    Ruby: 'ruby-plain',
    Rust: 'rust-plain',
    Scala: 'scala-plain',
    Script: 'bash-plain',
    Swift: 'swift-plain',
    TypeScript: 'typescript-plain',
    GitHub: 'github-original',
    DevIcon: 'devicon-plain'
  }

  return `devicon-${LANGUAGE_ICON_MAPPING[language] || 'devicon-plain'} ${
    theme === Theme.light ? 'colored' : ''
  }`
}

const getHeroPattern = (pattern: Pattern, theme: Theme): string => {
  const PATTERN_FUNCTIONS_MAPPING: { [key: string]: any } = {
    [Pattern.signal]: signal,
    [Pattern.charlieBrown]: charlieBrown,
    [Pattern.formalInvitation]: formalInvitation,
    [Pattern.plus]: plus,
    [Pattern.circuitBoard]: circuitBoard,
    [Pattern.overlappingHexagons]: overlappingHexagons,
    [Pattern.brickWall]: brickWall,
    [Pattern.floatingCogs]: floatingCogs,
    [Pattern.diagonalStripes]: diagonalStripes
  }
  const patternFunction = PATTERN_FUNCTIONS_MAPPING[pattern]

  if (!patternFunction) return theme === Theme.dark ? '#000' : '#fff'

  const darkThemeArgs = ['#eaeaea', 0.2]
  const lightThemeArgs = ['#eaeaea', 0.6]
  return patternFunction.apply(
    null,
    theme === Theme.dark ? darkThemeArgs : lightThemeArgs
  )
}

let webpSupport: boolean | undefined
const checkWebpSupport = (): boolean => {
  if (webpSupport !== undefined) {
    return webpSupport
  }

  webpSupport = (() => {
    try {
      const canvas = document.createElement('canvas')
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    } catch (e) {
      return false
    }
  })()

  return webpSupport
}

const HOST_PREFIX = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.PROJECT_URL || ''

export { getDevIconClassName, getHeroPattern, checkWebpSupport, HOST_PREFIX }
