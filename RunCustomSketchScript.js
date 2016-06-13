@import 'MovingImages.js';

miLog('This is the mi log text');

log(context);

var documentName = context.document.displayName();
log('The current document is named: ' + documentName);

var selectedLayers = context.selection;
var selectedCount = selectedLayers.count();

if (selectedCount == 0) {
  log('No layers are selected.');
} else {
  log('Selected layers:');
  var exporter = SketchSVGExporter.new()
  for (var i = 0; i < selectedCount; i++) {
    var layer = selectedLayers[i];
    log((i+1) + '. ' + layer.class());
    if (layer.class() == 'MSShapeGroup') {
      // miLog(layer.treeAsDictionary())
      var frame = layer.frame()
      miLog(miConvertMSRect(frame))
      var rect = frame.rect()
      
      var bezier = layer.bezierPathInRect(rect) // This returns an NSBezierPath
      // var rect = [[layer frame] rect];
      // var bezier = [layer bezierPathInRect:rect];
      var svgPath = bezier.svgPathAttribute()
      miLog(svgPath)

      log(layer.immutableModelObject().svgPathAttribute(exporter))
      miLog('Frame origin.x: ' + frame.x() + ' .y: ' + frame.y())
      // miLog(miConvertMSRect(frame))
      var borders = layer.style().borders()
      // miLog(borders.objectAtIndex(0).treeAsDictionary())
      var gradient = borders.objectAtIndex(0).gradient()
      miLog(gradient.treeAsDictionary())
      var gradientPoints = gradient.points()
      miLog(gradientPoints.class())
      var point0 = gradientPoints.points().objectAtIndex(0)
      miLog(point0)
      miLog(miConvertStringToPoint(point0))
      miLog(point0.class())
      miLog(miConvertPointsToLine(gradientPoints))
      // miLog(borders.treeAsDictionary())
      // miLog(layer.layers())
      // miLog(layer.treeAsDictionary())
      // var subLayers = layer.layers()
      // var subLayersCount = subLayers.count()
      // miLog(subLayers)
      // miLog('Num subLayers: ' + subLayersCount)
      // miLog(subLayers.treeAsDictionary())
      // subLayer = subLayers[0]
      // miLog(subLayer)
      // miLog(subLayer.class())
//      for (var j = 0; j < subLayersCount; ++j) {
//        miLog('i: ' + i 'j: ' + j + subLayers[j].class())
//      }
    }
    miLog('I am here')
    fill = layer.style().fills().objectAtIndex(0);
    miLog(fill.color())
    // fill.color = MSColor.colorWithSVGString("#d00");
    miLog(miConvertMSColor(fill.color()))
    var newColor = fill.color().colorWithAlpha(0.5);
    miLog(miConvertMSColor(newColor))
    miLog(newColor);
    miLog(newColor.hexValue());
    miLog(newColor.alpha());
  }
};
