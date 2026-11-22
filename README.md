# herdr-mod-nvim

A Herdr.app mod that puts [Neovim](https://neovim.io) one key away.

## Hotkey

**Cmd+E** shows the current space's nvim, changing tab if needed. If there isn't one, it opens nvim in a new tab named "nvim". Pressed again in the nvim tab, it goes back to the tab you came from.

## Install

1. Link the mod into Herdr:

   ```sh
   ln -s "$PWD/mod" ~/.config/herdr-app/mods/nvim
   ```

2. Bind the key in `~/.config/herdr-app/keys.json`, under `global`:

   ```json
   "cmd-e": "mod.open:nvim"
   ```

## How it works

Herdr keys can only run commands, so the key opens this mod as an invisible 1×1 popup. The mod looks for an nvim pane in the active space's tabs and focuses it or opens a new tab, remembering the tab you were on. From the nvim tab it switches back to that tab instead. Then it closes itself.
