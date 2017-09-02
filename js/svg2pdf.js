'use strict';
var svg2pdf = (function() {

function parse_path(d) {
	if (!d) return null;

	var res = [];

	var x = 0;
	var y = 0;
	var i; // no let :(
	var acc;
	var cur;

	function _new_subpath() {
		acc = [];
		cur = {
			x1: x,
			y1: y,
			acc: acc,
			closed: false,
		};
		res.push(cur);
	}

	while (d && !/^\s*$/.test(d)) {
		var m = /^\s*([ZzvVhHmMlLcA])(?:\s*(-?[0-9.]+(?:(?:\s*,\s*|\s+)-?[0-9.]+)*))?/.exec(d);
		if (!m) {
			console.error('Unsupported path data: ' + JSON.stringify(d));
			return;
		}
		var c = m[1];
		var args = m[2] ? m[2].split(/\s*,\s*|\s+/).map(parseFloat) : [];
		d = d.substring(m[0].length);
		var a1 = args[0];
		var a2 = args[1];

		if ((c === 'z') || (c === 'Z')) {
			// acc.push([cur.x1 - x, cur.y1 - y]);
			x = cur.x1;
			y = cur.y1;
			cur.closed = true;
		} else if (c === 'v') {
			args.forEach(function(a) {
				acc.push([0, a]);
				y += a;
			});
		} else if (c === 'V') {
			args.forEach(function(a) {
				acc.push([0, a - y]);
				y = a;
			});
		} else if (c === 'h') {
			args.forEach(function(a) {
				acc.push([a, 0]);
				x += a;
			});
		} else if (c === 'H') {
			args.forEach(function(a) {
				acc.push([a - x, 0]);
				x = a;
			});
		} else if (c === 'l') {
			for (i = 0; i < args.length;i += 2) {
				acc.push([args[i], args[i + 1]]);
				x += args[i];
				y += args[i + 1];
			}
		} else if (c === 'L') {
			for (i = 0; i < args.length;i += 2) {
				acc.push([args[i] - x, args[i + 1] - y]);
				x = args[i];
				y = args[i + 1];
			}
		} else if (c === 'm') {
			x += a1;
			y += a2;
			_new_subpath();

			for (i = 2; i < args.length;i += 2) {
				acc.push([args[i], args[i + 1]]);
				x += args[i];
				y += args[i + 1];
			}
		} else if (c === 'M') {
			x = a1;
			y = a2;
			_new_subpath();

			for (i = 2; i < args.length;i += 2) {
				acc.push([args[i] - x, args[i + 1] - y]);
				x = args[i];
				y = args[i + 1];
			}
		} else if (c === 'c') {
			for (i = 0;i < args.length;i += 6) {
				acc.push(args.slice(i, i + 6));
				x += args[i + 4];
				y += args[i + 5];
			}
		} else if (c === 'A') {
			// TODO: arc
			for (i = 0;i < args.length;i += 6) {
				acc.push(args.slice(i, i + 6));
				x += args[i + 4];
				y += args[i + 5];
			}
		}
	}
	return res;
}

function render_page(svg, pdf) {
	var nodes = svg.querySelectorAll('*');
	for (var i = 0;i < nodes.length;i++) {
		// Due to absence of let, declare vars here
		var x;
		var y;
		var m;
		var width;
		var height;

		var n = nodes[i];
		var style = window.getComputedStyle(n);

		if (style.visibility === 'hidden') {
			continue;
		}

		var mode = '';
		if (style.fill != 'none') {
			m = style.fill.match(/^rgb\(([0-9]+),\s*([0-9]+),\s*([0-9]+)\)|#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/);
			var r = 0;
			var g = 0;
			var b = 0;
			if (m && m[1]) {
				r = parseInt(m[1], 10);
				g = parseInt(m[2], 10);
				b = parseInt(m[3], 10);
			} else if (m && m[4]) {
				r = parseInt(m[4], 16);
				g = parseInt(m[5], 16);
				b = parseInt(m[6], 16);
			}
			pdf.setFillColor(r, g, b);
			mode += 'F';
		}
		if (style.stroke != 'none') {
			var stroke_width = parseFloat(style['stroke-width']);
			pdf.setLineWidth(stroke_width);

			if (stroke_width > 0) {
				mode += 'D';
			}
		}

		switch (n.tagName.toLowerCase()) {
		case 'line':
			var x1 = parseFloat(n.getAttribute('x1'));
			var x2 = parseFloat(n.getAttribute('x2'));
			var y1 = parseFloat(n.getAttribute('y1'));
			var y2 = parseFloat(n.getAttribute('y2'));

			var dash_len = undefined;
			var gap_len = undefined;
			var style_dasharray = style['stroke-dasharray'];
			if ((m = style_dasharray.match(/^([0-9.]+)\s*px,\s*([0-9.]+)\s*px$/))) {
				dash_len = parseFloat(m[1]);
				gap_len = parseFloat(m[2]);
			} else if ((m = style_dasharray.match(/^([0-9.]+)\s*px$/))) {
				dash_len = parseFloat(m[1]);
				gap_len = dash_len;
			}

			if (dash_len !== undefined) {
				x = x1;
				y = y1;

				// Normalize vector
				var vector_len = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
				var dx = (x2 - x1) / vector_len;
				var dy = (y2 - y1) / vector_len;
				var remaining_len = vector_len;
				while (remaining_len > 0) {
					dash_len = Math.min(dash_len, remaining_len);
					var next_x = x + dx * dash_len;
					var next_y = y + dy * dash_len;
					pdf.line(x, y, next_x, next_y);
					remaining_len -= dash_len;
					x = next_x + dx * gap_len;
					y = next_y + dy * gap_len;
					remaining_len -= gap_len;
				}
			} else {
				pdf.line(x1, y1, x2, y2);
			}
			break;
		case 'rect':
			x = parseFloat(n.getAttribute('x'));
			y = parseFloat(n.getAttribute('y'));
			width = parseFloat(n.getAttribute('width'));
			height = parseFloat(n.getAttribute('height'));
			pdf.rect(x, y, width, height, mode);
			break;
		case 'ellipse':
			var cx = parseFloat(n.getAttribute('cx'));
			var cy = parseFloat(n.getAttribute('cy'));
			var rx = parseFloat(n.getAttribute('rx'));
			var ry = parseFloat(n.getAttribute('ry'));
			pdf.ellipse(cx, cy, rx, ry, mode);
			break;
		case 'path':
			var paths = parse_path(n.getAttribute('d'));
			if (paths) {
				paths.forEach(function(path, path_idx) {
					var path_style = (path_idx === paths.length - 1) ? mode : null;
					pdf.lines(path.acc, path.x1, path.y1, [1, 1], path_style, path.closed);
				});
			}
			break;
		case 'text':
			x = parseFloat(n.getAttribute('x'));
			y = parseFloat(n.getAttribute('y'));

			switch (style['text-anchor']) {
			case 'middle':
				x -= (n.getBBox().width / 2);
				break;
			case 'end':
				x -= n.getBBox().width;
				break;
			}

			pdf.setFontStyle((style['font-weight'] == 'bold') ? 'bold' : 'normal');
			pdf.setFontSize(72 / 25.4 * parseFloat(style['font-size']));
			var str = $(n).text();

			var transform = n.getAttribute('transform');
			if (transform) {
				var transform_m = transform.match(/^rotate\(\s*(-?[0-9.]+)\s+(-?[0-9.]+),(-?[0-9.]+)\)$/);
				if (!transform_m) {
					pdf.text(x, y, str);
					break;
				}

				var angle = parseFloat(transform_m[1]);
				var corex = parseFloat(transform_m[2]);
				var corey = parseFloat(transform_m[3]);

				var diffx = x - corex;
				var diffy = y - corey;

				var nx = corex + diffx * Math.cos(angle * Math.PI / 180) - diffy * Math.sin(angle * Math.PI / 180);
				var ny = corey + diffx * Math.sin(angle * Math.PI / 180) + diffy * Math.cos(angle * Math.PI / 180);
				pdf.text(nx, ny, str, null, -angle);
			} else {
				pdf.text(x, y, str);
			}

			break;
		case 'image':
			var imgData = n.getAttribute('xlink:href');
			x = parseFloat(n.getAttribute('x'));
			y = parseFloat(n.getAttribute('y'));
			width = parseFloat(n.getAttribute('width'));
			height = parseFloat(n.getAttribute('height'));
			pdf.addImage(imgData, x, y, width, height);
			break;
		}
	}
}

function make(svg_nodes, props, orientation) {
	var pdf = new jsPDF({
		orientation: orientation,
		unit: 'mm',
		format: 'a4',
		autoAddFonts: false,
	});
	pdf.addFont('Helvetica', 'helvetica', 'normal');
	pdf.addFont('Helvetica-Bold', 'helvetica', 'bold');
	pdf.setFont('helvetica', 'normal');

	for (var i = 0;i < svg_nodes.length;i++) {
		if (i > 0) {
			pdf.addPage();
		}
		render_page(svg_nodes[i], pdf);
	}
	pdf.setProperties(props);
	return pdf;
}

function save(svg_nodes, props, orientation, filename) {
	var pdf = make(svg_nodes, props, orientation);
	pdf.save(filename);
}

return {
	make: make,
	save: save,
	// Testing only
	parse_path: parse_path,
};

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	module.exports = svg2pdf;
}
/*/@DEV*/