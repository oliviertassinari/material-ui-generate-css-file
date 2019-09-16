const React = require('react');
const core = require('@material-ui/core');
const ReactDOMServer = require('react-dom/server');
const styles = require('@material-ui/styles');
const fse = require('fs-extra');

const broken = [
  'WithStyles(ForwardRef(ExpansionPanel))',
  'WithStyles(ForwardRef(FormControlLabel))',
  'WithStyles(Tooltip)',
]

const tree = [];
Object.keys(core).forEach(key => {
  const Component = core[key];
  console.log(Component.displayName)

  if (Component.displayName && broken.indexOf(Component.displayName) === -1) {
    ReactDOMServer.renderToString(React.createElement(Component));
    tree.push(React.createElement(Component))
  };
});

const sheets = new styles.ServerStyleSheets();
ReactDOMServer.renderToString(sheets.collect(tree));

fse.outputFileSync(__dirname + '/material-ui.css', sheets.toString())
