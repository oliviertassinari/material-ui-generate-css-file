const React = require('react');
const core = require('@material-ui/core');
const jss = require('jss');
const ReactDOMServer = require('react-dom/server');
const styles = require('@material-ui/styles');
const fse = require('fs-extra');

let css = '';
const StylesProvider = styles.StylesProvider
const sheetsRegistry = new jss.SheetsRegistry();
const sheetsManager = new Map();
const generateClassName = styles.createGenerateClassName({ dangerouslyUseGlobalCSS: true });

const broken = [
  'WithStyles(ForwardRef(ExpansionPanel))',
  'WithTheme(Fade)',
  'WithStyles(WithFormControlContext(ForwardRef(FormControlLabel)))',
  'WithTheme(Grow)',
  'WithStyles(ListItemAvatar)',
  'WithTheme(Slide)',
  'WithStyles(Tooltip)',
  'WithTheme(Zoom)',
]

Object.keys(core).forEach(key => {
  const Component = core[key];
  console.log(Component.displayName)

  if (Component.displayName && broken.indexOf(Component.displayName) === -1) {
    ReactDOMServer.renderToString(
      React.createElement(StylesProvider, {
        generateClassName,
        sheetsRegistry,
        sheetsManager,
      }, React.createElement(Component))
    );
  }
});

// Grab the CSS from our sheetsRegistry.
css = sheetsRegistry.toString();

fse.outputFileSync(__dirname + '/material-ui.css', css)
