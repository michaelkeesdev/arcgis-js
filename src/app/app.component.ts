import { Component, OnInit } from '@angular/core';
import esriConfig from '@arcgis/core/config';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Graphic from '@arcgis/core/Graphic';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Point from '@arcgis/core/geometry/Point';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular 15 CRUD example';
  ngOnInit() {
    esriConfig.fontsUrl = './assets/font/';


    const map = new Map({
      basemap: 'topo', // Basemap layer service
    });
    const view = new MapView({
      map: map,
      center: [4.308342, 51.27658], // Longitude, latitude
      zoom: 13, // Zoom level
      container: 'viewDiv', // Div element
    });

    const graphic1 = new Graphic({
      attributes: {
        length: 100,
      },
    });
    graphic1.geometry = new Point({
        x: 4.308342,
        y: 51.27658,
    });

    const graphic2 = new Graphic({
      attributes: {
        length: 10,
      },
    });

    graphic2.geometry = new Point({
        x: 4.304352,
      y: 51.24758,
    })

    const layer = new FeatureLayer({
      id: 'layer',
      source: [graphic1, graphic2],
      objectIdField: 'ObjectID',
      geometryType: 'point',
      fields: [
        {
          name: 'ObjectID',
          alias: 'ObjectID',
          type: 'oid',
        },
        {
          name: 'length',
          alias: 'Length',
          type: 'integer',
        },
        {
          name: 'cluster_count',
          type: 'integer',
        },
      ],
      renderer: {
        id: 'DUKDALF_SIMPLE_CIM_RENDERER',
        type: 'simple',
        symbol: {
          type: 'text', // autocasts as new TextSymbol()
          color: 'white',
          haloColor: 'black',
          haloSize: '5px',
          text: 'O',
          xoffset: 3,
          yoffset: 3,
          font: {
            // autocasts as new Font()
            family: 'apica-font',
            size: 12,

          },
        },
      } as any,
      popupTemplate: {
        title: '{ObjectId} | {length}',
      },
    });
    view.map.layers.add(layer);
    console.log(view.map.layers);
  }
}
