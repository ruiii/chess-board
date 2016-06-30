var Chessman = Object.create(HTMLElement.prototype);
var Block = Object.create(HTMLElement.prototype);
var ChessNomal = Object.create(HTMLElement.prototype);
var DoubleBlock = Object.create(HTMLElement.prototype);
var TriangleParts = Object.create(HTMLElement.prototype);
var Triangle = Object.create(HTMLElement.prototype);

var chessman = document.registerElement('chess-man', {prototype: Chessman});
var chessNomal = document.registerElement('chess-normal', {prototype: ChessNomal});
var TriangleParts = document.registerElement('triangle-parts', {prototype: TriangleParts});

DoubleBlock.createdCallback = function() {
  this.innerHTML = '<chess-man></chess-man>';
};
Block.createdCallback = function() {
  this.innerHTML = '<chess-man></chess-man>';
};

var block = document.registerElement('normal-block', {prototype: Block});
var doubleBlock = document.registerElement('double-block', {prototype: DoubleBlock});

Triangle.createdCallback = function() {
  this.innerHTML = "<div style='display:flex;'><normal-block style='opacity:0;'></normal-block>" +
                  '<triangle-parts></triangle-parts></div>' +
                  "<div style='display:flex;'><triangle-parts></triangle-parts>" +
                  "<normal-block></normal-block></div>";
};

var triangle = document.registerElement('triangle-normal', {prototype: Triangle});
var Home = Object.create(HTMLElement.prototype);
var VerticalBlocks = Object.create(HTMLElement.prototype);
var HorizontalBlocks = Object.create(HTMLElement.prototype);
var FirstBlocks = Object.create(HTMLElement.prototype);

Home.createdCallback = function() {
  this.innerHTML = "<div style='display:flex;'>" +
                  '<chess-normal></chess-normal><chess-normal></chess-normal></div>' +
                  "<div style='display:flex;'>" +
                  '<chess-normal></chess-normal><chess-normal></chess-normal></div>';
};
VerticalBlocks.createdCallback = function() {
  this.innerHTML = "<double-block class='vertical'></double-block>" +
                  "<double-block class='vertical'></double-block>" +
                  "<double-block class='vertical'></double-block>" +
                  "<double-block class='vertical'></double-block>" +
                  "<double-block class='vertical'></double-block>";
};
HorizontalBlocks.createdCallback = function() {
  this.innerHTML = "<double-block class='horizontal'></double-block>" +
                  "<double-block class='horizontal'></double-block>" +
                  "<double-block class='horizontal'></double-block>" +
                  "<double-block class='horizontal'></double-block>" +
                  "<double-block class='horizontal'></double-block>";
};
FirstBlocks.createdCallback = function() {
  this.innerHTML = '<tri-blocks></tri-blocks>' +
                  '<double-block></double-block>' +
                  '<double-block></double-block>' +
                  '<tri-blocks></tri-blocks>';
};

var home = document.registerElement('chess-home', {prototype: Home});
var verticalBlocks = document.registerElement('vertical-blocks', {prototype: VerticalBlocks});
var horizontalBlocks = document.registerElement('horizontal-blocks', {prototype: HorizontalBlocks});
var firstBlocks = document.registerElement('first-blocks', {prototype: FirstBlocks});

var vb = new verticalBlocks();
var hb = new horizontalBlocks();
var fb = new firstBlocks();

var T = Object.create(HTMLElement.prototype);
T.attributeChangedCallback = function () {
  var html = '';
  var blocks = [ [0, 0], [0, 0] ];
  var $this = $(this);
  var colors = {
    red: '#e95a6f',
    yellow: '#fdd100',
    blue: '#80cef3',
    green: '#acce22',
  };
  var pos = '';
  var color = '';
  var def_border_s = '25px solid';
  var tri_style = {};

  // color
  if ($this.hasClass('red')) {
    color = 'red'
  } else if ($this.hasClass('blue')) {
    color = 'blue'
  } else if ($this.hasClass('yellow')) {
    color = 'yellow'
  } else {
    color = 'green';
  }

  // pos & style
  if ($this.hasClass('bottom')) {
    pos = 'bottom ';
    tri_style['border-bottom'] = def_border_s + ' ' + colors[color];
  } else {
    pos = 'top ';
    tri_style['border-top'] = def_border_s + ' ' + colors[color];
  }
  if ($this.hasClass('right')) {
    pos += 'right';
    tri_style['border-right'] = def_border_s + ' ' + colors[color];
  } else {
    pos += 'left';
    tri_style['border-left'] = def_border_s + ' ' + colors[color];
  }
  switch (pos) {
    case 'bottom right':
      blocks = [ [0, 2], [2, 1] ];
      break;
    case 'bottom left':
      blocks = [ [2, 0], [1, 2] ];
      break;
    case 'top right':
      blocks = [ [2, 1], [0, 2] ];
      break;
    case 'top left':
      blocks = [ [1, 2], [2, 0] ];
      break;
  }

  for (var y = 0; y < blocks.length; y++) {
    html += "<div style='display:flex;'>\n";
    for (var x = 0; x < blocks[y].length; x++) {
      switch (blocks[y][x]) {
        case 0:
          html += '<normal-block style="opacity:0;"></normal-block>';
          break;
        case 1:
          html += '<normal-block class="' + color + '"></normal-block>';
          break;
        case 2:
          var style = '';
          for (var n in tri_style) {
            style += n + ': ' + tri_style[n] + '; ';
          }
          html += '<triangle-parts style="' + style + '"></triangle-parts>';
          break;
      }
      html += '\n';
    }
    html += '</div>\n';
  }
  this.innerHTML = html;
};
T.createdCallback = T.attributeChangedCallback;
var ta = document.registerElement('tri-blocks', {prototype: T});

