import styled from '@emotion/styled'
import {
  FormControl,
  Input as MaterialInput,
  InputAdornment,
  InputLabel,
  OutlinedTextFieldProps,
  TextField,
} from '@material-ui/core'
import { FC, forwardRef, ReactNode } from 'react'

import { materialUiInputStyles } from '../materialUiInputStyles'

const styledIcon = (Icon) => styled(Icon)`
  color: currentColor;
`

const StyledFormControl = styled(FormControl)<{ secondary?: boolean }>`
  ${(p) => materialUiInputStyles(p.secondary)}
`

const StyledTextField = styled(TextField)<{ secondary?: boolean }>`
  ${(p) => materialUiInputStyles(p.secondary)}
`

export const Input: FC<
  Omit<OutlinedTextFieldProps, 'variant'> & {
    id?: string
    Icon?: ReactNode
    secondary?: boolean
  }
> = forwardRef(
  (
    {
      id,
      label,
      type,
      Icon,
      secondary = false,
      size = 'small',
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const StyledIcon = Icon ? styledIcon(Icon) : () => null

    if (Icon && id) {
      return (
        <StyledFormControl
          size={size}
          fullWidth
          secondary={secondary || undefined}
        >
          <InputLabel htmlFor={id}>{label}</InputLabel>
          <MaterialInput
            ref={ref}
            className={className}
            id={id}
            type={type}
            fullWidth
            disabled={disabled}
            endAdornment={
              <InputAdornment position="end">
                <StyledIcon />
              </InputAdornment>
            }
          />
        </StyledFormControl>
      )
    }

    return (
      <StyledTextField
        ref={ref}
        className={className}
        label={label}
        type={type}
        disabled={disabled}
        {...props}
        size={size}
        fullWidth
        secondary={secondary || undefined}
      />
    )
  },
)

Input.displayName = 'Input'
