import React, { PureComponent } from 'react';
import G6 from '@antv/g6';
import Plugins from '@antv/g6-plugins';
const { Util, Net } = G6;
class Index extends PureComponent {
  static propTypes = {};

  static defaultProps = {
    type: 'iconNet',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //获取数据
    const { type, data } = this.props;
    let nodes = data[0];
    let edge = data[1];
    //获取dom
    let container = this.refs.container;
    //通过图表类型来判断间距
    let ranksep;
    if (type === 'tableNet') {
      ranksep = 400;
    } else if (type === 'iconNet') {
      ranksep = 120;
    }
    //布局插件及配置
    let pluginConfig = {
      rankdir: 'LR',
      nodesep: 30,
      ranksep: ranksep,
      useEdgeControlPoint: !1,
    };
    let plugin = new Plugins['layout.dagre'](pluginConfig);
    //判断图表类型、渲染
    if (type === 'tableNet') {
      this.registTableNetNode(container, nodes, edge, {}, plugin);
    } else if (type === 'iconNet') {
      this.registIconNetNode(container, nodes, edge, {}, plugin);
    }
  }

  componentWillReceiveProps(props, nextProps) {}
  registTableNetNode(container, nodes, edges, config, plugin) {
    let defaultConfig = {
      plugins: [plugin],
      animate: !0,
      container: container,
      fitView: 'autoZoom',
      fitViewPadding: 20,
      grid: {
        cell: 10,
      },
      modes: {
        default: [
          'dragNode',
          'dragEdge',
          'dragBlank',
          'resizeEdge',
          'resizeNode',
          'wheelZoom',
          'clickFocus',
        ],
      },
    };
    config = Object.assign(defaultConfig, config);
    console.log(config);
    G6.registNode('tableNet', {
      draw: function(cfg, group) {
        let x = 0;
        let y = 0;
        //当前节点的参数
        let model = cfg.model;
        let fields = model.fields;
        // let type = model.type;
        let closeed = model.closeed;
        let titleColor = model.titleColor || '#4D4D4D';

        let margin = 8;
        let padding = 16;
        let lineHeight = 30;

        let bgRect = group.addShape('rect');

        let fieldGroup = group.addGroup();
        let splitLineGroup = group.addGroup();
        let l = fields.length;

        let fontHeight;
        let anchorPoints = [];

        let titleBox;
        let fieldBox;
        let title;
        let titleBg = group.addShape('rect');
        let width;
        let height;
        let titleHeight;

        title = group.addShape('text', {
          attrs: {
            x: x,
            y: y + 20,
            text: model.title,
            fill: '#fff',
            textBaseLine: 'top',
            textAlign: 'left',
            fontWeight: 400,
            fontSize: 16,
          },
        });

        // let splitLine = group.addShape('line',{
        //     'attrs': {
        //         stroke: 'red'
        //     }
        // })

        if (!closeed) {
          Util.each(fields, function(field, i) {
            fieldGroup.addShape('text', {
              attrs: {
                x: x,
                y: y + i * lineHeight + 20,
                text: field.name,
                fill: '#666',
                textBaseLine: 'top',
                fontSize: 14,
              },
            });
          });
        } else {
          fieldGroup.addShape('text', {
            attrs: {
              x: x,
              y: y,
              text: '...',
              fill: '#666',
              textBaseLine: 'top',
              fontSize: 14,
            },
          });
        }

        titleBox = title.getBBox();
        fieldBox = fieldGroup.getBBox();
        width = Math.max(titleBox.width, fieldBox.width) + padding * 2 + margin * 2;
        height = padding * 4 + titleBox.height + fieldBox.height;
        titleHeight = -height / 2 + titleBox.height + padding * 2;

        // console.log(fieldGroup.get('children')[0].getBBox().height)
        fontHeight = l ? fieldGroup.get('children')[0].getBBox().height : 0;

        title.translate(-width / 2 + padding, -height / 2 + padding);
        fieldGroup.translate(-width / 2 + padding, titleHeight + padding);

        titleBg.attr({
          x: x - width / 2 + 0.5,
          y: y - height / 2 + 0.5,
          height: titleBox.height + padding * 2 - 1,
          width: width - 1,
          fill: titleColor,
          radius: 3.8,
        });

        bgRect.attr({
          x: x - width / 2,
          y: y - height / 2,
          width: width,
          height: height,
          stroke: '#ccc',
          fill: '#fff',
          radius: 4,
        });

        let rt = (titleBox.height / 2 + padding) / height;
        // anchorPoints.push([0, rt]),
        anchorPoints.push([1, rt]);

        !closeed &&
          Util.each(fields, function(field, i) {
            if (i !== l - 1) {
              splitLineGroup.addShape('line', {
                attrs: {
                  x1: x - width / 2,
                  x2: x + width / 2,
                  y1:
                    y +
                    titleHeight +
                    padding +
                    (i + 1) * lineHeight -
                    (lineHeight - fontHeight) / 2,
                  y2:
                    y +
                    titleHeight +
                    padding +
                    (i + 1) * lineHeight -
                    (lineHeight - fontHeight) / 2,
                  stroke: '#e2e2e2',
                  lineDash: [5, 15],
                },
              });
            }
            // var r = (titleBox.height + padding*3 + i*lineHeight + fontHeight/2)/height;
            // anchorPoints.push([0,r]),anchorPoints.push([1,r]);
          });
        group.set('anchorPoints', anchorPoints);
        return bgRect;
      },
      getAnchorPoints: function(cfg, group, edges) {
        return group.get('anchorPoints');
      },
      // getAnchorPoints: function(cfg, group, edges){
      //     return [[0.5,0], [0.5,1], [0,0.5], [1,0.5]];
      // }
    });
    let net = new Net(config);

    net.on('click', function(e) {
      if (e.itemType === 'node') {
        let item = e.item;
        let model = item.getModel();
        net.update(item, { closeed: !model.closeed });
        net.refresh();
      }
    });
    net
      .edge()
      .size(function(obj) {
        return 1.5;
      })
      .color(function(obj) {
        return obj.color || '#5D667C';
      });
    net.source(nodes, edges);
    net.render();
    return net;
  }
  registIconNetNode(container, nodes, edges, config, plugin) {
    let defaultConfig = {
      plugins: [plugin],
      animate: !0,
      container: container,
      fitView: 'autoZoom',
      fitViewPadding: 20,

      //强行指定的高度，宽度，需要修改
      height: 300,
      //width:'90%',
      grid: {
        cell: 10,
      },
      modes: {
        default: [
          'dragNode',
          'dragEdge',
          'dragBlank',
          'resizeEdge',
          'resizeNode',
          'wheelZoom',
          'clickFocus',
        ],
      },
    };
    config = Object.assign(defaultConfig, config);
    G6.registNode('iconNet', {
      draw: function(cfg, group) {
        var x = 0;
        var y = 0;
        var model = cfg.model;
        var imgPath = model.imgPath;

        var margin = 8;
        var padding = 16;

        var bgRect = group.addShape('rect');

        var titleBox;
        var title;
        var imgBox;
        var img;
        var width;
        var height;
        // var titleHeight;

        title = group.addShape('text', {
          attrs: {
            x: x,
            y: y,
            text: model.title,
            fill: '#555',
            textBaseline: 'top',
            textAlign: 'center',
            fontWeight: 400,
            fontSize: 14,
          },
        });

        img = group.addShape('image', {
          attrs: {
            x: x,
            y: y,
            img: imgPath,
            width: 10,
            height: 20,
          },
        });

        titleBox = title.getBBox();
        imgBox = img.getBBox();
        width = titleBox.width + padding * 2 + margin * 2;
        height = padding * 2 + titleBox.height + imgBox.height;
        // titleHeight = -height/2 + titleBox.height + padding*2;

        title.translate(0, -height / 2 + imgBox.height + padding * 1);
        img.translate(-imgBox.width / 2, -height / 2 + padding * 1);

        bgRect.attr({
          x: x - width / 2,
          y: y - height / 2,
          width: width,
          height: height,
          stroke: '#ccc',
          fill: '#fff',
          radius: 4,
        });

        return bgRect;
      },
      getAnchorPoints: function(cfg, group, edges) {
        return [[0.5, 0], [0.5, 1], [0, 0.5], [1, 0.5]];
      },
    });
    var net = new G6.Net(config);

    net
      .edge()
      .size(function(obj) {
        return 1.5;
      })
      .color(function(obj) {
        return obj.color || '#5D667C';
      });
    // .style({
    //     stroke: '#5D667C'
    // });

    net.source(nodes, edges);
    net.render();
    return net;
  }

  render() {
    // const { data } = this.props
    return (
      // <div style={{ width:'100%', height:'100%', backgroundColor:'white' }}>
      <div ref="container" />
      // </div>
    );
  }
}
export default Index;