var Trapezoid = Object.create(HTMLElement.prototype);
Trapezoid.createdCallback = function() {
  this.innerHTML = fb.innerHTML;
};
Trapezoid.attributeChangedCallback = function () {
  if (this.lock) return;
  this.lock = true;

  var $this = $(this);
  var pos = 0;
  var isH = false;

  if ($this.hasClass('trape-horizontal')) {
    isH = true;
  }
  if ($this.hasClass('forth')) {
    pos = 3;
  } else if ($this.hasClass('third')) {
    pos = 2;
  } else if ($this.hasClass('second')) {
    pos = 1;
  } else {
    pos = 0;
  }

  var tris = $this.find('> tri-blocks');
  var blocks = $this.find('> double-block');

  // reverse
  blocks.addClass(isH ? 'vertical' : 'horizontal');

  var colorList = [
    ['yellow', 'green', 'red', 'blue'],
    ['green', 'red', 'blue', 'yellow'],
    ['red', 'blue', 'yellow', 'green'],
    ['blue', 'yellow', 'green', 'red'],
  ];
  var posList = [
    // horizontal
    [ 'bottom right', 'bottom left' ],
    [ 'bottom right', 'bottom left' ],
    [ 'top right', 'top left' ],
    [ 'top right', 'top left' ],

    // v
    [ 'bottom right', 'top right' ],
    [ 'bottom left', 'top left' ],
    [ 'bottom left', 'top left' ],
    [ 'bottom right', 'top right' ],
  ];
  var reverseColor = false;
  if (!isH && (pos === 0 || pos === 3)) {
    reverseColor = true;
  } else if (isH && (pos === 2 || pos === 3)) {
    reverseColor = true;
  }

  var blockList = [ $(tris[0]), $(blocks[0]), $(blocks[1]), $(tris[1]) ];
  $(tris[0]).addClass(posList[pos + (isH ? 0 : 4)][0]);
  $(tris[1]).addClass(posList[pos + (isH ? 0 : 4)][1]);
  if (reverseColor) {
    for (var i = 0; i < blockList.length; i++) {
      blockList[blockList.length - i - 1].addClass(colorList[pos][i]);
    }
  } else {
    for (var i = 0; i < blockList.length; i++) {
      blockList[i].addClass(colorList[pos][i]);
    }
  }

  this.lock = false;
};

var trapeBlocks = document.registerElement('trape-blocks', {prototype: Trapezoid});

$(hb).attr('style', '-webkit-transform: rotate(90deg);');


var SideBlocks = Object.create(HTMLElement.prototype);
SideBlocks.createdCallback = function() {
  this.innerHTML = hb.innerHTML;
};
SideBlocks.attributeChangedCallback = function () {
  if (this.lock) return;
  this.lock = true;

  var $this = $(this);
  var b = 0;

  if ($this.hasClass('right')) {
    b = 1;
  } else if ($this.hasClass('bottom')) {
    b = 2;
  } else if ($this.hasClass('left')) {
    b = 3;
  } else {
    // top
    b = 0;
  }

  var colorArrs = [
    ['yellow', 'green', 'red', 'blue', 'yellow'], // top
    ['green', 'red', 'blue', 'yellow', 'green'], // right
    ['red', 'green', 'yellow', 'blue', 'red'], // bottom
    ['blue', 'red', 'green', 'yellow', 'blue'], // left
  ];

  if ((b + 1) % 2 === 0) {
    this.innerHTML = hb.innerHTML;
  } else {
    this.innerHTML = vb.innerHTML;
    $(this).addClass('vertical-sort');
  }

  var one = $(this).find('double-block');

  for (var i = 0; i < 5; i++) {
    $(one[i]).addClass(colorArrs[b][i]);
  }

  this.lock = false;
}

var sideBlocks = document.registerElement('side-blocks', {prototype: SideBlocks});

