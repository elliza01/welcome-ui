import React, { useState } from 'react'
import PropTypes from 'prop-types'
import 'easymde/dist/easymde.min.css'

import { createEvent } from '../../utils/events'

import { StyledMarkdownEditor, StyledSimpleMDE } from './styles'

export const MarkdownEditor = props => {
  const {
    autoFocus,
    showIcons = [],
    hideIcons = [],
    toolbar,
    placeholder,
    variant,
    disabled,
    onBlur,
    onFocus,
    onChange,
    value
  } = props

  const [focused, setFocused] = useState(autoFocus || false)

  const handleFocus = () => {
    onFocus && onFocus()
    setFocused(true)
  }

  const handleBlur = () => {
    onBlur && onBlur()
    setFocused(false)
  }

  const handleChange = () => {
    const event = createEvent({ name, value })
    onChange && onChange(event)
  }

  return (
    <StyledMarkdownEditor disabled={disabled} focused={focused} variant={variant}>
      <StyledSimpleMDE
        className="simple-md-editor-wrapper"
        events={{ blur: handleBlur, focus: handleFocus }}
        extraKeys={{
          Tab: false // Prevent tab from indenting (and creating code block)
        }}
        onChange={handleChange}
        options={{
          autofocus: autoFocus,
          placeholder,
          toolbar,
          tabSize: 4,
          spellChecker: false,
          showIcons,
          hideIcons: [...hideIcons, 'image', 'heading', 'fullscreen', 'side-by-side']
        }}
      />
    </StyledMarkdownEditor>
  )
}

MarkdownEditor.propTypes = {
  autoFocus: PropTypes.func,
  disabled: PropTypes.bool,
  hideIcons: PropTypes.arrayOf(PropTypes.string),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  showIcons: PropTypes.arrayOf(PropTypes.string),
  toolbar: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  variant: PropTypes.oneOf(['warning', 'info', 'error'])
}
