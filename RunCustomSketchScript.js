@import '~/github/movingimages_sketch/MovingImages.js';

log(context);

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
      log(MovingImages.convertMSRect(frame))
      var rect = frame.rect()
      
      var bezier = layer.bezierPathInRect(rect) // This returns an NSBezierPath
      var svgPath = bezier.svgPathAttribute()
      log(svgPath)

      log(layer.immutableModelObject().svgPathAttribute(exporter))
      log('Frame origin.x: ' + frame.x() + ' .y: ' + frame.y())
      var borders = layer.style().borders()
      var gradient = borders.objectAtIndex(0).gradient()
      log(gradient.treeAsDictionary())
      var gradientPoints = gradient.points()
      log(gradientPoints.class())
      var point0 = gradientPoints.points().objectAtIndex(0)
      log(point0)
      log(MovingImages.convertStringToPoint(point0))
      log(point0.class())
      log(MovingImages.convertPointsToLine(gradientPoints))
    }
    log('I am here')
    fill = layer.style().fills().objectAtIndex(0);
    log(fill.color())
    // fill.color = MSColor.colorWithSVGString("#d00");
    log(MovingImages.convertMSColor(fill.color()))
    var newColor = fill.color().colorWithAlpha(0.5);
    log(MovingImages.convertMSColor(newColor))
    log(newColor);
    log(newColor.hexValue());
    log(newColor.alpha());
  }
};
