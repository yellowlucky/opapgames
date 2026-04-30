# OPAP Live Results Dashboard

A live browser dashboard for displaying recent OPAP draw results in a TV-friendly layout.

## Live Demo

[https://yellowlucky.github.io/opapgames/](https://yellowlucky.github.io/opapgames/)

## Supported Games

- Joker
- Lotto
- Proto
- Kino
- Super 3
- Extra 5

## Features

- Live draw data from the OPAP API
- Animated number updates for selected games
- TV / Chromecast-friendly layout
- Local image assets for game headers and branding
- Styled result tables and countdown timers
- Kino winner badges with adaptive display logic
- Super 3 color handling and animated ball updates

## Project Structure

- `index.html` - main dashboard layout
- `style.css` - styling and TV-friendly responsive rules
- `app.js` - shared helpers, polling and countdown logic
- `joker.js` - Joker rendering
- `lotto.js` - Lotto rendering
- `proto.js` - Proto rendering
- `kino.js` - Kino rendering and winner badge logic
- `super3.js` - Super 3 rendering and color handling
- `extra5.js` - Extra 5 rendering
- `img/` - local logos and header assets

## Deployment

This project is published with GitHub Pages:

[https://yellowlucky.github.io/opapgames/](https://yellowlucky.github.io/opapgames/)

## Notes

- The dashboard is designed mainly for desktop and TV viewing.
- For smoother animations during Chromecast use, it is recommended to keep the dashboard tab active in its own browser window.
- Live data depends on the availability of the OPAP API.

## License

This repository uses the Apache-2.0 license included in the project.
