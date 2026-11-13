/** Endless horizontal scroller (pure CSS). Pauses on hover and with Motion off. */
export default function Marquee({ children, reverse = false, speed = 40 }) {
    return (
        <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            <div
                className="marquee-track flex w-max gap-4 group-hover:[animation-play-state:paused]"
                style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
            >
                <div className="flex shrink-0 gap-4">{children}</div>
                <div className="flex shrink-0 gap-4" aria-hidden="true">{children}</div>
            </div>
        </div>
    );
}
