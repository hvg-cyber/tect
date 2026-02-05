/*

VS Code blocks the following features:
(1) Pinch zoom
(2) Panning
(3) History navigation via swipe guestures

History navigation can be blocked
by setting 'overscroll-behavior: none;' on html.
However VS Code sets 'overscroll-behavior: none;' on div.monaco-workbench,
which doesn't seem to work in an isolated example program.

Panning is possible only when zoom is greater than 1.
So only pinch zoom needs to be disabled.



*/