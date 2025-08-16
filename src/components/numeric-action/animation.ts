import { type Accessor, onCleanup, onMount } from "solid-js"

const diceAnimation = (element: HTMLElement) => {
    let currentAngle = 0

    if (!document.getElementById("dice-animation-keyframes")) {
        const style = document.createElement("style")
        style.id = "dice-animation-keyframes"
        style.textContent = `
            @keyframes dice-rotate {
                from { transform: translateY(0px) rotate(var(--start)); }
                50%  { transform: translateY(-12px) rotate(var(--mid)); }
                to   { transform: translateY(0px) rotate(var(--end)); }
            }
        `
        document.head.appendChild(style)
    }

    const clickHandler = () => {
        const startAngle = `${currentAngle}deg`
        const midAngle = `${currentAngle - 60}deg`
        const endAngle = `${currentAngle - 120}deg`

        currentAngle -= 120

        if (currentAngle <= -360) currentAngle = 0

        element.style.setProperty("--start", startAngle)
        element.style.setProperty("--mid", midAngle)
        element.style.setProperty("--end", endAngle)

        element.style.animation = "none"
        void element.offsetWidth
        element.style.animation = `dice-rotate 260ms linear forwards`
    }

    element.addEventListener("click", clickHandler)

    return () => {
        element.removeEventListener("click", clickHandler)
        const style = document.getElementById("dice-animation-keyframes")
        style?.remove()
    }
}

export const useAnimation = (
    element: Accessor<HTMLElement | undefined>,
    mode?: "dice"
) => {
    onMount(() => {
        if (!element()) return

        let lastCleanup: () => void = () => { }

        if (mode === "dice") {
            lastCleanup = diceAnimation(element()!)
        }

        onCleanup(() => {
            lastCleanup()
        })
    })
}
