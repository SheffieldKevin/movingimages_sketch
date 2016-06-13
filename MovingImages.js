// To use this file:
// @import 'MovingImages.js';

function hexDigitToNumber(digit) {
  var hexDigitTable = '0123456789ABCDEF'
  for (i = 0 ; i < 16 ; ++i) {
    if (hexDigitTable[i] == digit) {
      return i
    }
  }
  return 0
}

// Assumes string is not prefixed with a #
function redComponent(hexString) {
  var number1 = hexDigitToNumber(hexString[0]) * 16.0
  var number2 = hexDigitToNumber(hexString[1])
  return (number1 + number2) / 255.0
}

// Assumes string is not prefixed with a #
function greenComponent(hexString) {
  var number1 = hexDigitToNumber(hexString[2]) * 16.0
  var number2 = hexDigitToNumber(hexString[3])
  return (number1 + number2) / 255.0
}

// Assumes string is not prefixed with a #
function blueComponent(hexString) {
  var number1 = hexDigitToNumber(hexString[4]) * 16.0;
  var number2 = hexDigitToNumber(hexString[5]);
  return (number1 + number2) / 255.0;
}

function miConvertAlphaColor(msColor) {
  var hexString = String(msColor.hexValue())
  var dictionary = {
    red: redComponent(hexString),
    green: greenComponent(hexString),
    blue: blueComponent(hexString),
    alpha: msColor.alpha(),
    colorcolorprofilename: 'kCGColorSpaceSRGB'
  };
  return dictionary;
}

function miConvertMSColor(msColor) {
  if (msColor.alpha() < 0.997) {
    return miConvertAlphaColor(msColor);
  }
  else {
    return msColor.hexValue();
  }
}

function miConvertMSRect(msRect) {
  return {
    size: {
      width: msRect.width(),
      height: msRect.height()
    },
    origin: {
      x: msRect.x(),
      y: msRect.y()
    }
  };
}

function miConvertStringToPoint(pointString) {
  var charactersToRemove = NSCharacterSet.characterSetWithCharactersInString('{} ');
  var strippedString = pointString.stringByTrimmingCharactersInSet(charactersToRemove);
  var commaSet = NSCharacterSet.characterSetWithCharactersInString(',');
  var components = strippedString.componentsSeparatedByCharactersInSet(commaSet);
  var x = components[0].doubleValue();
  var y = components[1].doubleValue();
  return {
    x: x,
    y: y
  };
}

function miConvertPointsToLine(pointsArray) {
  // MSGradientPointArray
  var thePoints = pointsArray.points();
  var startPoint = miConvertStringToPoint(thePoints[0]);
  var endPoint = miConvertStringToPoint(thePoints[1]);
  return {
    startpoint: startPoint,
    endpoint: endPoint
  };
}

/*
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
        y = "-112";
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
    name = "Rectangle 3";
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
                        value = "#9B9B9B";
                    };
                    contextSettings =                     {
                        "<class>" = MSGraphicsContextSettings;
                        blendMode = 0;
                        opacity = 1;
                    };
                    fillType = 0;
                    gradient =                     {
                        "<class>" = MSGradient;
                        elipseLength = 1;
                        from =                         {
                            x = "0.5000527501106262";
                            y = 1;
                        };
                        gradientType = 0;
                        points =                         {
                            "<class>" = MSGradientPointArray;
                            "<points>" =                             (
                                "{0.50005275011062622, 1}",
                                "{0.5, 0}"
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
                                        value = "#ECECF3";
                                    };
                                    position = 0;
                                },
                                                                {
                                    "<class>" = MSGradientStop;
                                    color =                                     {
                                        "<class>" = MSColor;
                                        value = "rgba(49,50,49,0.57)";
                                    };
                                    position = 1;
                                }
                            );
                        };
                        to =                         {
                            x = "0.5";
                            y = 0;
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