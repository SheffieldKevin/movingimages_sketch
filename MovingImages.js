// To use this file:
// @import 'MovingImages.js';

var MovingImages = {};

(function() {
  MovingImages.hexDigitNumber = function(digit) {
    var hexDigitTable = '0123456789ABCDEF';
    for (i = 0 ; i < 16 ; ++i) {
      if (hexDigitTable[i] == digit) {
        return i;
      }
    }
    return 0;
  };
  var hexDigitToNumber = MovingImages.hexDigitNumber;
  
  MovingImages.redComponent = function(hexString) {
    var number1 = hexDigitToNumber(hexString[0]) * 16.0;
    var number2 = hexDigitToNumber(hexString[1]);
    return (number1 + number2) / 255.0;
  };
  var redComponent = MovingImages.redComponent;

  MovingImages.greenComponent = function(hexString) {
    var number1 = hexDigitToNumber(hexString[2]) * 16.0;
    var number2 = hexDigitToNumber(hexString[3]);
    return (number1 + number2) / 255.0;
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
    var hexString = String(msColor.hexValue());
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
      return "#" + String(msColor.hexValue());
    }
  };
  var convertMSColor = MovingImages.convertMSColor;

  MovingImages.convertNSColor = function(nsColor) {
    if (nsColor.alphaComponent() < 0.997) {
      return {
                        red: nsColor.redComponent(),
                      green: nsColor.greenComponent(),
                       blue: nsColor.blueComponent(),
                      alpha: nsColor.alphaComponent(),
      colorcolorprofilename: 'kCGColorSpaceSRGB' };
    }
    else {
      return String(nsColor.hexValue());
    }
  };
  var convertNSColor = MovingImages.convertNSColor;

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
  
  MovingImages.convertNormalizedCGPointInFrame = function(cgPoint, frame) {
    return {
      x: frame.x() + cgPoint.x * frame.width(),
      y: frame.y() + cgPoint.y * frame.height()
    };
  };
  var convertNormalizedCGPointInFrame = MovingImages.convertNormalizedCGPointInFrame;
  
  MovingImages.convertCGRect = function(cgRect) {
    var origin = cgRect.origin;
    var size = cgRect.size;
    return {
      origin: {
        x: cgRect.origin.x + 0.0,
        y: cgRect.origin.y + 0.0
      },
      size: {
        width: cgRect.size.width + 0.0,
        height: cgRect.size.height + 0.0
      }
    };
  };
  var convertCGRect = MovingImages.convertCGRect;

  MovingImages.makeLinearGradientLine = function(gradient, frame) {
    return {
      startpoint: convertNormalizedCGPointInFrame(gradient.from(), frame),
      endpoint: convertNormalizedCGPointInFrame(gradient.to(), frame)
    };
  };
  var makeLinearGradientLine = MovingImages.makeLinearGradientLine;
  
  MovingImages.colorsFromGradientStops = function(stops) {
    var numColors = stops.count();
    var colors = [];
    for (i = 0 ; i < numColors ; ++i) {
      colors.push(convertMSColor(stops.objectAtIndex(i).color()));
    }
    return colors;
  };
  var colorsFromGradientStops = MovingImages.colorsFromGradientStops;

  MovingImages.positionsFromGradientStops = function(stops) {
    var numPositions = stops.count();
    var positions = [];
    for (i = 0 ; i < numPositions ; ++i) {
      positions.push(stops.objectAtIndex(i).position());
    }
    return positions;
  };
  var positionsFromGradientStops = MovingImages.positionsFromGradientStops;

  MovingImages.getObjectProperties = function(theObject) {
    var name = "(without name)";
    if (theObject.name) {
      name = theObject.name();
    }
    var result = "object class: " + theObject.class() + " name: " + name;
    return result;
  };
  var getObjectProperties = MovingImages.getObjectProperties;
  
  MovingImages.getRectangleProperties = function(rectangleObject) {
    if (String(rectangleObject.class()) !== "MSRectangleShape") {
      return "Not a MSRectangleShape";
    }
    var result = "Rectangle name: " + rectangleObject.name() + "; fixedRadius: " + rectangleObject.fixedRadius();
    var theFrame = rectangleObject.frame();
    result += "; width: " + theFrame.width() + "; height: " + theFrame.height();
    result += "; x: " + theFrame.x() + "; y: " + theFrame.y() + "\n";
    result += rectangleObject.bezierPath().svgPathAttribute();
    return result;
  };

  MovingImages.getPolygonProperties = function(polygonObject) {
    if (String(polygonObject.class()) !== "MSPolygonShape") {
      return "Not a MSPolygonShape";
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
  };
  var MSBlendModeToMIBlendMode = MovingImages.MSBlendModeToMIBlendMode;
  
  MovingImages.makeJSONFillRect = function(layer, fill, style) {
    var frame = layer.frame();
    var fillRect = {
      rect: convertMSRect(frame),
      elementtype: "fillrectangle"
    };
    var fixedRadius = layer.fixedRadius();
    fixedRadius = Math.min(fixedRadius, frame.width() * 0.5, frame.height() * 0.5);
    if (fixedRadius > 0.00001) {
      fillRect.radius = fixedRadius;
      fillRect.elementtype =  "fillroundedrectangle";
    }
    fillRect.fillcolor = convertMSColor(fill.color());
    fillRect.blendmode = MSBlendModeToMIBlendMode(fill.contextSettingsGeneric().blendMode());
    fillRect.opacity = fill.contextSettingsGeneric().opacity();

    var shadows = style.shadows();
    if (shadows.count() > 0) {
      var shadow = shadows.objectAtIndex(0);
      if (String(shadow.class()) === "MSStyleShadow" && shadow.isEnabled()) {
        fillShape.shadow = makeShadow(shadow);
      }
    }
    
    var innerShadows = style.innerShadows();
    if (innerShadows.count() > 0) {
      var shadow = innerShadows.objectAtIndex(0);
      if (String(shadow.class()) === "MSStyleInnerShadow" && shadow.isEnabled()) {
        fillShape.innershadow = makeShadow(shadow);
      }
    }
    return fillRect;
  };
  var makeJSONFillRect = MovingImages.makeJSONFillRect;

  MovingImages.makeShadow = function(shadow) {
    var shadow = {
      blur: "$scale * " + shadow.blurRadius(),
      fillcolor: convertMSColor(shadow.color()),
      offset: { width: "$scale * " + shadow.offsetX(), height: "-$scale * " + shadow.offsetY() }
    }
    return shadow;
  }
  var makeShadow = MovingImages.makeShadow;

  MovingImages.makeJSONFillShape = function(layer, fill, style) {
    // TODO: Will need to deal with fillType here.
    var fillType = fill.fillType();

    var fillShape = {};
    
    switch(fillType) {
      case 0:
        fillShape.elementtype = "fillpath";
        fillShape.svgpath = String(layer.bezierPath().svgPathAttribute().stringValue());
        fillShape.fillcolor = convertMSColor(fill.color());
        fillShape.blendmode = MSBlendModeToMIBlendMode(fill.contextSettingsGeneric().blendMode());
        fillShape.opacity = fill.contextSettingsGeneric().opacity();
        break;
      case 1:
        var gradient = fill.gradient();
        var frame = layer.frame();
        var stops = gradient.stops();
        fillShape.elementtype = "lineargradientfill";
        fillShape.svgpath = String(layer.bezierPath().svgPathAttribute().stringValue());
        fillShape.blendmode = MSBlendModeToMIBlendMode(fill.contextSettingsGeneric().blendMode());
        fillShape.opacity = fill.contextSettingsGeneric().opacity();
        fillShape.line = makeLinearGradientLine(gradient, frame);
        fillShape.arrayofcolors = colorsFromGradientStops(stops);
        fillShape.arrayoflocations = positionsFromGradientStops(stops);
        break;
      default:
        fillShape.elementtype = "layerfillshape";
        break;
    }
    var shadows = style.shadows();
    if (shadows.count() > 0) {
      var shadow = shadows.objectAtIndex(0);
      if (String(shadow.class()) === "MSStyleShadow" && shadow.isEnabled()) {
        fillShape.shadow = makeShadow(shadow);
      }
    }
    
    var innerShadows = style.innerShadows();
    if (innerShadows.count() > 0) {
      var shadow = innerShadows.objectAtIndex(0);
      if (String(shadow.class()) === "MSStyleInnerShadow" && shadow.isEnabled()) {
        fillShape.innershadow = makeShadow(shadow);
        fillShape.elementtype = "fillinnershadowpath";
      }
    }  
    return fillShape;
  };
  var makeJSONFillShape = MovingImages.makeJSONFillShape;

  MovingImages.processFillLayer = function(layer, fill, style) {
    var elementType = "fillpath";
    
    if (layer.path().isRectangle()) {
      elementType = "fillrectangle";
    }
    else if (String(layer.class()) === "MSOvalShape") {
      elementType = "filloval";
    }
    var fillType = fill.fillType();
    if (fillType === 0 && elementType === "fillrectangle") {
      return makeJSONFillRect(layer, fill, style);
    }
    else {
      return makeJSONFillShape(layer, fill, style);
    }
  };
  var processFillLayer = MovingImages.processFillLayer;
  
  // This takes a frame, and makes the rectangle wider and taller by amount
  // while keeping rectangle centred. The value amount can be negative.
  // @returns a JavaScript object.
  MovingImages.insetRect = function(frame, amount) {
    return {
      origin: {
        x: frame.x() - 0.5 * amount,
        y: frame.y() - 0.5 * amount
      },
      size: {
        width: frame.width() + amount,
        height: frame.height() + amount
      }
    };
  };
  var insetRect = MovingImages.insetRect;
  
  MovingImages.adjustRadius = function(radius, position, lineWidth, rectangle) {
    var fixedRadius = radius;
    if (position === 2) {
      if (fixedRadius > 0.0001 * lineWidth) {
        fixedRadius += 0.5 * lineWidth;
      }
    }
    else if (position === 1) {
      fixedRadius -= 0.5 * lineWidth;
      if (fixedRadius < 0.0) {
        fixedRadius = 0.0
      }
    }
    fixedRadius = Math.min(fixedRadius, rectangle.size.width * 0.5, rectangle.size.height * 0.5);
    return fixedRadius;
  };
  var adjustRadius = MovingImages.adjustRadius;
  
  MovingImages.makeJSONOvalOrRectBorder = function(layer, border, borderOptions) {
    // For now assume only non zero fill types.
    // Assume border is centred on outline.
    var frame = layer.frame();
    var rectangle = convertMSRect(frame);
    var lineWidth = border.thickness();
    var position = border.position();
    var fixedRadius = layer.fixedRadius();
    
    if (position === 2) {
      rectangle = insetRect(frame, lineWidth);
    }
    else if (position === 1) {
      rectangle = insetRect(frame, -lineWidth);
    }
    var borderRect = {
      rect: rectangle,
      elementtype: "strokerectangle",
      linewidth: lineWidth
    };
    fixedRadius = adjustRadius(fixedRadius, position, lineWidth, rectangle);
    if (fixedRadius > 0.00001) {
      borderRect.radius = fixedRadius;
      borderRect.elementtype = "strokeroundedrectangle";
    }
    borderRect.strokecolor = convertMSColor(border.color());
    borderRect.blendmode = MSBlendModeToMIBlendMode(border.contextSettingsGeneric().blendMode());
    borderRect.opacity = border.contextSettingsGeneric().opacity();
    return borderRect;
  };
  var makeJSONOvalOrRectBorder = MovingImages.makeJSONOvalOrRectBorder;

  MovingImages.makeJSONBorderShape = function(layer, border, borderOptions) {
    // For now assume only non zero fill types.
    // Assume border is centred on outline.

    return {
      elementtype: "strokepath",
      svgpath: String(layer.bezierPath().svgPathAttribute().stringValue()),
      strokecolor: convertMSColor(border.color()),
      blendmode: MSBlendModeToMIBlendMode(border.contextSettingsGeneric().blendMode()),
      opacity: border.contextSettingsGeneric().opacity(),
      linewidth: border.thickness()
    };
  };
  var makeJSONBorderShape = MovingImages.makeJSONBorderShape;
  
  MovingImages.processBorderLayer = function(layer, border, borderOptions) {
    var elementType = "strokepath";
    
    if (layer.path().isRectangle()) {
      elementType = "strokerectangle";
    }
    else if (String(layer.class()) === "MSOvalShape") {
      elementType = "strokeoval"
    }
    
    var fillType = border.fillType();
    if (fillType === 0 && (elementType === "strokerectangle" || elementType === "strokeoval")) {
      return makeJSONOvalOrRectBorder(layer, border, borderOptions);
    }
    else {
      return makeJSONBorderShape(layer, border, borderOptions);
    }
  };
  var processBorderLayer = MovingImages.processBorderLayer;
  
  MovingImages.processTextLayer = function(layer) {
    var attributedString = layer.attributedString().attributedString();

    var textElement = { elementtype: "drawbasicstring" };
    textElement.stringtext = String(attributedString.string());

    var attributes = [attributedString attributesAtIndex:0 effectiveRange:null];
    var nsFont = attributes.objectForKey(@"NSFont");
    textElement.postscriptfontname = String(nsFont.fontName());
    textElement.fontsize = nsFont.pointSize();
    var frame = layer.frame();
    textElement.point = { x: 0.0, y: 0.0 };
    textElement.blendmode = MSBlendModeToMIBlendMode(layer.style().contextSettingsGeneric().blendMode());
    textElement["fillcolor"] = convertNSColor(attributes.objectForKey(@"NSColor"));
    var style = layer.style();
    var shadows = style.shadows();
    if (shadows.count() > 0) {
      var shadow = shadows.objectAtIndex(0);
      if (String(shadow.class()) === "MSStyleShadow" && shadow.isEnabled()) {
        textElement.shadow = makeShadow(shadow);
      }
    }
    
    var innerShadows = style.innerShadows();
    if (innerShadows.count() > 0) {
      var shadow = innerShadows.objectAtIndex(0);
      if (String(shadow.class()) === "MSStyleInnerShadow" && shadow.isEnabled()) {
        textElement.innershadow = makeShadow(shadow);
      }
    }  

    textElement.contexttransformation = [
      {
        transformationtype: "translate",
        translation: {
          x: frame.x(),
          y: frame.y() + nsFont.pointSize()
        }
      },
      {
        transformationtype: "scale",
        scale: {
          x: 1.0,
          y: -1.0
        }
      }
    ];
    return textElement;
  };
  var processTextLayer = MovingImages.processTextLayer;
  
  MovingImages.processShapeGroup = function(shapeGroup) {
    var layers = shapeGroup.layers();
    var numLayers = layers.count();
    var style = shapeGroup.style();
    var fills = style.fills();
    var numFills = fills.count();
    var borders = style.borders();
    var numBorders = borders.count();
    
    var elements = [];
    var layer;
    
    // var shadows = shapeGroup.style().shadows();
    for (var i = 0; i < numLayers; ++i) {
      for (var j = 0; j < numFills; ++j) {
        var layer = layers.objectAtIndex(i);
        var fill = fills.objectAtIndex(j);
        if (fill.isEnabled() && (String(layer.class()) !== "MSTextLayer")) {
          elements.push(processFillLayer(layer, fill, style));
        }
      }
    }
    
    for (i = 0; i < numLayers; ++i) {
      var layer = layers.objectAtIndex(i);
      if (layer.class() === "MSTextLayer") {
        elements.push(processTextLayer(layer))
      }
    }
    
    var borderOptions = style.borderOptions();
    for (i = 0; i < numLayers; ++i) {
      for (j = 0; j < numBorders; ++j) {
        var layer = layers.objectAtIndex(i);
        var border = borders.objectAtIndex(j);
        if (border.isEnabled()  && (String(layer.class()) !== "MSTextLayer")) {
          elements.push(processBorderLayer(layer, border, borderOptions));
        }
      }
    }
    return {
      elementtype: "arrayofelements",
      arrayofelements: elements,
      contexttransformation: [
        {
          transformationtype: "translate",
          translation: {
            x: shapeGroup.frame().x(),
            y: shapeGroup.frame().y()
          }
        }
      ]
    };
  };
  var processShapeGroup = MovingImages.processShapeGroup;
  
  MovingImages.processLayerGroup = function(layerGroup) {
    var layers = layerGroup.layers();
    var numLayers = layers.count();
    var elements = [];
    for (var i = 0; i < numLayers; ++i) {
      var layer = layers.objectAtIndex(i);
      var layerClass = String(layer.class());
      switch (layerClass) {
        case "MSLayerGroup":
          elements.push(processLayerGroup(layer));
          break;
        case "MSShapeGroup":
          elements.push(processShapeGroup(layer));
          break;
        case "MSTextLayer":
          // log("Process text layer.")
          elements.push(processTextLayer(layer));
          break;
        default:
          // log(layer.treeAsDictionary());
          break;
      }
    }
    return {
      elementtype: "arrayofelements",
      arrayofelements: elements
    };
  };
  var processLayerGroup = MovingImages.processLayerGroup;
  
  function createDefaultTransform() {
    return [
      {
        transformationtype: "translate",
        translation: {
          x: "$offset",
          y: "$height - $offset"
        }
      },
      {
        transformationtype: "scale",
        scale: {
          x: "$scale",
          y: "-$scale"
        }
      }
    ];
  }
  
  MovingImages.processItemInSelection = function(item) {
    var itemClass = String(item.class());
    var movingImages = {};
    var groupBounds = {};
    switch (itemClass) {
      case "MSLayerGroup":
        movingImages = processLayerGroup(item);
        groupBounds = item.frame();
        break;
      case "MSShapeGroup":
        movingImages = processShapeGroup(item);
        groupBounds = convertCGRect(item.rect());
        break;
      default:
        movingImages = null;
    }
    if (movingImages === null) {
      return { elementtype: "arrayofelements" };
    }
    movingImages.viewBox = convertCGRect(item.bounds());
    movingImages.contexttransformation = createDefaultTransform()
    return movingImages;
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