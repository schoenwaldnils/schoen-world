import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import Lowlight from 'react-lowlight'

Lowlight.registerLanguage('css', css)
Lowlight.registerLanguage('js', js)
Lowlight.registerLanguage('html', html)
Lowlight.registerLanguage('yaml', yaml)
Lowlight.registerLanguage('react', typescript)

export default Lowlight
