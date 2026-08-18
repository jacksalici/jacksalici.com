---
title: "Contour Lines Generator"
pubDate: 2026-08-18
slug: "contour-lines-generator"
description: "A pure JavaScript generator of parametric contour lines, exported as beautiful images."
news: Contour Lines Generator is an app to make parametric line art, now online.
cover: "/uploads/contours.png"
categories: ["coding"]
activities: ["coding-web-apps"]
stack: ["JavaScript", "SVG"]
playground:
  link: "https://contours.jacksalici.com"
  tagline: "Drag a few points, watch a coastline appear. Then take the picture home."
  emoji: "🗺️"
cta:
  - { url: "https://contours.jacksalici.com", label: "Open the generator" }
  - { url: "https://github.com/jacksalici/ContourLinesGenerator/", label: "Source code" }
gallery:
  - src: "/uploads/contour-lines-generator/contours1.png"
    alt: "Contour example 1"
  - src: "/uploads/contour-lines-generator/contours2.png"
    alt: "Contour example 2"
  - src: "/uploads/contour-lines-generator/contours3.png"
    alt: "Contour example 3"
  - src: "/uploads/contour-lines-generator/contours4.png"
    alt: "Contour example 4"
---

This is something I had wanted to make for a long time. There is a particular kind of beauty in seeing art come out of mathematics: a few numbers, an interpolation rule, and suddenly the screen shows something that looks like a coastline or a mountain ridge. I started sketching this years ago and never finished it, but agentic coding finally let me close the gap between the idea and a working tool, and the results are honestly brilliant. It is [pure JavaScript](https://github.com/jacksalici/ContourLinesGenerator/), no framework and no build step, entirely open source, and you can [try it in the browser](https://contours.jacksalici.com).

The purpose of this project is to generate **parametric [contour lines](https://en.wikipedia.org/wiki/Contour_line)** and export them as beautiful images.

## How it works

Contour lines are [level sets](https://en.wikipedia.org/wiki/Level_set) of a continuous height function
`h(x, y)`. The user only supplies a handful of scattered samples of that surface, so the pipeline reconstructs it first and slices it second:

1. **Control points** `(x, y, z)`: the scattered data, placed and dragged on the canvas, in normalised
   `[0,1]²` coordinates. Everything downstream is derived from them, so the whole image is one small
   parameter set, and it fits in a URL.
2. **Scalar field**: `h` is evaluated on a regular grid of `resolution²` samples by
   [scattered-data interpolation](https://en.wikipedia.org/wiki/Multivariate_interpolation#Irregular_grid_(scattered_data)):
   either [inverse distance weighting](https://en.wikipedia.org/wiki/Inverse_distance_weighting) or
   [gaussian radial basis functions](https://en.wikipedia.org/wiki/Radial_basis_function).
    - *Additive
   bumps* sums the gaussians, so overlapping points build ridges. It's the most terrain-like of the three;
    - *inverse distance* and *gaussian blend* average instead, so the field never exceeds the highest control
   point. Optional [fBm noise](https://en.wikipedia.org/wiki/Fractional_Brownian_motion) roughens the
   surface, and a [smoothstep](https://en.wikipedia.org/wiki/Smoothstep) border mask fades it to zero near
   the frame so contours close into islands instead of being clipped: `radial` gives an oval landmass,
   `frame` gives rings parallel to the border, `none` lets lines run off the edge. The result is rescaled
   to `[0,1]`.
3. **Marching squares**: [the algorithm](https://en.wikipedia.org/wiki/Marching_squares) classifies each
   cell's four corners as above or below the level; the 16 possible configurations say which cell edges
   the contour crosses, and
   [linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation) between corner values places
   the crossing along the edge. Two configurations are ambiguous [saddles](https://en.wikipedia.org/wiki/Saddle_point), the cell-centre average picks a branch.
4. **Stitching**: the loose segments are joined into continuous [polylines](https://en.wikipedia.org/wiki/Polygonal_chain). Crossings are keyed by the grid edge they
   lie on rather than by coordinates, so adjacent cells agree exactly and no floating-point tolerance is
   involved. Chains with a free end run off the frame; the rest close into loops around peaks and basins.
5. **Simplify & smooth**: [Ramer–Douglas–Peucker](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm)
   drops vertices that stay within a tolerance of the line they sit on, then
   [Chaikin's corner cutting](https://en.wikipedia.org/wiki/Subdivision_surface) rounds the grid-faceted
   polyline into a curve (it converges to a quadratic
   [B-spline](https://en.wikipedia.org/wiki/B-spline)). Simplifying first means smoothing has fewer, longer
   edges to work with, and the exported file stays small.
6. **SVG paths**: the polylines are mapped to pixels and written as
   [SVG](https://en.wikipedia.org/wiki/SVG) `M`/`L` path data, then coloured from the palette.
   *Topographic* and *Paper white* are fixed lists; *Rainbow* and *Single colour* are generated (a hue
   wheel, and lightness steps of a picked colour), since a palette supplies either `colors` or a
   `build(style)` function. By default colour is a continuous **ramp** across the palette, so it encodes
   elevation; *cycle* repeats the palette per line and *single* uses one colour throughout.
