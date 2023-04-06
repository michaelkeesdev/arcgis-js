import { Component, OnInit } from '@angular/core';
import esriConfig from '@arcgis/core/config';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Graphic from '@arcgis/core/Graphic';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Point from '@arcgis/core/geometry/Point';
import * as projection from '@arcgis/core/geometry/projection';
import SceneView from '@arcgis/core/views/SceneView';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular 15 CRUD example';

  constructor() {
    projection.load();
    esriConfig.fontsUrl = './assets/font/';
  }
  ngOnInit() {
    const map = new Map({
      basemap: 'topo', // Basemap layer service
    });
    const view = new SceneView({
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
        symbol:   {
          "type": "cim",
          "data": {
            "type": "CIMSymbolReference",
            "symbol": {
              "type": "CIMPointSymbol",
              "symbolLayers": [
                {
                  "type": "CIMVectorMarker",
                  "enable": true,
                  "size": 40,
                  "anchorPointUnits": "Relative",
                  "frame": {
                    "xmin" : -20,
                    "ymin" : -20,
                    "xmax" : 20,
                    "ymax" : 20
                  },
                  "anchorPoint" : {
                    "x" : 0,
                    "y" : 0
                  },
                  "markerGraphics": [
                    {
                      "type": "CIMMarkerGraphic",
                      "geometry": {
                        "x": 0,
                        "y": 0
                      },
                      "symbol": {
                        "type": "CIMTextSymbol",
                        "fontFamilyName": "apica-font",
                        "fontStyleName": "Regular",
                        "height": 40,
                        "horizontalAlignment" : "Center",
                        "symbol": {
                          "type": "CIMPolygonSymbol",
                          "symbolLayers": [
                            {
                              "type": "CIMSolidFill",
                              "enable": true,
                              "color":  [
                                27,
                                36,
                                61,
                                255
                              ]
                            }
                          ]
                        },
                        "verticalAlignment": "Center"
                      },
                      "textString": "\ue928"
                    },
                    {
                      "type": "CIMMarkerGraphic",
                      "geometry": {
                        "x": 0,
                        "y": 0
                      },
                      "symbol": {
                        "type": "CIMTextSymbol",
                        "fontFamilyName": "apica-font",
                        "fontStyleName": "Regular",
                        "height": 11,
                        "horizontalAlignment": "Center",
                        "symbol": {
                          "type": "CIMPolygonSymbol",
                          "symbolLayers": [
                            {
                              "type": "CIMSolidFill",
                              "enable": true,
                              "color":  [
                                255,
                                255,
                                255,
                                255
                              ]
                            }
                          ]
                        },
                        "verticalAlignment": "Center"
                      },
                      "textString": "\ue966"
                    }
                  ],
                  "scaleSymbolsProportionally": true,
                  "respectFrame": true
                }
              ]
            }
          }
        }
      } as any,
      popupTemplate: {
        title: '{ObjectId} | {length}',
      },
    });
    view.map.layers.add(layer);
    console.log(view.map.layers);
  }
}
