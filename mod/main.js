// cmd-e : from another tab, show this space's nvim pane (or open one in a new
// "nvim" tab); from the nvim tab, go back to the tab it came from.
// Opened as an invisible 1x1 popup (mod.open:nvim) that acts and closes at once.

import { View, div } from "gpui-kit";
import { run, props, closeOverlay, spaces, panes, shared, setShared } from "herdr";

const BACK = "nvim.back";
const isNvim = (p) => p.terminal && p.program?.key === "nvim";

export default class Nvim extends View {
  init() {
    try {
      const space = spaces().find((s) => s.active);
      if (!space) return;
      const tab = space.tabs.find((t) => t.active);
      const found = panes()
        .filter((p) => space.tabs.some((t) => t.id === p.tab) && isNvim(p))
        .sort((a, b) => Number(b.tab === tab?.id) - Number(a.tab === tab?.id))[0];
      const back = { ...(shared(BACK) ?? {}) };
      if (found && found.tab === tab?.id && (tab.panes === 1 || found.focused)) {
        const prev = back[space.id];
        if (prev && space.tabs.some((t) => t.id === prev && t.id !== tab.id))
          run("tab.select", { id: prev });
        return;
      }
      if (tab) setShared(BACK, { ...back, [space.id]: tab.id });
      if (found) {
        if (found.tab !== tab?.id) run("tab.select", { id: found.tab });
        run("pane.focus", { pane: found.pane });
      } else {
        run("tab.new", { name: "nvim", argv: ["nvim"] });
      }
    } finally {
      const id = props()?.overlay;
      if (id) closeOverlay(id);
    }
  }

  render() {
    return div();
  }
}
