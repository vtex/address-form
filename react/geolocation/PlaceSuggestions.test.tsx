import React from 'react'
import { render, screen, fireEvent } from 'test-utils'

import PlaceSuggestions from './PlaceSuggestions'
import type { SuggestionItem } from './placesTypes'

function createItem(id: string, mainText: string, secondaryText = '') {
  return {
    id,
    mainText,
    secondaryText,
    prediction: { placeId: id, toPlace: jest.fn() },
  } as SuggestionItem
}

const items = [
  createItem('p1', 'Rua A', 'Rio de Janeiro'),
  createItem('p2', 'Rua B'),
]

describe('PlaceSuggestions', () => {
  it('renders nothing when there are no items', () => {
    const { container } = render(
      <PlaceSuggestions
        id="list"
        items={[]}
        activeIndex={-1}
        onSelect={jest.fn()}
        onHover={jest.fn()}
      />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders a listbox with .pac-container and .pac-item options', () => {
    render(
      <PlaceSuggestions
        id="list"
        items={items}
        activeIndex={1}
        onSelect={jest.fn()}
        onHover={jest.fn()}
      />
    )

    const listbox = screen.getByRole('listbox')
    const options = screen.getAllByRole('option')

    expect(listbox).toHaveAttribute('id', 'list')
    expect(listbox.parentElement).toHaveClass('pac-container')
    expect(options).toHaveLength(2)
    expect(options[0]).toHaveClass('pac-item')
    expect(options[0]).toHaveAttribute('id', 'list-option-0')
    expect(options[0]).toHaveAttribute('aria-selected', 'false')
    expect(options[0]).toHaveTextContent('Rua ARio de Janeiro')
    expect(options[1]).toHaveClass('pac-item', 'pac-item-selected')
    expect(options[1]).toHaveAttribute('aria-selected', 'true')
  })

  it('shows the Google Maps attribution outside the listbox', () => {
    const { container } = render(
      <PlaceSuggestions
        id="list"
        items={items}
        activeIndex={-1}
        onSelect={jest.fn()}
        onHover={jest.fn()}
      />
    )

    const attribution = screen.getByText('Google Maps')
    const listbox = screen.getByRole('listbox')

    expect(attribution).toHaveClass('pac-attribution')
    expect(attribution).toHaveAttribute('translate', 'no')
    expect(container.querySelector('.pac-container')).toContainElement(
      attribution
    )
    expect(listbox).not.toContainElement(attribution)
    expect(container.querySelector('.pac-container')?.lastChild).toBe(
      attribution
    )
  })

  it('selects on mousedown and reports hover', () => {
    const onSelect = jest.fn()
    const onHover = jest.fn()

    render(
      <PlaceSuggestions
        id="list"
        items={items}
        activeIndex={-1}
        onSelect={onSelect}
        onHover={onHover}
      />
    )

    const [first, second] = screen.getAllByRole('option')

    fireEvent.mouseEnter(second)
    expect(onHover).toHaveBeenCalledWith(1)

    const notPrevented = fireEvent.mouseDown(first)

    expect(notPrevented).toBe(false)
    expect(onSelect).toHaveBeenCalledWith(items[0])
  })

  it('injects the default styles once, before other stylesheets', () => {
    const merchantStyle = document.createElement('style')

    document.head.appendChild(merchantStyle)

    const props = {
      id: 'list',
      items,
      activeIndex: -1,
      onSelect: jest.fn(),
      onHover: jest.fn(),
    }

    render(<PlaceSuggestions {...props} />)
    render(<PlaceSuggestions {...props} />)

    const injected = document.querySelectorAll(
      '#vtex-address-form-place-suggestions-styles'
    )

    expect(injected).toHaveLength(1)
    expect(document.head.firstChild).toBe(injected[0])
  })
})
