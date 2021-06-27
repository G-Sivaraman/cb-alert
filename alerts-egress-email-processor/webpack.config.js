const path = require('path');

const baseConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          "/node_modules/"
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'node'
}

const emailProcessor = {
  ...baseConfig,

  entry: './src/handlers/egress-email-handler.ts',
  output: {
    filename: 'egress-email-handler.js',
    path: path.resolve(__dirname, 'bundle'),
    library: "egress-email-handler",
    libraryTarget: 'commonjs2'
  }
};

module.exports = [emailProcessor];