import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FC } from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa'

import { colors } from '../../data/colors'
import { timings } from '../../data/config'

const Button = styled.a`
  position: relative;
  display: block;
  width: 1em;
  height: 1em;
  font-size: 2.5rem;
  color: ${colors.socialIconColor};
  border-radius: 50%;
  box-shadow: inset 0 0 0.3em #000;
`

const common = css`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 0.5em;
  border-radius: 50%;
  transition: transform ${timings.animation}ms;
  backface-visibility: hidden;
`

const Front = styled.div<{ color?: string }>`
  ${common}
  color: ${(p) => (p.color ? colors.white : colors.black)};
  background-color: ${(p) => p.color || colors.white};
  transform: rotateY(180deg);

  ${Button}:hover & {
    transform: rotateY(0deg);
  }
`

const Back = styled.div`
  ${common}
  background-color: ${colors.socialIconBackground};
  transform: rotateY(0deg);

  ${Button}:hover & {
    transform: rotateY(180deg);
  }
`

const icons = {
  Twitter: FaTwitter,
  Github: FaGithub,
}

const socialColors = {
  Twitter: colors.twitter,
}

export const SocialIcon: FC<{ name: string; href: string }> = ({
  name,
  href,
}) => {
  let Icon = null
  let color = null

  if (name in icons) {
    Icon = icons[name]
  }

  if (name in socialColors) {
    color = socialColors[name]
  }

  if (!Icon) return null

  return (
    <Button
      href={href}
      target="_blank"
      title={`Show ${name}-profile`}
      rel="noopener noreferrer"
    >
      <Front color={color}>
        <Icon />
      </Front>
      <Back>
        <Icon />
      </Back>
    </Button>
  )
}

export default SocialIcon
