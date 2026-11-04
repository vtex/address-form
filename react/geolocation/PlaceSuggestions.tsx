import React from 'react'

import type { SuggestionItem } from './placesTypes'

const STYLE_ELEMENT_ID = 'vtex-address-form-place-suggestions-styles'

// Defaults close to Google's own .pac-container look. The stylesheet is
// prepended to <head> so merchant CSS for .pac-* keeps taking precedence.
const DEFAULT_STYLES = `
.pac-container{background-color:#fff;border-radius:2px;border-top:1px solid #d9d9d9;font-family:Arial,sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.3);box-sizing:border-box;overflow:hidden}
.pac-container>ul{margin:0;padding:0;list-style:none}
.pac-attribution{padding:2px 6px;border-top:1px solid #e6e6e6;text-align:right;font-family:Roboto,Arial,sans-serif;font-size:11px;line-height:16px;color:#5e5e5e}
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

// Google Maps Platform requires attributing Places data shown outside a
// Google map. The brand name is not translated, so it is not an i18n message.
export const GOOGLE_MAPS_ATTRIBUTION = 'Google Maps'

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
    <div className="pac-container">
      <ul id={id} role="listbox">
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
      <div className="pac-attribution" translate="no">
        {GOOGLE_MAPS_ATTRIBUTION}
      </div>
    </div>
  )
}

export default PlaceSuggestions
