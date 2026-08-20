import { WebHaptics, type HapticInput } from "web-haptics";

// One shared instance, same pattern as cuelume's shared audio engine.
const haptics = new WebHaptics();

export const trigger = (input?: HapticInput) => haptics.trigger(input);

const PRESS_ATTR = "data-haptic-press";
const TOGGLE_ATTR = "data-haptic-toggle";

function resolve(el: Element, attr: string, fallback: HapticInput): HapticInput {
  return el.getAttribute(attr) || fallback;
}

function findTarget(event: Event, attr: string) {
  if (!(event.target instanceof Element)) return null;
  return event.target.closest(`[${attr}]`);
}

function listen(eventName: string, attr: string, fallback: HapticInput) {
  document.addEventListener(
    eventName,
    (event) => {
      const element = findTarget(event, attr);
      if (!element) return;
      // navigator.vibrate() must run synchronously off the user gesture, so
      // this fires straight from the event handler rather than after an await.
      trigger(resolve(element, attr, fallback));
    },
    true,
  );
}

let bound = false;

export function bindHaptics() {
  if (bound || typeof document === "undefined") return;
  bound = true;
  listen("pointerdown", PRESS_ATTR, "light");
  listen("click", TOGGLE_ATTR, "selection");
}
