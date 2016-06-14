@import '~/github/movingimages_sketch/MovingImages.js';

log(context);

var selectedShapeGroups = context.selection;
var selectedCount = selectedShapeGroups.count();

if (selectedCount == 0) {
  log('No layers are selected.');
} else {
  log('Selected shape groups: ' + selectedCount);
  for (var i = 0; i < selectedCount; i++) {
    var shapeGroup = selectedShapeGroups[i];
    var propertiesString = MovingImages.getObjectProperties(shapeGroup);
    log(propertiesString);
    // log(layer.treeAsDictionary();
    var theLayers = shapeGroup.layers();
    propertiesString = MovingImages.getObjectProperties(theLayers);
    log(propertiesString)
    var theCount = theLayers.count()
    log("Number of layers: " + theCount)
    for (var j = 0; j < theCount; ++j) {
      let theObject = theLayers.objectAtIndex(j)
      let classString = String(theObject.class())
      switch(classString){
        case "MSRectangleShape":
          log("Rectangle shape");
          log(MovingImages.getRectangleProperties(theObject))
          break;
        case "MSPolygonShape":
          log("Polygon shape");
          log(MovingImages.getPolygonProperties(theObject))
          break;
        default:
          log("Unknown shape");
          log(MovingImages.getObjectProperties(theObject));
      }
    }
  }
}


