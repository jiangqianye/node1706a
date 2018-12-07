import G6 from '@antv/g6';
import Plugins from '@antv/g6-plugins';

export const registIconNetNode = (
  container = null,
  nodes = [],
  edges = [],
  netCfg = {},
  pluginCfg = {}
) => {
  if (typeof container === 'string' && nodes.length > 0 && edges.length > 0) {
    // Plugins配置
    const defaultPluginCfg = {
      rankdir: 'LR',
      nodesep: 10, // 节点间距
      ranksep: 80, // 分层间距  需要监听屏幕宽度的变化来自动改变，否则会超出范围
      ...pluginCfg,
    };
    /* eslint-disable */
    const plugins = [new Plugins['layout.dagre'](defaultPluginCfg)];
    // G6.Net配置
    const defaultNetCfg = {
      plugins,
      id: container, // dom id
      fitView: 'autoSize',
      height: 300,
      ...netCfg,
    };
    const net = new G6.Net(defaultNetCfg);

    G6.registNode('iconNet', {
      draw: function(cfg, group) {
        var x = 0;
        var y = 0;
        var model = cfg.model;
        var imgPath = model.imgPath;
        var margin = 8;
        var padding = 16;
        var bgRect = group.addShape('rect');

        const img = group.addShape('image', {
          attrs: {
            x: x - 15,
            y: y - 15,
            img: imgPath,
            width: 30,
            height: 30,
          },
        });
        const imgBox = img.getBBox();

        const title = group.addShape('text', {
          attrs: {
            x: x,
            y: y + 15,
            text: model.title,
            fill: '#555',
            textBaseline: 'top',
            textAlign: 'center',
            fontWeight: 400,
            fontSize: 12,
          },
        });
        const titleBox = title.getBBox();

        const width = titleBox.width + padding + margin * 2;
        const height = padding + titleBox.height + imgBox.height;

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
    net.edge().size(1);
    net.edge().shape('arrow');
    net.edge().color('#5D667C');
    net.source(nodes, edges);
    net.render();
    return net;
  }
};
