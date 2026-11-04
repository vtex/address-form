import React from 'react'

import type { SuggestionItem } from './placesTypes'

const STYLE_ELEMENT_ID = 'vtex-address-form-place-suggestions-styles'

// Defaults close to Google's own .pac-container look. The stylesheet is
// prepended to <head> so merchant CSS for .pac-* keeps taking precedence.
const DEFAULT_STYLES = `
.pac-container{background-color:#fff;border-radius:2px;border-top:1px solid #d9d9d9;font-family:Arial,sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.3);box-sizing:border-box;overflow:hidden;margin:0;padding:0;list-style:none}
.pac-item{cursor:default;padding:0 4px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;line-height:30px;text-align:left;border-top:1px solid #e6e6e6;font-size:11px;color:#515151}
.pac-item:first-child{border-top:0}
.pac-item:hover{background-color:#fafafa}
.pac-item-selected,.pac-item-selected:hover{background-color:#ebf2fe}
.pac-item-query{font-size:13px;padding-right:3px;color:#000}
`

export function ensureSuggestionStyles() {
  if (typeof document === 'undefined') {
    return
  }

  if (document.getElementById(STYLE_ELEMENT_ID)) {
    return
  }

  const style = document.createElement('style')

  style.id = STYLE_ELEMENT_ID
  style.textContent = DEFAULT_STYLES
  document.head.insertBefore(style, document.head.firstChild)
}

export function getOptionId(listboxId: string, index: number) {
  return `${listboxId}-option-${index}`
}

interface PlaceSuggestionsProps {
  id: string
  items: SuggestionItem[]
  activeIndex: number
  onSelect: (item: SuggestionItem) => void
  onHover: (index: number) => void
}

function PlaceSuggestions({
  id,
  items,
  activeIndex,
  onSelect,
  onHover,
}: PlaceSuggestionsProps) {
  if (!items.length) {
    return null
  }

  ensureSuggestionStyles()

  return (
    <ul id={id} role="listbox" className="pac-container">
      {items.map((item, index) => {
        const isActive = index === activeIndex

        return (
          <li
            key={item.id}
            id={getOptionId(id, index)}
            role="option"
            aria-selected={isActive}
            className={isActive ? 'pac-item pac-item-selected' : 'pac-item'}
            // mousedown + preventDefault keeps focus on the input, so the
            // input blur does not close the list before the selection.
            onMouseDown={(event) => {
              event.preventDefault()
              onSelect(item)
            }}
            onMouseEnter={() => onHover(index)}
          >
            <span className="pac-item-query">{item.mainText}</span>
            {item.secondaryText ? <span>{item.secondaryText}</span> : null}
          </li>
        )
      })}
    </ul>
  )
}

export default PlaceSuggestions
