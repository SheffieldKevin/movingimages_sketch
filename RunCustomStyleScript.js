@import '~/github/movingimages_sketch/MovingImages.js';

var selectedShapeGroups = context.selection;
var selectedCount = selectedShapeGroups.count();

if (selectedCount == 0) {
  log('No layers are selected.');
} else {
  log('Selected shape groups: ' + selectedCount);
  for (var i = 0; i < selectedCount; i++) {
    var shapeGroup = selectedShapeGroups[i];
    log(JSON.stringify(MovingImages.processItemInSelection(shapeGroup)), null, 2);
    var layer = shapeGroup.layers().objectAtIndex(0);
    // log(layer.treeAsDictionary())
    var frame = layer.frame();
    var bWidth = 4;
    log(layer.bezierPath());
    var cgRect = CGRectMake(frame.x() - bWidth, frame.y() - bWidth, frame.width() + 2.0 * bWidth, frame.height() + 2.0 * bWidth);
    log(cgRect);
    var style = shapeGroup.style();
    // log(MovingImages.MSBlendModeToMIBlendMode(style.contextSettings().blendMode()))
    var fills = style.fills();
/*
    log("isPolygon: " + layer.path().isPolygon());
    log("isLine: " + layer.path().isLine());
    log("isRectangle: " + layer.path().isRectangle());
    var bezierPath = layer.path().bezierPathInRect(cgRect);
    log(bezierPath.svgPathAttribute());
    log(layer.bezierPath().svgPathAttribute());
    var countFills = fills.count();
    log(countFills);

    for (var j = 0; j < countFills; ++j) {
      var fill = fills.objectAtIndex(j);
      // log(fill.treeAsDictionary());
    }
*/
    log(MovingImages.makeJSONDrawElement(layer, fills.objectAtIndex(0)));
    // var borders = style.borders();
    // var countBorders = borders.count();
    // log(countBorders);
  }
}

