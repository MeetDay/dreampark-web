import React from 'react';
import { TextElement, ImageElement, BigImageElement } from '../components';

export function convertElementsToComponet(elements) {
    if (elements === undefined || elements === null) return
    if (Array.isArray(elements)) {
        return elements.map(mappedElement)
    }
    return mappedElement(elements)
}

function mappedElement(element) {
    const { id, content } = element
    let mappedElement = null
    if (content.type === 'text') {
        mappedElement = <TextElement key={id} text={content.media.plain_text} />
    } else if (content.type === 'image' && content.media.caption && content.media.caption.length > 0) {
        mappedElement = <BigImageElement key={id} src={content.media.name} captionText={content.media.caption} />
    } else if (content.type === 'image') {
        mappedElement = <ImageElement key={id} src={content.media.name} />
    }
    return mappedElement
}
