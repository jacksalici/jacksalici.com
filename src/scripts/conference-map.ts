import {
  Map,
  NavigationControl,
  Popup,
  type GeoJSONSource,
  type MapLayerMouseEvent,
} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const mapElement = document.getElementById('map') as HTMLDivElement;

type Paper = {
  id: string;
  title: string;
  location?: string;
  coordinates: [number, number];
  venue?: string;
};

const papers: Paper[] = JSON.parse(
  document.getElementById('papers-data')?.textContent || '[]',
);

const geojson: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: papers.map((paper, i) => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: paper.coordinates },
    properties: { i },
  })),
};

const map = new Map({
  container: mapElement,
  style: 'https://tiles.openfreemap.org/styles/dark',
  center: [20, 15],
  zoom: 1,
});

map.on('load', () => {
  map.addSource('papers', {
    type: 'geojson',
    data: geojson,
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
  });

  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'papers',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': '#F24333',
      'circle-radius': ['step', ['get', 'point_count'], 20, 10, 30, 50, 40],
      'circle-opacity': 0.7,
    },
  });

  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'papers',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': ['get', 'point_count_abbreviated'],
      'text-size': 12,
    },
    paint: { 'text-color': '#ffffff' },
  });

  map.addLayer({
    id: 'papers',
    type: 'circle',
    source: 'papers',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#F24333',
      'circle-radius': 8,
    },
  });

  const popup = new Popup({ offset: 25 });

  map.on('click', 'papers', (e: MapLayerMouseEvent) => {
    const feature = e.features?.[0];
    if (!feature) return;
    const paper = papers[(feature.properties as { i: number }).i];
    const group = papers.filter(
      (p) =>
        p.coordinates[0] === paper.coordinates[0] &&
        p.coordinates[1] === paper.coordinates[1],
    );

    popup
      .setLngLat(paper.coordinates)
      .setHTML(
        group
          .map(
            (p, j) => `
          <div class="${j > 0 ? 'border-t border-white/10 mt-1.5 pt-1.5' : ''}">
            <a href="/papers/${p.id}/" class="font-semibold text-sm text-accent-1 hover:underline no-underline">${p.title}</a>
            ${p.venue ? `<p class="text-xs mt-0.5">${p.venue}</p>` : ''}
          </div>`,
          )
          .join(''),
      )
      .addTo(map);
  });

  map.on('click', 'clusters', (e: MapLayerMouseEvent) => {
    const feature = e.features?.[0];
    if (!feature) return;
    const clusterId = feature.properties?.cluster_id;
    const source = map.getSource('papers') as GeoJSONSource;
    source.getClusterExpansionZoom(clusterId as number).then((zoom) => {
      map.easeTo({
        center: (feature.geometry as GeoJSON.Point).coordinates as [number, number],
        zoom: zoom + 1,
      });
    });
  });

  map.on('mouseenter', 'papers', () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'papers', () => {
    map.getCanvas().style.cursor = '';
  });

  map.addControl(new NavigationControl());
});
