import Parser from 'html-react-parser'
import { FC } from 'react'

import faviconData from './faviconData.json'

const faviconHtml = faviconData && faviconData.favicon.html_code
export const Favicons: FC = () => <>{Parser(faviconHtml)}</>