/*
theObject class: MSShapeGroup typeof: object
{
    "<class>" = MSShapeGroup;
    clippingMaskMode = 0;
    exportOptions =     {
        "<class>" = MSExportOptions;
        exportFormats =         {
            "<class>" = MSArray;
            "<items>" =             (
            );
        };
        includedLayerIds =         {
            "<class>" = MSArray;
            "<items>" =             (
            );
        };
        layerOptions = 0;
        shouldTrim = 0;
    };
    frame =     {
        "<class>" = MSRect;
        constrainProportions = 0;
        height = 84;
        width = 89;
        x = 13;
        y = 0;
    };
    hasClickThrough = 0;
    hasClippingMask = 0;
    isFlippedHorizontal = 0;
    isFlippedVertical = 0;
    isLocked = 0;
    isVisible = 1;
    layerListExpandedType = 1;
    layers =     {
        "<class>" = MSArray;
        "<items>" =         (
                        {
                "<class>" = MSPolygonShape;
                booleanOperation = "-1";
                edited = 0;
                exportOptions =                 {
                    "<class>" = MSExportOptions;
                    exportFormats =                     {
                        "<class>" = MSArray;
                        "<items>" =                         (
                        );
                    };
                    includedLayerIds =                     {
                        "<class>" = MSArray;
                        "<items>" =                         (
                        );
                    };
                    layerOptions = 0;
                    shouldTrim = 0;
                };
                frame =                 {
                    "<class>" = MSRect;
                    constrainProportions = 0;
                    height = 84;
                    width = 89;
                    x = 0;
                    y = 0;
                };
                isFlippedHorizontal = 0;
                isFlippedVertical = 0;
                isLocked = 0;
                isVisible = 1;
                layerListExpandedType = 0;
                name = Path;
                nameIsFixed = 0;
                numberOfPoints = 5;
                objectID = "5E78914A-4899-4018-890C-D9333B20028F";
                path =                 {
                    "<class>" = MSShapePath;
                    isClosed = 1;
                    points =                     {
                        "<class>" = MSArray;
                        "<items>" =                         (
                                                        {
                                "<class>" = MSCurvePoint;
                                cornerRadius = 0;
                                curveFrom =                                 {
                                    x = "0.5";
                                    y = 0;
                                };
                                curveMode = 1;
                                curveTo =                                 {
                                    x = "0.5";
                                    y = 0;
                                };
                                hasCurveFrom = 0;
                                hasCurveTo = 0;
                                point =                                 {
                                    x = "0.5";
                                    y = 0;
                                };
                            },
                                                        {
                                "<class>" = MSCurvePoint;
                                cornerRadius = 0;
                                curveFrom =                                 {
                                    x = "0.9755282581475768";
                                    y = "0.3454915028125263";
                                };
                                curveMode = 1;
                                curveTo =                                 {
                                    x = "0.9755282581475768";
                                    y = "0.3454915028125263";
                                };
                                hasCurveFrom = 0;
                                hasCurveTo = 0;
                                point =                                 {
                                    x = "0.9755282581475768";
                                    y = "0.3454915028125263";
                                };
                            },
                                                        {
                                "<class>" = MSCurvePoint;
                                cornerRadius = 0;
                                curveFrom =                                 {
                                    x = "0.7938926261462367";
                                    y = "0.9045084971874737";
                                };
                                curveMode = 1;
                                curveTo =                                 {
                                    x = "0.7938926261462367";
                                    y = "0.9045084971874737";
                                };
                                hasCurveFrom = 0;
                                hasCurveTo = 0;
                                point =                                 {
                                    x = "0.7938926261462367";
                                    y = "0.9045084971874737";
                                };
                            },
                                                        {
                                "<class>" = MSCurvePoint;
                                cornerRadius = 0;
                                curveFrom =                                 {
                                    x = "0.2061073738537635";
                                    y = "0.9045084971874737";
                                };
                                curveMode = 1;
                                curveTo =                                 {
                                    x = "0.2061073738537635";
                                    y = "0.9045084971874737";
                                };
                                hasCurveFrom = 0;
                                hasCurveTo = 0;
                                point =                                 {
                                    x = "0.2061073738537635";
                                    y = "0.9045084971874737";
                                };
                            },
                                                        {
                                "<class>" = MSCurvePoint;
                                cornerRadius = 0;
                                curveFrom =                                 {
                                    x = "0.02447174185242318";
                                    y = "0.3454915028125264";
                                };
                                curveMode = 1;
                                curveTo =                                 {
                                    x = "0.02447174185242318";
                                    y = "0.3454915028125264";
                                };
                                hasCurveFrom = 0;
                                hasCurveTo = 0;
                                point =                                 {
                                    x = "0.02447174185242318";
                                    y = "0.3454915028125264";
                                };
                            }
                        );
                    };
                };
                rotation = 0;
                shouldBreakMaskChain = 0;
            }
        );
    };
    name = "Polygon 1";
    nameIsFixed = 0;
    objectID = "E04DEBA2-7B46-43A8-92D0-1D61492FAF71";
    rotation = 0;
    shouldBreakMaskChain = 0;
    style =     {
        "<class>" = MSStyle;
        blur =         {
            "<class>" = MSStyleBlur;
            center =             {
                x = "0.5";
                y = "0.5";
            };
            isEnabled = 0;
            motionAngle = 0;
            radius = 10;
            type = 0;
        };
        borderOptions =         {
            "<class>" = MSStyleBorderOptions;
            dashPattern =             (
            );
            isEnabled = 0;
            lineCapStyle = 0;
            lineJoinStyle = 0;
        };
        borders =         {
            "<class>" = MSArray;
            "<items>" =             (
                                {
                    "<class>" = MSStyleBorder;
                    color =                     {
                        "<class>" = MSColor;
                        value = "#979797";
                    };
                    contextSettings =                     {
                        "<class>" = MSGraphicsContextSettings;
                        blendMode = 0;
                        opacity = 1;
                    };
                    fillType = 0;
                    gradient =                     {
                        "<class>" = MSGradient;
                        elipseLength = 0;
                        from =                         {
                            x = "0.5";
                            y = 0;
                        };
                        gradientType = 0;
                        points =                         {
                            "<class>" = MSGradientPointArray;
                            "<points>" =                             (
                                "{0.5, 0}",
                                "{0.5, 1}"
                            );
                        };
                        shouldSmoothenOpacity = 0;
                        stops =                         {
                            "<class>" = MSArray;
                            "<items>" =                             (
                                                                {
                                    "<class>" = MSGradientStop;
                                    color =                                     {
                                        "<class>" = MSColor;
                                        value = "#FFFFFF";
                                    };
                                    position = 0;
                                },
                                                                {
                                    "<class>" = MSGradientStop;
                                    color =                                     {
                                        "<class>" = MSColor;
                                        value = "#000000";
                                    };
                                    position = 1;
                                }
                            );
                        };
                        to =                         {
                            x = "0.5";
                            y = 1;
                        };
                    };
                    isEnabled = 1;
                    position = 2;
                    thickness = 7;
                }
            );
        };
        colorControls =         {
            "<class>" = MSStyleColorControls;
            brightness = 0;
            contrast = 1;
            hue = 0;
            isEnabled = 0;
            saturation = 1;
        };
        contextSettings =         {
            "<class>" = MSGraphicsContextSettings;
            blendMode = 0;
            opacity = 1;
        };
        endDecorationType = 0;
        fills =         {
            "<class>" = MSArray;
            "<items>" =             (
                                {
                    "<class>" = MSStyleFill;
                    color =                     {
                        "<class>" = MSColor;
                        value = "#D8D8D8";
                    };
                    contextSettings =                     {
                        "<class>" = MSGraphicsContextSettings;
                        blendMode = 0;
                        opacity = 1;
                    };
                    fillType = 0;
                    gradient =                     {
                        "<class>" = MSGradient;
                        elipseLength = 0;
                        from =                         {
                            x = "0.5";
                            y = 0;
                        };
                        gradientType = 0;
                        points =                         {
                            "<class>" = MSGradientPointArray;
                            "<points>" =                             (
                                "{0.5, 0}",
                                "{0.5, 1}"
                            );
                        };
                        shouldSmoothenOpacity = 0;
                        stops =                         {
                            "<class>" = MSArray;
                            "<items>" =                             (
                                                                {
                                    "<class>" = MSGradientStop;
                                    color =                                     {
                                        "<class>" = MSColor;
                                        value = "#FFFFFF";
                                    };
                                    position = 0;
                                },
                                                                {
                                    "<class>" = MSGradientStop;
                                    color =                                     {
                                        "<class>" = MSColor;
                                        value = "#000000";
                                    };
                                    position = 1;
                                }
                            );
                        };
                        to =                         {
                            x = "0.5";
                            y = 1;
                        };
                    };
                    isEnabled = 1;
                    noiseIndex = 0;
                    noiseIntensity = 0;
                    patternFillType = 1;
                    patternTileScale = 1;
                }
            );
        };
        innerShadows =         {
            "<class>" = MSArray;
            "<items>" =             (
            );
        };
        miterLimit = 10;
        reflection =         {
            "<class>" = MSStyleReflection;
            distance = 1;
            isEnabled = 0;
            strength = "0.5";
        };
        shadows =         {
            "<class>" = MSArray;
            "<items>" =             (
            );
        };
        startDecorationType = 0;
    };
    windingRule = 1;
}

Rectangle shape selected.
{
    "<class>" = MSShapeGroup;
    clippingMaskMode = 0;
    exportOptions =     {
        "<class>" = MSExportOptions;
        exportFormats =         {
            "<class>" = MSArray;
            "<items>" =             (
            );
        };
        includedLayerIds =         {
            "<class>" = MSArray;
            "<items>" =             (
            );
        };
        layerOptions = 0;
        shouldTrim = 0;
    };
    frame =     {
        "<class>" = MSRect;
        constrainProportions = 0;
        height = 14;
        objectID = "3D0A661B-176B-4AFC-9744-FFB212CD3E02";
        width = 117;
        x = "-1";
        y = 110;
    };
    hasClickThrough = 0;
    hasClippingMask = 0;
    isFlippedHorizontal = 0;
    isFlippedVertical = 0;
    isLocked = 0;
    isVisible = 1;
    layerListExpandedType = 1;
    layers =     {
        "<class>" = MSArray;
        "<items>" =         (
                        {
                "<class>" = MSRectangleShape;
                booleanOperation = "-1";
                edited = 0;
                exportOptions =                 {
                    "<class>" = MSExportOptions;
                    exportFormats =                     {
                        "<class>" = MSArray;
                        "<items>" =                         (
                        );
                    };
                    includedLayerIds =                     {
                        "<class>" = MSArray;
                        "<items>" =                         (
                        );
                    };
                    layerOptions = 0;
                    shouldTrim = 0;
                };
                fixedRadius = 0;
                frame =                 {
                    "<class>" = MSRect;
                    constrainProportions = 0;
                    height = 14;
                    width = 117;
                    x = 0;
                    y = 0;
                };
                hasConvertedToNewRoundCorners = 1;
                isFlippedHorizontal = 0;
                isFlippedVertical = 0;
                isLocked = 0;
                isVisible = 1;
                layerListExpandedType = 0;
                name = Path;
                nameIsFixed = 0;
                objectID = "822F2FC3-36F1-43D7-B945-A53100E64E3F";
                path =                 {
                    "<class>" = MSShapePath;
                    isClosed = 1;
                    points =                     {
                        "<class>" = MSArray;
                        "<items>" =                         (
                                                        {
                                "<class>" = MSCurvePoint;
                                cornerRadius = 0;
                                curveFrom =                                 {
                                    x = 0;
                                    y = 0;
                                };
                                curveMode = 1;
                                curveTo =                                 {
                                    x = 0;
                                    y = 0;
                                };
                                hasCurveFrom = 0;
                                hasCurveTo = 0;
                                point =                                 {
                                    x = 0;
                                    y = 0;
                                };
                            },
                                                        {
                                "<class>" = MSCurvePoint;
                                cornerRadius = 0;
                                curveFrom =                                 {
                                    x = 1;
                                    y = 0;
                                };
                                curveMode = 1;
                                curveTo =                                 {
                                    x = 1;
                                    y = 0;
                                };
                                hasCurveFrom = 0;
                                hasCurveTo = 0;
                                point =                                 {
                                    x = 1;
                                    y = 0;
                                };
                            },
                                                        {
                                "<class>" = MSCurvePoint;
                                cornerRadius = 0;
                                curveFrom =                                 {
                                    x = 1;
                                    y = 1;
                                };
                                curveMode = 1;
                                curveTo =                                 {
                                    x = 1;
                                    y = 1;
                                };
                                hasCurveFrom = 0;
                                hasCurveTo = 0;
                                point =                                 {
                                    x = 1;
                                    y = 1;
                                };
                            },
                                                        {
                                "<class>" = MSCurvePoint;
                                cornerRadius = 0;
                                curveFrom =                                 {
                                    x = 0;
                                    y = 1;
                                };
                                curveMode = 1;
                                curveTo =                                 {
                                    x = 0;
                                    y = 1;
                                };
                                hasCurveFrom = 0;
                                hasCurveTo = 0;
                                point =                                 {
                                    x = 0;
                                    y = 1;
                                };
                            }
                        );
                    };
                };
                rotation = 0;
                shouldBreakMaskChain = 0;
            }
        );
    };
    name = "Rectangle 3 Copy";
    nameIsFixed = 0;
    objectID = "9FF2A2BB-D9E0-45E6-910A-22DCED315D65";
    rotation = 0;
    shouldBreakMaskChain = 0;
    style =     {
        "<class>" = MSStyle;
        blur =         {
            "<class>" = MSStyleBlur;
            center =             {
                x = "0.5";
                y = "0.5";
            };
            isEnabled = 0;
            motionAngle = 0;
            radius = 10;
            type = 0;
        };
        borderOptions =         {
            "<class>" = MSStyleBorderOptions;
            dashPattern =             (
            );
            isEnabled = 0;
            lineCapStyle = 0;
            lineJoinStyle = 0;
        };
        borders =         {
            "<class>" = MSArray;
            "<items>" =             (
                                {
                    "<class>" = MSStyleBorder;
                    color =                     {
                        "<class>" = MSColor;
                        value = "#979797";
                    };
                    contextSettings =                     {
                        "<class>" = MSGraphicsContextSettings;
                        blendMode = 0;
                        opacity = 1;
                    };
                    fillType = 1;
                    gradient =                     {
                        "<class>" = MSGradient;
                        elipseLength = 0;
                        from =                         {
                            x = "0.5";
                            y = "-1.002232142857143";
                        };
                        gradientType = 0;
                        points =                         {
                            "<class>" = MSGradientPointArray;
                            "<points>" =                             (
                                "{0.5, -1.0022321428571428}",
                                "{0.5, 1.8655133928571428}"
                            );
                        };
                        shouldSmoothenOpacity = 0;
                        stops =                         {
                            "<class>" = MSArray;
                            "<items>" =                             (
                                                                {
                                    "<class>" = MSGradientStop;
                                    color =                                     {
                                        "<class>" = MSColor;
                                        value = "#C8C8C8";
                                    };
                                    position = 0;
                                },
                                                                {
                                    "<class>" = MSGradientStop;
                                    color =                                     {
                                        "<class>" = MSColor;
                                        value = "#979797";
                                    };
                                    position = 1;
                                }
                            );
                        };
                        to =                         {
                            x = "0.5";
                            y = "1.865513392857143";
                        };
                    };
                    isEnabled = 1;
                    position = 2;
                    thickness = 13;
                }
            );
        };
        colorControls =         {
            "<class>" = MSStyleColorControls;
            brightness = 0;
            contrast = 1;
            hue = 0;
            isEnabled = 0;
            saturation = 1;
        };
        contextSettings =         {
            "<class>" = MSGraphicsContextSettings;
            blendMode = 0;
            opacity = 1;
        };
        endDecorationType = 0;
        fills =         {
            "<class>" = MSArray;
            "<items>" =             (
                                {
                    "<class>" = MSStyleFill;
                    color =                     {
                        "<class>" = MSColor;
                        value = "#9E9E9E";
                    };
                    contextSettings =                     {
                        "<class>" = MSGraphicsContextSettings;
                        blendMode = 0;
                        opacity = 1;
                    };
                    fillType = 0;
                    gradient =                     {
                        "<class>" = MSGradient;
                        elipseLength = 0;
                        from =                         {
                            x = "0.5";
                            y = 0;
                        };
                        gradientType = 0;
                        points =                         {
                            "<class>" = MSGradientPointArray;
                            "<points>" =                             (
                                "{0.5, 0}",
                                "{0.5, 1}"
                            );
                        };
                        shouldSmoothenOpacity = 0;
                        stops =                         {
                            "<class>" = MSArray;
                            "<items>" =                             (
                                                                {
                                    "<class>" = MSGradientStop;
                                    color =                                     {
                                        "<class>" = MSColor;
                                        value = "rgba(255,255,255,0.50)";
                                    };
                                    position = 0;
                                },
                                                                {
                                    "<class>" = MSGradientStop;
                                    color =                                     {
                                        "<class>" = MSColor;
                                        value = "rgba(0,0,0,0.50)";
                                    };
                                    position = 1;
                                }
                            );
                        };
                        to =                         {
                            x = "0.5";
                            y = 1;
                        };
                    };
                    isEnabled = 1;
                    noiseIndex = 0;
                    noiseIntensity = 0;
                    patternFillType = 1;
                    patternTileScale = 1;
                }
            );
        };
        innerShadows =         {
            "<class>" = MSArray;
            "<items>" =             (
            );
        };
        miterLimit = 10;
        reflection =         {
            "<class>" = MSStyleReflection;
            distance = 1;
            isEnabled = 0;
            strength = "0.5";
        };
        shadows =         {
            "<class>" = MSArray;
            "<items>" =             (
            );
        };
        startDecorationType = 0;
    };
    windingRule = 1;
}
*/