$(document).ready(function(){

  var blocks = [
    {
      type: 'trape',
      cls: 'first trape-horizontal',
      pos: [ 4 * 50, 0 ]
    }, {
      type: 'trape',
      cls: 'first',
      pos: [ 0, 4 * 50 ]
    }, {
      type: 'side',  // side
      cls: 'top',
      pos: [ 0, 6 * 50 ] // top, left
    }, {
      type: 'trape',
      cls: 'second',
      pos: [ 0, 11 * 50 ]
    }, {
      type: 'trape',
      cls: 'second trape-horizontal',
      pos: [ 4 * 50, 11 * 50 ]
    }, {
      type: 'side',  // side
      cls: 'right',
      pos: [ 6 * 50, 15 * 50 ]
    }, {
      type: 'trape',
      cls: 'third trape-horizontal',
      pos: [ 11 * 50, 11 * 50 ]
    }, {
      type: 'trape',
      cls: 'third',
      pos: [ 11 * 50, 11 * 50 ]
    }, {
      type: 'side', // side
      cls: 'bottom',
      pos: [ 15 * 50, 6 * 50 ]
    }, {
      type: 'trape',
      cls: 'forth',
      pos: [ 11 * 50, 4 * 50 ]
    }, {
      type: 'trape',
      cls: 'forth trape-horizontal',
      pos: [ 11 * 50, 0 ]
    }, {
      type: 'side', // side
      cls: 'left',
      pos: [ 6 * 50, 0 ]
    },
  ];

  for (var i = 0; i < blocks.length; i++) {
    var b = blocks[i];
    var block;
    switch (b.type) {
      case 'side':
        block = new sideBlocks();
        break;
      case 'trape':
        block = new trapeBlocks();
        break;
    }
    $(block).addClass(b.cls).css({
      'position': 'absolute',
      'top': b.pos[0].toString() + 'px',
      'left': b.pos[1].toString() + 'px',
    });

    document.body.appendChild(block);
  }

  var tlist = [
    {
      trName: 'tg-normal',
      tdName: 'tg-blocks',
      color: 'green',
      rotate: '-45',
      marginLeft: -96,
      top: 400,
      left: 100
    },
    {
      trName: 'red-normal',
      tdName: 'red-blocks',
      color: 'red',
      rotate: '45',
      marginTop: -96,
      top: 100,
      left: 400
    },{
      trName: 'tb-normal',
      tdName: 'tb-blocks',
      color: 'blue',
      rotate: '135',
      marginLeft: -204,
      top: 400,
      left: 500
    },
    {
      trName: 'ty-normal',
      tdName: 'ty-blocks',
      color: 'yellow',
      rotate: '-135',
      marginTop: -204,
      top: 500,
      left: 400
    }
  ];

  for (var t in tlist) {

    var temp = new triangle();
    $($(temp).find('normal-block')[1]).addClass(tlist[t].color);
    $(temp).find('triangle-parts').addClass('third-' + tlist[t].color);

    var trPt = Object.create(HTMLElement.prototype);
    trPt.createdCallback = function() {
      this.innerHTML = temp.innerHTML;
    };
    var trDom = document.registerElement(tlist[t].trName, {prototype: trPt});

    var tinner = '<' + tlist[t].trName +
                " style='-webkit-transform: rotate(" + tlist[t].rotate +'deg);' +
                ((tlist[t].marginTop) ?
                ('margin-top:' + tlist[t].marginTop) :
                ('margin-left:' + tlist[t].marginLeft)) +
                "px;'></" + tlist[t].trName + '>';

    var inner = '<normal-block class=' + tlist[t].color + '></normal-block>' +
                    '<normal-block class=' + tlist[t].color + '></normal-block>' +
                    '<normal-block class=' + tlist[t].color + '></normal-block>' +
                    '<normal-block class=' + tlist[t].color + '></normal-block>' +
                    '<normal-block class=' + tlist[t].color + '></normal-block>' +
                    tinner;

    var tempPt = Object.create(HTMLElement.prototype);
    tempPt.createdCallback = function() {
      this.innerHTML = inner;
    };
    var tempDom = document.registerElement(tlist[t].tdName, {prototype: tempPt});

    var tb = new tempDom();
    $(tb).css({
      'top': tlist[t].top,
      'left': tlist[t].left
    });
    document.body.appendChild(tb);

  }

  var homes = [
    {
      color: 'border-green',
      top: 5,
      left: 5
    },
    {
      color: 'border-red',
      top: 5,
      left: 665
    },
    {
      color: 'border-yellow',
      top: 665,
      left: 5
    },
    {
      color: 'border-blue',
      top: 665,
      left: 665
    }
  ];

  var arrows = [
    {
      color: 'green',
      top: 208,
      left: 27,
      rotate: 'rotate(180deg)'
    },
    {
      color: 'red',
      top: 27,
      left: 628,
      rotate: 'rotate(-90deg)'
    },
    {
      color: 'yellow',
      top: 800,
      left: 192,
      rotate: 'rotate(90deg)'
    },
    {
      color: 'blue',
      top: 618,
      left: 806,
      rotate: 'rotate(0deg)'
    }
  ]

  for (var h in homes) {

    var hm = new home();
    $(hm).find('chess-normal').addClass(homes[h].color);
    $(hm).css({
      'top': homes[h].top,
      'left': homes[h].left
    });
    document.body.appendChild(hm);

    var go = "<div class='chess-home-go " + arrows[h].color + "'>GO</div>";
    $('body').append(go);
    $($('body').find('.chess-home-go')[h]).css({
      '-webkit-transform': arrows[h].rotate,
      'top': arrows[h].top,
      'left': arrows[h].left
    });

  }

});