/*
{
    "<class>" = MSStyle;
    blur =     {
        "<class>" = MSStyleBlur;
        center =         {
            x = "0.5";
            y = "0.5";
        };
        isEnabled = 0;
        motionAngle = 0;
        radius = 10;
        type = 0;
    };
    borderOptions =     {
        "<class>" = MSStyleBorderOptions;
        dashPattern =         (
        );
        isEnabled = 0;
        lineCapStyle = 0;
        lineJoinStyle = 0;
    };
    borders =     {
        "<class>" = MSArray;
        "<items>" =         (
                        {
                "<class>" = MSStyleBorder;
                color =                 {
                    "<class>" = MSColor;
                    value = "#979797";
                };
                contextSettings =                 {
                    "<class>" = MSGraphicsContextSettings;
                    blendMode = 0;
                    opacity = 1;
                };
                fillType = 1;
                gradient =                 {
                    "<class>" = MSGradient;
                    elipseLength = 0;
                    from =                     {
                        x = "0.5";
                        y = "-1.002232142857143";
                    };
                    gradientType = 0;
                    points =                     {
                        "<class>" = MSGradientPointArray;
                        "<points>" =                         (
                            "{0.5, -1.0022321428571428}",
                            "{0.5, 1.8655133928571428}"
                        );
                    };
                    shouldSmoothenOpacity = 0;
                    stops =                     {
                        "<class>" = MSArray;
                        "<items>" =                         (
                                                        {
                                "<class>" = MSGradientStop;
                                color =                                 {
                                    "<class>" = MSColor;
                                    value = "#C8C8C8";
                                };
                                position = 0;
                            },
                                                        {
                                "<class>" = MSGradientStop;
                                color =                                 {
                                    "<class>" = MSColor;
                                    value = "#979797";
                                };
                                position = 1;
                            }
                        );
                    };
                    to =                     {
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
    colorControls =     {
        "<class>" = MSStyleColorControls;
        brightness = 0;
        contrast = 1;
        hue = 0;
        isEnabled = 0;
        saturation = 1;
    };
    contextSettings =     {
        "<class>" = MSGraphicsContextSettings;
        blendMode = 0;
        opacity = 1;
    };
    endDecorationType = 0;
    fills =     {
        "<class>" = MSArray;
        "<items>" =         (
                        {
                "<class>" = MSStyleFill;
                color =                 {
                    "<class>" = MSColor;
                    value = "#9E9E9E";
                };
                contextSettings =                 {
                    "<class>" = MSGraphicsContextSettings;
                    blendMode = 0;
                    opacity = 1;
                };
                fillType = 0;
                gradient =                 {
                    "<class>" = MSGradient;
                    elipseLength = 0;
                    from =                     {
                        x = "0.5";
                        y = 0;
                    };
                    gradientType = 0;
                    points =                     {
                        "<class>" = MSGradientPointArray;
                        "<points>" =                         (
                            "{0.5, 0}",
                            "{0.5, 1}"
                        );
                    };
                    shouldSmoothenOpacity = 0;
                    stops =                     {
                        "<class>" = MSArray;
                        "<items>" =                         (
                                                        {
                                "<class>" = MSGradientStop;
                                color =                                 {
                                    "<class>" = MSColor;
                                    value = "rgba(255,255,255,0.50)";
                                };
                                position = 0;
                            },
                                                        {
                                "<class>" = MSGradientStop;
                                color =                                 {
                                    "<class>" = MSColor;
                                    value = "rgba(0,0,0,0.50)";
                                };
                                position = 1;
                            }
                        );
                    };
                    to =                     {
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
    innerShadows =     {
        "<class>" = MSArray;
        "<items>" =         (
        );
    };
    miterLimit = 10;
    reflection =     {
        "<class>" = MSStyleReflection;
        distance = 1;
        isEnabled = 0;
        strength = "0.5";
    };
    shadows =     {
        "<class>" = MSArray;
        "<items>" =         (
        );
    };
    startDecorationType = 0;
}
{
    "<class>" = MSStyle;
    blur =     {
        "<class>" = MSStyleBlur;
        center =         {
            x = "0.5";
            y = "0.5";
        };
        isEnabled = 0;
        motionAngle = 0;
        radius = 10;
        type = 0;
    };
    borderOptions =     {
        "<class>" = MSStyleBorderOptions;
        dashPattern =         (
        );
        isEnabled = 0;
        lineCapStyle = 0;
        lineJoinStyle = 0;
    };
    borders =     {
        "<class>" = MSArray;
        "<items>" =         (
                        {
                "<class>" = MSStyleBorder;
                color =                 {
                    "<class>" = MSColor;
                    value = "#979797";
                };
                contextSettings =                 {
                    "<class>" = MSGraphicsContextSettings;
                    blendMode = 0;
                    opacity = 1;
                };
                fillType = 0;
                gradient =                 {
                    "<class>" = MSGradient;
                    elipseLength = 0;
                    from =                     {
                        x = "0.5";
                        y = 0;
                    };
                    gradientType = 0;
                    points =                     {
                        "<class>" = MSGradientPointArray;
                        "<points>" =                         (
                            "{0.5, 0}",
                            "{0.5, 1}"
                        );
                    };
                    shouldSmoothenOpacity = 0;
                    stops =                     {
                        "<class>" = MSArray;
                        "<items>" =                         (
                                                        {
                                "<class>" = MSGradientStop;
                                color =                                 {
                                    "<class>" = MSColor;
                                    value = "#FFFFFF";
                                };
                                position = 0;
                            },
                                                        {
                                "<class>" = MSGradientStop;
                                color =                                 {
                                    "<class>" = MSColor;
                                    value = "#000000";
                                };
                                position = 1;
                            }
                        );
                    };
                    to =                     {
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
    colorControls =     {
        "<class>" = MSStyleColorControls;
        brightness = 0;
        contrast = 1;
        hue = 0;
        isEnabled = 0;
        saturation = 1;
    };
    contextSettings =     {
        "<class>" = MSGraphicsContextSettings;
        blendMode = 0;
        opacity = 1;
    };
    endDecorationType = 0;
    fills =     {
        "<class>" = MSArray;
        "<items>" =         (
                        {
                "<class>" = MSStyleFill;
                color =                 {
                    "<class>" = MSColor;
                    value = "#D8D8D8";
                };
                contextSettings =                 {
                    "<class>" = MSGraphicsContextSettings;
                    blendMode = 0;
                    opacity = 1;
                };
                fillType = 0;
                gradient =                 {
                    "<class>" = MSGradient;
                    elipseLength = 0;
                    from =                     {
                        x = "0.5";
                        y = 0;
                    };
                    gradientType = 0;
                    points =                     {
                        "<class>" = MSGradientPointArray;
                        "<points>" =                         (
                            "{0.5, 0}",
                            "{0.5, 1}"
                        );
                    };
                    shouldSmoothenOpacity = 0;
                    stops =                     {
                        "<class>" = MSArray;
                        "<items>" =                         (
                                                        {
                                "<class>" = MSGradientStop;
                                color =                                 {
                                    "<class>" = MSColor;
                                    value = "#FFFFFF";
                                };
                                position = 0;
                            },
                                                        {
                                "<class>" = MSGradientStop;
                                color =                                 {
                                    "<class>" = MSColor;
                                    value = "#000000";
                                };
                                position = 1;
                            }
                        );
                    };
                    to =                     {
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
    innerShadows =     {
        "<class>" = MSArray;
        "<items>" =         (
        );
    };
    miterLimit = 10;
    reflection =     {
        "<class>" = MSStyleReflection;
        distance = 1;
        isEnabled = 0;
        strength = "0.5";
    };
    shadows =     {
        "<class>" = MSArray;
        "<items>" =         (
        );
    };
    startDecorationType = 0;
}
*/
