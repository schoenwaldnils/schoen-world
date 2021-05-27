import { Global } from '@emotion/react'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import { FC } from 'react'
import Lowlight from 'react-lowlight'

import { ICodeBlockFields } from '../../@types/generated/contentful'
import { highlightJs } from './highlight-js'

Lowlight.registerLanguage('css', css)
Lowlight.registerLanguage('js', js)
Lowlight.registerLanguage('html', html)
Lowlight.registerLanguage('yaml', yaml)
Lowlight.registerLanguage('react', typescript)

export const CodeBlock: FC<ICodeBlockFields> = ({ syntax, code }) => {
  return (
    <>
      <Global styles={highlightJs} />
      <Lowlight language={syntax} value={code} />
    </>
  )
}
