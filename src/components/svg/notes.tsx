import { createUniqueId } from "solid-js"

export const NotesSVG = () => {
    const maskId = createUniqueId()

    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <mask id={maskId} fill="white">
                <rect x="4" y="3" width="23.6667" height="26.625" rx="1.47917" />
            </mask>
            <rect
                x="4"
                y="3"
                width="23.6667"
                height="26.625"
                rx="1.47917"
                stroke="var(--color-milk-2)"
                stroke-width="4.4375"
                mask={`url(#${maskId})`}
                class="stroke-color"
            />
            <line
                x1="8.4375"
                y1="9.65623"
                x2="21.75"
                y2="9.65623"
                stroke="var(--color-milk-2)"
                stroke-width="1.47917"
                class="stroke-color"
            />
            <line
                x1="8.4375"
                y1="12.6146"
                x2="21.75"
                y2="12.6146"
                stroke="var(--color-milk-2)"
                stroke-width="1.47917"
                class="stroke-color"
            />
            <line
                x1="8.4375"
                y1="15.5729"
                x2="17.3125"
                y2="15.5729"
                stroke="var(--color-milk-2)"
                stroke-width="1.47917"
                class="stroke-color"
            />
        </svg>
    )
}
