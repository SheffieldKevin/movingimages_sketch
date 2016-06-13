@import '~/github/movingimages_sketch/MovingImages.js';

log('This is the mi log text');

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
      // log(layer.treeAsDictionary())
      var frame = layer.frame()
      log(miConvertMSRect(frame))
      var rect = frame.rect()
      
      var bezier = layer.bezierPathInRect(rect) // This returns an NSBezierPath
      // var rect = [[layer frame] rect];
      // var bezier = [layer bezierPathInRect:rect];
      var svgPath = bezier.svgPathAttribute()
      log(svgPath)

      log(layer.immutableModelObject().svgPathAttribute(exporter))
      log('Frame origin.x: ' + frame.x() + ' .y: ' + frame.y())
      // log(miConvertMSRect(frame))
      var borders = layer.style().borders()
      // log(borders.objectAtIndex(0).treeAsDictionary())
      var gradient = borders.objectAtIndex(0).gradient()
      log(gradient.treeAsDictionary())
      var gradientPoints = gradient.points()
      log(gradientPoints.class())
      var point0 = gradientPoints.points().objectAtIndex(0)
      log(point0)
      log(miConvertStringToPoint(point0))
      log(point0.class())
      log(miConvertPointsToLine(gradientPoints))
      // log(borders.treeAsDictionary())
      // log(layer.layers())
      // log(layer.treeAsDictionary())
      // var subLayers = layer.layers()
      // var subLayersCount = subLayers.count()
      // log(subLayers)
      // log('Num subLayers: ' + subLayersCount)
      // log(subLayers.treeAsDictionary())
      // subLayer = subLayers[0]
      // log(subLayer)
      // log(subLayer.class())
//      for (var j = 0; j < subLayersCount; ++j) {
//        log('i: ' + i 'j: ' + j + subLayers[j].class())
//      }
    }
    log('I am here')
    fill = layer.style().fills().objectAtIndex(0);
    log(fill.color())
    // fill.color = MSColor.colorWithSVGString("#d00");
    log(miConvertMSColor(fill.color()))
    var newColor = fill.color().colorWithAlpha(0.5);
    log(miConvertMSColor(newColor))
    log(newColor);
    log(newColor.hexValue());
    log(newColor.alpha());
  }
};
