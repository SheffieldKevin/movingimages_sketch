// To use this file:
// @import 'MovingImages.js';

var MovingImages = {};

(function() {
  MovingImages.hexDigitNumber = function(digit) {
    var hexDigitTable = '0123456789ABCDEF'
    for (i = 0 ; i < 16 ; ++i) {
      if (hexDigitTable[i] == digit) {
        return i
      }
    }
    return 0
  };
  var hexDigitToNumber = MovingImages.hexDigitNumber;
  
  MovingImages.redComponent = function(hexString) {
    var number1 = hexDigitToNumber(hexString[0]) * 16.0
    var number2 = hexDigitToNumber(hexString[1])
    return (number1 + number2) / 255.0
  };
  var redComponent = MovingImages.redComponent;

  MovingImages.greenComponent = function(hexString) {
    var number1 = hexDigitToNumber(hexString[2]) * 16.0
    var number2 = hexDigitToNumber(hexString[3])
    return (number1 + number2) / 255.0
  };
  var greenComponent = MovingImages.greenComponent;

  // Assumes string is not prefixed with a #
  MovingImages.blueComponent = function(hexString) {
    var number1 = hexDigitToNumber(hexString[4]) * 16.0;
    var number2 = hexDigitToNumber(hexString[5]);
    return (number1 + number2) / 255.0;
  };
  var blueComponent = MovingImages.blueComponent;

  MovingImages.convertAlphaColor = function(msColor) {
    var hexString = String(msColor.hexValue())
    var dictionary = {
      red: redComponent(hexString),
      green: greenComponent(hexString),
      blue: blueComponent(hexString),
      alpha: msColor.alpha(),
      colorcolorprofilename: 'kCGColorSpaceSRGB'
    };
    return dictionary;
  };
  var convertAlphaColor = MovingImages.convertAlphaColor;
  
  MovingImages.convertMSColor = function(msColor) {
    if (msColor.alpha() < 0.997) {
      return convertAlphaColor(msColor);
    }
    else {
      return msColor.hexValue();
    }
  };
  var convertMSColor = MovingImages.convertMSColor

  MovingImages.convertMSRect = function(msRect) {
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
  };
  var convertMSRect = MovingImages.convertMSRect;
  
  MovingImages.convertStringToPoint = function(pointString) {
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
  };
  var convertStringToPoint = MovingImages.convertStringToPoint;
  
  MovingImages.convertPointsToLine = function(pointsArray) {
    // MSGradientPointArray
    var thePoints = pointsArray.points();
    var startPoint = MovingImages.convertStringToPoint(thePoints[0]);
    var endPoint = MovingImages.convertStringToPoint(thePoints[1]);
    return {
      startpoint: startPoint,
      endpoint: endPoint
    };
  };
  var convertPointsToLine = MovingImages.convertPointsToLine;

  MovingImages.getObjectProperties = function(theObject) {
    var name = "(without name)"
    if (theObject.name) {
      name = theObject.name()
    }
    var result = "object class: " + theObject.class() + " name: " + name;
    return result;
  };
  var getObjectProperties = MovingImages.getObjectProperties;
  
  MovingImages.getRectangleProperties = function(rectangleObject) {
    if (String(rectangleObject.class()) !== "MSRectangleShape") {
      return "Not a MSRectangleShape"
    }
    var result = "Rectangle name: " + rectangleObject.name() + "; fixedRadius: " + rectangleObject.fixedRadius();
    var theFrame = rectangleObject.frame()
    result += "; width: " + theFrame.width() + "; height: " + theFrame.height();
    result += "; x: " + theFrame.x() + "; y: " + theFrame.y() + "\n";
    result += rectangleObject.bezierPath().svgPathAttribute();
    return result;
  };

  MovingImages.getPolygonProperties = function(polygonObject) {
    if (String(polygonObject.class()) !== "MSPolygonShape") {
      return "Not a MSPolygonShape"
    }
    var result = "Polygon name: " + polygonObject.name() + "; numpoints: " + polygonObject.numberOfPoints() + "\n";
    result += polygonObject.bezierPath().svgPathAttribute();
    return result;
  };

  MovingImages.MSBlendModeToMIBlendMode = function(blendMode) {
    var result = "kCGBlendModeNormal";
    var blendModes = [
      "kCGBlendModeNormal",     //  0
      "kCGBlendModeDarken",     //  1
      "kCGBlendModeMultiply",   //  2
      "kCGBlendModeColorBurn",  //  3
      "kCGBlendModeLighten",    //  4
      "kCGBlendModeScreen",     //  5
      "kCGBlendModeColorDodge", //  6
      "kCGBlendModeOverlay",    //  7
      "kCGBlendModeSoftLight",  //  8
      "kCGBlendModeHardLight",  //  9
      "kCGBlendModeDifference", // 10
      "kCGBlendModeExclusion",  // 11
      "kCGBlendModeHue",        // 12
      "kCGBlendModeSaturation", // 13
      "kCGBlendModeColor",      // 14
      "kCGBlendModeLuminosity" // 15
    ];
    var numModes = blendModes.length;
    if (blendMode >= 0 && blendMode < numModes) {
      result = blendModes[blendMode];
    }
    return result;
  }
  var MSBlendModeToMIBlendMode = MovingImages.MSBlendModeToMIBlendMode;
  
  MovingImages.makeJSONFillRect = function(layer, fill) {
    var frame = layer.frame();
    var fillRect = {
      rect: {
        origin: { x: frame.x(), y: frame.y() },
        size: { width: frame.width(), height: frame.height() }
      },
      elementtype: "fillrectangle"
    };
    // log(fillRect);
    var fixedRadius = layer.fixedRadius();
    fixedRadius = Math.min(fixedRadius, frame.width() * 0.5, frame.height() * 0.5);
    if (fixedRadius > 0.00001) {
      fillRect.radius = fixedRadius;
    }
    fillRect.fillcolor = convertMSColor(fill.color());
    fillRect.blendmode = MSBlendModeToMIBlendMode(fill.contextSettingsGeneric().blendMode());
    fillRect.opacity = fill.contextSettingsGeneric().opacity();
    return fillRect
  }
  var makeJSONFillRect = MovingImages.makeJSONFillRect;
  
  MovingImages.makeJSONDrawElement = function(layer, fill) {
    var elementType = "fillpath";
    
    if (layer.path().isRectangle()) {
      elementType = "fillrectangle";
    }
    else if (layer.class() == "filloval") {
      elementType = "filloval";
    }
    var fillType = fill.fillType();
    if (fillType === 0 && elementType === "fillrectangle") {
      return makeJSONFillRect(layer, fill)
    }
  };
})();

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